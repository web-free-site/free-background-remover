import React from "react";

const NATIVE_CONTAINER = "container-0f3802a5a491021b2aa8c1dbfd1db969";

export function AdNative({ className = "" }: { className?: string }) {
  return (
    <div className={`ad-native ${className}`}>
      <div id={NATIVE_CONTAINER} className="min-h-[120px]" />
    </div>
  );
}

export const NATIVE_CONTAINER_ID = NATIVE_CONTAINER;