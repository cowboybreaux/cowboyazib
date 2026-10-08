import Link from 'next/link';
import { ArchiveEntryDocument } from '@/components/archive-entry-document';
import { archiveEntries, type ArchiveEntry } from '@/lib/archive';

function entryLabel(entry: ArchiveEntry) {
  return entry.displayTitle ?? `ENTRY #${entry.number}`;
}

export function ArchiveEntryPager({
  entry,
  replace = false,
}: {
  entry: ArchiveEntry;
  replace?: boolean;
}) {
  const index = archiveEntries.findIndex((item) => item.slug === entry.slug);
  const newer = index > 0 ? archiveEntries[index - 1] : undefined;
  const older =
    index < archiveEntries.length - 1 ? archiveEntries[index + 1] : undefined;

  return (
    <nav className="archive-entry-pager" aria-label="Other archive entries">
      <div>
        {newer ? (
          <Link href={`/${newer.slug}/`} replace={replace} scroll={false}>
            <span>NEWER</span>
            {entryLabel(newer)}
          </Link>
        ) : (
          <span className="archive-pager-empty">LATEST ENTRY</span>
        )}
      </div>
      <div>
        {older ? (
          <Link href={`/${older.slug}/`} replace={replace} scroll={false}>
            <span>OLDER</span>
            {entryLabel(older)}
          </Link>
        ) : (
          <span className="archive-pager-empty">END OF ARCHIVE</span>
        )}
      </div>
    </nav>
  );
}

export function ArchiveReaderDocument({ entry }: { entry: ArchiveEntry }) {
  return (
    <div className="archive-reader-document">
      <ArchiveEntryDocument entry={entry} />
      <ArchiveEntryPager entry={entry} replace />
    </div>
  );
}

export function ArchiveStandaloneEntry({ entry }: { entry: ArchiveEntry }) {
  return (
    <main id="archive-main" className="archive-entry" tabIndex={-1}>
      <nav className="archive-back" aria-label="Archive navigation">
        <Link href="/archive/">← ALL ENTRIES</Link>
      </nav>
      <ArchiveEntryDocument entry={entry} />
      <ArchiveEntryPager entry={entry} />
      <Link className="archive-end" href="/archive/">
        ← BACK TO ARCHIVE
      </Link>
    </main>
  );
}
