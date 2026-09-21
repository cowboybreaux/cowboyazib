/** Scroll to the actual section start, accounting for the header exactly once. */
export function scrollToSection(id: string) {
  const section = document.getElementById(id);
  if (!section) return;

  const headerHeight =
    document.querySelector('.masthead')?.getBoundingClientRect().height ?? 0;
  const top = Math.max(
    0,
    section.getBoundingClientRect().top + window.scrollY - headerHeight,
  );
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;
  const lenis = window.__cowboyLenis;

  if (lenis) {
    lenis.resize();
    // A numeric destination avoids Lenis applying CSS scroll-padding again.
    lenis.scrollTo(top, { duration: 1.15, immediate: reducedMotion });
  } else {
    window.scrollTo({ top, behavior: reducedMotion ? 'instant' : 'smooth' });
  }
}
