import { useState } from "react";
import { scenes } from "./data/scenes";
import Experience from "./components/Experience";

function App() {
  const [activeScene, setActiveScene] = useState(0);

  return (
    <main className="min-h-[100dvh] w-screen overflow-hidden bg-black">
      <Experience
        scene={scenes[activeScene]}
        sceneIndex={activeScene}
        totalScenes={scenes.length}
        onChangeScene={setActiveScene}
      />
    </main>
  );
}

export default App;
