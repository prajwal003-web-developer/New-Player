'use client';

import { useSearchParams } from "next/navigation";
import { servers } from "./servers";

export default function Player() {
  const searchParams = useSearchParams();

  const server = Number(searchParams.get("server") || 0);
  const id = searchParams.get("id") || "550";
  const type = searchParams.get("type") || "movie";
  const season = searchParams.get("season");
  const episode = searchParams.get("episode");

  const currentServer = servers[server];

  if (!currentServer) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        Invalid Server
      </div>
    );
  }

  let url = `${currentServer.url}${type}/${id}`;

  if (type === "tv" && season && episode) {
    url += `/${season}/${episode}`;
  }

  if (currentServer.end) {
    url += currentServer.end;
  }

  return (
    <iframe
      src={url}
      style={{ width: "100%", height: "96dvh", margin: 0, border: "0" }}
      className="w-full h-full border-0"
      allow="fullscreen"
      allowFullScreen
    />
  );
}