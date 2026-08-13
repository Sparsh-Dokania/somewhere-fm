import { ChevronLeft, ChevronRight } from "lucide-react";

function SceneSelector({
  sceneIndex,
  totalScenes,
  onPrevious,
  onNext,
}) {
  return (
    <div
      className="
        absolute
        bottom-8
        left-6
        z-30
        flex
        items-center
        gap-2
        md:left-10
      "
    >
      <button
        type="button"
        onClick={onPrevious}
        aria-label="Previous scene"
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-full
          border
          border-white/10
          bg-black/10
          text-white/45
          backdrop-blur-md
          transition
          hover:bg-white/10
          hover:text-white
        "
      >
        <ChevronLeft size={14} />
      </button>

      <span
        className="
          min-w-[42px]
          text-center
          font-mono
          text-[8px]
          tracking-[0.2em]
          text-white/40
        "
      >
        {String(sceneIndex + 1).padStart(2, "0")}
        {" / "}
        {String(totalScenes).padStart(2, "0")}
      </span>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next scene"
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-full
          border
          border-white/10
          bg-black/10
          text-white/45
          backdrop-blur-md
          transition
          hover:bg-white/10
          hover:text-white
        "
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}

export default SceneSelector;