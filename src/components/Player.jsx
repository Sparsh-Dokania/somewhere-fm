// src/components/Player.jsx

import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";
import LiquidGlass from "./LiquidGlass";

function Player({
  scene,
  youtubePlayer,
  youtubeReady,
}) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const [track, setTrack] = useState({
    title: "SOMEWHERE.FM",
    artist: "Waiting for signal...",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [changingTrack, setChangingTrack] =
    useState(false);

  const cdRef = useRef(null);

  /*
   * Keep our own playlist position.
   * This prevents navigation from depending
   * entirely on YouTube's getPlaylist().
   */
  const trackIndexRef = useRef(0);

  /*
   * ----------------------------------------
   * RESET WHEN SCENE CHANGES
   * ----------------------------------------
   */

  useEffect(() => {
    trackIndexRef.current = 0;

    setPlaying(false);
    setProgress(0);
    setDuration(0);
    setChangingTrack(false);

    setTrack({
      title: "SOMEWHERE.FM",
      artist: "Loading...",
    });

    setThumbnail(null);

    if (cdRef.current) {
      gsap.killTweensOf(cdRef.current);

      gsap.set(cdRef.current, {
        rotation: 0,
      });
    }
  }, [scene.id]);

  /*
   * ----------------------------------------
   * CD ROTATION
   * ----------------------------------------
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
   * ----------------------------------------
   * READ YOUTUBE STATE
   * ----------------------------------------
   */

  useEffect(() => {
    if (!youtubeReady) return;

    const player = youtubePlayer?.current;

    if (!player) return;

    const updatePlayer = () => {
      const YT = window.YT;

      /*
       * PLAYBACK STATE
       */

      const state =
        player.getPlayerState?.();

      if (YT?.PlayerState) {
        if (
          state === YT.PlayerState.PLAYING
        ) {
          setPlaying(true);
          setChangingTrack(false);
        }

        if (
          state === YT.PlayerState.PAUSED ||
          state === YT.PlayerState.ENDED
        ) {
          setPlaying(false);
        }

        if (
          state === YT.PlayerState.BUFFERING
        ) {
          setChangingTrack(true);
        }
      }

      /*
       * TRACK INFORMATION
       */

      const data =
        player.getVideoData?.();

      if (data?.video_id) {
        setTrack({
          title:
            data.title || "Somewhere",
          artist:
            data.author || "SOMEWHERE.FM",
        });

        setThumbnail(
          `https://i.ytimg.com/vi/${data.video_id}/hqdefault.jpg`
        );
      }

      /*
       * Keep our local index synchronized
       * with YouTube whenever possible.
       */

      const apiIndex =
        player.getPlaylistIndex?.();

      if (
        typeof apiIndex === "number" &&
        apiIndex >= 0
      ) {
        trackIndexRef.current = apiIndex;
      }

      /*
       * DURATION
       */

      const total =
        player.getDuration?.() || 0;

      if (total > 0) {
        setDuration(total);
      }

      /*
       * CURRENT POSITION
       */

      const current =
        player.getCurrentTime?.() || 0;

      if (total > 0) {
        setProgress(
          Math.min(
            100,
            (current / total) * 100
          )
        );
      }
    };

    updatePlayer();

    const interval = setInterval(
      updatePlayer,
      150
    );

    return () => {
      clearInterval(interval);
    };
  }, [
    youtubeReady,
    scene.id,
    youtubePlayer,
  ]);

  /*
   * ----------------------------------------
   * PLAY / PAUSE
   * ----------------------------------------
   */

  const togglePlay = () => {
    const player =
      youtubePlayer?.current;

    if (
      !player ||
      !youtubeReady
    ) {
      return;
    }

    const state =
      player.getPlayerState?.();

    if (
      state ===
      window.YT?.PlayerState?.PLAYING
    ) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  /*
   * ----------------------------------------
   * GET PLAYLIST LENGTH
   * ----------------------------------------
   */

  const getPlaylistLength = () => {
    const player =
      youtubePlayer?.current;

    if (!player) return 0;

    const playlist =
      player.getPlaylist?.();

    if (
      Array.isArray(playlist) &&
      playlist.length > 0
    ) {
      return playlist.length;
    }

    /*
     * YouTube sometimes temporarily
     * doesn't expose getPlaylist().
     *
     * Return 0 so we can use the native
     * nextVideo / previousVideo fallback.
     */

    return 0;
  };

  /*
   * ----------------------------------------
   * NEXT TRACK
   * ----------------------------------------
   */

  const nextTrack = () => {
    const player =
      youtubePlayer?.current;

    if (
      !player ||
      !youtubeReady
    ) {
      return;
    }

    setProgress(0);
    setChangingTrack(true);

    const playlistLength =
      getPlaylistLength();

    /*
     * CASE 1:
     * We know the playlist.
     *
     * Explicitly choose next index.
     */

    if (playlistLength > 0) {
      const currentIndex =
        player.getPlaylistIndex?.();

      if (
        typeof currentIndex === "number" &&
        currentIndex >= 0
      ) {
        trackIndexRef.current =
          currentIndex;
      }

      const nextIndex =
        trackIndexRef.current >=
        playlistLength - 1
          ? 0
          : trackIndexRef.current + 1;

      trackIndexRef.current =
        nextIndex;

      console.log(
        "SOMEWHERE.FM → NEXT",
        {
          current:
            currentIndex,
          next:
            nextIndex,
          total:
            playlistLength,
        }
      );

      try {
        player.playVideoAt(
          nextIndex
        );

        return;
      } catch (error) {
        console.warn(
          "playVideoAt failed, using nextVideo()",
          error
        );
      }
    }

    /*
     * CASE 2:
     * Playlist temporarily unavailable.
     *
     * Let YouTube handle navigation.
     */

    try {
      player.nextVideo();
    } catch (error) {
      console.error(
        "SOMEWHERE.FM next track failed:",
        error
      );
    }
  };

  /*
   * ----------------------------------------
   * PREVIOUS TRACK
   * ----------------------------------------
   */

  const previousTrack = () => {
    const player =
      youtubePlayer?.current;

    if (
      !player ||
      !youtubeReady
    ) {
      return;
    }

    setProgress(0);
    setChangingTrack(true);

    const playlistLength =
      getPlaylistLength();

    /*
     * CASE 1:
     * Explicit playlist navigation.
     */

    if (playlistLength > 0) {
      const currentIndex =
        player.getPlaylistIndex?.();

      if (
        typeof currentIndex === "number" &&
        currentIndex >= 0
      ) {
        trackIndexRef.current =
          currentIndex;
      }

      const previousIndex =
        trackIndexRef.current <= 0
          ? playlistLength - 1
          : trackIndexRef.current - 1;

      trackIndexRef.current =
        previousIndex;

      console.log(
        "SOMEWHERE.FM → PREVIOUS",
        {
          current:
            currentIndex,
          previous:
            previousIndex,
          total:
            playlistLength,
        }
      );

      try {
        player.playVideoAt(
          previousIndex
        );

        return;
      } catch (error) {
        console.warn(
          "playVideoAt failed, using previousVideo()",
          error
        );
      }
    }

    /*
     * CASE 2:
     * Playlist temporarily unavailable.
     */

    try {
      player.previousVideo();
    } catch (error) {
      console.error(
        "SOMEWHERE.FM previous track failed:",
        error
      );
    }
  };

  /*
   * ----------------------------------------
   * FORMAT TIME
   * ----------------------------------------
   */

  const formatTime = (seconds) => {
    if (
      !seconds ||
      Number.isNaN(seconds) ||
      !Number.isFinite(seconds)
    ) {
      return "0:00";
    }

    const mins =
      Math.floor(seconds / 60);

    const secs =
      Math.floor(seconds % 60);

    return `${mins}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const currentSeconds =
    duration > 0
      ? (duration * progress) / 100
      : 0;

  /*
   * ----------------------------------------
   * UI
   * ----------------------------------------
   */

  return (
    <div
      className="
        absolute
        bottom-7
        left-1/2
        z-40
        w-[calc(100%-32px)]
        max-w-[560px]
        -translate-x-1/2
        md:bottom-9
      "
    >
      <LiquidGlass
        className="
          min-h-[88px]
          rounded-[26px]
          px-4
          py-3
          md:px-5
          md:py-3.5
        "
      >
        <div className="flex items-center gap-4">

          {/* CD */}

          <div
            ref={cdRef}
            className="
              relative
              h-[68px]
              w-[68px]
              shrink-0
              overflow-hidden
              rounded-full
              border
              border-white/20
              shadow-2xl
            "
            style={{
              backgroundColor:
                "#151515",
            }}
          >
            {thumbnail && (
              <img
                src={thumbnail}
                alt=""
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                "
              />
            )}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                rounded-full
                bg-black/10
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                rounded-full
                opacity-30
              "
              style={{
                background: `
                  linear-gradient(
                    135deg,
                    transparent 30%,
                    rgba(255,255,255,.8) 50%,
                    transparent 70%
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
                border
                border-white/30
              "
              style={{
                backgroundColor:
                  scene.accent,
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

          {/* TRACK */}

          <div
            className="
              min-w-0
              flex-1
            "
          >
            <div
              className="
                mb-1
                flex
                items-center
                gap-1.5
              "
            >
              <span
                className={`
                  h-1.5
                  w-1.5
                  rounded-full
                  ${
                    playing
                      ? "animate-pulse"
                      : ""
                  }
                `}
                style={{
                  backgroundColor:
                    scene.accent,
                }}
              />

              <span
                className="
                  font-mono
                  text-[7px]
                  uppercase
                  tracking-[0.2em]
                  text-white/35
                "
              >
                {changingTrack
                  ? "Loading"
                  : playing
                  ? "Playing"
                  : "Paused"}
              </span>
            </div>

            <p
              className="
                truncate
                text-[13px]
                font-medium
                text-white
              "
            >
              {track.title}
            </p>

            <p
              className="
                mt-0.5
                truncate
                text-[11px]
                text-white/50
              "
            >
              {track.artist}
            </p>

            <div
              className="
                mt-3
                flex
                items-center
                gap-2
              "
            >
              <div
                className="
                  h-[2px]
                  flex-1
                  overflow-hidden
                  rounded-full
                  bg-white/15
                "
              >
                <div
                  className="
                    h-full
                    rounded-full
                    transition-[width]
                    duration-200
                  "
                  style={{
                    width: `${progress}%`,
                    backgroundColor:
                      scene.accent,
                    boxShadow:
                      `0 0 8px ${scene.accent}`,
                  }}
                />
              </div>

              <span
                className="
                  shrink-0
                  font-mono
                  text-[9px]
                  text-white/40
                "
              >
                {formatTime(
                  currentSeconds
                )}
              </span>
            </div>
          </div>

          {/* CONTROLS */}

          <div
            className="
              flex
              shrink-0
              items-center
              gap-1
            "
          >
            <button
              type="button"
              onClick={previousTrack}
              disabled={!youtubeReady}
              aria-label="Previous track"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                text-white/50
                transition
                hover:bg-white/10
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-30
              "
            >
              <SkipBack size={14} />
            </button>

            <button
              type="button"
              onClick={togglePlay}
              disabled={!youtubeReady}
              aria-label={
                playing
                  ? "Pause"
                  : "Play"
              }
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
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {playing ? (
                <Pause
                  size={15}
                  fill="currentColor"
                />
              ) : (
                <Play
                  size={15}
                  fill="currentColor"
                />
              )}
            </button>

            <button
              type="button"
              onClick={nextTrack}
              disabled={!youtubeReady}
              aria-label="Next track"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                text-white/50
                transition
                hover:bg-white/10
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-30
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