import React from "react";
import { Link } from "react-router-dom";
import { HUB_URL, MODEL_DEFAULT, MODEL_WEBGPU, SITE_NAME } from "../../config/site";

export function SiteFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-gray-600">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-semibold text-gray-800 mb-2">{SITE_NAME}</p>
            <p>
              Background removal runs entirely in your browser. Photos are not uploaded to our
              servers.
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-800 mb-2">Pages</p>
            <ul className="space-y-1">
              <li>
                <Link to="/about" className="text-blue-600 hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-blue-600 hover:underline">
                  FAQ &amp; how-to
                </Link>
              </li>
              <li>
                <Link to="/remove-background-no-upload" className="text-blue-600 hover:underline">
                  Remove background without uploading
                </Link>
              </li>
              <li>
                <a href="/fr/" className="text-blue-600 hover:underline">
                  Français
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-800 mb-2">Legal</p>
            <ul className="space-y-1">
              <li>
                <Link to="/privacy" className="text-blue-600 hover:underline">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-blue-600 hover:underline">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-600 hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-100 space-y-2">
          <p>
            App based on{" "}
            <a
              href="https://github.com/addyosmani/bg-remove"
              className="text-blue-600 hover:underline"
              rel="noopener noreferrer"
            >
              bg-remove
            </a>{" "}
            by Addy Osmani (MIT) and the{" "}
            <a
              href="https://huggingface.co/docs/transformers.js"
              className="text-blue-600 hover:underline"
              rel="noopener noreferrer"
            >
              Transformers.js
            </a>{" "}
            demo from Hugging Face.
          </p>
          <p>
            Default model:{" "}
            <a
              href={`https://huggingface.co/${MODEL_DEFAULT.id}`}
              className="text-blue-600 hover:underline"
              rel="noopener noreferrer"
            >
              {MODEL_DEFAULT.name}
            </a>{" "}
            ({MODEL_DEFAULT.license}, upstream {MODEL_DEFAULT.upstream}). Optional WebGPU:{" "}
            {MODEL_WEBGPU.name} ({MODEL_WEBGPU.license}).
          </p>
          <p>
            More free tools at{" "}
            <a href={HUB_URL} className="text-blue-600 hover:underline">
              web-free.site
            </a>
            {" · "}
            <a
              href="https://araplhn.org/4/e8764eab172932418d883ece8f05eeb9"
              className="text-gray-500 hover:text-gray-700"
              rel="nofollow noopener noreferrer"
            >
              Sponsored link
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}