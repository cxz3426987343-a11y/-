import React, { useRef } from "react";
import "./BorderGlow.css";

export default function BorderGlow({ children, className = "" }) {
  const ref = useRef(null);

  function handlePointerMove(event) {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const edge = Math.min(x, y, rect.width - x, rect.height - y);
    const proximity = Math.max(0, Math.min(1, 1 - edge / 110));
    element.style.setProperty("--glow-strength", proximity.toFixed(3));
  }

  function reset() {
    ref.current?.style.setProperty("--glow-strength", ".18");
  }

  return (
    <div ref={ref} className={`borderGlow ${className}`.trim()} onPointerMove={handlePointerMove} onPointerLeave={reset}>
      <div className="borderGlowInner">{children}</div>
    </div>
  );
}
