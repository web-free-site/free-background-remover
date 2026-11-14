import React from "react";
import { ContentPage } from "./ContentPage";
import { SITE_NAME } from "../config/site";

export function PrivacyPage() {
  return (
    <ContentPage title="Privacy Policy">
      <p className="text-gray-500 text-sm">Last updated: November 2026</p>
      <p className="mt-4">
        {SITE_NAME} processes photos locally in your browser using WebAssembly / WebGPU. We do not receive,
        store, or analyse the contents of images you edit.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">What we may collect</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Standard web server logs from our host (IP address, user agent, requested URL).</li>
        <li>
          Third-party advertising partners may set cookies or use similar technologies when you view ads on
          this site. See their policies for details.
        </li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">Model downloads</h2>
      <p>
        Neural network weights are fetched directly from Hugging Face when you first use the tool. That
        request goes from your browser to Hugging Face, not through our application servers.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p>
        Questions: see our <a href="/contact">contact page</a>.
      </p>
    </ContentPage>
  );
}