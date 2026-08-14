// src/components/LiquidGlass.jsx

function LiquidGlass({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        liquid-glass
        relative
        isolate
        ${className}
      `}
    >
      {/* REFRACTION */}

      <div
        className="
          liquid-glass__refraction
          pointer-events-none
          absolute
          inset-0
          z-0
          overflow-hidden
          rounded-[inherit]
        "
      />

      {/* HIGHLIGHT */}

      <div
        className="
          liquid-glass__highlight
          pointer-events-none
          absolute
          inset-0
          z-0
          overflow-hidden
          rounded-[inherit]
        "
      />

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          min-w-0
        "
      >
        {children}
      </div>
    </div>
  );
}

export default LiquidGlass;