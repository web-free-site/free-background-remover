import React from "react";
import { Link } from "react-router-dom";
import { ContentPage } from "./ContentPage";

export function NoUploadPage() {
  return (
    <ContentPage title="Remove image background in the browser — no upload">
      <p>
        Many online background removers send your photo to a remote GPU. {` `}
        <strong>Free Background Remover</strong> is different: the neural network runs with WebAssembly in
        Chrome, Firefox, Safari, and Edge, so pixels never leave your machine during editing.
      </p>
      <p className="mt-4">
        This is ideal for passport scans, client work, or any image you do not want stored on a third-party
        server. The trade-off is that the first visit downloads the default BiRefNet weights (about 473 MB, fp16) from Hugging
        Face; later visits use cached files.
      </p>
      <p className="mt-4">
        <Link to="/" className="text-blue-600 font-medium hover:underline">
          Start removing backgrounds now →
        </Link>
      </p>
    </ContentPage>
  );
}