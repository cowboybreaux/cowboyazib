import type { Metadata } from 'next';
import { ArchiveEntryDocument } from '@/components/archive-entry-document';
import { ArchiveEntryLink } from '@/components/archive-entry-link';
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
            <ArchiveEntryLink
              href={`/${entry.slug}/`}
              title={entry.displayTitle ?? `ENTRY #${entry.number}`}
              date={entry.posted.label}
              panel={<ArchiveEntryDocument entry={entry} />}
            >
              <span>{entry.displayTitle ?? `ENTRY #${entry.number}`}</span>
              <span aria-hidden="true">→</span>
            </ArchiveEntryLink>
          </li>
        ))}
      </ol>
    </main>
  );
}
