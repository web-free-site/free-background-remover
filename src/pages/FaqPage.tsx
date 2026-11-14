import React from "react";
import { ContentPage } from "./ContentPage";
import { MODEL_DEFAULT, SITE_NAME } from "../config/site";

export function FaqPage() {
  return (
    <ContentPage title="FAQ — How to remove a background for free">
      <h2 className="text-xl font-semibold mt-2 mb-2">Is it really free?</h2>
      <p>Yes. The tool and downloads are free. The site is supported by advertising.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Do you upload my photos?</h2>
      <p>
        No. Segmentation runs in your browser with {MODEL_DEFAULT.name}. Your file stays on your device unless
        you choose to download the result.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">How accurate is it?</h2>
      <p>
        {MODEL_DEFAULT.name} works well on people, products, and clear subjects. Fine hair, semi-transparent
        objects, and busy backgrounds may need touch-up in an image editor after download.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What format do I get?</h2>
      <p>Transparent PNG. Use Edit on a processed image to change the background colour or add a backdrop.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Quick steps</h2>
      <ol className="list-decimal pl-6 space-y-2">
        <li>Open {SITE_NAME} on the home page.</li>
        <li>Drop or paste a JPG or PNG (first use downloads the AI model — one time).</li>
        <li>Wait for processing, then download your cut-out.</li>
      </ol>
    </ContentPage>
  );
}