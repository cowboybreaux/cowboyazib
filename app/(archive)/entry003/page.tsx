import type { Metadata } from 'next';
import { ArchiveStandaloneEntry } from '@/components/archive-entry-view';
import { archiveEntries } from '@/lib/archive';

export const metadata: Metadata = {
  title: 'archive 260811 0031',
  alternates: { canonical: '/entry003/' },
};

export default function Entry003() {
  const entry = archiveEntries.find((item) => item.slug === 'entry003')!;
  return <ArchiveStandaloneEntry entry={entry} />;
}
