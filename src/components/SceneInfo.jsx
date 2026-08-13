import Clock from "./Clock";

function SceneInfo({ scene }) {
  return (
    <div className="absolute left-6 top-20 z-30 md:left-10 md:top-24">

      <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/65">
        <Clock />

        <span className="text-white/30">·</span>

        <span>{scene.location}</span>
      </div>

      <h1 className="text-4xl font-light tracking-[-0.04em] text-white md:text-6xl">
        {scene.title}
      </h1>

      <p className="mt-3 text-sm text-white/55">
        {scene.description}
      </p>

    </div>
  );
}

export default SceneInfo;