import React, { useEffect, useMemo, useRef, useState } from "react";
import DesignPortfolio from "./DesignPortfolio";
import VideoPortfolio from "./VideoPortfolio";
import CopywritingPortfolio from "./CopywritingPortfolio";
import OperationsPortfolio from "./OperationsPortfolio";
import FoldText from "./FoldText";
import BlurText from "./BlurText";
import BorderGlow from "./BorderGlow";

const navItems = [
  { label: "首页", target: "hero" },
  { label: "个人优势", target: "strengths" },
  { label: "个人经历", target: "experience" },
  { label: "设计", target: "design" },
  { label: "视频", target: "videoWorks" },
  { label: "文案", target: "copywriting" },
  { label: "运营", target: "operations" },
];

const abilityData = [
  { id: "visual", title: "视觉设计", score: 100, tools: ["PS", "PR", "AE", "可画", "秀米"], brief: "熟练使用各类设计剪辑工具，并有丰富的海报、视频创作经验" },
  { id: "operation", title: "内容运营", score: 90, tools: ["小红书", "抖音", "公众号"], brief: "网感极佳的冲浪爱好者，运营自媒体粉丝数量1500+，为学校官方抖音和公众号打造多款热门作品，点赞量超1W+" },
  { id: "ai", title: "AI 运用", score: 80, tools: ["Codex", "ChatGPT", "Workbuddy"], brief: "熟练使用各类 AI agent，创建简历修改 skill 并通过 Vibe coding 搭建自己的个人作品集网站和秋招投递工作台" },
  { id: "data", title: "数据分析", score: 80, tools: ["Excel", "风神"], brief: "使用 Excel 函数和风神 BI 看板完成数据整理、看板搭建复盘，推送业务红黑榜和周报" },
  { id: "team", title: "团队协作", score: 100, plainTools: true, tools: ["MBTI · ENFJ-A", "贝尔宾团队角色 · Co（协调者）+ TW（团队凝聚者）"], brief: "性格开朗，擅长沟通表达、与人合作，在工作中多次完成跨部门协作，有多次需求调研、案例萃取、与产品经理对接培训手册的经验" },
  { id: "language", title: "语言能力", score: 85, plainTools: true, tools: ["英语专业四级", "CET-6 531", "普通话二级甲等"], brief: "具备英语、普通话等多场景沟通与表达能力。" },
  { id: "copyPlan", title: "文案策划", score: 100, plainTools: true, tools: ["新闻稿", "评论", "活动方案", "推文", "短视频脚本", "剧本"], brief: "擅长撰写各种类型的文案，从用户洞察、选题策划到传播复盘，把复杂业务整理成清晰、可传播的内容系统。" },
];

const toolMarks = {
  PS: "/assets/logos/photoshop.svg",
  PR: "/assets/logos/premiere.svg",
  AE: "/assets/logos/aftereffects.svg",
  可画: "/assets/logos/canva.svg",
  秀米: "/assets/logos/xiumi.ico",
  小红书: "/assets/logos/xiaohongshu.svg",
  抖音: "/assets/logos/tiktok.svg",
  公众号: "/assets/logos/wechat.svg",
  Codex: "/assets/logos/codex.svg",
  ChatGPT: "/assets/logos/openai.svg",
  Workbuddy: "/assets/logos/workbuddy.svg",
  Excel: "/assets/logos/excel.svg",
  风神: "/assets/logos/volcengine.svg",
};

function toolMark(tool) {
  return toolMarks[tool];
}

