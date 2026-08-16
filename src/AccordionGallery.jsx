import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./AccordionGallery.css";

export default function AccordionGallery({
  items = [],
  defaultIndex = 0,
  accentColor = "#c6ee4d",
  overlayColor = "#11150f",
  textColor = "#f4f0e8",
  height = 560,
  gap = 12,
  radius = 8,
  expandRatio = 0.52,
  duration = 0.72,
  trigger = "hover",
  grayscale = true,
  showLabels = true,
  onItemClick,
  className = "",
}) {
  const rootRef = useRef(null);
  const panelsRef = useRef([]);
  const mediaRef = useRef([]);
  const timelinesRef = useRef(null);
  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), Math.max(items.length - 1, 0)));

  const applyLayout = useCallback((animate = true) => {
    const panels = panelsRef.current.filter(Boolean);
    if (!panels.length) return;
    timelinesRef.current?.kill();
    const ratio = Math.min(Math.max(expandRatio, 0.24), 0.82);
    const grow = panels.length > 1 ? (ratio * (panels.length - 1)) / (1 - ratio) : 1;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const tl = gsap.timeline();
    panels.forEach((panel, index) => {
      const isActive = index === active;
      const media = mediaRef.current[index];
      const tilt = isActive ? 0 : index < active ? 5 : -5;
      tl.to(panel, { flexGrow: isActive ? grow : 1, rotateY: tilt, duration: animate && !reduced ? duration : 0, ease: "power3.out" }, 0);
      if (media) {
        tl.to(media, { xPercent: -50, yPercent: -50, x: isActive ? 0 : (active - index) * 18, filter: grayscale ? `grayscale(${isActive ? 0 : 1})` : "grayscale(0)", opacity: isActive ? 1 : 0.72, duration: animate && !reduced ? duration : 0, ease: "power3.out" }, 0);
      }
    });
    timelinesRef.current = tl;
  }, [active, duration, expandRatio, grayscale]);

  useLayoutEffect(() => {
    applyLayout(false);
    const resizeObserver = new ResizeObserver(() => applyLayout(false));
    if (rootRef.current) resizeObserver.observe(rootRef.current);
    return () => {
      resizeObserver.disconnect();
      timelinesRef.current?.kill();
    };
  }, [applyLayout]);

  useEffect(() => { applyLayout(true); }, [active, applyLayout]);

  function handleKeyDown(index, event) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
    setActive((index + direction + items.length) % items.length);
  }

  return (
    <div
      ref={rootRef}
      className={`accordionGallery ${className}`}
      style={{ "--ag-accent": accentColor, "--ag-overlay": overlayColor, "--ag-text": textColor, "--ag-gap": `${gap}px`, "--ag-radius": `${radius}px`, height: `${height}px` }}
      role="list"
      aria-label="文案作品画廊"
    >
      {items.map((item, index) => {
        const isActive = index === active;
        return (
          <button
            type="button"
            key={item.image}
            ref={(element) => { panelsRef.current[index] = element; }}
            className={`accordionPanel ${isActive ? "isActive" : ""}`}
            style={{ borderRadius: `${radius}px` }}
            onMouseEnter={() => trigger === "hover" && setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => { setActive(index); onItemClick?.(item, index); }}
            onKeyDown={(event) => handleKeyDown(index, event)}
            aria-current={isActive ? "true" : undefined}
            aria-label={item.label || item.alt || `作品 ${index + 1}`}
          >
            <span className="accordionPanelFrame">
              <span className="accordionPanelMedia" ref={(element) => { mediaRef.current[index] = element; }}>
                <img src={item.image} alt={item.alt || item.label || ""} draggable="false" loading={index < 2 ? "eager" : "lazy"} />
              </span>
              <span className="accordionPanelOverlay" aria-hidden="true" />
              {item.protected && <span className="accordionPanelPrivacy">内容已做保密处理</span>}
            </span>
            {showLabels && <span className="accordionPanelLabel"><i /><strong>{item.label}</strong></span>}
          </button>
        );
      })}
    </div>
  );
}
