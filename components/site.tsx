import Link from 'next/link';
import Image from 'next/image';
import {
  experience,
  type Project,
  type Writing,
  type MediaRecord,
} from '@/lib/content';
export { Navigation } from './navigation';
export function Arrow() {
  return (
    <span aria-hidden="true" className="arrow">
      ↗
    </span>
  );
}
export function SectionHeading({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <h2>
        <span className="section-number">{number}</span>
        {title}
      </h2>
      {children}
    </div>
  );
}
export function ProjectPreview({
  project,
  label = 'Live app',
  screenshot,
  featured = false,
  reveal = false,
}: {
  project: Pick<Project, 'slug' | 'name' | 'liveUrl' | 'description' | 'tech'>;
  label?: React.ReactNode;
  screenshot?: { src: string; width: number; height: number; alt: string };
  featured?: boolean;
  reveal?: boolean;
}) {
  return (
    <article
      id={project.slug}
      className={featured ? 'project project-featured' : 'project'}
      data-slide={reveal ? 'out' : undefined}
    >
      <div className="project-top">
        <span className="eyebrow">● {label}</span>
        {project.liveUrl && (
          <a
            className="project-external"
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.name} in a new tab`}
          >
            <Arrow />
          </a>
        )}
      </div>
      {screenshot && (
        <Image
          {...screenshot}
          className="project-screenshot"
          sizes="(max-width: 700px) calc(100vw - 82px), (max-width: 1000px) calc(100vw - 114px), 733px"
        />
      )}
      <h3>
        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            {project.name}
          </a>
        ) : (
          project.name
        )}
      </h3>
      <p className="project-description">{project.description}</p>
      {project.tech.length > 0 && (
        <div className="project-bottom">
          <span>{project.tech.join(' · ')}</span>
        </div>
      )}
    </article>
  );
}
export function CurrentStatus() {
  return (
    <aside
      id="currently"
      className="currently"
      aria-labelledby="currently-title"
    >
      <div className="section-heading" data-slide="out">
        <h2 id="currently-title">
          <span className="live-dot" aria-hidden="true" />
          CURRENTLY
        </h2>
      </div>
      <dl className="status-board">
        <div data-slide="out">
          <dt>Studying</dt>
          <dd>Bachelor of Information Technology (Internet of Things)</dd>
        </div>
        <div data-slide="out">
          <dt>Building</dt>
          <dd>
            <Link href="/#rapidkl-companion">RapidKL Companion ↗</Link>
          </dd>
        </div>
        <div data-slide="out">
          <dt>Working</dt>
          <dd>
            University &amp; a current role
            <span className="detail">Role details to come</span>
          </dd>
        </div>
      </dl>
      <div className="off-hours">
        <span className="eyebrow" data-slide="out">
          Away from the keyboard
        </span>
        <dl className="status-board secondary">
          <div data-slide="out">
            <dt>Listening</dt>
            <dd>
              <span className="album-title">
                you seem pretty sad for a girl so in love
              </span>{' '}
              — Olivia Rodrigo
            </dd>
          </div>
          <div data-slide="out">
            <dt>Reading</dt>
            <dd>Just Kids by Patti Smith</dd>
          </div>
          <div data-slide="out">
            <dt>Watching</dt>
            <dd>FX&apos;s Adults</dd>
          </div>
        </dl>
      </div>
    </aside>
  );
}
export function WritingPreview({ writing }: { writing: Writing }) {
  return (
    <article className="writing-preview">
      <div className="writing-meta">
        <span>{writing.kind}</span>
        <time dateTime={writing.dateISO}>{writing.date}</time>
      </div>
      <h3>
        <Link href={`/media/writing/${writing.slug}`}>
          {writing.title}
          <Arrow />
        </Link>
      </h3>
      <p>{writing.excerpt}</p>
    </article>
  );
}
export function ExperienceTimeline() {
  return (
    <ol className="timeline">
      {experience.map((item) => (
        <li key={item.role}>
          <p className="eyebrow timeline-date">{item.dates}</p>
          <div>
            <h3>{item.role}</h3>
            <p className="company">{item.company}</p>
            <p>{item.description}</p>
            <ul>
              {item.lessons.map((lesson) => (
                <li key={lesson}>{lesson}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
export function MediaEntry({ entry }: { entry: MediaRecord }) {
  return (
    <article className="media-entry">
      <span className="eyebrow">{entry.state}</span>
      <h3>{entry.title}</h3>
      <p className="small muted">{entry.creator}</p>
      <p>{entry.note}</p>
      <span className="tiny muted">{entry.date} · Placeholder entry</span>
    </article>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner" data-slide="out">
        <span className="footer-icon" aria-hidden="true" />
        <span>© 2026 SHAHRUL AZIB</span>
        <span aria-hidden="true">☆</span>
      </div>
    </footer>
  );
}