const experiences = [
  {
    time: "2026.02 — 2026.08",
    role: "培训运营 / 活动与用户运营",
    org: "字节跳动 · 懂车帝 · 交易产品",
    image: "/assets/experience/dongchedi.jpg",
    imageAlt: "陈薪竹与懂车帝团队合影",
    position: "center 58%",
    detail:
      "围绕懂车帝新车交易业务，从0到1搭建新车交易培训体系与数字化学习专区，开发10+专项课程，沉淀业务SOP、优秀案例及AI DCC作业手册，推动AI组平均人效提升2倍；统筹9期新人集训营及训后运营，七天开单率达71%、出营率95%；同时策划端午车展、汽车下乡等主题活动，推动到店转化率由22%提升至27%；负责小红书及企微社群运营，搭建网销内容IP，测试阶段月度公域获客50+、累计进群客户500+。",
  },
  {
    time: "2023.01 — 2023.04",
    role: "助理导演",
    org: "重庆电视台",
    image: "/assets/experience/chongqing-tv.jpg",
    imageAlt: "陈薪竹参与重庆电视台项目现场",
    position: "center 54%",
    detail:
      "参与《感动重庆十大人物颁奖典礼》内容策划与传播执行，采访记录 10+ 位获奖人物及家属，提炼核心传播亮点；协助完成 5 版串词、主持稿与宣传稿打磨，并协同完成多支短视频制作发布。",
  },
  {
    time: "2022.12 — 2023.12",
    role: "统筹运营部负责人",
    org: "重庆青年电影展",
    image: "/assets/experience/film-festival.jpg",
    imageAlt: "陈薪竹在重庆青年电影展现场",
    position: "center",
    detail:
      "参与第八至第九届电影展整合策展与运营，打造露天放映、线上影院、拉美精粹等创新单元，统筹 200+ 志愿者、3000+ 影片征集及 65 场活动落地，覆盖 7000+ 线下观众与数万线上用户。",
  },
  {
    time: "2025.06 — 2025.09",
    role: "办公室文员",
    org: "南充市顺庆区委组织部",
    image: "/assets/experience/organization-department.jpg",
    imageAlt: "陈薪竹参加顺庆区基层实习实践活动",
    position: "center 43%",
    detail:
      "负责公文统计流转与资料归档，撰写会议方案、会议记录、网宣文章与机关周报；协助完成财务数据整理和干部考察工作，并运营“顺庆组工”公众号，负责选题策划与美化排版。",
  },
];

const workSections = [
  {
    id: "design",
    number: "01",
    title: "设计类作品",
    en: "Visual Design",
    note: "海报 / 社交媒体视觉 / 课程物料",
    items: ["品牌活动主视觉", "公众号视觉系统", "课程与信息图形"],
  },
  {
    id: "videoWorks",
    number: "02",
    title: "视频类作品",
    en: "Video Works",
    note: "短视频 / 节目传播 / 活动纪录",
    items: ["人物采访与叙事", "节目宣传片", "活动现场纪录"],
  },
  {
    id: "copywriting",
    number: "03",
    title: "文案类作品",
    en: "Copywriting",
    note: "新闻稿 / 脚本串词 / 推文策划",
    items: ["品牌故事与新闻稿", "短视频脚本", "公众号专题策划"],
  },
  {
    id: "operations",
    number: "04",
    title: "运营类作品",
    en: "Operations",
    note: "培训体系 / 社群机制 / 数据看板",
    items: ["新人培训与 SOP", "社群激活方案", "业务数据看板"],
  },
];

function scrollToSection(id) {
  window.dispatchEvent(new CustomEvent("portfolio:navigate", { detail: { id } }));
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const HERO_VIDEO_SRC = "/assets/hero/hero-video.mp4";
const HERO_RESTART_DELAY_MS = 60000;

function PausedLoopVideo({ className }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    let restartTimer = 0;
    let restartAt = 0;
    let disposed = false;

    const clearRestart = () => {
      window.clearTimeout(restartTimer);
      restartTimer = 0;
    };

    const playVideo = () => {
      if (disposed) return;
      video.muted = true;
      video.playsInline = true;
      video.play().catch(() => undefined);
    };

    const restartFromBeginning = () => {
      clearRestart();
      restartAt = 0;
      video.currentTime = 0;
      playVideo();
    };

    const scheduleRestart = () => {
      clearRestart();
      restartAt = Date.now() + HERO_RESTART_DELAY_MS;
      restartTimer = window.setTimeout(restartFromBeginning, HERO_RESTART_DELAY_MS);
    };

    const handleVisibilityChange = () => {
      if (document.hidden || !restartAt) return;

      const remaining = restartAt - Date.now();
      clearRestart();
      if (remaining <= 0) {
        restartFromBeginning();
      } else {
        restartTimer = window.setTimeout(restartFromBeginning, remaining);
      }
    };

    video.addEventListener("ended", scheduleRestart);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      playVideo();
    } else {
      video.addEventListener("canplay", playVideo, { once: true });
    }

    return () => {
      disposed = true;
      clearRestart();
      video.removeEventListener("ended", scheduleRestart);
      video.removeEventListener("canplay", playVideo);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <video ref={videoRef} className={className} muted playsInline autoPlay preload="auto">
      <source src={HERO_VIDEO_SRC} type="video/mp4" />
    </video>
  );
}

