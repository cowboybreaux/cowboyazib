'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { scrollToSection } from '@/lib/section-navigation';

declare global {
  interface Window {
    __cowboyLenis?: Lenis;
  }
}

export function SmoothScroll() {
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
      ) return;
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;
      const id = decodeURIComponent(hash.slice(1));
      if (!document.getElementById(id)) return;
      event.preventDefault();
      scrollToSection(id);
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    if (reducedMotion.matches) return;

    const touchDevice = window.matchMedia('(pointer: coarse)').matches;
    const lenis = new Lenis({
      autoRaf: false,
      lerp: touchDevice ? 0.16 : 0.1,
      smoothWheel: !touchDevice,
      syncTouch: false,
      touchMultiplier: 1,
      anchors: false,
    });
    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };

    window.__cowboyLenis = lenis;
    document.documentElement.classList.add('lenis');
    frame = window.requestAnimationFrame(raf);

    const handleMotionChange = () => {
      if (reducedMotion.matches) {
        lenis.destroy();
        window.cancelAnimationFrame(frame);
        delete window.__cowboyLenis;
        document.documentElement.classList.remove('lenis');
      }
    };
    reducedMotion.addEventListener('change', handleMotionChange);

    return () => {
      reducedMotion.removeEventListener('change', handleMotionChange);
      window.cancelAnimationFrame(frame);
      lenis.destroy();
      delete window.__cowboyLenis;
      document.documentElement.classList.remove('lenis');
    };
  }, []);

  return null;
}
