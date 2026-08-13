import { ChevronLeft, ChevronRight } from "lucide-react";

function SceneSelector({
  sceneIndex,
  totalScenes,
  onPrevious,
  onNext,
}) {
  return (
    <div className="absolute bottom-8 left-8 z-30 flex items-center gap-2">
      <button
        onClick={onPrevious}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white/70 backdrop-blur-md transition hover:bg-white/10 hover:text-white"
      >
        <ChevronLeft size={16} />
      </button>

      <div className="px-2 font-mono text-[10px] tracking-[0.2em] text-white/50">
        {String(sceneIndex + 1).padStart(2, "0")} /{" "}
        {String(totalScenes).padStart(2, "0")}
      </div>

      <button
        onClick={onNext}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white/70 backdrop-blur-md transition hover:bg-white/10 hover:text-white"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default SceneSelector;