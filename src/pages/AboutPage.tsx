import React from "react";
import { ContentPage } from "./ContentPage";
import { MODEL_DEFAULT, MODEL_WEBGPU, SITE_NAME } from "../config/site";

export function AboutPage() {
  return (
    <ContentPage title={`About ${SITE_NAME}`}>
      <p>
        {SITE_NAME} is a free tool that removes photo backgrounds entirely in your web browser. Your images
        are never sent to our servers for processing.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Open-source base</h2>
      <p>
        This site is built on{" "}
        <a href="https://github.com/addyosmani/bg-remove" className="text-blue-600 hover:underline">
          bg-remove
        </a>{" "}
        by Addy Osmani (MIT), inspired by the Hugging Face Transformers.js background-removal demo.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Segmentation models</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Default:</strong>{" "}
          <a
            href={`https://huggingface.co/${MODEL_DEFAULT.id}`}
            className="text-blue-600 hover:underline"
          >
            {MODEL_DEFAULT.name}
          </a>{" "}
          — {MODEL_DEFAULT.license} license (upstream{" "}
          <a
            href={`https://github.com/ZhengPeng7/BiRefNet`}
            className="text-blue-600 hover:underline"
          >
            {MODEL_DEFAULT.upstream}
          </a>
          ). Suitable for commercial use including this ad-supported site.
        </li>
        <li>
          <strong>Optional WebGPU:</strong>{" "}
          <a
            href={`https://huggingface.co/${MODEL_WEBGPU.id}`}
            className="text-blue-600 hover:underline"
          >
            {MODEL_WEBGPU.name}
          </a>{" "}
          — Apache-2.0.
        </li>
      </ul>
      <p className="mt-4">
        We do not use BRIA RMBG models (non-commercial license only) or AGPL-licensed removal libraries.
      </p>
    </ContentPage>
  );
}