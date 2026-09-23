import Link from 'next/link';
import Image from 'next/image';
import {
  experience,
  type Project,
  type Writing,
  type MediaRecord,
} from '@/lib/content';
import { LiveProjectPreview } from './live-project-preview';
export { Navigation } from './navigation';
export function Arrow() {
  return (
    <svg
      aria-hidden="true"
      className="arrow"
      viewBox="0 0 20 20"
      focusable="false"
    >
      <line x1="3" y1="17" x2="17" y2="3" />
      <polyline points="9,3 17,3 17,11" />
    </svg>
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
  previewUrl,
  status,
  featured = false,
  reveal = false,
}: {
  project: Pick<Project, 'slug' | 'name' | 'liveUrl' | 'description' | 'tech'>;
  label?: React.ReactNode;
  screenshot?: { src: string; width: number; height: number; alt: string };
  previewUrl?: string;
  status?: string;
  featured?: boolean;
  reveal?: boolean;
}) {
  return (
    <article
      id={project.slug}
      className={
        featured
          ? `project project-featured project-${project.slug}`
          : 'project'
      }
    >
      <div className="project-top" data-slide={reveal ? 'out' : undefined}>
        <span className="eyebrow project-live-label">{label}</span>
      </div>
      {previewUrl ? (
        <LiveProjectPreview
          name={project.name}
          url={project.liveUrl ?? previewUrl}
          reveal={reveal}
        />
      ) : screenshot ? (
        <div
          className="project-image-frame"
          data-slide={reveal ? 'out' : undefined}
        >
          <Image
            {...screenshot}
            className="project-screenshot"
            sizes="(max-width: 700px) calc(100vw - 82px), (max-width: 1000px) calc(100vw - 114px), 733px"
          />
        </div>
      ) : (
        <div
          className="project-image-frame project-placeholder"
          data-slide={reveal ? 'out' : undefined}
          aria-hidden="true"
        >
          <div className="project-placeholder-art">
            <span className="project-placeholder-number" />
            <div className="project-placeholder-topline">
              <span>Selected project / Digital systems</span>
              <span className="project-placeholder-star" aria-hidden="true" />
            </div>
            <span className="project-placeholder-title">{project.name}</span>
            <div className="project-placeholder-meta">
              <span>{project.tech.join(' / ')}</span>
              <span className="project-placeholder-registration">+</span>
            </div>
          </div>
        </div>
      )}
      <div className="project-info">
        <h3 data-slide={reveal ? 'out' : undefined}>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.name} <Arrow />
            </a>
          ) : (
            project.name
          )}
        </h3>
        <p
          className="project-description"
          data-slide={reveal ? 'out' : undefined}
        >
          {project.description}
        </p>
        {status && (
          <span className="project-status" data-slide={reveal ? 'out' : undefined}>
            {status}
          </span>
        )}
        {project.tech.length > 0 && (
          <div
            className="project-bottom"
            data-slide={reveal ? 'out' : undefined}
          >
            <span>{project.tech.join(' · ')}</span>
          </div>
        )}
      </div>
    </article>
  );
}
export function AboutMe() {
  return (
    <section id="about-me" className="about-me" aria-label="About me">
      <div data-slide="out">
        <SectionHeading number="01" title="ABOUT ME" />
      </div>
      <div className="about-me-grid">
        <div className="about-me-copy">
          <p data-slide="out">
            Information Technology (Internet of Things) undergraduate with a background in telecommunications and experience across software development, data analytics, UI/UX prototyping, and customer-facing retail. Skilled in building practical digital projects using technologies such as Next.js, React, Java, Python, SQL, and IoT platforms, with a growing focus on data analytics and human-centered product design.
          </p>
          <p data-slide="out">
            Alongside technical work, brings strong communication, visual sensibility, and customer experience skills developed through retail and collaborative projects. Particularly interested in creating digital experiences that are functional, accessible, visually distinctive, and grounded in real-world user needs.
          </p>
        </div>
        <dl className="status-board about-me-status">
          <div data-slide="out">
            <dt>Studying</dt>
            <dd>Bachelor of Information Technology (Internet of Things)</dd>
          </div>
          <div data-slide="out">
            <dt>University</dt>
            <dd>Universiti Kuala Lumpur (MIIT)</dd>
          </div>
          <div data-slide="out">
            <dt>Working</dt>
            <dd>Part time educator @ Lululemon</dd>
          </div>
          <div data-slide="out">
            <dt>Building</dt>
            <dd>Lululemon Reimagined <span className="detail">In progress</span></dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

export function AwayFromKeyboard() {
  return (
    <aside className="currently" aria-label="Away from the keyboard">
      <div className="off-hours">
        <span className="eyebrow" data-slide="out">
          Away from the keyboard
        </span>
        <dl className="status-board secondary">
          <div className="listening-entry" data-slide="out">
            <dt>Listening</dt>
            <dd>
              <div className="apple-music-embed">
                <iframe
                  src="https://embed.music.apple.com/my/playlist/lost-and-found/pl.u-6mo4l98iB68GGmZ"
                  title="Lost and Found Apple Music playlist"
                  allowFullScreen
                  allow="encrypted-media *; fullscreen *; clipboard-write *;"
                />
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </aside>
  );
}
export function Contact() {
  return (
    <section id="contact" className="contact-section" aria-label="Contact">
      <div data-slide="out">
        <SectionHeading number="05" title="CONTACT" />
      </div>
      <p className="contact-message">uh... about that..</p>
    </section>
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
      <div className="footer-inner">
        <span className="footer-icon" aria-hidden="true" />
        <span>© 2026 SHAHRUL AZIB</span>
        <span className="footer-star" aria-hidden="true" />
      </div>
    </footer>
  );
}
