import React from "react";
import { Link } from "react-router-dom";
import { SITE_NAME } from "../../config/site";

export function SiteHeader() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
        <Link to="/" className="text-xl font-bold text-gray-800 hover:text-blue-700">
          {SITE_NAME}
        </Link>
        <nav className="flex flex-wrap gap-4 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600">
            Remove background
          </Link>
          <Link to="/faq" className="hover:text-blue-600">
            FAQ
          </Link>
          <Link to="/about" className="hover:text-blue-600">
            About
          </Link>
          <a href="/fr/" className="hover:text-blue-600">
            FR
          </a>
        </nav>
      </div>
    </header>
  );
}