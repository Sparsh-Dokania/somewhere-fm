import { useEffect, useRef } from "react";
import gsap from "gsap";

import Player from "./Player";
import SceneInfo from "./SceneInfo";
import SceneSelector from "./SceneSelector";

function Experience({ scene, sceneIndex, totalScenes, onChangeScene }) {
  const backgroundRef = useRef(null);
  const contentRef = useRef(null);
  const transitionRef = useRef(false);

  const changeScene = (nextIndex) => {
    if (transitionRef.current || nextIndex === sceneIndex) return;

    transitionRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        transitionRef.current = false;
      },
    });

    tl.to(
      contentRef.current,
      {
        opacity: 0,
        y: 12,
        duration: 0.35,
        ease: "power2.in",
      },
      0,
    );

    tl.to(
      backgroundRef.current,
      {
        scale: 1.06,
        opacity: 0,
        duration: 0.45,
        ease: "power2.in",
      },
      0,
    );

    tl.call(() => {
      onChangeScene(nextIndex);
    });

    tl.fromTo(
      backgroundRef.current,
      {
        scale: 1.06,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      },
    );

    tl.fromTo(
      contentRef.current,
      {
        opacity: 0,
        y: -8,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power3.out",
      },
      "-=0.5",
    );
  };

  const previousScene = () => {
    const index = sceneIndex === 0 ? totalScenes - 1 : sceneIndex - 1;

    changeScene(index);
  };

  const nextScene = () => {
    const index = sceneIndex === totalScenes - 1 ? 0 : sceneIndex + 1;

    changeScene(index);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        nextScene();
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        previousScene();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <section className="relative h-full w-full overflow-hidden bg-black text-white">
      {/* BACKGROUND */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 will-change-transform"
      >
        <picture>
          <source media="(max-width: 768px)" srcSet={scene.mobileImage} />

          <img
            src={scene.desktopImage}
            alt=""
            className="h-full w-full object-cover"
          />
        </picture>
      </div>

      {/* ATMOSPHERE */}
      <div className="pointer-events-none absolute inset-0 bg-black/20" />
      <div
        className="
    pointer-events-none
    absolute
    inset-0
    z-10
    bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.45)_100%)]
  "
      />

      {/* CONTENT */}
      <div ref={contentRef} className="relative z-20 h-full w-full">
        <SceneInfo scene={scene} />

        <Player scene={scene} />

        <SceneSelector
          sceneIndex={sceneIndex}
          totalScenes={totalScenes}
          onPrevious={previousScene}
          onNext={nextScene}
        />
      </div>

      {/* BRAND */}
      <div className="pointer-events-none absolute left-1/2 top-5 z-30 -translate-x-1/2">
        <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/55">
          SOMEWHERE.FM
        </p>
      </div>
    </section>
  );
}

export default Experience;
