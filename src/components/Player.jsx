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
  const [playing, setPlaying] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  const [duration, setDuration] =
    useState(0);

  const [track, setTrack] =
    useState({
      title: "SOMEWHERE.FM",
      artist: "Waiting for signal...",
    });

  const [thumbnail, setThumbnail] =
    useState(null);

  const [changingTrack, setChangingTrack] =
    useState(false);

  const cdRef = useRef(null);
  const trackIndexRef = useRef(0);

  /*
   * ========================================
   * RESET
   * ========================================
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
      gsap.killTweensOf(
        cdRef.current,
      );

      gsap.set(
        cdRef.current,
        {
          rotation: 0,
        },
      );
    }
  }, [scene.id]);

  /*
   * ========================================
   * CD ROTATION
   * ========================================
   */

  useEffect(() => {
    if (!cdRef.current) {
      return;
    }

    gsap.killTweensOf(
      cdRef.current,
    );

    if (playing) {
      gsap.to(
        cdRef.current,
        {
          rotation: "+=360",
          duration: 4,
          ease: "none",
          repeat: -1,
        },
      );
    }

    return () => {
      if (cdRef.current) {
        gsap.killTweensOf(
          cdRef.current,
        );
      }
    };
  }, [playing]);

  /*
   * ========================================
   * YOUTUBE STATE
   * ========================================
   */

  useEffect(() => {
    if (!youtubeReady) {
      return;
    }

    const player =
      youtubePlayer?.current;

    if (!player) {
      return;
    }

    const update = () => {
      const YT = window.YT;

      const state =
        player.getPlayerState?.();

      if (YT?.PlayerState) {
        if (
          state ===
          YT.PlayerState.PLAYING
        ) {
          setPlaying(true);
          setChangingTrack(false);
        }

        if (
          state ===
            YT.PlayerState.PAUSED ||
          state ===
            YT.PlayerState.ENDED
        ) {
          setPlaying(false);
        }

        if (
          state ===
          YT.PlayerState.BUFFERING
        ) {
          setChangingTrack(true);
        }
      }

      const data =
        player.getVideoData?.();

      if (data?.video_id) {
        setTrack({
          title:
            data.title ||
            "Somewhere",
          artist:
            data.author ||
            "SOMEWHERE.FM",
        });

        setThumbnail(
          `https://i.ytimg.com/vi/${data.video_id}/hqdefault.jpg`,
        );
      }

      const playlistIndex =
        player.getPlaylistIndex?.();

      if (
        typeof playlistIndex ===
          "number" &&
        playlistIndex >= 0
      ) {
        trackIndexRef.current =
          playlistIndex;
      }

      const total =
        player.getDuration?.() || 0;

      const current =
        player.getCurrentTime?.() || 0;

      if (total > 0) {
        setDuration(total);

        setProgress(
          Math.min(
            100,
            (current / total) * 100,
          ),
        );
      }
    };

    update();

    const interval =
      window.setInterval(
        update,
        200,
      );

    return () =>
      window.clearInterval(
        interval,
      );
  }, [
    youtubeReady,
    scene.id,
    youtubePlayer,
  ]);

  /*
   * ========================================
   * PLAY / PAUSE
   * ========================================
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
      window.YT?.PlayerState
        ?.PLAYING
    ) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  /*
   * ========================================
   * PLAYLIST LENGTH
   * ========================================
   */

  const getPlaylistLength = () => {
    const player =
      youtubePlayer?.current;

    if (!player) {
      return 0;
    }

    const playlist =
      player.getPlaylist?.();

    return Array.isArray(playlist)
      ? playlist.length
      : 0;
  };

  /*
   * ========================================
   * NEXT
   * ========================================
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

    if (playlistLength > 0) {
      const currentIndex =
        player.getPlaylistIndex?.();

      if (
        typeof currentIndex ===
          "number" &&
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

      try {
        player.playVideoAt(
          nextIndex,
        );

        return;
      } catch {
        // Fall through.
      }
    }

    try {
      player.nextVideo?.();
    } catch (error) {
      console.error(
        "SOMEWHERE.FM next track failed:",
        error,
      );
    }
  };

  /*
   * ========================================
   * PREVIOUS
   * ========================================
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

    if (playlistLength > 0) {
      const currentIndex =
        player.getPlaylistIndex?.();

      if (
        typeof currentIndex ===
          "number" &&
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

      try {
        player.playVideoAt(
          previousIndex,
        );

        return;
      } catch {
        // Fall through.
      }
    }

    try {
      player.previousVideo?.();
    } catch (error) {
      console.error(
        "SOMEWHERE.FM previous track failed:",
        error,
      );
    }
  };

  /*
   * ========================================
   * TIME
   * ========================================
   */

  const formatTime = (
    seconds,
  ) => {
    if (
      !seconds ||
      !Number.isFinite(seconds)
    ) {
      return "0:00";
    }

    const minutes =
      Math.floor(seconds / 60);

    const secs =
      Math.floor(seconds % 60);

    return `${minutes}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const currentSeconds =
    duration > 0
      ? duration * (progress / 100)
      : 0;

  /*
   * ========================================
   * UI
   * ========================================
   */

  return (
    <div
      className="
        relative
        w-full
      "
    >
      <LiquidGlass
        className="
          w-full
          overflow-hidden
          rounded-[20px]
          px-2.5
          py-2.5

          sm:rounded-[22px]
          sm:px-3
          sm:py-2.5

          md:rounded-[25px]
          md:px-4
          md:py-3
        "
      >
        <div
          className="
            flex
            min-w-0
            items-center
            gap-2

            sm:gap-2.5

            md:gap-3
          "
        >
          {/* =================================
              COVER / CD
          ================================= */}

          <div
            ref={cdRef}
            className="
              relative
              h-12
              w-12
              shrink-0
              overflow-hidden
              rounded-full
              border
              border-white/20
              shadow-xl

              sm:h-14
              sm:w-14

              md:h-16
              md:w-16

              lg:h-[68px]
              lg:w-[68px]
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
                draggable={false}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  select-none
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
                bg-black/20
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                rounded-full
                opacity-35
              "
              style={{
                background:
                  "linear-gradient(135deg, transparent 30%, rgba(255,255,255,.8) 50%, transparent 70%)",
              }}
            />

            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-4
                w-4
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-white/40

                md:h-5
                md:w-5
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
                h-1
                w-1
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-black

                md:h-1.5
                md:w-1.5
              "
            />
          </div>

          {/* =================================
              TRACK INFORMATION
          ================================= */}

          <div
            className="
              min-w-0
              flex-1
            "
          >
            <div
              className="
                mb-0.5
                flex
                items-center
                gap-1.5
              "
            >
              <span
                className={`
                  h-1.5
                  w-1.5
                  shrink-0
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
                  truncate
                  font-mono
                  text-[7px]
                  uppercase
                  tracking-[0.16em]
                  text-white/35
                  sm:text-[8px]
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
                text-[11px]
                font-medium
                leading-tight
                text-white

                sm:text-[12px]

                md:text-[13px]
              "
            >
              {track.title}
            </p>

            <p
              className="
                mt-0.5
                truncate
                text-[9px]
                leading-tight
                text-white/50

                sm:text-[10px]

                md:text-[11px]
              "
            >
              {track.artist}
            </p>

            <div
              className="
                mt-2
                flex
                items-center
                gap-1.5

                sm:mt-2.5
                sm:gap-2
              "
            >
              <div
                className="
                  h-[2px]
                  min-w-0
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
                    duration-150
                  "
                  style={{
                    width:
                      `${progress}%`,
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
                  text-[8px]
                  text-white/40

                  sm:text-[9px]
                "
              >
                {formatTime(
                  currentSeconds,
                )}
              </span>
            </div>
          </div>

          {/* =================================
              CONTROLS
          ================================= */}

          <div
            className="
              flex
              shrink-0
              items-center
              gap-0

              sm:gap-0.5

              md:gap-1
            "
          >
            <button
              type="button"
              onClick={
                previousTrack
              }
              disabled={!youtubeReady}
              aria-label="Previous track"
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                text-white/50
                transition

                sm:h-9
                sm:w-9

                md:h-9
                md:w-9

                hover:bg-white/10
                hover:text-white
                active:scale-95
                disabled:pointer-events-none
                disabled:opacity-30
              "
            >
              <SkipBack
                size={14}
              />
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
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-white
                text-black
                shadow-lg
                transition
                duration-200

                sm:h-11
                sm:w-11

                md:h-11
                md:w-11

                hover:scale-105
                active:scale-95
                disabled:pointer-events-none
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
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                text-white/50
                transition

                sm:h-9
                sm:w-9

                md:h-9
                md:w-9

                hover:bg-white/10
                hover:text-white
                active:scale-95
                disabled:pointer-events-none
                disabled:opacity-30
              "
            >
              <SkipForward
                size={14}
              />
            </button>
          </div>
        </div>
      </LiquidGlass>
    </div>
  );
}

export default Player;