// src/components/SceneSelector.jsx

import OptionWheel from "./OptionWheel";

function SceneSelector({
  sceneIndex,
  totalScenes,
  scenes,
  onChangeScene,
}) {
  const items =
    scenes?.map((scene) => scene.title) ||
    Array.from(
      { length: totalScenes },
      (_, i) => `Scene ${i + 1}`
    );

  return (
    <div
      className="
        pointer-events-auto
        absolute
        bottom-[145px]
        left-0
        z-40
        h-[300px]
        w-[270px]

        sm:bottom-8
        sm:h-[360px]
        sm:w-[320px]

        md:bottom-8
        md:h-[400px]
        md:w-[360px]
      "
    >
      <OptionWheel
        items={items}

        /*
         * IMPORTANT:
         * Actual sceneIndex is always the selected wheel item.
         */
        defaultSelected={sceneIndex}

        textColor="rgba(255,255,255,0.30)"
        activeColor="#ffffff"

        side="left"

        fontSize={1.15}
        spacing={1.65}

        curve={1.1}
        tilt={6}

        blur={1.2}
        fade={0.24}
        minOpacity={0.04}

        smoothing={240}

        inset={24}

        loop={false}
        draggable={true}

        /*
         * Wheel itself is allowed to move only ONE scene
         * per scroll gesture.
         */
        onChange={(index) => {
          if (index !== sceneIndex) {
            onChangeScene(index);
          }
        }}

        className="h-full w-full"
      />
    </div>
  );
}

export default SceneSelector;