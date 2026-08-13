function LiquidGlass({ children, className = "" }) {
  return (
    <>
      {/* SVG filter definition */}
      <svg
        className="pointer-events-none absolute h-0 w-0"
        aria-hidden="true"
      >
        <defs>
          <filter
            id="somewhere-liquid-glass"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.02"
              numOctaves="2"
              seed="8"
              result="noise"
            />

            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />

            <feGaussianBlur
              in="displaced"
              stdDeviation="1.5"
              result="blurred"
            />

            <feColorMatrix
              in="blurred"
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 1 0
              "
            />
          </filter>
        </defs>
      </svg>

      <div
        className={`liquid-glass ${className}`}
      >
        {/* refraction layer */}
        <div className="liquid-glass__refraction" />

        {/* highlight layer */}
        <div className="liquid-glass__highlight" />

        {/* content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </>
  );
}

export default LiquidGlass;