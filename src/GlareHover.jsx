import React from "react";
import "./GlareHover.css";

export default function GlareHover({
  children,
  glareColor = "#ffffff",
  glareOpacity = 0.24,
  glareAngle = -30,
  glareSize = 240,
  transitionDuration = 900,
  className = "",
}) {
  const hex = glareColor.replace("#", "");
  const normalized = hex.length === 3 ? hex.split("").map((value) => value + value).join("") : hex;
  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);

  return (
    <span
      className={`glareHover ${className}`}
      style={{
        "--glare-angle": `${glareAngle}deg`,
        "--glare-duration": `${transitionDuration}ms`,
        "--glare-size": `${glareSize}%`,
        "--glare-color": `rgba(${red}, ${green}, ${blue}, ${glareOpacity})`,
      }}
    >
      {children}
    </span>
  );
}
