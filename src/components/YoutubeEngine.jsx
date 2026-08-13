import { useEffect, useRef } from "react";

let youtubePromise = null;

function loadYouTubeAPI() {
  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  if (youtubePromise) {
    return youtubePromise;
  }

  youtubePromise = new Promise((resolve) => {
    const previousCallback = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      resolve(window.YT);
    };

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;

    document.head.appendChild(script);
  });

  return youtubePromise;
}

function YouTubeEngine({
  playlistId,
  playerRef,
  onReady,
  onStateChange,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function initialize() {
      const YT = await loadYouTubeAPI();

      if (cancelled || !containerRef.current) return;

      playerRef.current = new YT.Player(containerRef.current, {
        width: "200",
        height: "200",

        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          playsinline: 1,
          rel: 0,
        },

        events: {
          onReady,
          onStateChange,
        },
      });
    }

    initialize();

    return () => {
      cancelled = true;

      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
      }

      playerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const player = playerRef.current;

    if (!player || !playlistId) return;

    if (typeof player.loadPlaylist === "function") {
      player.loadPlaylist({
        listType: "playlist",
        list: playlistId,
        index: 0,
      });
    }
  }, [playlistId]);

  return (
    <div
      ref={containerRef}
      className="
        pointer-events-none
        fixed
        -left-[1000px]
        top-0
        h-[200px]
        w-[200px]
        opacity-0
      "
      aria-hidden="true"
    />
  );
}

export default YouTubeEngine;