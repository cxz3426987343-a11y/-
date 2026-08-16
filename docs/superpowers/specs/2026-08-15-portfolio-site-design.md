# Portfolio Site Design

## Goal

Build a first runnable React + Vite personal portfolio site for Chen Xinzhu, a graduate student preparing for autumn recruitment. The target roles are new media, content, training operations, and related operations positions.

## Content Source

The first version uses the combined information from the local resume files:

- Chen Xinzhu, female, 24, master's student in Chongqing.
- Chongqing University, Journalism and Communication graduate student, recommended admission, top 15%.
- Sichuan International Studies University, Broadcasting and Television Directing plus English dual degree, top 1%.
- ByteDance / Dongchedi training operations and activity/user operations experience.
- Chongqing TV assistant director experience.
- Chongqing Youth Film Festival operations coordination experience.
- Campus publicity, teaching assistant, writing, event planning, media, and student work experience.
- Skills include PS, PR, AE, Jianying, Canva, Keling, Office, Xiumi, AI agents, data dashboards, English, Mandarin, and teaching certificate.

## Visual Direction

The site should feel premium, editorial, and personal rather than like a template. The first version will use a restrained dark first screen, ivory text, low-saturation green, and champagne gold accents. It will avoid a generic card-heavy landing page look.

The hero headline should be:

- Chinese: "陈薪竹 个人作品集"
- English: "Chen Xinzhu Portfolio"

The hero will reserve a video background slot. Until real video is provided, it will use a placeholder surface that can later be replaced by a local video asset.

## Page Structure

The site will be a single-page React application with visually separated full-screen or near-full-screen sections:

1. Hero: full viewport, video placeholder background, minimal navigation, main title, English subtitle, contact button, and buttons to jump to profile or works.
2. Profile: separate from hero, with portrait placeholder, concise personal introduction, contact details, education and experience highlights.
3. Six Dimensions: six clickable ability entries that jump to the strengths section.
4. Strengths: ability cards for content planning, copywriting, video production, training operations, activity/community operations, and AI/data tooling.
5. Design Works: placeholder gallery for posters, layouts, and visual design work.
6. Video Works: placeholder gallery for short videos, program clips, editing projects, and future embedded media.
7. Copywriting Works: placeholder gallery for news drafts, scripts, speeches, articles, and social posts.
8. Operations Works: placeholder gallery for training systems, community operations, activity planning, dashboards, and SOP assets.

## Interaction

Navigation links use smooth scrolling. The hero CTA jumps to the profile or works section. Clicking any six-dimensional ability item jumps to the strengths section and highlights the corresponding card.

## Technical Design

Use React + Vite. Keep implementation simple for the first version:

- `src/App.jsx` holds page structure and content data arrays.
- `src/App.css` holds layout, color system, responsive desktop-first styling, and animations.
- `public/` reserves folders for future assets such as portrait images, hero video, design works, video thumbnails, copywriting screenshots, and operations screenshots.

The page width should be constrained around 1700px on desktop. Basic mobile responsiveness is included, but PC display quality is the priority.

## Verification

The first version should run with the local Vite dev server. Verification includes installing dependencies if needed, running the dev server, checking that the page loads, and confirming the main sections and navigation anchors work.
