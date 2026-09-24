import Image from 'next/image';
import { Fragment } from 'react';
import type { ArchiveEntry } from '@/lib/archive';

export function ArchiveEntryDocument({ entry }: { entry: ArchiveEntry }) {
  return (
    <article className="archive-paper">
      <header className="archive-entry-meta">
        <h1 className="archive-entry-title">
          {entry.displayTitle ?? `ENTRY #${entry.number}`}
        </h1>
        <time className="archive-entry-date" dateTime={entry.posted.iso}>
          {entry.posted.label}
        </time>
      </header>
      {entry.title && <p className="archive-entry-heading">{entry.title}</p>}
      {entry.embed && (
        <div className="archive-embed">
          <iframe
            src={entry.embed.src}
            title={entry.embed.title}
            data-testid="embed-iframe"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      )}
      <div className="archive-prose">
        {entry.paragraphs.map((paragraph, index) => (
          <Fragment key={index}>
            <p>{paragraph}</p>
            {entry.attachment && entry.attachmentAfterParagraph === index && (
              <figure className="archive-attachment">
                <Image
                  {...entry.attachment}
                  sizes="(max-width: 600px) calc(100vw - 80px), 610px"
                />
              </figure>
            )}
          </Fragment>
        ))}
      </div>
      {entry.attachment && entry.attachmentAfterParagraph === undefined && (
        <figure className="archive-attachment">
          <Image
            {...entry.attachment}
            sizes="(max-width: 600px) calc(100vw - 80px), 610px"
          />
        </figure>
      )}
    </article>
  );
}
