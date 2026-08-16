import React, { useEffect, useRef, useState } from "react";

export default function FoldText({
  text,
  color = "#93bd27",
  fontSize = "clamp(54px, 6.2vw, 98px)",
  stagger = 0.055,
  className = "",
}) {
  const rootRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <span
      ref={rootRef}
      className={`foldText ${ready ? "isReady" : ""} ${className}`.trim()}
      style={{ "--foldTextColor": color, "--foldTextSize": fontSize }}
      aria-label={text}
    >
      {Array.from(text).map((char, index) => (
        <span
          className="foldTextSegment"
          key={`${char}-${index}`}
          style={{ "--foldDelay": `${index * stagger}s` }}
          aria-hidden="true"
        >
          <span className="foldTextPiece">{char}</span>
        </span>
      ))}
    </span>
  );
}
