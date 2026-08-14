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
        left-4
        bottom-[calc(136px+env(safe-area-inset-bottom))]
        z-[100]

        h-[182px]
        w-[268px]
        max-w-[calc(100vw-32px)]

        sm:bottom-[calc(126px+env(safe-area-inset-bottom))]
        sm:h-[184px]
        sm:w-[276px]

        md:bottom-7
        md:left-2
        md:h-[180px]
        md:w-[280px]
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

        fontSize={1.12}
        spacing={1.72}

        curve={1.05}
        tilt={6}

        blur={1.1}
        fade={0.22}
        minOpacity={0.08}

        smoothing={220}
        inset={22}

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
