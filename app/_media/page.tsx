import type { Metadata } from 'next';
import { SectionHeading, WritingPreview, MediaEntry } from '@/components/site';
import { writings, media } from '@/lib/content';
export const metadata: Metadata = {
  title: 'Media',
  description:
    'Poetry, short prose, and a small shelf of things listened to, read, and watched.',
};
export default function Media() {
  return (
    <main id="main" tabIndex={-1}>
      <header className="page-intro media-intro">
        <p className="eyebrow accent">02 / Away from the keyboard</p>
        <h1>Words &amp; other company.</h1>
        <p className="page-deck">Writing, music, books, and films.</p>
      </header>
      <nav className="archive-nav" aria-label="Media sections">
        <a href="#writing">
          Writing <span>03</span>
        </a>
        <a href="#listening">Listening</a>
        <a href="#reading">Reading</a>
        <a href="#watching">Watching</a>
      </nav>
      <section id="writing" className="archive-writing">
        <div className="archive-margin">
          <span className="eyebrow accent">From my notebook</span>
          <h2>Writing</h2>
          <p>Poetry and short prose.</p>
          <p className="tiny muted">
            Sample text and dates · Not original work by Azib.
          </p>
        </div>
        <div className="archive-list">
          {writings.map((writing) => (
            <WritingPreview key={writing.slug} writing={writing} />
          ))}
        </div>
      </section>
      <section className="shelf">
        <SectionHeading number="02" title="Keeping me company" />
        <div className="shelf-grid">
          {Object.entries(media).map(([category, entries]) => (
            <section id={category.toLowerCase()} key={category}>
              <h3 className="shelf-title">{category}</h3>
              {entries.map((entry) => (
                <MediaEntry key={entry.title} entry={entry} />
              ))}
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
