import React from "react";
import { ContentPage } from "./ContentPage";
import { SITE_NAME } from "../config/site";

export function TermsPage() {
  return (
    <ContentPage title="Terms of Use">
      <p>
        {SITE_NAME} is provided &quot;as is&quot; without warranty. You are responsible for ensuring you have
        the right to edit and publish any image you process.
      </p>
      <p className="mt-4">
        Automated cut-outs are imperfect, especially on fine hair, glass, or motion blur. Review results
        before commercial use.
      </p>
      <p className="mt-4">
        The application source is MIT-licensed (see repository LICENSE). Model weights are subject to their
        respective licenses listed on the About page.
      </p>
    </ContentPage>
  );
}