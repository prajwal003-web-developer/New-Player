import { Suspense } from "react";
import Player from "./Player";

export default function Page() {
  return (
    <div className="h-[100dvh] w-full bg-black">
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center text-white">
            Loading Player...
          </div>
        }
      >
        <Player />
      </Suspense>
    </div>
  );
}