// src/components/SceneInfo.jsx

function SceneInfo({ scene }) {
  return (
    <div
      className="
        absolute
        left-6
        top-20
        z-30
        max-w-[calc(100%-48px)]
        md:left-10
        md:top-24
        md:max-w-[650px]
      "
    >
      {/* META */}

      <div
        className="
          mb-5
          flex
          items-center
          gap-2
          font-mono
          text-[8px]
          uppercase
          tracking-[0.2em]
          text-white/55
        "
      >
        <span>
          {scene.location}
        </span>

        <span className="text-white/20">
          ·
        </span>

        <span>
          {scene.id === "truck"
            ? "रात का सफ़र"
            : "SOMEWHERE"}
        </span>
      </div>

      {/* TITLE */}

      <h1
        className="
          max-w-[620px]
          text-[clamp(2.4rem,6vw,5.8rem)]
          font-light
          leading-[1.02]
          tracking-[-0.045em]
          text-white
          drop-shadow-[0_3px_20px_rgba(0,0,0,0.25)]
        "
      >
        {scene.title}
      </h1>

      {/* DESCRIPTION */}

      <p
        className="
          mt-4
          text-[13px]
          font-light
          tracking-wide
          text-white/55
        "
      >
        {scene.description}
      </p>

      {/* TRUCK LITERATURE */}

      {scene.quotes?.length > 0 && (
        <div
          className="
            mt-7
            max-w-[420px]
          "
        >
          <p
            className="
              font-medium
              text-[13px]
              leading-[1.7]
              text-white/75
            "
          >
            {scene.quotes[0]}
          </p>
        </div>
      )}
    </div>
  );
}

export default SceneInfo;