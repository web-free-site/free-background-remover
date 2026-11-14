import {
  env,
  AutoModel,
  AutoProcessor,
  RawImage,
  PreTrainedModel,
  Processor,
  Tensor,
} from "@huggingface/transformers";

/** MIT — commercial use OK (ONNX export of ZhengPeng7/BiRefNet). */
export const DEFAULT_MODEL_ID = "onnx-community/BiRefNet_512x512-ONNX";

/** Apache-2.0 — optional WebGPU matting model. */
export const WEBGPU_MODEL_ID = "Xenova/modnet";

export type ModelId = typeof DEFAULT_MODEL_ID | typeof WEBGPU_MODEL_ID;

interface ModelState {
  model: PreTrainedModel | null;
  processor: Processor | null;
  isWebGPUSupported: boolean;
  currentModelId: ModelId;
  isIOS: boolean;
}

interface ModelInfo {
  currentModelId: string;
  isWebGPUSupported: boolean;
  isIOS: boolean;
}

const isIOS = () =>
  [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod",
  ].includes(navigator.platform) ||
  (navigator.userAgent.includes("Mac") && "ontouchend" in document);

const state: ModelState = {
  model: null,
  processor: null,
  isWebGPUSupported: false,
  currentModelId: DEFAULT_MODEL_ID,
  isIOS: isIOS(),
};

function configureWasmBackend(proxy: boolean) {
  env.allowLocalModels = false;
  if (env.backends?.onnx?.wasm) {
    env.backends.onnx.wasm.proxy = proxy;
  }
}

async function loadBiRefNetWithDtype(dtype: "fp16" | "fp32"): Promise<boolean> {
  configureWasmBackend(true);
  state.model = await AutoModel.from_pretrained(DEFAULT_MODEL_ID, {
    dtype,
    progress_callback: (progress) => {
      if (typeof progress === "number") {
        console.log(`Loading BiRefNet (${dtype}): ${Math.round(progress * 100)}%`);
      }
    },
  });
  state.processor = await AutoProcessor.from_pretrained(DEFAULT_MODEL_ID);
  state.currentModelId = DEFAULT_MODEL_ID;
  return !!(state.model && state.processor);
}

/** Default is fp16 (~473 MB). Fall back to fp32 if fp16 cannot load. */
async function loadBiRefNet(): Promise<boolean> {
  try {
    const ok = await loadBiRefNetWithDtype("fp16");
    if (ok) return true;
  } catch (error) {
    console.warn("BiRefNet fp16 failed, falling back to fp32:", error);
  }
  try {
    const ok = await loadBiRefNetWithDtype("fp32");
    if (ok) return true;
  } catch (error) {
    console.error("BiRefNet initialization failed:", error);
  }
  return false;
}

async function initializeWebGPU(): Promise<boolean> {
  const gpu = (navigator as Navigator & { gpu?: GPU }).gpu;
  if (!gpu) return false;

  try {
    const adapter = await gpu.requestAdapter();
    if (!adapter) return false;

    configureWasmBackend(false);
    await new Promise((resolve) => setTimeout(resolve, 100));

    state.model = await AutoModel.from_pretrained(WEBGPU_MODEL_ID, {
      device: "webgpu",
      config: {
        model_type: "modnet",
        architectures: ["MODNet"],
      },
    });
    state.processor = await AutoProcessor.from_pretrained(WEBGPU_MODEL_ID);
    state.isWebGPUSupported = true;
    state.currentModelId = WEBGPU_MODEL_ID;
    return true;
  } catch (error) {
    console.error("WebGPU initialization failed:", error);
    return false;
  }
}

export async function initializeModel(forceModelId?: ModelId): Promise<boolean> {
  try {
    const selected = forceModelId ?? DEFAULT_MODEL_ID;

    if (selected === WEBGPU_MODEL_ID && !state.isIOS) {
      const ok = await initializeWebGPU();
      if (ok) return true;
      console.log("Falling back to BiRefNet (WebAssembly)…");
      return loadBiRefNet();
    }

    return loadBiRefNet();
  } catch (error) {
    console.error("Error initializing model:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to initialize background removal model",
    );
  }
}

export function getModelInfo(): ModelInfo {
  return {
    currentModelId: state.currentModelId,
    isWebGPUSupported: Boolean((navigator as Navigator & { gpu?: GPU }).gpu),
    isIOS: state.isIOS,
  };
}

async function predictMask(pixel_values: Tensor): Promise<Tensor> {
  if (!state.model) throw new Error("Model not loaded");

  if (state.currentModelId === DEFAULT_MODEL_ID) {
    const { output_image } = await state.model({ input_image: pixel_values });
    return output_image[0].sigmoid().mul(255).to("uint8");
  }

  const { output } = await state.model({ input: pixel_values });
  return output[0].mul(255).to("uint8");
}

export async function processImage(image: File): Promise<File> {
  if (!state.model || !state.processor) {
    throw new Error("Model not initialized. Call initializeModel() first.");
  }

  const img = await RawImage.fromURL(URL.createObjectURL(image));

  try {
    const { pixel_values } = await state.processor(img);
    const maskTensor = await predictMask(pixel_values);

    const maskData = (
      await RawImage.fromTensor(maskTensor).resize(img.width, img.height)
    ).data;

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get 2d context");

    ctx.drawImage(img.toCanvas(), 0, 0);

    const pixelData = ctx.getImageData(0, 0, img.width, img.height);
    for (let i = 0; i < maskData.length; ++i) {
      pixelData.data[4 * i + 3] = maskData[i];
    }
    ctx.putImageData(pixelData, 0, 0);

    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Failed to create blob"))),
        "image/png",
      ),
    );

    const baseName = image.name.replace(/\.[^.]+$/, "");
    return new File([blob], `${baseName}-no-bg.png`, { type: "image/png" });
  } catch (error) {
    console.error("Error processing image:", error);
    throw new Error("Failed to process image");
  }
}

export async function processImages(images: File[]): Promise<File[]> {
  const processedFiles: File[] = [];

  for (const image of images) {
    try {
      processedFiles.push(await processImage(image));
    } catch (error) {
      console.error("Error processing image", image.name, error);
    }
  }

  return processedFiles;
}