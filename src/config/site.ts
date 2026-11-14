export const SITE_URL = "https://free-background-remover.web-free.site";
export const SITE_NAME = "Free Background Remover";
export const HUB_URL = "https://web-free.site";

export const MODEL_DEFAULT = {
  id: "onnx-community/BiRefNet_512x512-ONNX",
  name: "BiRefNet",
  license: "MIT",
  upstream: "ZhengPeng7/BiRefNet",
} as const;

export const MODEL_WEBGPU = {
  id: "Xenova/modnet",
  name: "MODNet",
  license: "Apache-2.0",
  upstream: "ZHKKKe/MODNet",
} as const;