// src/components/Experience.jsx

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";

import Player from "./Player";
import SceneInfo from "./SceneInfo";
import SceneSelector from "./SceneSelector";
import YouTubeEngine from "./YouTubeEngine";
import { scenes } from "../data/scenes";

function Experience({
  scene,
  sceneIndex,
  totalScenes,
  onChangeScene,
}) {
  const backgroundRef = useRef(null);
  const infoRef = useRef(null);
  const playerShellRef = useRef(null);

  const youtubePlayer = useRef(null);

  const transitionRef = useRef(false);
  const wheelLockRef = useRef(false);
  const touchStartRef = useRef(null);

  const [youtubeReady, setYoutubeReady] =
    useState(false);

  /*
   * ========================================
   * SCENE CHANGE
   * ========================================
   */

  const changeScene = useCallback(
    (nextIndex) => {
      if (
        transitionRef.current ||
        nextIndex === sceneIndex ||
        nextIndex < 0 ||
        nextIndex >= totalScenes
      ) {
        return;
      }

      transitionRef.current = true;

      const direction =
        nextIndex > sceneIndex ? 1 : -1;

      const tl = gsap.timeline({
        defaults: {
          overwrite: "auto",
        },

        onComplete: () => {
          transitionRef.current = false;
        },

        onInterrupt: () => {
          transitionRef.current = false;
        },
      });

      /*
       * Background
       */

      tl.to(
        backgroundRef.current,
        {
          scale: 1.025,
          xPercent: direction * -0.7,
          filter: "blur(2px)",
          duration: 0.28,
          ease: "power2.inOut",
        },
        0,
      );

      /*
       * Scene information
       */

      tl.to(
        infoRef.current,
        {
          opacity: 0,
          y: direction * -7,
          duration: 0.2,
          ease: "power2.in",
        },
        0,
      );

      /*
       * Player does NOT move with scene.
       *
       * This is important.
       * The player is a fixed piece of UI.
       */

      tl.to(
        playerShellRef.current,
        {
          opacity: 0.72,
          duration: 0.18,
          ease: "power2.in",
        },
        0,
      );

      /*
       * Change scene
       */

      tl.call(() => {
        onChangeScene(nextIndex);
      });

      /*
       * Background settles
       */

      tl.to(
        backgroundRef.current,
        {
          scale: 1,
          xPercent: 0,
          filter: "blur(0px)",
          duration: 0.65,
          ease: "power3.out",
        },
      );

      /*
       * Information returns
       */

      tl.fromTo(
        infoRef.current,
        {
          opacity: 0,
          y: direction * 8,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.42,
          ease: "power3.out",
        },
        "-=0.48",
      );

      /*
       * Player returns
       */

      tl.to(
        playerShellRef.current,
        {
          opacity: 1,
          duration: 0.32,
          ease: "power3.out",
        },
        "-=0.32",
      );
    },
    [
      onChangeScene,
      sceneIndex,
      totalScenes,
    ],
  );

  /*
   * ========================================
   * NEXT / PREVIOUS
   * ========================================
   */

  const previousScene = useCallback(() => {
    const index =
      sceneIndex <= 0
        ? totalScenes - 1
        : sceneIndex - 1;

    changeScene(index);
  }, [
    sceneIndex,
    totalScenes,
    changeScene,
  ]);

  const nextScene = useCallback(() => {
    const index =
      sceneIndex >= totalScenes - 1
        ? 0
        : sceneIndex + 1;

    changeScene(index);
  }, [
    sceneIndex,
    totalScenes,
    changeScene,
  ]);

  /*
   * ========================================
   * MOUSE WHEEL
   * ========================================
   */

  useEffect(() => {
    const handleWheel = (event) => {
      /*
       * Don't hijack wheel events happening
       * over the player or selector.
       */

      const target = event.target;

      if (
        target instanceof Element &&
        target.closest(
          "[data-somewhere-interactive='true']",
        )
      ) {
        return;
      }

      if (wheelLockRef.current) {
        return;
      }

      const delta =
        event.deltaMode === 1
          ? event.deltaY * 24
          : event.deltaY;

      if (Math.abs(delta) < 20) {
        return;
      }

      event.preventDefault();

      wheelLockRef.current = true;

      if (delta > 0) {
        nextScene();
      } else {
        previousScene();
      }

      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 700);
    };

    window.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      },
    );

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel,
      );
    };
  }, [
    nextScene,
    previousScene,
  ]);

  /*
   * ========================================
   * MOBILE TOUCH SWIPE
   * ========================================
   */

  useEffect(() => {
    const SWIPE_DISTANCE = 55;
    const MAX_TIME = 700;
    const LOCK_TIME = 750;

    const isInteractive = (target) => {
      if (!(target instanceof Element)) {
        return false;
      }

      return Boolean(
        target.closest(
          "[data-somewhere-interactive='true']",
        ),
      );
    };

    const handleTouchStart = (event) => {
      if (
        event.touches.length !== 1 ||
        isInteractive(event.target)
      ) {
        touchStartRef.current = null;
        return;
      }

      touchStartRef.current = {
        y: event.touches[0].clientY,
        time: Date.now(),
      };
    };

    const handleTouchEnd = (event) => {
      const start =
        touchStartRef.current;

      touchStartRef.current = null;

      if (
        !start ||
        wheelLockRef.current ||
        isInteractive(event.target)
      ) {
        return;
      }

      const endY =
        event.changedTouches[0].clientY;

      const distance =
        start.y - endY;

      const elapsed =
        Date.now() - start.time;

      if (
        Math.abs(distance) <
          SWIPE_DISTANCE ||
        elapsed > MAX_TIME
      ) {
        return;
      }

      wheelLockRef.current = true;

      if (distance > 0) {
        nextScene();
      } else {
        previousScene();
      }

      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, LOCK_TIME);
    };

    window.addEventListener(
      "touchstart",
      handleTouchStart,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "touchend",
      handleTouchEnd,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "touchstart",
        handleTouchStart,
      );

      window.removeEventListener(
        "touchend",
        handleTouchEnd,
      );
    };
  }, [
    nextScene,
    previousScene,
  ]);

  /*
   * ========================================
   * KEYBOARD
   * ========================================
   */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.target instanceof
          HTMLInputElement ||
        event.target instanceof
          HTMLTextAreaElement ||
        event.target instanceof
          HTMLButtonElement
      ) {
        return;
      }

      if (
        event.key === "ArrowRight" ||
        event.key === "ArrowDown"
      ) {
        event.preventDefault();
        nextScene();
      }

      if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp"
      ) {
        event.preventDefault();
        previousScene();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [
    nextScene,
    previousScene,
  ]);

  /*
   * ========================================
   * YOUTUBE READY
   * ========================================
   */

  const handleYouTubeReady =
    useCallback((event) => {
      if (event?.target) {
        youtubePlayer.current =
          event.target;
      }

      setYoutubeReady(true);
    }, []);

  return (
    <main
      className="
        fixed
        inset-0
        z-0
        h-[100dvh]
        min-h-[100dvh]
        w-full
        overflow-hidden
        bg-black
        text-white
        overscroll-none
      "
    >
      {/* ====================================
          BACKGROUND
      ==================================== */}

      <div
        ref={backgroundRef}
        className="
          absolute
          inset-0
          h-full
          w-full
          will-change-transform
        "
      >
        <picture className="block h-full w-full">
          <source
            media="(max-width: 768px)"
            srcSet={scene.mobileImage}
          />

          <img
            src={scene.desktopImage}
            alt=""
            draggable={false}
            className="
              block
              h-full
              w-full
              select-none
              object-cover
              object-center
            "
          />
        </picture>
      </div>

      {/* ====================================
          ATMOSPHERE
      ==================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-10
          bg-black/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-10
          bg-[radial-gradient(circle_at_50%_42%,transparent_18%,rgba(0,0,0,.48)_100%)]
        "
      />

      {/* ====================================
          SCENE CONTENT
      ==================================== */}

      <div
        className="
          relative
          z-20
          h-full
          w-full
        "
      >
        {/* INFO */}

        <div
          ref={infoRef}
          className="
            absolute
            inset-0
            h-full
            w-full
          "
        >
          <SceneInfo scene={scene} />
        </div>

        {/* ==================================
            SCENE SELECTOR
        ================================== */}

        <SceneSelector
          sceneIndex={sceneIndex}
          totalScenes={totalScenes}
          scenes={scenes}
          onChangeScene={changeScene}
        />
      </div>

      {/* ====================================
          BRAND
      ==================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[calc(12px+env(safe-area-inset-top))]
          z-50
          -translate-x-1/2
          whitespace-nowrap
        "
      >
        <p
          className="
            font-mono
            text-[7px]
            uppercase
            tracking-[0.45em]
            text-white/55
            sm:text-[8px]
            md:text-[9px]
          "
        >
          SOMEWHERE.FM
        </p>
      </div>

      {/* ====================================
          PLAYER
          
          EXPERIENCE OWNS POSITIONING.
          PLAYER COMPONENT OWNS UI ONLY.
      ==================================== */}

      <div
        ref={playerShellRef}
      
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-[80]
          flex
          w-full
          justify-center
          px-3
          pb-[calc(10px+env(safe-area-inset-bottom))]
          sm:px-4
          sm:pb-[calc(14px+env(safe-area-inset-bottom))]
          md:px-6
          md:pb-[calc(24px+env(safe-area-inset-bottom))]
        "
      >
        <div
          className="
            pointer-events-auto
            w-full
            max-w-[570px]
            
          "
        >
          <Player
            scene={scene}
            youtubePlayer={youtubePlayer}
            youtubeReady={youtubeReady}
          />
        </div>
      </div>

      {/* ====================================
          HIDDEN YOUTUBE ENGINE
      ==================================== */}

      <YouTubeEngine
        playlistId={
          scene.playlist?.playlistId
        }
        playerRef={youtubePlayer}
        onReady={handleYouTubeReady}
      />
    </main>
  );
}

export default Experience;