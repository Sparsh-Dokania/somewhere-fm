// src/components/SceneSelector.jsx

import OptionWheel from "./OptionWheel";

function SceneSelector({ sceneIndex, totalScenes, scenes, onChangeScene }) {
  const items =
    scenes?.map((scene) => scene.title) ||
    Array.from({ length: totalScenes }, (_, i) => `Scene ${i + 1}`);

  return (
    <div
      className="
    absolute
    bottom-[calc(100px+env(safe-area-inset-bottom))]
    left-4
    z-40

    sm:bottom-[110px]
    sm:left-6

    md:bottom-8
    md:left-8
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
