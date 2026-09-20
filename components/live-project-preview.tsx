'use client';

import { useEffect, useRef } from 'react';

const VIRTUAL_WIDTH = 1440;

export function LiveProjectPreview({
  name,
  url,
  reveal = false,
}: {
  name: string;
  url: string;
  reveal?: boolean;
}) {
  const frameRef = useRef<HTMLAnchorElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const viewport = viewportRef.current;
    if (!frame || !viewport) return;

    const updateScale = () => {
      const scale = viewport.clientWidth / VIRTUAL_WIDTH;
      frame.style.setProperty('--preview-scale', String(scale));
    };
    const observer = new ResizeObserver(updateScale);
    observer.observe(viewport);
    updateScale();

    return () => observer.disconnect();
  }, []);

  return (
    <a
      ref={frameRef}
      className="project-image-frame project-live-preview"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      data-slide={reveal ? 'out' : undefined}
      aria-label={`Open ${name} in a new tab`}
    >
      <div className="project-window">
        <div className="project-window-bar" aria-hidden="true">
          <span className="project-window-dot project-window-dot-red" />
          <span className="project-window-dot project-window-dot-yellow" />
          <span className="project-window-dot project-window-dot-green" />
        </div>
        <div ref={viewportRef} className="project-live-viewport">
          <iframe
            className="project-live-iframe"
            src={url}
            title={`${name} live preview`}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            tabIndex={-1}
          />
        </div>
      </div>
    </a>
  );
}
