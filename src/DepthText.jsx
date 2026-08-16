import React, { useEffect, useRef } from "react";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function hexToRgb(value) {
  const hex = value.replace("#", "").trim();
  if (hex.length !== 6) return [17, 18, 15];
  return [
    Number.parseInt(hex.slice(0, 2), 16),
    Number.parseInt(hex.slice(2, 4), 16),
    Number.parseInt(hex.slice(4, 6), 16),
  ];
}

function mixColor(faceColor, depthColor, amount) {
  const [fr, fg, fb] = hexToRgb(faceColor);
  const [dr, dg, db] = hexToRgb(depthColor);
  const mix = (face, depth) => Math.round(face * (1 - amount) + depth * amount);
  return `rgb(${mix(fr, dr)}, ${mix(fg, dg)}, ${mix(fb, db)})`;
}

export default function DepthText({
  text,
  layers = 22,
  depth = 2.3,
  faceColor = "#11120f",
  depthColor = "#91b92d",
  tilt = 5,
  orbitSpeed = 0.22,
  fontSize = "clamp(76px, 9.6vw, 168px)",
  className = "",
}) {
  const rootRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return undefined;

    let raf = 0;
    const start = performance.now();
    const current = { x: -1.3, y: 2 };
    const target = { x: -1.3, y: 2 };

    const move = (event) => {
      const rect = root.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = clamp((event.clientX - rect.left - rect.width / 2) / (rect.width * 0.8), -1, 1);
      const y = clamp((event.clientY - rect.top - rect.height / 2) / (rect.height * 0.8), -1, 1);
      target.x = -1.3 - y * tilt;
      target.y = 2 + x * tilt;
    };
    const leave = () => {
      target.x = -1.3;
      target.y = 2;
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerleave", leave);

    const tick = (now) => {
      const seconds = (now - start) / 1000;
      target.x += Math.sin(seconds * orbitSpeed) * 0.12;
      target.y += Math.cos(seconds * orbitSpeed * 0.82) * 0.16;
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      stage.style.transform = `rotateX(${current.x.toFixed(2)}deg) rotateY(${current.y.toFixed(2)}deg)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
    };
  }, [orbitSpeed, tilt]);

  const safeLayers = clamp(Math.round(layers), 8, 40);
  return (
    <span
      ref={rootRef}
      className={`depthText ${className}`.trim()}
      style={{ "--depthTextSize": fontSize, "--depthTextDepth": `${depth}px` }}
    >
      <span ref={stageRef} className="depthTextStage">
        {Array.from({ length: safeLayers }, (_, index) => {
          const distance = safeLayers - index;
          return (
            <span
              aria-hidden="true"
              className="depthTextLayer"
              key={distance}
              style={{
                color: mixColor(faceColor, depthColor, Math.min(0.86, distance / safeLayers)),
                transform: `translateZ(${-distance * depth}px)`,
              }}
            >
              {text}
            </span>
          );
        })}
        <span className="depthTextFace">{text}</span>
      </span>
    </span>
  );
}
