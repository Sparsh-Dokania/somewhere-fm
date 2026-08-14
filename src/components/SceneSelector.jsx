// src/components/SceneSelector.jsx

import OptionWheel from "./OptionWheel";

function SceneSelector({
  sceneIndex,
  totalScenes,
  scenes,
  onChangeScene,
}) {
  const items =
    scenes?.map(
      (scene) => scene.title,
    ) ||
    Array.from(
      {
        length: totalScenes,
      },
      (_, index) =>
        `Scene ${index + 1}`,
    );

  return (
    <div
      data-somewhere-interactive="true"
      className="
        pointer-events-auto
        absolute
        left-0
        bottom-[calc(105px+env(safe-area-inset-bottom))]
        z-[100]

        h-[150px]
        w-[210px]

        sm:bottom-[calc(115px+env(safe-area-inset-bottom))]
        sm:h-[160px]
        sm:w-[240px]

        md:bottom-7
        md:left-2
        md:h-[175px]
        md:w-[270px]
      "
    >
      <OptionWheel
        items={items}
        defaultSelected={
          sceneIndex
        }
        textColor="rgba(255,255,255,0.34)"
        activeColor="#ffffff"
        side="left"

        fontSize={1.05}
        spacing={1.55}

        curve={1.05}
        tilt={6}

        blur={1.1}
        fade={0.22}
        minOpacity={0.08}

        smoothing={220}
        inset={18}

        loop={false}
        draggable={true}

        onChange={(index) => {
          if (
            index !== sceneIndex
          ) {
            onChangeScene(index);
          }
        }}

        className="
          h-full
          w-full
        "
      />
    </div>
  );
}

export default SceneSelector;