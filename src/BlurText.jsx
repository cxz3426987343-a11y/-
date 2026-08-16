import React, { useEffect, useRef, useState } from "react";
import "./BlurText.css";

export default function BlurText({
  text = "",
  delay = 90,
  animateBy = "words",
  direction = "bottom",
  className = "",
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [replayCycle, setReplayCycle] = useState(0);
  const segments = animateBy === "letters" ? Array.from(text) : text.split(" ");

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    let frame = 0;
    setInView(false);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      frame = window.requestAnimationFrame(() => setInView(true));
      observer.disconnect();
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [replayCycle]);

  useEffect(() => {
    function replayOnNavigation(event) {
      const targetId = event.detail?.id;
      const section = ref.current?.closest("[id]");
      if (!targetId || section?.id !== targetId) return;
      setReplayCycle((cycle) => cycle + 1);
    }

    window.addEventListener("portfolio:navigate", replayOnNavigation);
    return () => window.removeEventListener("portfolio:navigate", replayOnNavigation);
  }, []);

  return (
    <span ref={ref} className={`blurText ${inView ? "isInView" : ""} ${direction === "top" ? "fromTop" : "fromBottom"} ${className}`.trim()}>
      {segments.map((segment, index) => (
        <span className="blurTextPiece" key={`${segment}-${index}`} style={{ "--blurDelay": `${index * delay}ms` }}>
          {segment === " " ? "\u00a0" : segment || "\u00a0"}
          {animateBy !== "letters" && index < segments.length - 1 ? "\u00a0" : ""}
        </span>
      ))}
    </span>
  );
}
