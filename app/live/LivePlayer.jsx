"use client";

import { useSearchParams } from "next/navigation";

export default function LivePlayer() {
  const searchParams = useSearchParams();

  const urlFull = searchParams.get("uri");
  const uriId = searchParams.get("uriId") || "";

  let uri = urlFull;

  if (!urlFull) {
    uri = uriId;
  }

  return (
    <div className="h-[100dvh] w-full bg-black">
      <iframe
        src={uri}
        className="w-full h-full border-0"
        allow="fullscreen"
        allowFullScreen
      />
    </div>
  );
}