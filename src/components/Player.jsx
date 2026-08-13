import { Pause, Play, SkipBack, SkipForward } from "lucide-react";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import LiquidGlass from "./LiquidGlass";

function Player({ scene, youtubePlayer, youtubeReady }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [track, setTrack] = useState({
    title: "SOMEWHERE.FM",
    artist: "Waiting for signal...",
  });

  const cdRef = useRef(null);

  const player = youtubePlayer?.current;

  /*
   * Reset visual player when scene changes
   */
  useEffect(() => {
    setPlaying(false);
    setProgress(0);
    setDuration(0);

    if (cdRef.current) {
      gsap.killTweensOf(cdRef.current);

      gsap.set(cdRef.current, {
        rotation: 0,
      });
    }
  }, [scene.id]);

  /*
   * CD rotation
   */
  useEffect(() => {
    if (!cdRef.current) return;

    gsap.killTweensOf(cdRef.current);

    if (playing) {
      gsap.to(cdRef.current, {
        rotation: "+=360",
        duration: 4,
        ease: "none",
        repeat: -1,
      });
    }

    return () => {
      if (cdRef.current) {
        gsap.killTweensOf(cdRef.current);
      }
    };
  }, [playing]);



  /*
   * Read currently playing video information
   */
  useEffect(() => {
    if (!player) return;

    const updateTrack = () => {
      const data = player.getVideoData?.();

      if (!data) return;

      setTrack({
        title: data.title || "Somewhere",
        artist: data.author || "SOMEWHERE.FM",
      });
    };

    updateTrack();

    const interval = setInterval(updateTrack, 1000);

    return () => clearInterval(interval);
  }, [player]);

  const togglePlay = () => {
    const player = youtubePlayer?.current;

    if (!player || !youtubeReady) return;

    const state = player.getPlayerState?.();

    if (state === window.YT?.PlayerState?.PLAYING) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };
  useEffect(() => {
  const player = youtubePlayer?.current;

  if (!player || !youtubeReady) return;

  const updateTrack = () => {
    const data = player.getVideoData?.();

    if (!data) return;

    setTrack({
      title: data.title || "Somewhere",
      artist: data.author || "SOMEWHERE.FM",
    });

    const total = player.getDuration?.() || 0;

    if (total > 0) {
      setDuration(total);
    }
  };

  const interval = setInterval(updateTrack, 300);

  return () => clearInterval(interval);
}, [youtubePlayer, youtubeReady]);

  const nextTrack = () => {
  const player = youtubePlayer?.current;

  if (!player) return;

  const playlist = player.getPlaylist?.();

  if (!playlist?.length) return;

  const currentIndex = player.getPlaylistIndex?.() ?? 0;

  const nextIndex =
    currentIndex >= playlist.length - 1
      ? 0
      : currentIndex + 1;

      setProgress(0);
  player.playVideoAt(nextIndex);
};
const previousTrack = () => {
  const player = youtubePlayer?.current;

  if (!player) return;

  const playlist = player.getPlaylist?.();

  if (!playlist?.length) return;

  const currentIndex = player.getPlaylistIndex?.() ?? 0;

  const previousIndex =
    currentIndex <= 0
      ? playlist.length - 1
      : currentIndex - 1;

      setProgress(0);
  player.playVideoAt(previousIndex);
};
  const formatTime = (seconds) => {
    if (!seconds || Number.isNaN(seconds)) {
      return "0:00";
    }

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentSeconds = duration > 0 ? (duration * progress) / 100 : 0;

  return (
    <div className="absolute bottom-7 left-1/2 z-40 w-[calc(100%-32px)] max-w-[600px] -translate-x-1/2 md:bottom-9">
      <LiquidGlass
        className="
          min-h-[96px]
          rounded-[28px]
          px-4
          py-4
          md:px-5
        "
      >
        <div className="flex items-center gap-4">
          {/* CD */}

          <div className="relative -ml-2 shrink-0 md:-ml-3">
            <div
              ref={cdRef}
              className="
                relative
                h-[68px]
                w-[68px]
                rounded-full
                shadow-2xl
              "
              style={{
                background: `
                  radial-gradient(
                    circle at center,
                    #111 0 7%,
                    #d9d9d9 8% 10%,
                    #252525 11% 20%,
                    #bdbdbd 21% 22%,
                    #333 23% 42%,
                    #d0d0d0 43% 44%,
                    #242424 45% 65%,
                    #aaa 66% 67%,
                    #171717 68% 100%
                  )
                `,
              }}
            >
              <div
                className="
                  absolute
                  inset-[7px]
                  rounded-full
                  opacity-30
                "
                style={{
                  background: `
                    linear-gradient(
                      135deg,
                      transparent 35%,
                      rgba(255,255,255,.7) 50%,
                      transparent 65%
                    )
                  `,
                }}
              />

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-5
                  w-5
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                "
                style={{
                  backgroundColor: scene.accent,
                }}
              />

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-1.5
                  w-1.5
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-black
                "
              />
            </div>
          </div>

          {/* TRACK */}

          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium text-white">
              {track.title}
            </p>

            <p className="mt-0.5 truncate text-[11px] text-white/50">
              {track.artist}
            </p>

            <div className="mt-3 flex items-center gap-2">
              <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full transition-[width] duration-200"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: scene.accent,
                    boxShadow: `0 0 8px ${scene.accent}`,
                  }}
                />
              </div>

              <span className="font-mono text-[9px] text-white/40">
                {formatTime(currentSeconds)}
              </span>
            </div>
          </div>

          {/* CONTROLS */}

          <div className="flex shrink-0 items-center gap-1">
            <button
              onClick={previousTrack}
              className="
                hidden
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                text-white/45
                transition
                hover:bg-white/10
                hover:text-white
                sm:flex
              "
            >
              <SkipBack size={14} />
            </button>

            <button
              onClick={togglePlay}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-white
                text-black
                shadow-lg
                transition
                duration-200
                hover:scale-105
                active:scale-95
              "
            >
              {playing ? (
                <Pause size={15} fill="currentColor" />
              ) : (
                <Play size={15} fill="currentColor" />
              )}
            </button>

            <button
              onClick={nextTrack}
              className="
                hidden
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                text-white/45
                transition
                hover:bg-white/10
                hover:text-white
                sm:flex
              "
            >
              <SkipForward size={14} />
            </button>
          </div>
        </div>
      </LiquidGlass>
    </div>
  );
}

export default Player;
