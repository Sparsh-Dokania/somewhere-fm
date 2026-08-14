// src/components/SceneInfo.jsx

import { useEffect, useState } from "react";

function SceneInfo({ scene }) {
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Rotate truck quotes every 4 seconds
  useEffect(() => {
    if (!scene.quotes?.length) {
      setQuoteIndex(0);
      return;
    }

    setQuoteIndex(0);

    const interval = setInterval(() => {
      setQuoteIndex((current) =>
        (current + 1) % scene.quotes.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [scene.id, scene.quotes]);

  const currentQuote =
    scene.quotes?.[quoteIndex];

  return (
   <div
  className="
    absolute
    left-4
    top-[calc(18px+env(safe-area-inset-top))]
    z-30
    max-w-[calc(100vw-32px)]

    sm:left-6
    sm:top-[calc(24px+env(safe-area-inset-top))]

    md:left-8
    md:top-[calc(28px+env(safe-area-inset-top))]
  "
>
      {/* LOCATION / META */}

      <div
        className="
          mb-4
          flex
          items-center
          gap-2
          font-mono
          text-[9px]
          uppercase
          tracking-[0.2em]
          text-white/60

          sm:text-[10px]
        "
      >
        <span>{scene.location}</span>

        <span className="text-white/20">
          ·
        </span>

        <span>SOMEWHERE</span>
      </div>

      {/* TITLE */}

    <h1
  className="
    max-w-[min(520px,calc(100vw-32px))]
    text-[clamp(38px,11.5vw,48px)]
    font-bold
    leading-[0.95]
    tracking-[-0.03em]

    sm:text-[46px]

    md:max-w-[600px]
    md:text-[56px]
  "
>
  {scene.title}
</h1>
      {/* DESCRIPTION */}

      <p
  className="
    mt-2
    max-w-[min(360px,calc(100vw-32px))]
    text-[clamp(11px,2.8vw,13px)]
    leading-relaxed
    text-white/55

    sm:max-w-[380px]
    sm:text-[12px]

    md:mt-3
    md:max-w-[500px]
    md:text-[13px]
  "
>
  {scene.description}
</p>
      {/* TRUCK QUOTE */}

      {currentQuote && (
        <div
          key={currentQuote}
          className="
            mt-8
            overflow-hidden
          "
        >
          <p
            className="
              animate-[quoteIn_.7s_ease-out]
              text-[13px]
              font-medium
              leading-[1.7]
              text-white/75
            "
          >
            {currentQuote}
          </p>
        </div>
      )}
    </div>
  );
}

export default SceneInfo;
