import React, { useEffect, useRef, useState } from "react";
import BlurText from "./BlurText";
import Folder from "./Folder";
import { copywritingCategories } from "./copywritingAssets";
import "./CopywritingPortfolio.css";

export default function CopywritingPortfolio() {
  const [activeId, setActiveId] = useState(null);
  const [isOpening, setIsOpening] = useState(false);
  const closeRef = useRef(null);
  const openingTimerRef = useRef(null);
  const activeCategory = copywritingCategories.find((category) => category.id === activeId) ?? null;

  useEffect(() => () => window.clearTimeout(openingTimerRef.current), []);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key !== "Escape") return;
      setIsOpening(false);
      setActiveId(null);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!activeCategory) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!isOpening) closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeCategory, isOpening]);

  function openCategory(categoryId) {
    window.clearTimeout(openingTimerRef.current);
    setActiveId(categoryId);
    setIsOpening(true);
    openingTimerRef.current = window.setTimeout(() => setIsOpening(false), 620);
  }

  function closeDrawer() {
    window.clearTimeout(openingTimerRef.current);
    setIsOpening(false);
    setActiveId(null);
  }

  return (
    <article className="copyPortfolio" id="copywriting">
      <header className="copyPortfolioHeader">
        <span>03 / Copywriting</span>
        <h3><BlurText text="文案类作品" animateBy="letters" direction="bottom" delay={120} className="portfolioTitleBlur slow" /></h3>
      </header>

      <div className="copyDesktop" aria-label="文案作品文件夹">
        <div className="copyDesktopMeta">
          <span>CHEN XINZHU / TEXT ARCHIVE</span>
          <span>24 FILES · 06 FOLDERS</span>
        </div>
        <div className="copyFolderGrid">
          {copywritingCategories.map((category) => (
            <button
              className={"copyFolderButton copyFolder-" + category.id + (activeId === category.id ? " isActive" : "")}
              type="button"
              key={category.id}
              aria-expanded={activeId === category.id}
              aria-controls="copywriting-drawer"
              onClick={() => openCategory(category.id)}
            >
              <Folder
                color={category.color}
                open={activeId === category.id}
              />
              <span className="copyFolderLabel">
                <small>{category.number} / {category.en}</small>
                <strong>{category.title}</strong>
                <i>{String(category.works.length).padStart(2, "0")} FILES</i>
              </span>
            </button>
          ))}
        </div>
      </div>

      {activeCategory && !isOpening && (
        <div className="copyDrawerLayer" role="presentation">
          <button className="copyDrawerBackdrop" type="button" aria-label="关闭文案作品抽屉" onClick={closeDrawer} />
          <aside
            className="copyDrawer"
            id="copywriting-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="copywriting-drawer-title"
            style={{ "--drawer-accent": activeCategory.color }}
          >
            <header className="copyDrawerHeader">
              <div>
                <span>{activeCategory.number} / {activeCategory.en}</span>
                <h4 id="copywriting-drawer-title">{activeCategory.title}</h4>
                <p>{activeCategory.works.length} 篇作品</p>
              </div>
              <button ref={closeRef} className="copyIconButton" type="button" onClick={closeDrawer} aria-label="关闭抽屉" title="关闭">×</button>
            </header>

            <div className="copyArchiveScroll">
              {activeCategory.works.map((work, index) => (
                <figure className="copyArchivePage" key={work.src}>
                  <figcaption>
                    <span>{String(index + 1).padStart(2, "0")} / {String(activeCategory.works.length).padStart(2, "0")}</span>
                    <strong>{work.title}</strong>
                  </figcaption>
                  <div className="copyArchiveImage">
                    <img src={work.src} alt={work.title} loading={index === 0 ? "eager" : "lazy"} />
                    {work.protected && <span className="copyPrivacyBadge">CONTENT PROTECTED</span>}
                  </div>
                </figure>
              ))}
            </div>
          </aside>
        </div>
      )}
    </article>
  );
}
