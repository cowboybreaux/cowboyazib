'use client';

import Link from 'next/link';
import type { MouseEvent, ReactNode } from 'react';
import { useArchiveTransition } from '@/components/archive-transition';

type ArchiveEntryLinkProps = {
  href: string;
  title: string;
  date: string;
  panel: ReactNode;
  children: ReactNode;
};

export function ArchiveEntryLink({
  href,
  title,
  date,
  panel,
  children,
}: ArchiveEntryLinkProps) {
  const transition = useArchiveTransition();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!transition) return;

    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    transition.open(
      {
        href,
        title,
        date,
        panel,
        origin: {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: rect.width,
          height: rect.height,
        },
      },
      event,
    );
  };

  return (
    <Link href={href} onClick={handleClick}>
      {children}
    </Link>
  );
}
