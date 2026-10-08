import { ArchiveReaderDocument } from '@/components/archive-entry-view';
import ArchiveReaderShell from '@/components/archive-reader-shell';
import { archiveEntries } from '@/lib/archive';

export default function Entry003Reader() {
  const entry = archiveEntries.find((item) => item.slug === 'entry003')!;
  return (
    <ArchiveReaderShell>
      <ArchiveReaderDocument entry={entry} />
    </ArchiveReaderShell>
  );
}
