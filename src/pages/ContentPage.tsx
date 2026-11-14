import React from "react";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { AdLayout } from "../components/layout/AdLayout";

interface ContentPageProps {
  title: string;
  children: React.ReactNode;
  showMidAds?: boolean;
}

export function ContentPage({ title, children, showMidAds = true }: ContentPageProps) {
  return (
  <>
      <SiteHeader />
      <AdLayout showMidAds={showMidAds}>
        <article className="bg-white rounded-lg shadow-sm p-6 md:p-10 prose prose-gray max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>
          {children}
        </article>
      </AdLayout>
      <SiteFooter />
    </>
  );
}