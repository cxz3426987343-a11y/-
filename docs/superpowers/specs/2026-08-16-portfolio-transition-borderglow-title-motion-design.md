# Portfolio transition, BorderGlow, and title motion design

## Scope

This iteration adjusts the Hero-to-strengths transition, strengths typography, ability-detail border animation, Hero action placement, and section-title entrance motion. Existing content, navigation behavior, portfolio interactions, and contact layout remain unchanged.

## Hero and strengths spacing

- Increase the visual breathing room between the Hero and strengths section without introducing a blank-looking band.
- Move the Hero action buttons upward so the bottom transition gradient does not obscure their borders or labels.
- Keep the current light, lime, and black palette.
- Extend the transition treatment through the added space using restrained light ribbons rather than a hard section edge.

## Strengths typography and English accent

- Remove `IDEAS INTO IMPACT` from behind the left-side heading.
- Reposition it at the lower-right of the portrait composition.
- Render it in lime green with low opacity, without heavy blur, so it reads as a graphic caption rather than a background watermark.
- Keep the Chinese heading dominant and preserve the current portrait scale.

## BorderGlow behavior

- Remove the full conic-gradient rotation and all 360-degree spinning transforms.
- Keep a stable one-pixel frame around the ability detail card.
- Add one short lime/white highlight that travels continuously around the rectangular edge.
- Keep the moving highlight clipped to the border path; it must not rotate behind or wash across the card body.
- Pointer proximity may increase highlight intensity, but must not change the card position or trigger rotation.
- Respect `prefers-reduced-motion` by disabling travel while retaining the static border.

## Title entrance motion

- Slow the strengths title entrance so blur, opacity, and vertical movement are clearly visible.
- Apply the same restrained entrance pattern to the major titles that follow: experience, selected works, and each portfolio category heading.
- Trigger each title once when it enters the viewport.
- Preserve final typography after the animation completes; no looping or continuous title motion.
- Use the existing local `BlurText` implementation and extend its props instead of adding a new animation dependency.

## Responsive behavior

- Reduce the added section gap on tablet and mobile.
- Keep the Hero buttons above the transition on all viewport sizes.
- Ensure the portrait-side English accent does not overlap the face or crop outside the strengths section.
- Maintain readable title wrapping on narrow screens.

## Verification

- Production build passes.
- Hero buttons remain fully visible above the transition.
- `IDEAS INTO IMPACT` appears only near the portrait.
- Ability detail BorderGlow shows edge travel without any rotating background.
- All targeted headings animate once on entry and remain static afterward.
