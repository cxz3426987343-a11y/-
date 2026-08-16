# Hero and Vercel Video Delivery Design

## Goal

Restore reliable video playback without changing the portfolio's existing visual design, layout, copy, navigation, animation styling, or interaction model.

## Confirmed Cause

- The Hero and all 13 portfolio videos are tracked by Git LFS.
- The Git commit contains LFS pointer text instead of video bytes.
- The current Vercel deployment therefore cannot be treated as a reliable video origin.
- The Hero source itself is a valid H.264/AAC MP4 and plays locally.
- The old static image appears because `characterVideo` still uses `/assets/portrait/chen-xinzhu.png` as its poster.
- Portfolio videos 01, 06, and 12 use HEVC and require H.264 conversion for broad browser playback.

## Phase 1: Hero Preview

Phase 1 is isolated to the Hero media component and Hero media assets.

1. Keep the existing Hero markup structure and all current CSS unchanged unless a media-state-only rule is required.
2. Start the watermark-free Hero video immediately after the page opens.
3. When playback reaches the end, preserve the final frame for exactly 60 seconds.
4. Restart from time zero after the pause and repeat this cycle.
5. Use a poster extracted from the watermark-free video so the old watermarked/static portrait can never appear as the video fallback.
6. Keep the Hero muted and `playsInline` so browser autoplay remains permitted.
7. Remove only the small Hero video and its generated poster from Git LFS tracking so Vercel receives real files.

Success criteria:

- Both Hero video elements load the same watermark-free source.
- Initial playback begins without a click.
- The last frame remains visible during the one-minute pause.
- Playback restarts after the pause.
- No old poster or watermark is visible.
- No non-Hero page changes.

## Phase 2: Portfolio Video Delivery

Phase 2 begins only after the user approves the Phase 1 preview.

1. Keep Vercel as the frontend host.
2. Store the 13 portfolio videos in Vercel Blob rather than the Git deployment bundle.
3. Convert videos 01, 06, and 12 to H.264/AAC MP4 while retaining their visual content and audio.
4. Centralize the remote media base URL behind a Vite environment variable, with local `/assets` paths as the development fallback.
5. Preserve the current television, ticket, playback controls, titles, order, and all styling.
6. Verify HTTP range delivery and playback for representative small and large videos on the production domain.

## Error Handling

- Hero playback retries only when media is ready; failed play promises do not create duplicate timers.
- A scheduled Hero restart is cleared before another one is created and during component cleanup.
- Portfolio player keeps the existing visible error state if a remote object is unavailable.
- No secret Blob token is committed to Git; only public media URLs or a public base URL are exposed to the frontend.

## Verification

- Run the asset verifier and production build.
- Inspect both Hero video elements in the browser for source, readiness, playback, end state, and restart.
- Confirm that the repository contains real Hero media bytes rather than an LFS pointer.
- After Phase 2 deployment, inspect response headers and play multiple portfolio videos on the real Vercel URL.

## Explicit Non-Goals

- No responsive redesign.
- No changes to unrelated images, typography, spacing, navigation, copy, or effects.
- No mainland hosting or mobile optimization work in this change.
