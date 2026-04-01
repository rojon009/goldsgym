"use client";

import React, { useEffect, useRef, type ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "green" | "red" | "orange";
  size?: "sm" | "md" | "lg";
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
} as const;

const sizeMap = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
} as const;

const GLOW_MEDIA = "(min-width: 768px)";

export function GlowCard({
  children,
  className = "",
  glowColor = "blue",
  size = "md",
  width,
  height,
  customSize = false,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia(GLOW_MEDIA);
    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;
      const el = cardRef.current;
      if (!el) return;
      el.style.setProperty("--x", x.toFixed(2));
      el.style.setProperty("--xp", (x / window.innerWidth).toFixed(2));
      el.style.setProperty("--y", y.toFixed(2));
      el.style.setProperty("--yp", (y / window.innerHeight).toFixed(2));
    };

    const applyListeners = () => {
      document.removeEventListener("pointermove", syncPointer);
      if (mq.matches) {
        document.addEventListener("pointermove", syncPointer);
      }
    };

    applyListeners();
    mq.addEventListener("change", applyListeners);
    return () => {
      mq.removeEventListener("change", applyListeners);
      document.removeEventListener("pointermove", syncPointer);
    };
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const getSizeClasses = () => {
    if (customSize) return "";
    return sizeMap[size];
  };

  const cssVars = (): React.CSSProperties & Record<string, string | number> => {
    const vars: React.CSSProperties & Record<string, string | number> = {
      "--base": base,
      "--spread": spread,
      "--radius": "14",
      "--border": "3",
      "--backdrop": "hsl(0 0% 60% / 0.12)",
      "--backup-border": "var(--backdrop)",
      "--size": "200",
      "--outer": "1",
    };
    if (width !== undefined) {
      vars.width = typeof width === "number" ? `${width}px` : width;
    }
    if (height !== undefined) {
      vars.height = typeof height === "number" ? `${height}px` : height;
    }
    return vars;
  };

  const spotlightStyles = `
    [data-spotlight-card] {
      --border-size: calc(var(--border, 2) * 1px);
      --spotlight-size: calc(var(--size, 150) * 1px);
      --hue: calc(var(--base) + (var(--xp, 0) * var(--spread, 0)));
      border: var(--border-size) solid var(--backup-border);
      background-color: var(--backdrop);
      position: relative;
      touch-action: manipulation;
    }

    [data-spotlight-card]::before,
    [data-spotlight-card]::after {
      content: none;
      display: none;
    }

    [data-spotlight-card] > [data-spotlight-inner] {
      display: none;
    }

    @media ${GLOW_MEDIA} {
      [data-spotlight-card] {
        background-image: radial-gradient(
          var(--spotlight-size) var(--spotlight-size) at
          calc(var(--x, 0) * 1px)
          calc(var(--y, 0) * 1px),
          hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
        );
        background-size:
          calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
        background-position: 50% 50%;
        background-attachment: fixed;
      }

      [data-spotlight-card]::before,
      [data-spotlight-card]::after,
      [data-spotlight-card] > [data-spotlight-inner]::before,
      [data-spotlight-card] > [data-spotlight-inner]::after {
        pointer-events: none;
        content: "";
        position: absolute;
        display: block;
        inset: calc(var(--border-size) * -1);
        border: var(--border-size) solid transparent;
        border-radius: calc(var(--radius) * 1px);
        background-attachment: fixed;
        background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
        background-repeat: no-repeat;
        background-position: 50% 50%;
        -webkit-mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
        -webkit-mask-clip: padding-box, border-box;
        -webkit-mask-composite: source-in;
        mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
        mask-clip: padding-box, border-box;
        mask-composite: intersect;
      }

      [data-spotlight-card]::before,
      [data-spotlight-card] > [data-spotlight-inner]::before {
        background-image: radial-gradient(
          calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
          calc(var(--x, 0) * 1px)
          calc(var(--y, 0) * 1px),
          hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
        );
        filter: brightness(2);
      }

      [data-spotlight-card]::after,
      [data-spotlight-card] > [data-spotlight-inner]::after {
        background-image: radial-gradient(
          calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
          calc(var(--x, 0) * 1px)
          calc(var(--y, 0) * 1px),
          hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
        );
      }

      [data-spotlight-card] > [data-spotlight-inner]::before {
        inset: -10px;
        border-width: 10px;
      }

      [data-spotlight-card] > [data-spotlight-inner] {
        display: block;
        position: absolute;
        inset: 0;
        will-change: filter;
        opacity: var(--outer, 1);
        border-radius: calc(var(--radius) * 1px);
        border-width: calc(var(--border-size) * 20);
        filter: blur(calc(var(--border-size) * 10));
        background: none;
        pointer-events: none;
        border: none;
      }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: spotlightStyles }} />
      <div
        ref={cardRef}
        data-spotlight-card
        style={cssVars()}
        className={`
          ${getSizeClasses()}
          ${!customSize ? "aspect-[3/4]" : ""}
          rounded-2xl
          relative
          grid
          grid-rows-[1fr_auto]
          shadow-[0_1rem_2rem_-1rem_black]
          p-4
          gap-4
          backdrop-blur-none md:backdrop-blur-[5px]
          ${className}
        `}
      >
        <div ref={innerRef} data-spotlight-inner />
        {children}
      </div>
    </>
  );
}
