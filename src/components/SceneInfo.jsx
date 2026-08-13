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
        left-6
        top-20
        z-30
        max-w-[calc(100%-48px)]
        md:left-10
        md:top-24
        md:max-w-[680px]
      "
    >
      {/* LOCATION / META */}

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
          text-white/60
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
    max-w-[680px]
    font-['Noto_Serif_Devanagari']
    text-[clamp(2.5rem,6vw,5.8rem)]
    font-semibold
    leading-[1.02]
    tracking-[-0.04em]
    text-white
    drop-shadow-[0_4px_24px_rgba(0,0,0,0.3)]
  "
>
        {scene.title}
      </h1>

      {/* DESCRIPTION */}

      <p
        className="
          mt-4
          max-w-[460px]
          text-[13px]
          font-medium
          leading-relaxed
          tracking-wide
          text-white/60
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