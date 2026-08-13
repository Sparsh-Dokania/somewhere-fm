import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useState } from "react";

function Player({ scene }) {
  const [playing, setPlaying] = useState(false);

  const currentTrack = scene.playlist?.[0];

  return (
    <div className="absolute bottom-8 left-1/2 z-30 w-[calc(100%-32px)] max-w-md -translate-x-1/2">
      <div className="rounded-2xl border border-white/10 bg-black/35 p-4 backdrop-blur-xl">
        
        <div className="flex items-center gap-3">
          
          <button
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black"
            onClick={() => setPlaying(!playing)}
          >
            {playing ? (
              <Pause size={15} fill="currentColor" />
            ) : (
              <Play size={15} fill="currentColor" />
            )}
          </button>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm">
              {currentTrack?.title || "Something is playing"}
            </p>

            <p className="truncate text-xs text-white/50">
              {currentTrack?.artist || "SOMEWHERE.FM"}
            </p>
          </div>

          <div className="flex items-center gap-2 text-white/60">
            <SkipBack size={15} />
            <SkipForward size={15} />
            <Volume2 size={15} />
          </div>
        </div>

        {/* PROGRESS */}
        <div className="mt-4 h-[2px] w-full overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full w-[32%] rounded-full"
            style={{ backgroundColor: scene.accent }}
          />
        </div>

      </div>
    </div>
  );
}

export default Player;