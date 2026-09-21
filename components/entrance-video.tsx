'use client';

import { useEffect, useRef } from 'react';

export function EntranceVideo() {
  const layer = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const element = layer.current;
    const player = video.current;
    const section = element?.closest('section');
    if (!element || !player || !section) return;

    const desktop = window.matchMedia('(min-width: 1001px)');
    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = section.getBoundingClientRect();
      // Extend behind the actual navigation height without moving hero content.
      element.style.setProperty(
        '--entrance-top',
        `${bounds.top + window.scrollY}px`,
      );
      element.style.setProperty(
        '--entrance-width',
        `${document.documentElement.clientWidth}px`,
      );
      const progress = Math.min(
        1,
        Math.max(0, window.scrollY / (bounds.height * 0.85)),
      );
      element.style.setProperty('--dissolve-height', `${32 + progress * 58}%`);
      if (window.matchMedia('(max-width: 1000px)').matches) {
        const sectionScroll = Math.max(0, -bounds.top);
        const parallax = Math.min(140, sectionScroll * 0.15);
        element.style.setProperty(
          '--entrance-parallax-y',
          `${parallax}px`,
        );
      } else {
        element.style.setProperty('--entrance-parallax-y', '0px');
      }
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const configure = () => {
      update();
      if (desktop.matches) {
        // Assign the source only on desktop: mobile never downloads the video.
        if (!player.getAttribute('src')) player.src = '/videos/entrance.mp4';
        player.defaultPlaybackRate = 1.2;
        player.playbackRate = 1.2;
        void player.play().catch(() => {});
      } else {
        player.pause();
        player.removeAttribute('src');
        player.load();
      }
    };
    configure();
    desktop.addEventListener('change', configure);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      cancelAnimationFrame(frame);
      desktop.removeEventListener('change', configure);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  return (
    <div ref={layer} className="entrance-video" aria-hidden="true">
      <div className="entrance-video-media" />
      <video ref={video} autoPlay loop muted playsInline preload="none" />
      <div className="entrance-video-dissolve" />
    </div>
  );
}
