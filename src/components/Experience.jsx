import { useEffect, useRef } from "react";
import gsap from "gsap";

import Player from "./Player";
import SceneInfo from "./SceneInfo";
import SceneSelector from "./SceneSelector";

function Experience({
  scene,
  sceneIndex,
  totalScenes,
  onChangeScene,
}) {
  const backgroundRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      backgroundRef.current,
      {
        scale: 1.08,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      }
    );
  }, [sceneIndex]);

  const previousScene = () => {
    onChangeScene(
      sceneIndex === 0
        ? totalScenes - 1
        : sceneIndex - 1
    );
  };

  const nextScene = () => {
    onChangeScene(
      sceneIndex === totalScenes - 1
        ? 0
        : sceneIndex + 1
    );
  };

  return (
    <section className="relative h-full w-full overflow-hidden bg-black text-white">

      {/* BACKGROUND */}
      <div
        ref={backgroundRef}
        className="absolute inset-0"
      >
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet={scene.mobileImage}
          />

          <img
            src={scene.desktopImage}
            alt=""
            className="h-full w-full object-cover"
          />
        </picture>
      </div>

      {/* DARK ATMOSPHERIC OVERLAY */}
      <div className="absolute inset-0 bg-black/20" />

      {/* SCENE INFORMATION */}
      <SceneInfo scene={scene} />

      {/* PLAYER */}
      <Player scene={scene} />

      {/* SCENE SELECTOR */}
      <SceneSelector
        sceneIndex={sceneIndex}
        totalScenes={totalScenes}
        onPrevious={previousScene}
        onNext={nextScene}
      />
    </section>
  );
}

export default Experience;