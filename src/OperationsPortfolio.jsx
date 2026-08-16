import React, { useEffect, useMemo, useRef, useState } from "react";
import BlurText from "./BlurText";
import { operationsApps } from "./operationsAssets";
import "./OperationsPortfolio.css";

function OpsImage({ src, alt, className = "", onLoad }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className={"opsImage " + className + (failed ? " isFailed" : "")}>
      {failed ? (
        <span className="opsImageFallback">
          <strong>素材暂时无法加载</strong>
          <small>{alt}</small>
        </span>
      ) : (
        <img src={src} alt={alt} loading="lazy" onLoad={onLoad} onError={() => setFailed(true)} />
      )}
    </span>
  );
}

function AppIcon({ app }) {
  return (
    <span className="opsAppIcon" style={{ "--app-accent": app.accent }}>
      <img src={app.icon} alt="" />
    </span>
  );
}

function formatClock(now) {
  const timeZone = "Asia/Shanghai";
  return {
    time: new Intl.DateTimeFormat("zh-CN", { timeZone, hour: "2-digit", minute: "2-digit", hour12: false }).format(now),
    seconds: new Intl.DateTimeFormat("zh-CN", { timeZone, second: "2-digit" }).format(now),
    date: new Intl.DateTimeFormat("en-US", { timeZone, weekday: "long", month: "long", day: "2-digit" }).format(now).toUpperCase(),
  };
}

function HomeScreen({ onOpenApp, now }) {
  const clock = formatClock(now);
  return (
    <div className="opsScreenView opsHomeView">
      <div className="opsStatusBar">
        <span>{clock.time}</span>
        <span>CHEN XINZHU · 04</span>
        <span>▮▮▮</span>
      </div>
      <div className="opsHomeTitle">
        <span>OPERATIONS / CHANNELS</span>
        <strong>运营作品</strong>
      </div>
      <div className="opsAppGrid">
        {operationsApps.map((app) => (
          <button className={"opsAppCard opsAppCard-" + app.id} type="button" key={app.id} onClick={() => onOpenApp(app.id)}>
            <span className="opsAppCardIcon">
              <AppIcon app={app} />
            </span>
            <strong>{app.title}</strong>
          </button>
        ))}
      </div>
    </div>
  );
}

function AppHomeScreen({ app, onBack, onOpenFeed }) {
  return (
    <div className="opsScreenView opsAppHomeView">
      <div className="opsAppHeader">
        <button type="button" onClick={onBack} aria-label="返回运营作品主页">← <span>HOME</span></button>
        <span><AppIcon app={app} /> {app.title}</span>
        <i aria-hidden="true" />
      </div>
      {app.accounts ? (
        <div className="opsAccountGrid">
          {app.accounts.map((account) => (
            <button type="button" className="opsAccountCard" key={account.id} onClick={() => onOpenFeed(account.id)}>
              <OpsImage src={account.image} alt={account.title + "主页"} />
              <strong>{account.title}</strong>
            </button>
          ))}
        </div>
      ) : app.channels ? (
        <div className="opsChannelGrid">
          {app.channels.map((channel) => (
            <button type="button" className={"opsChannelCard " + (!channel.image ? "isTextOnly" : "")} key={channel.id} onClick={() => onOpenFeed(channel.id)}>
              {channel.image && <OpsImage src={channel.image} alt={channel.title + "主页"} />}
              <strong>{channel.title}</strong>
              <i>查看作品 ↗</i>
            </button>
          ))}
        </div>
      ) : (
        <button className="opsSingleProfile" type="button" onClick={() => onOpenFeed(null)}>
          <OpsImage src={app.home.image} alt={app.home.title + "主页"} />
          <span className="opsProfileCaption">
            <strong>{app.home.title}</strong>
            <i>点击进入作品展示 ↗</i>
          </span>
        </button>
      )}
    </div>
  );
}

function HorizontalArticle({ article }) {
  const [slide, setSlide] = useState(0);

  function move(direction) {
    const next = Math.max(0, Math.min(article.images.length - 1, slide + direction));
    setSlide(next);
  }

  function controls(className) {
    if (article.images.length <= 1) return null;
    return (
      <div className={"opsArticleControls " + className}>
        <button type="button" onClick={() => move(-1)} disabled={slide === 0} aria-label="上一张长图">←</button>
        <span>{String(slide + 1).padStart(2, "0")} / {String(article.images.length).padStart(2, "0")}</span>
        <button type="button" onClick={() => move(1)} disabled={slide === article.images.length - 1} aria-label="下一张长图">→</button>
      </div>
    );
  }

  return (
    <article className="opsArticle">
      {controls("opsArticleControlsTop")}
      <div className="opsArticleMedia">
        <div className="opsArticleSingle">
          <OpsImage key={article.images[slide]} src={article.images[slide]} alt={article.title + " 第" + (slide + 1) + "页"} />
        </div>
      </div>
      {controls("opsArticleControlsBottom")}
    </article>
  );
}

