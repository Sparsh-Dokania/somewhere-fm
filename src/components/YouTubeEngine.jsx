// src/components/YouTubeEngine.jsx

import {
  useEffect,
  useRef,
} from "react";

let youtubePromise = null;

function loadYouTubeAPI() {
  if (
    typeof window !== "undefined" &&
    window.YT?.Player
  ) {
    return Promise.resolve(
      window.YT,
    );
  }

  if (youtubePromise) {
    return youtubePromise;
  }

  youtubePromise =
    new Promise((resolve) => {
      const existingScript =
        document.querySelector(
          'script[src="https://www.youtube.com/iframe_api"]',
        );

      window.onYouTubeIframeAPIReady =
        () => {
          resolve(
            window.YT,
          );
        };

      if (existingScript) {
        return;
      }

      const script =
        document.createElement(
          "script",
        );

      script.src =
        "https://www.youtube.com/iframe_api";

      script.async = true;

      document.head.appendChild(
        script,
      );
    });

  return youtubePromise;
}

function YouTubeEngine({
  playlistId,
  playerRef,
  onReady,
}) {
  const containerRef =
    useRef(null);

  const initializedRef =
    useRef(false);

  const readyRef =
    useRef(false);

  /*
   * ========================================
   * CREATE PLAYER ONCE
   * ========================================
   */

  useEffect(() => {
    let cancelled = false;

    const initialize = async () => {
      const YT =
        await loadYouTubeAPI();

      if (
        cancelled ||
        !containerRef.current ||
        initializedRef.current
      ) {
        return;
      }

      initializedRef.current = true;

      new YT.Player(
        containerRef.current,
        {
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
            onReady: (event) => {
              if (cancelled) {
                return;
              }

              playerRef.current =
                event.target;

              readyRef.current =
                true;

              onReady?.(event);
            },
          },
        },
      );
    };

    initialize();

    return () => {
      cancelled = true;
    };
  }, [onReady, playerRef]);

  /*
   * ========================================
   * LOAD PLAYLIST
   * ========================================
   */

  useEffect(() => {
    const player =
      playerRef.current;

    if (
      !readyRef.current ||
      !player ||
      !playlistId
    ) {
      return;
    }

    if (
      typeof player.loadPlaylist !==
      "function"
    ) {
      return;
    }

    try {
      player.loadPlaylist({
        listType: "playlist",
        list: playlistId,
        index: 0,
      });

      player.pauseVideo?.();
    } catch (error) {
      console.error(
        "SOMEWHERE.FM playlist load failed:",
        error,
      );
    }
  }, [
    playlistId,
    playerRef,
  ]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        left-[-10000px]
        top-[-10000px]
        h-[200px]
        w-[200px]
        opacity-0
      "
    />
  );
}

export default YouTubeEngine;