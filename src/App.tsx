import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BackgroundRemover } from "./pages/BackgroundRemover";
import { AboutPage } from "./pages/AboutPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import { ContactPage } from "./pages/ContactPage";
import { FaqPage } from "./pages/FaqPage";
import { NoUploadPage } from "./pages/NoUploadPage";
import { SITE_NAME, SITE_URL } from "./config/site";

const ROUTE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: `${SITE_NAME} — Remove Photo Background Free, In Your Browser`,
    description:
      "Free automatic background removal. No upload, no sign-up. Download transparent PNGs — processing stays on your device.",
  },
  "/about": {
    title: `About — ${SITE_NAME}`,
    description: "Open-source browser tool based on bg-remove. BiRefNet (MIT) default model.",
  },
  "/privacy": {
    title: `Privacy — ${SITE_NAME}`,
    description: "Local in-browser processing. We do not receive your images.",
  },
  "/terms": {
    title: `Terms — ${SITE_NAME}`,
    description: "Terms of use for the free background remover.",
  },
  "/contact": {
    title: `Contact — ${SITE_NAME}`,
    description: "Contact information via web-free.site.",
  },
  "/faq": {
    title: `FAQ — ${SITE_NAME}`,
    description: "How to remove backgrounds free, without uploading photos.",
  },
  "/remove-background-no-upload": {
    title: "Remove Image Background Without Uploading — Free Tool",
    description:
      "Client-side background removal with BiRefNet. No server upload, private and free.",
  },
};

function PageMeta() {
  const { pathname } = useLocation();
  const meta = ROUTE_META[pathname] ?? ROUTE_META["/"];
  const canonical = `${SITE_URL}${pathname === "/" ? "" : pathname}`.replace(/\/$/, "") || SITE_URL;

  return (
    <Helmet>
      <html lang="en" />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={canonical.endsWith(SITE_URL) ? `${SITE_URL}/` : `${canonical}/`} />
      <link rel="alternate" hrefLang="en" href={`${SITE_URL}/`} />
      <link rel="alternate" hrefLang="fr" href={`${SITE_URL}/fr/`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={`${SITE_URL}/meta.jpg`} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <PageMeta />
        <ScrollTop />
        <Routes>
          <Route path="/" element={<BackgroundRemover />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/remove-background-no-upload" element={<NoUploadPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}