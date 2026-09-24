import type { Metadata } from 'next';
import Link from 'next/link';
import { ArchiveEntrance } from '@/components/archive-entrance';
import { archiveEntries } from '@/lib/archive';

export const metadata: Metadata = { alternates: { canonical: '/' } };

export default function ArchiveIndex() {
  return (
    <main id="archive-main" className="archive-index" tabIndex={-1}>
      <ArchiveEntrance />
      <h1>archive</h1>
      <ol
        className="archive-entries"
        aria-label="Journal entries, newest first"
      >
        {archiveEntries.map((entry) => (
          <li key={entry.slug}>
            <Link href={`/${entry.slug}/`}>
              <span>{entry.displayTitle ?? `ENTRY #${entry.number}`}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
