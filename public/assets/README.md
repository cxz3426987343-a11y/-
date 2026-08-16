# Static Assets

This directory is part of the runtime application and must be preserved for a complete offline clone.

- `hero/`: hero background video.
- `portrait/`: profile, cutout, and lock-screen images.
- `contact/`: contact-page portraits and university logo.
- `experience/`: work-experience photography.
- `design/`: design portfolio images grouped by category.
- `video/`: 13 video works. These files require Git LFS.
- `copywriting/`: processed article, plan, commentary, case, transcript, and script images.
- `operations/`: social-media account pages and post/article images.
- `logos/`: application and platform logos used by the interface.

Do not rename files without updating the corresponding data modules in `src/`. Run `pnpm check:assets` after every asset change.