function FeedScreen({ app, account, channel, onBack }) {
  const feed = account ? account.articles : channel ? channel.feed : app.feed;
  return (
    <div className="opsScreenView opsFeedView">
      <div className="opsAppHeader opsFeedHeader">
        <button type="button" onClick={onBack} aria-label="返回账号主页">← <span>PROFILE</span></button>
        <span>作品展示</span>
        <i aria-hidden="true" />
      </div>
      <div className="opsFeedScroller">
        {account ? (
          feed.map((article) => <HorizontalArticle key={article.title} article={article} />)
        ) : (
          feed.map((item, index) => (
            <article className="opsFeedItem" key={item.image}>
              <OpsImage src={item.image} alt={item.title} />
            </article>
          ))
        )}
      </div>
    </div>
  );
}

export default function OperationsPortfolio() {
  const [view, setView] = useState("locked");
  const [activeAppId, setActiveAppId] = useState(null);
  const [activeAccountId, setActiveAccountId] = useState(null);
  const [activeChannelId, setActiveChannelId] = useState(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [now, setNow] = useState(() => new Date());
  const gestureRef = useRef({ startY: null, pointerId: null });
  const currentApp = useMemo(() => operationsApps.find((app) => app.id === activeAppId) ?? null, [activeAppId]);
  const currentAccount = currentApp?.accounts?.find((account) => account.id === activeAccountId) ?? null;
  const currentChannel = currentApp?.channels?.find((channel) => channel.id === activeChannelId) ?? null;

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key !== "Escape") return;
      if (view === "feed") {
        setView("appHome");
      } else if (view === "appHome") {
        setView("home");
      } else if (view === "home") {
        setView("locked");
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [view]);

  function unlock() {
    setSwipeOffset(0);
    setView("home");
  }

  function beginGesture(event) {
    if (view !== "locked") return;
    gestureRef.current = { startY: event.clientY, pointerId: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveGesture(event) {
    const startY = gestureRef.current.startY;
    if (view !== "locked" || startY === null) return;
    const offset = Math.max(-120, Math.min(0, event.clientY - startY));
    setSwipeOffset(offset);
    if (offset < -62) unlock();
  }

  function endGesture(event) {
    if (gestureRef.current.pointerId !== event.pointerId) return;
    if (swipeOffset < -54) unlock();
    else setSwipeOffset(0);
    gestureRef.current = { startY: null, pointerId: null };
  }

  function handleScreenWheel(event) {
    if (view !== "locked" || Math.abs(event.deltaY) <= 14) return;
    event.preventDefault();
    event.stopPropagation();
    unlock();
  }

  function openApp(appId) {
    setActiveAppId(appId);
    setActiveAccountId(null);
    setActiveChannelId(null);
    setView("appHome");
  }

  function openFeed(contentId) {
    if (currentApp?.accounts) {
      setActiveAccountId(contentId);
      setActiveChannelId(null);
    } else {
      setActiveAccountId(null);
      setActiveChannelId(contentId);
    }
    setView("feed");
  }

  function goBack() {
    if (view === "feed") setView("appHome");
    else if (view === "appHome") setView("home");
    else if (view === "home") setView("locked");
  }

  return (
    <article className="operationsPortfolio" id="operations">
      <header className="operationsHeader">
        <span>04 / Operations</span>
        <h3><BlurText text="运营类作品" animateBy="letters" direction="bottom" delay={120} className="portfolioTitleBlur slow" /></h3>
      </header>
      <div className="operationsStage">
        <div className="operationsStageMeta">
          <span>PERSONAL WORK DEVICE</span>
          <strong>OPERATIONS<br />ARCHIVE</strong>
          <p>Swipe up to unlock.<br />Tap a channel to explore.</p>
        </div>
        <div className={"phoneFrame phoneView-" + view}>
          <div
            className="phoneScreen"
            onPointerDown={beginGesture}
            onPointerMove={moveGesture}
            onPointerUp={endGesture}
            onPointerCancel={endGesture}
            onWheel={handleScreenWheel}
            style={{ "--unlock-offset": swipeOffset + "px" }}
          >
            {view === "locked" && (
              <div className="opsLockScreen">
                <div className="opsLockTop"><span>CHEN XINZHU</span><span>PERSONAL DEVICE</span></div>
                <div className="opsLockTime">
                  <span>{formatClock(now).time}<sup>{formatClock(now).seconds}</sup></span>
                  <small>{formatClock(now).date} · CHONGQING</small>
                </div>
                <div className="opsLockArtwork">
                  <img src="/assets/portrait/operations-lockscreen.jpg" alt="陈薪竹 3D 形象" />
                  <span>WORK<br />DEVICE</span>
                  <i>◒</i>
                </div>
                <button className="opsUnlockCue" type="button" onClick={unlock} aria-label="解锁运营作品手机">
                  <span className="opsSwipeArrow">↑</span>
                  <strong>向上滑动解锁</strong>
                  <small>SWIPE UP TO ENTER</small>
                </button>
              </div>
            )}
            {view === "home" && <HomeScreen onOpenApp={openApp} now={now} />}
            {view === "appHome" && currentApp && <AppHomeScreen app={currentApp} onBack={goBack} onOpenFeed={openFeed} />}
            {view === "feed" && currentApp && <FeedScreen app={currentApp} account={currentAccount} channel={currentChannel} onBack={goBack} />}
          </div>
          <div className="phoneSpeaker" />
          <div className="phoneSideButton phoneSideButtonTop" />
          <div className="phoneSideButton phoneSideButtonBottom" />
          <div className="phoneCamera" />
        </div>
      </div>
    </article>
  );
}
