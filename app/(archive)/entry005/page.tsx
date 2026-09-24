import type { Metadata } from 'next';
import Link from 'next/link';
import { ArchiveEntryDocument } from '@/components/archive-entry-document';
import { archiveEntries } from '@/lib/archive';

export const metadata: Metadata = {
  title: 'archive 260702 0338',
  alternates: { canonical: '/entry005/' },
};

export default function Entry005() {
  const entry = archiveEntries.find((item) => item.slug === 'entry005')!;

  return (
    <main id="archive-main" className="archive-entry" tabIndex={-1}>
      <nav className="archive-back" aria-label="Archive navigation">
        <Link href="/archive/">← ALL ENTRIES</Link>
      </nav>
      <ArchiveEntryDocument entry={entry} />
      <Link className="archive-end" href="/archive/">
        ← BACK TO ARCHIVE
      </Link>
    </main>
  );
}
