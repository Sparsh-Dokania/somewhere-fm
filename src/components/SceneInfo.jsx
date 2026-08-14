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
    left-5
    top-16
    z-30
    max-w-[calc(100%-40px)]

    sm:left-7
    sm:top-20

    md:left-8
    md:top-24
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
    max-w-[340px]
    text-[30px]
    font-bold
    leading-[0.95]
    tracking-[-0.03em]

    sm:text-[38px]

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
    max-w-[280px]
    text-[10px]
    leading-relaxed
    text-white/55

    sm:max-w-[340px]
    sm:text-[11px]

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