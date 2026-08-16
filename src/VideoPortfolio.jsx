import React, { useEffect, useRef, useState } from "react";
import BlurText from "./BlurText";
import "./VideoPortfolio.css";

const videoWorks = [
  { id: "01", title: "乘风破浪的SISUer 先导片", type: "综艺", src: "/assets/video/01.mp4", tone: "lime" },
  { id: "02", title: "千秋红岩", type: "纪录片", src: "/assets/video/02.mp4", tone: "coral" },
  { id: "03", title: "we are one", type: "微电影", src: "/assets/video/03.mp4", tone: "blue" },
  { id: "04", title: "帧心实译，影像中国", type: "项目宣传片", src: "/assets/video/04.mp4", tone: "yellow" },
  { id: "05", title: "明德秘史", type: "话剧宣传片", src: "/assets/video/05.mp4", tone: "mint" },
  { id: "06", title: "懂车帝启动会片头", type: "动画", src: "/assets/video/06.mp4", tone: "pink" },
  { id: "07", title: "印象·国风", type: "动画", src: "/assets/video/07.mp4", tone: "lime" },
  { id: "08", title: "love movie", type: "动画", src: "/assets/video/08.mp4", tone: "coral" },
  { id: "09", title: "中国短片出海记", type: "短视频", src: "/assets/video/09.mp4", tone: "blue" },
  { id: "10", title: "他至人间", type: "AI动画", src: "/assets/video/10.m4v", tone: "yellow" },
  { id: "11", title: "青春日记", type: "微电影", src: "/assets/video/11.mp4", tone: "mint" },
  { id: "12", title: "行进使命的思政课", type: "活动记录", src: "/assets/video/12.mp4", tone: "pink" },
  { id: "13", title: "赎罪电影剪辑", type: "影视混剪", src: "/assets/video/13.mp4", tone: "lime" },
];

export default function VideoPortfolio() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayOverlay, setShowPlayOverlay] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const trackRef = useRef(null);
  const ticketRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  function selectVideo(item) {
    const current = videoRef.current;
    if (current) {
      current.pause();
      current.currentTime = 0;
    }
    setSelectedVideo(item);
    setIsPlaying(false);
    setShowPlayOverlay(true);
    setIsReady(false);
    setHasError(false);
  }

  function prepareFirstFrame(event) {
    const video = event.currentTarget;
    if (Number.isFinite(video.duration) && video.duration > 0.12) {
      video.currentTime = 0.08;
    } else {
      setIsReady(true);
    }
  }

  function handleVideoReady(event) {
    setIsReady(true);
    setShowPlayOverlay(true);
  }

  async function playVideoElement(video) {
    try {
      video.muted = false;
      video.volume = 1;
      await video.play();
      setIsPlaying(true);
      setShowPlayOverlay(false);
      setHasError(false);
    } catch {
      setIsPlaying(false);
      setShowPlayOverlay(true);
      if (video.paused && video.currentTime < 0.08) video.currentTime = 0.08;
    }
  }

  async function playSelectedVideo() {
    const video = videoRef.current;
    if (!video) return;
    await playVideoElement(video);
  }

  function toggleSelectedVideo() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      playSelectedVideo();
    } else {
      video.pause();
    }
  }

  function scrollTickets(direction) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * Math.min(680, track.clientWidth * 0.72), behavior: "smooth" });
  }

  function handleTicketKeyDown(event, index) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const targetIndex = Math.max(0, Math.min(videoWorks.length - 1, index + direction));
    ticketRefs.current[targetIndex]?.focus();
    ticketRefs.current[targetIndex]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }

  function startFirstVideo() {
    selectVideo(videoWorks[0]);
    ticketRefs.current[0]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }

  return (
    <article className={`videoPortfolio ${isVisible ? "isVisible" : ""}`} id="videoWorks" ref={sectionRef}>
      <header className="videoPortfolioHeader">
        <span>02 / Video Works</span>
        <h3><BlurText text="视频类作品" animateBy="letters" direction="bottom" delay={120} className="portfolioTitleBlur slow" /></h3>
      </header>

      <div className="videoShowcase">
        <div className="retroTelevision">
          <div className="tvCabinet">
            <div className="tvScreenBezel">
              <div className={`tvScreen ${selectedVideo ? "hasSelection" : "isIdle"} ${isPlaying ? "isPlaying" : ""}`}>
                {!selectedVideo ? (
                  <div className="tvIdleTitle">
                    <span>portfolio</span>
                    <button className="tvIdleStart" type="button" onClick={startFirstVideo}>START</button>
                  </div>
                ) : (
                  <>
                    <video
                      key={selectedVideo.id}
                      ref={videoRef}
                      src={selectedVideo.src}
                      preload="metadata"
                      playsInline
                      controls={Boolean(selectedVideo)}
                      controlsList="nodownload"
                      onClick={toggleSelectedVideo}
                      onContextMenu={(event) => event.preventDefault()}
                      onLoadedMetadata={prepareFirstFrame}
                      onLoadedData={handleVideoReady}
                      onSeeked={() => setIsReady(true)}
                      onPlay={() => { setIsPlaying(true); setShowPlayOverlay(false); }}
                      onPause={() => { setIsPlaying(false); setShowPlayOverlay(true); }}
                      onEnded={(event) => {
                        event.currentTarget.currentTime = 0.08;
                        setIsPlaying(false);
                        setShowPlayOverlay(true);
                      }}
                      onError={() => {
                        setHasError(true);
                        setIsReady(false);
                      }}
                    />
                    {!hasError && showPlayOverlay && (
                      <button
                        className="tvPlayButton"
                        type="button"
                        onClick={(event) => { event.stopPropagation(); toggleSelectedVideo(); }}
                        aria-label={`播放${selectedVideo.title}，包含原声`}
                        disabled={!isReady}
                      >
                        <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
                      </button>
                    )}
                    {hasError && <div className="tvError" role="status">当前视频无法播放</div>}
                  </>
                )}
                <div className="tvScanlines" aria-hidden="true" />
              </div>
            </div>

            <aside className="tvControlRail" aria-hidden="true">
              <span className="tvBrand">CXZ</span>
              <i className="tvDial tvDialLarge" />
              <i className="tvDial" />
              <span className="tvVent" />
              <span className="tvPowerLight" />
            </aside>
          </div>
          <div className="tvBase"><span /><span /></div>
        </div>
      </div>

      <div className="ticketCarousel">
        <button className="ticketArrow" type="button" onClick={() => scrollTickets(-1)} aria-label="查看前一组视频作品">←</button>
        <div
          className="ticketTrack"
          ref={trackRef}
        >
          {videoWorks.map((item, index) => (
            <button
              className={`movieTicket ticketTone-${item.tone} ${selectedVideo?.id === item.id ? "isSelected" : ""}`}
              type="button"
              key={item.id}
              ref={(element) => { ticketRefs.current[index] = element; }}
              aria-selected={selectedVideo?.id === item.id}
              aria-label={`${item.id} ${item.title}，类型：${item.type}`}
              onClick={() => selectVideo(item)}
              onKeyDown={(event) => handleTicketKeyDown(event, index)}
            >
              <span className="ticketNumber">NO. {item.id}</span>
              <strong>{item.title}</strong>
              <span className="ticketType">{item.type}</span>
              <i className="ticketBarcode" aria-hidden="true" />
            </button>
          ))}
        </div>
        <button className="ticketArrow" type="button" onClick={() => scrollTickets(1)} aria-label="查看后一组视频作品">→</button>
      </div>
    </article>
  );
}
