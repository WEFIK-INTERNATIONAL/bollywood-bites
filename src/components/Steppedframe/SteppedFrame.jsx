import Image from "next/image";
import clsx from "clsx";

// ─── Style maps ──────────────────────────────────────────────────────────────

const STEP_SIZES = {
  xs: "0.25em",
  sm: "0.375em", // Gymkhana default
  md: "0.625em",
  lg: "1em",
};

const BORDER_COLORS = {
  cream: { fg: "#fff1d6", bg: "#27372f" },
  gold:  { fg: "#b8975a", bg: "#27372f" },
  red:   { fg: "#66090f", bg: "#27372f" },
};

// ─── Clip-path helper ─────────────────────────────────────────────────────────

function steppedClip(size) {
  return {
    clipPath: `polygon(
      ${size} 0, calc(100% - ${size}) 0,
      calc(100% - ${size}) ${size}, 100% ${size},
      100% calc(100% - ${size}),
      calc(100% - ${size}) calc(100% - ${size}),
      calc(100% - ${size}) 100%, ${size} 100%,
      ${size} calc(100% - ${size}), 0 calc(100% - ${size}),
      0 ${size}, ${size} ${size}
    )`,
    position: "relative",
  };
}

// ─── SteppedFrame ─────────────────────────────────────────────────────────────
/**
 * @param {{ 
 *   children: React.ReactNode,
 *   stepSize?: "xs"|"sm"|"md"|"lg",
 *   borderColor?: "cream"|"gold"|"red",
 *   innerRing?: boolean,
 *   className?: string
 * }} props
 */
export function SteppedFrame({
  children,
  stepSize = "sm",
  borderColor = "cream",
  innerRing = true,
  className,
}) {
  const size = STEP_SIZES[stepSize];
  const { fg, bg } = BORDER_COLORS[borderColor];
  const clip = steppedClip(size);

  return (
    // Layer 1 — outer coloured ring
    <div
      className={clsx("stepped-frame-outer", className)}
      style={{ ...clip, backgroundColor: fg, padding: "5px", display: "block" }}
    >
      {/* covers inner area with bg, leaving hairline ring visible */}
      <div
        aria-hidden
        style={{ ...clip, backgroundColor: bg, position: "absolute", inset: "2px", zIndex: 0 }}
      />

      {innerRing ? (
        // Layer 2 — faint inner ring
        <div
          style={{
            ...steppedClip(size),
            backgroundColor: "rgba(255,241,214,0.2)",
            padding: "2px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            aria-hidden
            style={{ ...steppedClip(size), backgroundColor: bg, position: "absolute", inset: "1px", zIndex: 0 }}
          />
          {/* Layer 3 — content clip */}
          <div style={{ ...steppedClip(size), overflow: "hidden", position: "relative", zIndex: 1 }}>
            {children}
          </div>
        </div>
      ) : (
        // No inner ring — straight to content
        <div style={{ ...steppedClip(size), overflow: "hidden", position: "relative", zIndex: 1 }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ─── SteppedImage ─────────────────────────────────────────────────────────────
/**
 * @param {{
 *   src: string,
 *   alt: string,
 *   aspectClass?: string,
 *   frameProps?: object,
 *   [key: string]: any
 * }} props
 */
export function SteppedImage({
  src,
  alt,
  aspectClass = "aspect-video",
  frameProps = {},
  ...imgProps
}) {
  return (
    <SteppedFrame {...frameProps}>
      <div className={clsx("relative w-full", aspectClass)}>
        <Image fill className="object-cover" src={src} alt={alt} {...imgProps} />
      </div>
    </SteppedFrame>
  );
}

// ─── SteppedCard ─────────────────────────────────────────────────────────────
/**
 * @param {{
 *   children: React.ReactNode,
 *   frameProps?: object,
 *   className?: string,
 *   bg?: string
 * }} props
 */
export function SteppedCard({
  children,
  frameProps = {},
  className,
  bg = "#27372f",
}) {
  return (
    <SteppedFrame {...frameProps}>
      <div className={clsx("w-full", className)} style={{ backgroundColor: bg }}>
        {children}
      </div>
    </SteppedFrame>
  );
}