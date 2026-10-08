import type { Metadata } from 'next';
import { ArchiveStandaloneEntry } from '@/components/archive-entry-view';
import { archiveEntries } from '@/lib/archive';

export const metadata: Metadata = {
  title: '#001',
  alternates: { canonical: '/entry001/' },
};

export default function Entry001() {
  const entry = archiveEntries.find((item) => item.slug === 'entry001')!;
  return <ArchiveStandaloneEntry entry={entry} />;
}
