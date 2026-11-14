import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Images } from "../components/Images";
import {
  processImages,
  initializeModel,
  getModelInfo,
  DEFAULT_MODEL_ID,
  WEBGPU_MODEL_ID,
  type ModelId,
} from "../../lib/process";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { AdLayout } from "../components/layout/AdLayout";
import { MODEL_DEFAULT, MODEL_WEBGPU } from "../config/site";

interface AppError {
  message: string;
}

export interface ImageFile {
  id: number;
  file: File;
  processedFile?: File;
}

const sampleImages = [
  "https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513013156887-d2bf241c8c82?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1643490745745-e8ca9a3a1c90?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=1200&auto=format&fit=crop",
];

export function BackgroundRemover() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const [isWebGPU, setIsWebGPU] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [currentModel, setCurrentModel] = useState<ModelId>(DEFAULT_MODEL_ID);
  const [isModelSwitching, setIsModelSwitching] = useState(false);
  const [images, setImages] = useState<ImageFile[]>([]);

  useEffect(() => {
    const { isIOS: isIOSDevice, isWebGPUSupported } = getModelInfo();
    setIsIOS(isIOSDevice);
    setIsWebGPU(isWebGPUSupported);
  }, []);

  const handleModelChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newModel = event.target.value as ModelId;
    setIsModelSwitching(true);
    setError(null);
    try {
      const initialized = await initializeModel(newModel);
      if (!initialized) throw new Error("Failed to initialize new model");
      setCurrentModel(newModel);
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Failed to switch models",
      });
      setCurrentModel(DEFAULT_MODEL_ID);
    } finally {
      setIsModelSwitching(false);
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const newImages = acceptedFiles.map((file, index) => ({
        id: Date.now() + index,
        file,
        processedFile: undefined,
      }));
      setImages((prev) => [...prev, ...newImages]);

      if (images.length === 0) {
        setIsLoading(true);
        setError(null);
        try {
          const initialized = await initializeModel();
          if (!initialized) throw new Error("Failed to initialize background removal model");
          const { isWebGPUSupported, currentModelId } = getModelInfo();
          setIsWebGPU(isWebGPUSupported);
          setCurrentModel(currentModelId as ModelId);
        } catch (err) {
          setError({
            message: err instanceof Error ? err.message : "An unknown error occurred",
          });
          setImages([]);
          setIsLoading(false);
          return;
        }
        setIsLoading(false);
      }

      for (const image of newImages) {
        try {
          const result = await processImages([image.file]);
          if (result?.length) {
            setImages((prev) =>
              prev.map((img) =>
                img.id === image.id ? { ...img, processedFile: result[0] } : img,
              ),
            );
          }
        } catch (e) {
          console.error("Error processing image:", e);
        }
      }
    },
    [images.length],
  );

  const handlePaste = (event: React.ClipboardEvent) => {
    const imageFiles: File[] = [];
    for (const item of event.clipboardData.items) {
      if (item.type.startsWith("image")) {
        const file = item.getAsFile();
        if (file) imageFiles.push(file);
      }
    }
    if (imageFiles.length) onDrop(imageFiles);
  };

  const handleSampleImageClick = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    onDrop([new File([blob], "sample-image.jpg", { type: "image/jpeg" })]);
  };

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
  });

  return (
    <>
      <SiteHeader />
      <AdLayout showMidAds={images.length > 0}>
        <div onPaste={handlePaste}>
          <div className="flex flex-wrap items-center justify-end gap-4 mb-4">
            {!isIOS && isWebGPU && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">Model:</span>
                <select
                  value={currentModel}
                  onChange={handleModelChange}
                  disabled={isModelSwitching || isLoading}
                  className="border border-gray-300 rounded-md px-2 py-1 bg-white"
                >
                  <option value={DEFAULT_MODEL_ID}>
                    {MODEL_DEFAULT.name} ({MODEL_DEFAULT.license}, all browsers)
                  </option>
                  <option value={WEBGPU_MODEL_ID}>
                    {MODEL_WEBGPU.name} ({MODEL_WEBGPU.license}, WebGPU)
                  </option>
                </select>
              </div>
            )}
          </div>

          <div className={`grid ${images.length === 0 ? "lg:grid-cols-2 gap-8" : "grid-cols-1"}`}>
            {images.length === 0 && (
              <div className="flex flex-col justify-center">
                <img src="/hero.png" alt="" className="mb-6 w-full object-cover h-[320px] rounded-lg" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                  Remove image background in your browser
                </h2>
                <p className="text-lg text-gray-600 mb-2">Free, automatic, no sign-up.</p>
                <p className="text-gray-500">
                  Drop a photo to get a transparent PNG. Processing uses{" "}
                  <strong>{MODEL_DEFAULT.name}</strong> ({MODEL_DEFAULT.license}) on your device — nothing is
                  uploaded.
                </p>
              </div>
            )}

            <div>
              <div
                {...getRootProps()}
                className={`p-8 mb-6 border-2 border-dashed rounded-lg text-center cursor-pointer bg-white
                  ${isDragAccept ? "border-green-500 bg-green-50" : ""}
                  ${isDragReject ? "border-red-500 bg-red-50" : ""}
                  ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-500"}
                  ${isLoading || isModelSwitching ? "cursor-not-allowed opacity-80" : ""}
                `}
              >
                <input {...getInputProps()} disabled={isLoading || isModelSwitching} />
                {isLoading || isModelSwitching ? (
                  <p className="text-gray-600">Loading segmentation model…</p>
                ) : error ? (
                  <p className="text-red-600">{error.message}</p>
                ) : (
                  <p className="text-gray-600">Drag &amp; drop, paste, or click to add images</p>
                )}
              </div>

              {images.length === 0 && (
                <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Try a sample photo</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {sampleImages.map((url, i) => (
                      <button
                        key={url}
                        type="button"
                        onClick={() => handleSampleImageClick(url)}
                        className="aspect-square rounded-lg overflow-hidden focus:ring-2 ring-blue-500"
                      >
                        <img src={url} alt={`Sample ${i + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <Images
                images={images}
                onDelete={(id) => setImages((prev) => prev.filter((img) => img.id !== id))}
              />
            </div>
          </div>
        </div>
      </AdLayout>
      <SiteFooter />
    </>
  );
}