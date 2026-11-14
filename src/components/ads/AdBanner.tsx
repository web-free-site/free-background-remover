import React from "react";

interface AdBannerProps {
  adKey: string;
  width: number;
  height: number;
  className?: string;
  title?: string;
}

/** Isolated iframe banner (Adsterra atOptions pattern). */
export function AdBanner({ adKey, width, height, className = "", title }: AdBannerProps) {
  const iframeId = `ad-iframe-${adKey}`;
  return (
    <div
      className={`ad-slot overflow-hidden flex items-center justify-center ${className}`}
      style={{ minHeight: height, maxWidth: width }}
      aria-label={title ?? "Advertisement"}
    >
      <iframe
        id={iframeId}
        title={title ?? "Advertisement"}
        width={width}
        height={height}
        className="border-0 bg-transparent"
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;overflow:hidden;background:transparent;}</style></head><body><script>
  atOptions = {
    'key' : '${adKey}',
    'format' : 'iframe',
    'height' : ${height},
    'width' : ${width},
    'params' : {}
  };
</script><script src="https://bauval.org/22/${adKey}"></script></body></html>`}
      />
    </div>
  );
}