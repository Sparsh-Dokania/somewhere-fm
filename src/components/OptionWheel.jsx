// src/components/OptionWheel.jsx

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const OptionWheel = ({
  items = [],
  defaultSelected = 0,
  onChange,

  textColor = "#a6a6a6",
  activeColor = "#ffffff",

  side = "left",

  fontSize = 1.1,
  spacing = 1.5,
  curve = 1,
  tilt = 6,

  blur = 1.2,
  fade = 0.24,
  minOpacity = 0.05,

  smoothing = 220,
  inset = 16,

  loop = false,
  draggable = true,

  soundUrl = "",
  soundVolume = 0.5,

  className = "",
}) => {
  const rootRef = useRef(null);
  const itemRefs = useRef([]);

  const posRef =
    useRef(defaultSelected);

  const targetRef =
    useRef(defaultSelected);

  const rafRef = useRef(null);
  const lastRef = useRef(0);

  const cfgRef = useRef({});
  const onChangeRef =
    useRef(onChange);

  const selectedRef =
    useRef(defaultSelected);

  const audioRef = useRef(null);
  const audioUrlRef = useRef("");
  const lastTickRef = useRef(0);

  const wheelLockRef =
    useRef(false);

  const dragRef = useRef(null);
  const dragMovedRef =
    useRef(false);

  const [selectedIndex, setSelectedIndex] =
    useState(defaultSelected);

  const [isDragging, setIsDragging] =
    useState(false);

  /*
   * ========================================
   * CONFIG
   * ========================================
   */

  const remPx =
    typeof window !== "undefined"
      ? parseFloat(
          getComputedStyle(
            document.documentElement,
          ).fontSize,
        ) || 16
      : 16;

  onChangeRef.current = onChange;

  cfgRef.current = {
    count: items.length,
    items,

    rowH: Math.max(
      fontSize *
        spacing *
        remPx,
      1,
    ),

    curve,
    tilt,
    blur,
    fade,
    minOpacity,

    side,
    loop,
    smoothing,
    draggable,

    soundUrl,
    soundVolume,

    textColor,
    activeColor,
  };

  /*
   * ========================================
   * RENDER LOOP
   * ========================================
   */

  const runFrame = useCallback(
    (now) => {
      const dt = Math.min(
        (now -
          lastRef.current) /
          1000,
        0.05,
      );

      lastRef.current = now;

      const cfg =
        cfgRef.current;

      const tau =
        Math.max(
          cfg.smoothing,
          1,
        ) / 1000;

      const k =
        1 -
        Math.exp(
          -dt / tau,
        );

      const target =
        targetRef.current;

      const current =
        posRef.current;

      let next =
        current +
        (target - current) *
          k;

      const settled =
        Math.abs(
          target - next,
        ) < 0.001;

      if (settled) {
        next = target;
      }

      posRef.current = next;

      const elements =
        itemRefs.current;

      const count =
        cfg.count;

      const mirror =
        cfg.side === "right"
          ? -1
          : 1;

      const tiltRad =
        (cfg.tilt *
          Math.PI) /
        180;

      const radius =
        tiltRad > 0.0005
          ? cfg.rowH / tiltRad
          : 0;

      for (
        let i = 0;
        i < count;
        i++
      ) {
        const el =
          elements[i];

        if (!el) continue;

        let d =
          i - next;

        if (
          cfg.loop &&
          count > 1
        ) {
          d =
            ((d % count) +
              count) %
            count;

          if (
            d >
            count / 2
          ) {
            d -= count;
          }
        }

        const distance =
          Math.abs(d);

        let x = 0;
        let y =
          d * cfg.rowH;
        let rotation = 0;

        if (radius > 0) {
          const angle =
            Math.max(
              -Math.PI / 2,
              Math.min(
                Math.PI / 2,
                d * tiltRad,
              ),
            );

          y =
            radius *
            Math.sin(angle);

          x =
            -mirror *
            radius *
            (1 -
              Math.cos(
                angle,
              )) *
            cfg.curve;

          rotation =
            (mirror *
              angle *
              180) /
            Math.PI;
        }

        /*
         * POSITION
         */

        el.style.transform =
          `translate(${x.toFixed(
            2,
          )}px, calc(${y.toFixed(
            2,
          )}px - 50%)) rotate(${rotation.toFixed(
            3,
          )}deg)`;

        /*
         * OPACITY
         */

        const opacity =
          Math.max(
            cfg.minOpacity,
            1 -
              distance *
                cfg.fade,
          );

        el.style.opacity =
          String(opacity);

        /*
         * BLUR
         */

        el.style.filter =
          cfg.blur > 0
            ? `blur(${(
                distance *
                cfg.blur
              ).toFixed(
                2,
              )}px)`
            : "none";

        /*
         * POSITION PROGRESS
         */

        el.style.setProperty(
          "--ow-p",
          Math.max(
            0,
            1 -
              Math.min(
                distance,
                1,
              ),
          ).toFixed(4),
        );
      }

      rafRef.current =
        settled
          ? null
          : requestAnimationFrame(
              runFrame,
            );
    },
    [],
  );

  const startLoop =
    useCallback(() => {
      if (
        rafRef.current !==
        null
      ) {
        cancelAnimationFrame(
          rafRef.current,
        );
      }

      lastRef.current =
        performance.now();

      rafRef.current =
        requestAnimationFrame(
          runFrame,
        );
    }, [runFrame]);

  /*
   * ========================================
   * OPTIONAL TICK SOUND
   * ========================================
   */

  const playTick =
    useCallback(() => {
      const {
        soundUrl,
        soundVolume,
      } = cfgRef.current;

      if (!soundUrl) {
        return;
      }

      const now =
        performance.now();

      if (
        now -
          lastTickRef.current <
        70
      ) {
        return;
      }

      lastTickRef.current =
        now;

      if (
        !audioRef.current ||
        audioUrlRef.current !==
          soundUrl
      ) {
        audioRef.current =
          new Audio(
            soundUrl,
          );

        audioRef.current.preload =
          "auto";

        audioUrlRef.current =
          soundUrl;
      }

      const audio =
        audioRef.current;

      audio.volume =
        Math.min(
          Math.max(
            soundVolume,
            0,
          ),
          1,
        );

      audio.currentTime = 0;

      audio
        .play()
        ?.catch(() => {});
    }, []);

  /*
   * ========================================
   * CHANGE TARGET
   * ========================================
   */

  const applyTarget =
    useCallback(
      (value, snap) => {
        const cfg =
          cfgRef.current;

        if (!cfg.count) {
          return;
        }

        let nextValue =
          value;

        if (!cfg.loop) {
          nextValue =
            Math.min(
              Math.max(
                nextValue,
                0,
              ),
              Math.max(
                cfg.count - 1,
                0,
              ),
            );
        }

        if (snap) {
          nextValue =
            Math.round(
              nextValue,
            );
        }

        targetRef.current =
          nextValue;

        const index =
          ((Math.round(
            nextValue,
          ) %
            cfg.count) +
            cfg.count) %
          cfg.count;

        if (
          index !==
          selectedRef.current
        ) {
          selectedRef.current =
            index;

          setSelectedIndex(
            index,
          );

          onChangeRef.current?.(
            index,
            cfg.items[index],
          );

          playTick();
        }

        startLoop();
      },
      [
        playTick,
        startLoop,
      ],
    );

  /*
   * ========================================
   * WHEEL
   * ========================================
   */

  useEffect(() => {
    const element =
      rootRef.current;

    if (!element) {
      return;
    }

    const handleWheel =
      (event) => {
        event.preventDefault();

        if (
          wheelLockRef.current
        ) {
          return;
        }

        const delta =
          event.deltaMode ===
          1
            ? event.deltaY *
              24
            : event.deltaY;

        if (
          Math.abs(delta) <
          8
        ) {
          return;
        }

        wheelLockRef.current =
          true;

        const direction =
          delta > 0
            ? 1
            : -1;

        applyTarget(
          Math.round(
            targetRef.current,
          ) + direction,
          true,
        );

        window.setTimeout(
          () => {
            wheelLockRef.current =
              false;
          },
          450,
        );
      };

    element.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      },
    );

    return () => {
      element.removeEventListener(
        "wheel",
        handleWheel,
      );
    };
  }, [applyTarget]);

  /*
   * ========================================
   * DRAG
   * ========================================
   */

  const handlePointerDown =
    useCallback(
      (event) => {
        if (
          !cfgRef.current
            .draggable
        ) {
          return;
        }

        dragRef.current = {
          y: event.clientY,
          start:
            targetRef.current,
          id: event.pointerId,
        };

        dragMovedRef.current =
          false;

        setIsDragging(true);
      },
      [],
    );

  const handlePointerMove =
    useCallback(
      (event) => {
        const drag =
          dragRef.current;

        if (!drag) {
          return;
        }

        const dy =
          event.clientY -
          drag.y;

        if (
          !dragMovedRef.current &&
          Math.abs(dy) > 4
        ) {
          dragMovedRef.current =
            true;

          rootRef.current?.setPointerCapture(
            drag.id,
          );
        }

        if (
          dragMovedRef.current
        ) {
          applyTarget(
            drag.start -
              dy /
                cfgRef.current
                  .rowH,
            false,
          );
        }
      },
      [applyTarget],
    );

  const handlePointerEnd =
    useCallback(() => {
      if (!dragRef.current) {
        return;
      }

      dragRef.current = null;

      setIsDragging(false);

      if (
        dragMovedRef.current
      ) {
        applyTarget(
          targetRef.current,
          true,
        );
      }
    }, [applyTarget]);

  /*
   * ========================================
   * CLICK
   * ========================================
   */

  const handleItemClick =
    useCallback(
      (index) => {
        if (
          dragMovedRef.current
        ) {
          return;
        }

        const cfg =
          cfgRef.current;

        const current =
          targetRef.current;

        let distance =
          index -
          (((current %
            cfg.count) +
            cfg.count) %
            cfg.count);

        if (
          cfg.loop &&
          cfg.count > 1
        ) {
          if (
            distance >
            cfg.count / 2
          ) {
            distance -=
              cfg.count;
          } else if (
            distance <
            -cfg.count / 2
          ) {
            distance +=
              cfg.count;
          }
        }

        applyTarget(
          current + distance,
          true,
        );
      },
      [applyTarget],
    );

  /*
   * ========================================
   * KEYBOARD
   * ========================================
   */

  const handleKeyDown =
    useCallback(
      (event) => {
        let delta = null;

        if (
          event.key ===
            "ArrowUp" ||
          event.key ===
            "ArrowLeft"
        ) {
          delta = -1;
        }

        if (
          event.key ===
            "ArrowDown" ||
          event.key ===
            "ArrowRight"
        ) {
          delta = 1;
        }

        if (delta === null) {
          return;
        }

        event.preventDefault();

        applyTarget(
          Math.round(
            targetRef.current,
          ) + delta,
          true,
        );
      },
      [applyTarget],
    );

  /*
   * ========================================
   * SYNC
   * ========================================
   */

  useEffect(() => {
    applyTarget(
      targetRef.current,
      false,
    );
  }, [
    items,
    fontSize,
    spacing,
    curve,
    tilt,
    blur,
    fade,
    minOpacity,
    side,
    loop,
    smoothing,
    applyTarget,
  ]);

  /*
   * ========================================
   * CLEANUP
   * ========================================
   */

  useEffect(() => {
    return () => {
      if (
        rafRef.current !==
        null
      ) {
        cancelAnimationFrame(
          rafRef.current,
        );
      }

      audioRef.current?.pause();
    };
  }, []);

  /*
   * ========================================
   * RENDER
   * ========================================
   */

  return (
    <div
      ref={rootRef}
      role="listbox"
      tabIndex={0}
      aria-label="Scene selector"
      className={`
        relative
        h-full
        w-full
        select-none
        overflow-visible
        outline-none
        [touch-action:none]

        ${
          isDragging
            ? "cursor-grabbing"
            : "cursor-grab"
        }

        ${className}
      `}
      style={{
        "--ow-text-color":
          textColor,

        "--ow-active-color":
          activeColor,

        "--ow-font-size":
          `${fontSize}rem`,

        "--ow-inset":
          `${inset}px`,
      }}
      onPointerDown={
        handlePointerDown
      }
      onPointerMove={
        handlePointerMove
      }
      onPointerUp={
        handlePointerEnd
      }
      onPointerCancel={
        handlePointerEnd
      }
      onKeyDown={
        handleKeyDown
      }
    >
      {items.map(
        (label, index) => {
          const isSelected =
            selectedIndex ===
            index;

          return (
            <div
              key={`${label}-${index}`}
              ref={(element) => {
                itemRefs.current[
                  index
                ] = element;
              }}
              role="option"
              aria-selected={
                isSelected
              }
              className="
                absolute
                top-1/2
                whitespace-nowrap
                leading-none
                will-change-[transform,opacity,filter]
              "
              style={{
                fontSize:
                  `${fontSize}rem`,

                color:
                  isSelected
                    ? activeColor
                    : textColor,

                fontWeight:
                  isSelected
                    ? 600
                    : 400,

                left:
                  side ===
                  "left"
                    ? `${inset}px`
                    : undefined,

                right:
                  side ===
                  "right"
                    ? `${inset}px`
                    : undefined,

                transformOrigin:
                  side ===
                  "right"
                    ? "right center"
                    : "left center",

                textShadow:
                  isSelected
                    ? "0 1px 14px rgba(0,0,0,.45)"
                    : "0 1px 8px rgba(0,0,0,.35)",

                zIndex:
                  isSelected
                    ? 10
                    : 1,
              }}
              onClick={() =>
                handleItemClick(
                  index,
                )
              }
            >
              {label}
            </div>
          );
        },
      )}
    </div>
  );
};

export default OptionWheel;