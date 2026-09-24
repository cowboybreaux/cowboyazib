import type { Metadata } from 'next';
import Link from 'next/link';
import { ArchiveEntryDocument } from '@/components/archive-entry-document';
import { archiveEntries } from '@/lib/archive';

export const metadata: Metadata = {
  title: 'archive 260729 1138',
  alternates: { canonical: '/entry004/' },
};

export default function Entry004() {
  const entry = archiveEntries.find((item) => item.slug === 'entry004')!;

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
