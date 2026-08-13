function SceneInfo({ scene }) {
  return (
    <div className="absolute left-6 top-6 z-20 md:left-10 md:top-10">
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
        {scene.time} · {scene.location}
      </p>

      <h1 className="text-3xl font-light tracking-tight md:text-5xl">
        {scene.title}
      </h1>

      <p className="mt-2 text-sm text-white/60">
        {scene.description}
      </p>
    </div>
  );
}

export default SceneInfo;