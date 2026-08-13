// src/components/Experience.jsx

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import Player from "./Player";
import SceneInfo from "./SceneInfo";
import SceneSelector from "./SceneSelector";
import YouTubeEngine from "./YouTubeEngine";

function Experience({
  scene,
  sceneIndex,
  totalScenes,
  onChangeScene,
}) {
  const backgroundRef = useRef(null);
  const contentRef = useRef(null);
  const youtubePlayer = useRef(null);

  const [youtubeReady, setYoutubeReady] =
    useState(false);

  const transitionRef = useRef(false);

  /*
   * ----------------------------------------
   * SEAMLESS SCENE TRANSITION
   * ----------------------------------------
   */

  const changeScene = (nextIndex) => {
    if (
      transitionRef.current ||
      nextIndex === sceneIndex
    ) {
      return;
    }

    transitionRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        transitionRef.current = false;
      },
    });

    /*
     * The whole scene doesn't disappear.
     *
     * We slightly:
     * - scale
     * - blur
     * - shift
     *
     * Then change the scene underneath.
     */

    tl.to(
      backgroundRef.current,
      {
        scale: 1.035,
        filter: "blur(5px)",
        duration: 0.28,
        ease: "power2.inOut",
      },
      0
    );

    tl.to(
      contentRef.current,
      {
        y: -4,
        opacity: 0.78,
        duration: 0.2,
        ease: "power2.inOut",
      },
      0
    );

    /*
     * CHANGE SCENE
     */

    tl.call(() => {
      onChangeScene(nextIndex);
    });

    /*
     * NEW SCENE SETTLES
     */

    tl.to(
      backgroundRef.current,
      {
        scale: 1,
        filter: "blur(0px)",
        duration: 0.65,
        ease: "power3.out",
      }
    );

    tl.to(
      contentRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.45,
        ease: "power3.out",
      },
      "-=0.5"
    );
  };

  /*
   * ----------------------------------------
   * SCENE NAVIGATION
   * ----------------------------------------
   */

  const previousScene = () => {
    const index =
      sceneIndex === 0
        ? totalScenes - 1
        : sceneIndex - 1;

    changeScene(index);
  };

  const nextScene = () => {
    const index =
      sceneIndex === totalScenes - 1
        ? 0
        : sceneIndex + 1;

    changeScene(index);
  };

  /*
   * ----------------------------------------
   * KEYBOARD
   * ----------------------------------------
   */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (
        event.key === "ArrowRight" ||
        event.key === "ArrowDown"
      ) {
        nextScene();
      }

      if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp"
      ) {
        previousScene();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  });

  /*
   * ----------------------------------------
   * LOAD SCENE PLAYLIST
   * ----------------------------------------
   */

  useEffect(() => {
    const player = youtubePlayer.current;

    if (
      !youtubeReady ||
      !player ||
      !scene.playlist?.playlistId
    ) {
      return;
    }

    player.loadPlaylist({
      listType: "playlist",
      list: scene.playlist.playlistId,
      index: 0,
    });

    player.pauseVideo();
  }, [
    scene.id,
    scene.playlist?.playlistId,
    youtubeReady,
  ]);

  /*
   * ----------------------------------------
   * YOUTUBE READY
   * ----------------------------------------
   */

  const handleYouTubeReady = (event) => {
    if (event?.target) {
      youtubePlayer.current =
        event.target;
    }

    setYoutubeReady(true);
  };

  return (
    <section
      className="
        relative
        h-full
        w-full
        overflow-hidden
        bg-black
        text-white
      "
    >

      {/* BACKGROUND */}

      <div
        ref={backgroundRef}
        className="
          absolute
          inset-0
          will-change-transform
        "
      >
        <picture>

          <source
            media="(max-width: 768px)"
            srcSet={scene.mobileImage}
          />

          <img
            src={scene.desktopImage}
            alt=""
            className="
              h-full
              w-full
              object-cover
            "
          />

        </picture>
      </div>

      {/* ATMOSPHERE */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-black/15
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-10
          bg-[radial-gradient(circle_at_50%_45%,transparent_25%,rgba(0,0,0,0.42)_100%)]
        "
      />

      {/* CONTENT */}

      <div
        ref={contentRef}
        className="
          relative
          z-20
          h-full
          w-full
          will-change-transform
        "
      >
        <SceneInfo scene={scene} />

        <Player
          scene={scene}
          youtubePlayer={youtubePlayer}
          youtubeReady={youtubeReady}
        />

        <SceneSelector
          sceneIndex={sceneIndex}
          totalScenes={totalScenes}
          onPrevious={previousScene}
          onNext={nextScene}
        />
      </div>

      {/* BRAND */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-5
          z-30
          -translate-x-1/2
        "
      >
        <p
          className="
            font-mono
            text-[9px]
            uppercase
            tracking-[0.4em]
            text-white/55
          "
        >
          SOMEWHERE.FM
        </p>
      </div>

      {/* YOUTUBE */}

      <YouTubeEngine
        playlistId={
          scene.playlist?.playlistId
        }
        playerRef={youtubePlayer}
        onReady={handleYouTubeReady}
      />

    </section>
  );
}

export default Experience;