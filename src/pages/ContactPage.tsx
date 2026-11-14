import React from "react";
import { ContentPage } from "./ContentPage";
import { HUB_URL, SITE_NAME } from "../config/site";

export function ContactPage() {
  return (
    <ContentPage title="Contact" showMidAds={false}>
      <p>
        For questions about {SITE_NAME}, reach the web-free.site team through the contact options listed on{" "}
        <a href={HUB_URL} className="text-blue-600 hover:underline">
          web-free.site
        </a>
        .
      </p>
      <p className="mt-4 text-gray-600">
        We cannot recover images you process locally — they never reach our servers.
      </p>
    </ContentPage>
  );
}