function SiteNav() {
  return (
    <nav className="topNav siteNav" aria-label="主导航">
      <button className="brandButton" onClick={() => scrollToSection("hero")} aria-label="返回首页">
        CXZ
      </button>
      <div className="navLinks">
        {navItems.map((item) => (
          <button key={item.target} onClick={() => scrollToSection(item.target)}>
            {item.label}
          </button>
        ))}
      </div>
      <button className="contactNav specularButton" type="button" onClick={() => scrollToSection("contact")}>
        联系我<span>↗</span>
      </button>
    </nav>
  );
}

function ClickSparks({ sparks }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let raf = 0;
    const state = { dpr: Math.min(window.devicePixelRatio || 1, 2) };

    const resize = () => {
      state.dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(width * state.dpr));
      canvas.height = Math.max(1, Math.floor(height * state.dpr));
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    };

    const draw = (now) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scale = state.dpr;
      const duration = 620;

      sparks.forEach((spark) => {
        const elapsed = now - spark.startTime;
        if (elapsed < 0 || elapsed >= duration) return;

        const progress = elapsed / duration;
        const eased = progress * (2 - progress);
        const radius = (10 + eased * 20) * scale;
        const lineLength = (18 * (1 - eased)) * scale;
        const baseX = spark.x * scale;
        const baseY = spark.y * scale;

        for (let i = 0; i < 8; i += 1) {
          const angle = (Math.PI * 2 * i) / 8;
          const x1 = baseX + Math.cos(angle) * radius;
          const y1 = baseY + Math.sin(angle) * radius;
          const x2 = baseX + Math.cos(angle) * (radius + lineLength);
          const y2 = baseY + Math.sin(angle) * (radius + lineLength);

          ctx.strokeStyle = i % 2 === 0 ? "rgba(198,238,77,.96)" : "rgba(255,255,255,.94)";
          ctx.lineWidth = 2 * scale;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [sparks]);

  return <canvas ref={canvasRef} className="clickSparkCanvas" aria-hidden="true" />;
}

function SectionNav() {
  return (
    <nav className="topNav sectionNav" aria-label="main navigation">
      <button className="brandButton" onClick={() => scrollToSection("hero")} aria-label="back to hero">
        CXZ
      </button>
      <div className="navLinks">
        {navItems.map((item) => (
          <button key={item.target} onClick={() => scrollToSection(item.target)}>
            {item.label}
          </button>
        ))}
      </div>
      <button className="contactNav specularButton" type="button" onClick={() => scrollToSection("contact")}>
        联系我 <span>↗</span>
      </button>
    </nav>
  );
}

function ContactClosing() {
  const [copied, setCopied] = useState(false);
  const [mailerOpen, setMailerOpen] = useState(false);
  const mailerTriggerRef = useRef(null);
  const mailerCloseRef = useRef(null);
  const email = "cxz3426987343@163.com";
  const mailProviders = [
    { name: "163 邮箱", mark: "163", href: "https://mail.163.com/" },
    { name: "QQ 邮箱", mark: "QQ", href: "https://mail.qq.com/" },
    { name: "Outlook", mark: "O", href: "https://outlook.live.com/mail/" },
    { name: "Gmail", mark: "G", href: "https://mail.google.com/" },
  ];

  useEffect(() => {
    if (!mailerOpen) return undefined;

    function handleEscape(event) {
      if (event.key === "Escape") setMailerOpen(false);
    }

    window.addEventListener("keydown", handleEscape);
    window.requestAnimationFrame(() => mailerCloseRef.current?.focus());
    return () => {
      window.removeEventListener("keydown", handleEscape);
      mailerTriggerRef.current?.focus();
    };
  }, [mailerOpen]);

  async function copyEmail() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const input = document.createElement("textarea");
        input.value = email;
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        input.remove();
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  function handleCardMove(event) {
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    card.style.setProperty("--card-x", `${(x * 100).toFixed(2)}%`);
    card.style.setProperty("--card-y", `${(y * 100).toFixed(2)}%`);
    card.style.setProperty("--tilt-x", `${((0.5 - y) * 8).toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${((x - 0.5) * 10).toFixed(2)}deg`);
  }

  function resetCard(event) {
    const card = event.currentTarget;
    card.style.setProperty("--card-x", "50%");
    card.style.setProperty("--card-y", "50%");
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <footer className="contactClosing" id="contact">
      <div className="wideShell contactClosingInner">
        <div className="contactClosingCopy">
          <p className="contactClosingKicker">LET&apos;S MAKE SOMETHING MEANINGFUL</p>
          <h2><BlurText text="期待一起创造更多可能" animateBy="letters" direction="bottom" delay={105} className="contactTitleBlur slow" /></h2>
          <div className="contactDetails" aria-label="联系信息">
            <a href="tel:18081589856"><span>电话</span><strong>18081589856</strong></a>
            <a href={`mailto:${email}`}><span>邮箱</span><strong>{email}</strong></a>
          </div>
          <div className="contactActions">
            <button className="contactActionPrimary specularButton" type="button" onClick={copyEmail}>
              {copied ? "邮箱已复制" : "复制邮箱"}<span aria-hidden="true">↗</span>
            </button>
            <button ref={mailerTriggerRef} className="contactActionGhost specularButton" type="button" onClick={() => setMailerOpen(true)} aria-haspopup="dialog">
              写邮件给我<span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>

        <div className="idCardStage" aria-label="陈薪竹个人身份卡片">
          <div className="idCardGlow" aria-hidden="true" />
          <div className="idCardCharacter" aria-hidden="true">
            <div className="idCardLanyard"><i /><b /><em /></div>
            <img src="/assets/contact/contact-character.jpg" alt="" />
          </div>
          <div className="idCard" onPointerMove={handleCardMove} onPointerLeave={resetCard}>
            <div className="idCardShine" aria-hidden="true" />
            <div className="idCardHeader">
              <span className="idCardLabel">CHEN XINZHU / PERSONAL ID</span>
              <img src="/assets/contact/chongqing-university-logo-cropped.png" alt="重庆大学" />
            </div>
            <div className="idCardBody">
              <div className="idCardPortraitWrap">
                <img src="/assets/contact/contact-portrait-v2.png" alt="陈薪竹证件照" />
              </div>
              <div className="idCardInfo">
                <div className="idIdentityTop">
                  <div className="idNameField"><span>姓名 / NAME</span><h3>陈薪竹</h3></div>
                  <div className="idBirthdayField"><span>生日 / BIRTHDAY</span><strong>2001.12.04</strong></div>
                </div>
                <div className="idContactFields">
                  <div><span>电话 / PHONE</span><strong>18081589856</strong></div>
                  <div><span>邮箱 / EMAIL</span><strong>{email}</strong></div>
                </div>
                <div className="idCardCode"><span>CHEN XINZHU</span><i aria-hidden="true" /></div>
              </div>
            </div>
            <div className="idCardFooter"><span>重庆大学 · 新闻与传播</span><span>VALID / 2026</span></div>
          </div>
        </div>
      </div>

      {mailerOpen && (
        <div className="mailerOverlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setMailerOpen(false); }}>
          <div className="mailerDialog" role="dialog" aria-modal="true" aria-labelledby="mailerTitle">
            <div className="mailerHeader">
              <div>
                <span>EMAIL SERVICE</span>
                <h3 id="mailerTitle">选择常用邮箱</h3>
              </div>
              <button ref={mailerCloseRef} type="button" onClick={() => setMailerOpen(false)} aria-label="关闭邮箱选择">×</button>
            </div>
            <div className="mailerOptions">
              {mailProviders.map((provider) => (
                <a key={provider.name} href={provider.href} target="_blank" rel="noreferrer" onClick={() => setMailerOpen(false)}>
                  <i aria-hidden="true">{provider.mark}</i>
                  <strong>{provider.name}</strong>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
            <p>进入邮箱官网后，可将收件人填写为 {email}</p>
          </div>
        </div>
      )}
    </footer>
  );
}

function App() {
  const [activeAbility, setActiveAbility] = useState("visual");
  const [detailOpen, setDetailOpen] = useState(false);
  const [advantagesOpen, setAdvantagesOpen] = useState(false);
  const [sparks, setSparks] = useState([]);
  const activeAbilityData = useMemo(
    () => abilityData.find((item) => item.id === activeAbility) ?? abilityData[0],
    [activeAbility],
  );

  function selectAbility(id) {
    setActiveAbility(id);
    setDetailOpen(true);
  }

  function toggleAdvantages() {
    if (advantagesOpen) setDetailOpen(false);
    setAdvantagesOpen(!advantagesOpen);
  }

  function handlePagePointerDown(event) {
    if (!event.target.closest("button, a")) return;
    const spark = { id: `${Date.now()}-${Math.random()}`, x: event.clientX, y: event.clientY, startTime: performance.now() };
    setSparks((current) => [...current.slice(-5), spark]);
    window.setTimeout(() => {
      setSparks((current) => current.filter((item) => item.id !== spark.id));
    }, 620);
  }

  return (
    <main onPointerDown={handlePagePointerDown}>
      <ClickSparks sparks={sparks} />
      <section className="hero" id="hero" aria-label="首页">
        <SectionNav />
        <div className="heroMedia" aria-hidden="true">
          <PausedLoopVideo className="heroVideo" />
          <div className="heroMediaFallback" />
          <div className="heroLightFlow" />
          <div className="heroGridLines" />
        </div>

        <div className="heroHeadlineOverlay" aria-label="陈薪竹个人作品集">
          <h1 className="heroFlatTitle">
            <span className="heroFlatName">陈薪竹</span>
            <FoldText text="个人作品集" className="heroFlatPortfolio" color="#93bd27" />
          </h1>
        </div>

        <div className="heroInner wideShell">
          <div className="heroGhostTitle" aria-hidden="true">CHEN XINZHU<br />PORTFOLIO</div>
          <div className="heroCopy">
            <h1>
              陈薪竹
              <em>个人作品集</em>
            </h1>
            <p className="heroSubtitle">Chen Xinzhu / Portfolio 2026</p>
          <div className="heroActions">
              <button className="primaryButton specularButton" onClick={() => scrollToSection("strengths")}>
                认识我 <span>↘</span>
              </button>
              <button className="ghostButton specularButton" onClick={() => scrollToSection("works")}>
                查看作品 <span>↘</span>
              </button>
            </div>
          </div>
          <div className="heroCharacter" aria-hidden="true">
            <div className="characterHalo" />
            <svg className="characterOrbit" viewBox="0 0 520 520" aria-hidden="true">
              <defs>
                <path id="characterOrbitPath" d="M260 260 m-214 0 a214 214 0 1 1 428 0 a214 214 0 1 1 -428 0" />
              </defs>
              <text>
                <textPath href="#characterOrbitPath">
                  THINK BEYOND &amp; CREATE BOLDLY &amp; EXECUTE FULLY. · THINK BEYOND &amp; CREATE BOLDLY ·
                </textPath>
              </text>
            </svg>
            <div className="characterFrame">
              <PausedLoopVideo className="characterVideo" />
            </div>
            <span className="characterTag">CREATIVE<br />OPERATOR</span>
          </div>
          <div className="heroAside">
            <span className="heroAsideIndex">2001/12/04</span>
            <p>具备策划-写作-拍摄-剪辑-运营的全流程能力</p>
            <div className="heroAsideRule" />
          </div>
        </div>

        <div className="curvedLoop" aria-hidden="true">
          <div className="curvedLoopTrack">
            <span>THINK BEYOND&CREATE BOLDLY&EXECUTE FULLY.</span>
            <span>THINK BEYOND&CREATE BOLDLY&EXECUTE FULLY.</span>
            <span>THINK BEYOND&CREATE BOLDLY&EXECUTE FULLY.</span>
          </div>
        </div>

      </section>

      <section className="experience sectionPad" id="experience">
        <div className="wideShell">
          <div className="sectionHeader experienceHeader">
            <p className="sectionKicker">Experience / 03</p>
            <h2><BlurText text="个人经历" animateBy="letters" direction="bottom" delay={125} className="sectionTitleBlur slow" /></h2>
          </div>
          <div className="experienceShowcase">
            {experiences.map((item, index) => (
              <article key={`${item.org}-${item.role}`} className="experienceFeature">
                <div className="experienceVisual">
                  <img src={item.image} alt={item.imageAlt} style={{ objectPosition: item.position }} />
                  <span>0{index + 1}</span>
                </div>
                <div className="experienceCopy">
                  <div className="experienceMeta"><span>{item.time}</span><span>0{index + 1} / 04</span></div>
                  <p className="experienceOrg">{item.org}</p>
                  <h3>{item.role}</h3>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="strengths sectionPad" id="strengths">
        <div className="heroStrengthTransition" aria-hidden="true"><span /><i /><b /></div>
        <SectionNav />
        <div className="wideShell">
          <div className="strengthsLayout">
            <div className="strengthIntro">
              <p className="sectionKicker">Strengths / 02</p>
              <h2 className="strengthHeadline"><BlurText text="HI 我是陈薪竹" animateBy="letters" direction="bottom" delay={115} className="strengthHeadlineMain slow" /><BlurText text="从想法到实现，让创意产生价值" animateBy="words" direction="bottom" delay={210} className="strengthHeadlineSub slow" /></h2>
              <div className="educationList">
                <div><strong>重庆大学</strong><span>新闻与传播</span></div>
                <div><strong>四川外国语大学</strong><span>广播电视编导 / 英语</span></div>
              </div>
            </div>
            <div className="strengthPortrait">
              <div className="strengthGhostEnglish" aria-hidden="true">IDEAS INTO IMPACT</div>
              <img src="/assets/portrait/chen-xinzhu-cutout.png" alt="陈薪竹个人形象照" />
            </div>
          </div>
          <div className={`abilityFolder ${advantagesOpen ? "isOpen" : ""}`}>
            <div className="folderCover">
              <span className="folderIndex">CXZ / PERSONAL FILE / 02</span>
              <h3>个人能力档案</h3>
              <p>Personal Strengths Archive</p>
            </div>
            <button className="folderClasp" onClick={toggleAdvantages} aria-expanded={advantagesOpen} aria-controls="ability-radar">
              <span className="claspButton claspButtonTop" aria-hidden="true"><i /></span>
              <span className="claspThread" aria-hidden="true" />
              <span className="claspButton claspButtonBottom" aria-hidden="true"><i /></span>
              <small>{advantagesOpen ? "收起个人优势" : "点击查看我的个人优势"}</small>
            </button>
            <div className="folderBase">
              {advantagesOpen && <div className="radarArea" id="ability-radar">
                <div className="radarHeading"><span>个人能力雷达图</span><small>点击节点查看能力说明</small></div>
                <div className="radarAndDetail">
                  <div className="radarChart">
                    <svg viewBox="0 0 520 520" role="img" aria-label="个人能力雷达图">
                    {[20, 40, 60, 80, 100].map((level) => {
                      const points = abilityData.map((_, index) => {
                        const angle = (-90 + index * (360 / abilityData.length)) * Math.PI / 180;
                        const radius = 190 * level / 100;
                        return `${260 + Math.cos(angle) * radius},${260 + Math.sin(angle) * radius}`;
                      }).join(" " );
                      return <polygon key={level} points={points} className="radarGrid" />;
                    })}
                    {abilityData.map((item, index) => {
                      const angle = (-90 + index * (360 / abilityData.length)) * Math.PI / 180;
                      const x = 260 + Math.cos(angle) * 190;
                      const y = 260 + Math.sin(angle) * 190;
                      const valueRadius = 190 * item.score / 100;
                      const valueX = 260 + Math.cos(angle) * valueRadius;
                      const valueY = 260 + Math.sin(angle) * valueRadius;
                      const labelX = 260 + Math.cos(angle) * 226;
                      const labelY = 260 + Math.sin(angle) * 226;
                      return <g key={item.id} className={`radarNode ${activeAbility === item.id ? "isActive" : ""}`} onClick={() => selectAbility(item.id)} role="button" tabIndex="0" onKeyDown={(event) => { if (event.key === "Enter" || event.key === " " ) selectAbility(item.id); }}>
                        <line x1="260" y1="260" x2={x} y2={y} className="radarAxis" />
                        <circle cx={valueX} cy={valueY} r="7" className="radarPoint" />
                        <circle cx={x} cy={y} r="23" className="radarHit" />
                        <text x={labelX} y={labelY} className="radarLabel" textAnchor="middle" dominantBaseline="middle">{item.title}</text>
                        <text x={valueX} y={valueY - 14} className="radarScore" textAnchor="middle">{item.score}</text>
                      </g>;
                    })}
                    <polygon points={abilityData.map((item, index) => { const angle = (-90 + index * (360 / abilityData.length)) * Math.PI / 180; const radius = 190 * item.score / 100; return `${260 + Math.cos(angle) * radius},${260 + Math.sin(angle) * radius}`; }).join(" " )} className="radarValue" />
                    </svg>
                  </div>
                  {detailOpen && <BorderGlow className="abilityDetailGlow"><article className="abilityDetail" aria-live="polite">
                    <button className="abilityDetailClose" onClick={() => setDetailOpen(false)} aria-label="关闭能力介绍">×</button>
                    <div className="abilityDetailTop"><span>{activeAbilityData.title}</span><strong>{activeAbilityData.score}</strong></div>
                    <div className={`toolTags ${activeAbilityData.plainTools ? "isPlain" : ""} ${activeAbilityData.id === "operation" ? "isSingleLine" : ""}`}>
                      {activeAbilityData.tools.map((tool) => {
                        const icon = toolMark(tool);
                        return <span key={tool}>{icon && <i aria-hidden="true"><img src={icon} alt="" loading="lazy" /></i>}{tool}</span>;
                      })}
                    </div>
                    <p>{activeAbilityData.brief}</p>
                  </article></BorderGlow>}
                </div>
              </div>}
            </div>
          </div>
        </div>
      </section>

      <section className="works sectionPad" id="works">
        <SectionNav />
        <div className="wideShell">
          <div className="sectionHeader worksHeaderCentered">
            <p className="sectionKicker">Selected Works</p>
            <h2><BlurText text="作品展示" animateBy="letters" direction="bottom" delay={125} className="sectionTitleBlur slow" /></h2>
          </div>
          <div className="worksStack">
            {workSections.map((section) => (
              section.id === "design" ? <DesignPortfolio key={section.id} /> : section.id === "videoWorks" ? <VideoPortfolio key={section.id} /> : section.id === "copywriting" ? <CopywritingPortfolio key={section.id} /> : section.id === "operations" ? <OperationsPortfolio key={section.id} /> : (
                <article className="workBand" key={section.id} id={section.id}>
                  <div className="workBandIntro"><span>{section.number} / {section.en}</span><h3>{section.title}</h3><p>{section.note}</p><a href={`#${section.id}`}>进入分区 ↗</a></div>
                  <div className="workCards">
                    {section.items.map((item, index) => (
                      <div className="workCard" key={item}>
                        <div className={`assetSlot assetSlot${index + 1}`}><span>{section.en}</span><strong>{String(index + 1).padStart(2, "0")}</strong><i>待填充</i></div>
                        <h4>{item}</h4>
                        <p>预留封面、项目说明、结果数据与外链位置。</p>
                      </div>
                    ))}
                  </div>
                </article>
              )
            ))}
          </div>
        </div>
      </section>

      <ContactClosing />
    </main>
  );
}

export default App;
