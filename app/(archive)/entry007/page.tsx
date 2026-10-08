import type { Metadata } from 'next';
import { ArchiveStandaloneEntry } from '@/components/archive-entry-view';
import { archiveEntries } from '@/lib/archive';

export const metadata: Metadata = {
  title: 'ENTRY #004 ONSRA BABY!',
  alternates: { canonical: '/entry007/' },
};

export default function Entry007() {
  const entry = archiveEntries.find((item) => item.slug === 'entry007')!;
  return <ArchiveStandaloneEntry entry={entry} />;
}
