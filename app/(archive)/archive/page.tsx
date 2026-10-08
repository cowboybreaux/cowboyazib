import type { Metadata } from 'next';
import { ArchiveEntryLink } from '@/components/archive-entry-link';
import { ArchiveHeadingStar } from '@/components/archive-entrance';
import { archiveEntries } from '@/lib/archive';

export const metadata: Metadata = { alternates: { canonical: '/' } };

export default function ArchiveIndex() {
  return (
    <main id="archive-main" className="archive-index" tabIndex={-1}>
      <div className="archive-index-heading">
        <p>FRAGMENTS, NOTES &amp; THINGS I COULDN&apos;T LEAVE UNWRITTEN</p>
        <h1>
          archive
          <ArchiveHeadingStar />
        </h1>
      </div>
      <ol className="archive-wall" aria-label="Journal entries, newest first">
        {archiveEntries.map((entry, index) => (
          <li
            key={entry.slug}
            className={index === 0 ? 'is-featured' : undefined}
          >
            <ArchiveEntryLink
              href={`/${entry.slug}/`}
              label={`Open ${entry.displayTitle ?? `ENTRY #${entry.number}`}, ${entry.posted.label}`}
            >
              <article className="archive-fragment">
                <header className="archive-fragment-meta">
                  <span>{entry.displayTitle ?? `ENTRY #${entry.number}`}</span>
                  <span className="archive-fragment-star" aria-hidden="true">
                    ★
                  </span>
                </header>
                {entry.title && (
                  <h2 className="archive-fragment-title">{entry.title}</h2>
                )}
                <p className="archive-fragment-excerpt">
                  {entry.paragraphs[0]}
                </p>
                <footer className="archive-fragment-footer">
                  <time dateTime={entry.posted.iso}>{entry.posted.label}</time>
                  <span aria-hidden="true">OPEN ↗</span>
                </footer>
              </article>
            </ArchiveEntryLink>
          </li>
        ))}
      </ol>
    </main>
  );
}
