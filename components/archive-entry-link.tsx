'use client';

import Link from 'next/link';
import type { MouseEvent, ReactNode } from 'react';

type ArchiveEntryLinkProps = {
  href: string;
  label: string;
  children: ReactNode;
};

export function ArchiveEntryLink({
  href,
  label,
  children,
}: ArchiveEntryLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const root = document.documentElement;
    root.style.setProperty(
      '--archive-origin-x',
      `${rect.left + rect.width / 2}px`,
    );
    root.style.setProperty(
      '--archive-origin-y',
      `${rect.top + rect.height / 2}px`,
    );
    root.style.setProperty('--archive-origin-width', `${rect.width}px`);
    root.style.setProperty('--archive-origin-height', `${rect.height}px`);
  };

  return (
    <Link
      href={href}
      aria-label={label}
      onClick={handleClick}
      scroll={false}
      data-archive-entry-link
    >
      {children}
    </Link>
  );
}
