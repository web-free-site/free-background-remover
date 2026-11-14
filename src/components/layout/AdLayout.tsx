import React, { useEffect } from "react";
import { AdBanner } from "../ads/AdBanner";
import { AdNative } from "../ads/AdNative";

interface AdLayoutProps {
  children: React.ReactNode;
  showMidAds?: boolean;
}

const STICKY_KEY = "765e0e1cd20befaee6305008167bd946";

export function AdLayout({ children, showMidAds = true }: AdLayoutProps) {
  useEffect(() => {
    const existing = document.getElementById("adsterra-native-script");
    if (!existing) {
      const s = document.createElement("script");
      s.id = "adsterra-native-script";
      s.async = true;
      s.setAttribute("data-cfasync", "false");
      s.src = "https://bauval.org/21/0f3802a5a491021b2aa8c1dbfd1db969";
      document.body.appendChild(s);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="w-full flex justify-center py-2 bg-gray-100/80 border-b border-gray-200">
        <AdBanner adKey="9c3da2bba002357c8125e19b378b8e89" width={728} height={90} title="Top banner 728x90" />
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="hidden xl:flex flex-col gap-4 shrink-0">
            <AdBanner adKey="60dd48fbb5e94756e9317b1a4a6ad4f5" width={160} height={600} title="Sidebar 160x600" />
            <AdBanner adKey="f91cbeb1bee724fc01670c01de17090e" width={160} height={300} title="Sidebar 160x300" />
          </aside>

          <div className="flex-1 min-w-0">
            {children}

            {showMidAds && (
              <div className="mt-8 space-y-6">
                <div className="flex justify-center">
                  <AdBanner adKey="9c3da2bba002357c8125e19b378b8e89" width={728} height={90} title="Mid banner 728x90" />
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <AdBanner adKey="fa9db36b5c3ea1ca9f09790310bd8d40" width={468} height={60} title="Banner 468x60" />
                  <AdBanner adKey="c545ae458c8e3ea63ca55d6ad99d0282" width={300} height={250} title="Banner 300x250" />
                </div>
                <AdNative className="flex justify-center" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 inset-x-0 z-40 flex justify-center md:hidden bg-white/95 border-t border-gray-200 py-1 shadow-lg">
        <AdBanner adKey={STICKY_KEY} width={320} height={50} title="Mobile sticky 320x50" />
      </div>
      <div className="h-14 md:hidden" aria-hidden="true" />
    </div>
  );
}