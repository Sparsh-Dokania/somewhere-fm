// src/components/SceneInfo.jsx

import {
  useEffect,
  useState,
} from "react";

function SceneInfo({ scene }) {
  const [quoteIndex, setQuoteIndex] =
    useState(0);

  useEffect(() => {
    if (!scene.quotes?.length) {
      setQuoteIndex(0);
      return;
    }

    setQuoteIndex(0);

    const interval =
      window.setInterval(() => {
        setQuoteIndex(
          (current) =>
            (current + 1) %
            scene.quotes.length,
        );
      }, 4000);

    return () =>
      window.clearInterval(
        interval,
      );
  }, [
    scene.id,
    scene.quotes,
  ]);

  const currentQuote =
    scene.quotes?.[quoteIndex];

  return (
    <div
      className="
        absolute
        left-4
        top-[calc(58px+env(safe-area-inset-top))]
        z-30
        max-w-[calc(100%-32px)]

        sm:left-60
        sm:top-[calc(72px+env(safe-area-inset-top))]
        sm:max-w-[520px]

        md:left-8
        md:top-[calc(86px+env(safe-area-inset-top))]
        md:max-w-[600px]

        lg:left-10
        lg:top-[calc(94px+env(safe-area-inset-top))]
      "
    >
      {/* META */}

      <div
        className="
          mb-4
          flex
          items-center
          gap-2
          font-mono
          text-[9px]
          uppercase
          tracking-[0.18em]
          text-white/60

          sm:mb-4
          sm:text-[10px]

          md:mb-5
          md:text-[9px]
        "
      >
        <span
          className="
            h-1.5
            w-1.5
            rounded-full
            bg-white/70
          "
        />

        <span>
          {scene.location}
        </span>

        <span className="text-white/20">
          ·
        </span>

        <span>
          SOMEWHERE
        </span>
      </div>

      {/* TITLE */}

      <h1
        className="
          text-[42px]
          font-bold
          leading-[0.92]
          tracking-[-0.045em]
          text-white

          sm:text-[48px]

          md:text-[62px]

          lg:text-[72px]
        "
      >
        {scene.title}
      </h1>

      {/* DESCRIPTION */}

      <p
        className="
          mt-3.5
          max-w-[320px]
          text-[12px]
          leading-[1.55]
          text-white/55

          sm:mt-3.5
          sm:max-w-[380px]
          sm:text-[13px]

          md:mt-4
          md:max-w-[500px]
          md:text-[13px]
        "
      >
        {scene.description}
      </p>

      {/* QUOTE */}

      {currentQuote && (
        <div
          key={currentQuote}
          className="
            mt-6
            max-w-[300px]
            overflow-hidden

            sm:mt-7
            sm:max-w-[340px]

            md:mt-8
            md:max-w-[380px]
          "
        >
          <p
            className="
              animate-[quoteIn_.7s_ease-out]
              text-[11px]
              font-medium
              leading-[1.6]
              text-white/65

              sm:text-[12px]

              md:text-[13px]
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
