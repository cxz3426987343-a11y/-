import React, { useEffect, useRef, useState } from "react";
import BlurText from "./BlurText";
import designCategories from "./designAssets";
import GlareHover from "./GlareHover";
import "./DesignPortfolio.css";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function ParallaxGallery({ category, onBack }) {
  const stageRef = useRef(null);
  const dragStartX = useRef(null);
  const wheelLock = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [category]);

  const total = category.assets.length;
  const moveTo = (direction) => {
    setActiveIndex((current) => (current + direction + total) % total);
  };

  const relativeIndex = (index) => {
    const raw = index - activeIndex;
    if (raw > total / 2) return raw - total;
    if (raw < -total / 2) return raw + total;
    return raw;
  };

  function handleKeyDown(event) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    moveTo(event.key === "ArrowRight" ? 1 : -1);
  }

  function handlePointerDown(event) {
    dragStartX.current = event.clientX;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }

  function handlePointerUp(event) {
    if (dragStartX.current === null) return;
    const delta = event.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) > 44) moveTo(delta < 0 ? 1 : -1);
  }

  function handleWheel(event) {
    if (wheelLock.current || Math.abs(event.deltaX) < 8 && Math.abs(event.deltaY) < 8) return;
    event.preventDefault();
    wheelLock.current = true;
    moveTo(event.deltaX + event.deltaY > 0 ? 1 : -1);
    window.setTimeout(() => { wheelLock.current = false; }, 420);
  }

  function handlePointerMove(event) {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    stage.style.setProperty("--orbit-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    stage.style.setProperty("--orbit-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  }

  return (
    <div className="designGalleryView orbitGalleryView">
      <header className="designGalleryHeader orbitGalleryHeader">
        <button onClick={onBack} aria-label="返回设计类别卡组">←</button>
        <div className="orbitGalleryHeading">
          <span>{category.index} / 06 · {category.en}</span>
          <h3>{category.title}</h3>
        </div>
        <p>{String(category.assets.length).padStart(2, "0")} 件作品</p>
      </header>
      <div
        className="orbitStage"
        ref={stageRef}
        tabIndex="0"
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerMove={handlePointerMove}
        onWheel={handleWheel}
        aria-label={`${category.title}作品浏览`}
      >
        <div className="orbitAmbient" aria-hidden="true" />
        {category.assets.map((asset, index) => {
          const offset = relativeIndex(index);
          const slot = offset === 0 ? "isCurrent" : offset === -1 ? "isPrevious" : offset === 1 ? "isNext" : offset < 0 ? "isFarPrevious" : "isFarNext";
          return (
            <figure className={`orbitFrame ${slot}`} key={asset.src}>
              <div className="orbitImageWrap">
                <img
                  src={asset.src}
                  alt={`${category.title}作品 ${String(index + 1).padStart(2, "0")}`}
                  width={asset.width}
                  height={asset.height}
                  loading={Math.abs(offset) < 2 ? "eager" : "lazy"}
                />
              </div>
              <figcaption><span>{String(index + 1).padStart(2, "0")}</span><span>{category.title}</span></figcaption>
            </figure>
          );
        })}
      </div>
      <div className="orbitControls" aria-label="切换作品">
        <button type="button" onClick={() => moveTo(-1)} aria-label="上一张作品">←</button>
        <span>{String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        <button type="button" onClick={() => moveTo(1)} aria-label="下一张作品">→</button>
      </div>
    </div>
  );
}

export default function DesignPortfolio() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [drawingId, setDrawingId] = useState(null);
  const transitionTimer = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => () => clearTimeout(transitionTimer.current), []);

  function moveCursor(event) {
    const stage = event.currentTarget;
    const cursor = cursorRef.current;
    if (!cursor) return;
    const rect = stage.getBoundingClientRect();
    cursor.style.transform = `translate3d(${event.clientX - rect.left}px, ${event.clientY - rect.top}px, 0)`;
  }

  function showCursor() {
    cursorRef.current?.classList.add("isVisible");
  }

  function hideCursor() {
    cursorRef.current?.classList.remove("isVisible");
  }

  function tiltCard(event) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--tilt-x", `${y * -9}deg`);
    card.style.setProperty("--tilt-y", `${x * 12}deg`);
    card.style.setProperty("--glow-x", `${(x + 0.5) * 100}%`);
    card.style.setProperty("--glow-y", `${(y + 0.5) * 100}%`);
  }

  function resetCard(event) {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  }

  const cardLayouts = [
    { x: -400, xMedium: -252, y: 102, rotate: -13, scale: 0.94 },
    { x: -250, xMedium: -156, y: 26, rotate: -6, scale: 1 },
    { x: -86, xMedium: -52, y: 74, rotate: -2, scale: 0.97 },
    { x: 88, xMedium: 54, y: 10, rotate: 5, scale: 1.04 },
    { x: 254, xMedium: 160, y: 84, rotate: 9, scale: 0.97 },
    { x: 408, xMedium: 256, y: 34, rotate: 14, scale: 1 },
  ];

  function openCategory(category) {
    if (drawingId) return;
    setDrawingId(category.id);
    transitionTimer.current = setTimeout(() => {
      setActiveCategory(category);
      setDrawingId(null);
      document.getElementById("design")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 560);
  }

  function closeCategory() {
    setActiveCategory(null);
    requestAnimationFrame(() => document.getElementById("design")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  return (
    <article className={`designPortfolio ${activeCategory ? "isGallery" : "isDeck"}`} id="design">
      {activeCategory ? (
        <ParallaxGallery category={activeCategory} onBack={closeCategory} />
      ) : (
        <div className="designDeckView">
          <header className="designDeckHeader">
            <span>01 / Visual Design</span>
            <h3><BlurText text="设计类作品" animateBy="letters" direction="bottom" delay={120} className="portfolioTitleBlur slow" /></h3>
            <p>选择一张类别卡片</p>
          </header>
          <div className="designDeckStage" onPointerMove={moveCursor} onPointerEnter={showCursor} onPointerLeave={hideCursor}>
            <div className="designCursor" ref={cursorRef} aria-hidden="true">抽取</div>
            <div className="designCardDeck">
              {designCategories.map((category, index) => {
                const layout = cardLayouts[index];
                return (
                  <div
                    className="designCategorySlot"
                    key={category.id}
                    style={{
                      "--slot-x": `${layout.x}px`,
                      "--slot-x-medium": `${layout.xMedium}px`,
                      "--slot-y": `${layout.y}px`,
                      "--slot-rotate": `${layout.rotate}deg`,
                      "--slot-scale": layout.scale,
                      "--card-order": index,
                    }}
                  >
                    <button
                      className={`designCategoryCard ${drawingId === category.id ? "isDrawing" : ""}`}
                      aria-label={`打开${category.title}作品`}
                      onPointerMove={tiltCard}
                      onPointerLeave={resetCard}
                      onClick={() => openCategory(category)}
                    >
                      <GlareHover
                        glareColor="#f5e392"
                        glareOpacity={0.2}
                        glareAngle={-28}
                        glareSize={230}
                        transitionDuration={960}
                        className="designCardGlare"
                      />
                      <span className="designCardInner">
                        <span className="designCardFace designCardBack">
                          <span className="designCardBackIndex">{category.index}</span>
                          <span className="designCardSeal" aria-hidden="true">
                            <span className="designCardMoon" />
                            <span className="designCardStar designCardStarOne" />
                            <span className="designCardStar designCardStarTwo" />
                            <span className="designCardStar designCardStarThree" />
                          </span>
                          <span className="designCardArchive">Visual archive<br />Pick a card</span>
                        </span>
                        <span className="designCardFace designCardFront">
                          <span className="designCardIndex">{category.index}</span>
                          <span className="designCardCopy">
                            <small>{category.en}</small>
                            <strong>{category.title}</strong>
                            <em>{category.note}</em>
                          </span>
                          <span className="designCardOpen">点击进入</span>
                        </span>
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
