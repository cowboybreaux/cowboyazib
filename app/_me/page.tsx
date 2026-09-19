import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Arrow,
  SectionHeading,
  ExperienceTimeline,
  ProjectPreview,
} from '@/components/site';
import { projects } from '@/lib/content';
export const metadata: Metadata = {
  title: 'Me',
  description: 'Azib’s background, studies, and work.',
};
export default function Me() {
  return (
    <main id="main" tabIndex={-1}>
      <header className="page-intro">
        <p className="eyebrow accent">01 / About me</p>
        <h1>About me.</h1>
        <p className="page-deck">IT student, builder, and writer.</p>
      </header>
      <div className="about-layout">
        <aside className="page-index">
          <p className="eyebrow">On this page</p>
          <nav aria-label="About page sections">
            <a href="#about">About</a>
            <a href="#direction">Current direction</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#things-built">Things I’ve built</a>
            <a href="#interests">Goals &amp; interests</a>
          </nav>
          <p className="tiny muted index-note">
            Draft · Experience and university details to add.
          </p>
        </aside>
        <div className="about-content">
          <section id="about" className="profile-section">
            <SectionHeading number="01" title="About" />
            <div className="prose">
              <p className="lead-serif">
                I’m Shahrul Azib, an IT student interested in software, data,
                and everyday systems.
              </p>
              <p>I build tools around small, practical problems.</p>
              <p>Away from code: poetry, music, books, and films.</p>
            </div>
          </section>
          <section id="direction" className="profile-section">
            <SectionHeading number="02" title="Current direction" />
            <div className="direction-grid">
              <div>
                <span className="eyebrow accent">Learning</span>
                <h3>Information technology</h3>
                <p>Software, data, networking, and connected systems.</p>
              </div>
              <div>
                <span className="eyebrow accent">Making</span>
                <h3>Useful, everyday tools</h3>
                <p>Exploring open transit data with RapidKL Companion.</p>
              </div>
            </div>
            <p className="direction-note">
              Next: backend development, data pipelines, and IoT.
            </p>
          </section>
          <section id="experience" className="profile-section">
            <SectionHeading number="03" title="Experience" />
            <p className="small muted section-note">
              Sample timeline · Roles and dates to add.
            </p>
            <ExperienceTimeline />
          </section>
          <section id="education" className="profile-section">
            <SectionHeading number="04" title="Education" />
            <div className="education-row">
              <span className="eyebrow muted">Currently studying</span>
              <div>
                <h3>Bachelor of Information Technology (Internet of Things)</h3>
                <p className="company">University to add</p>
                <p>Dates and coursework to add.</p>
              </div>
            </div>
          </section>
          <section id="things-built" className="profile-section">
            <SectionHeading number="05" title="Things I’ve built" />
            <div className="all-projects">
              {projects.map((project) => (
                <ProjectPreview key={project.slug} project={project} />
              ))}
            </div>
          </section>
          <section id="interests" className="profile-section">
            <SectionHeading number="06" title="Still curious about" />
            <div className="prose">
              <p className="lead-serif">Good tools. Understandable systems.</p>
              <p>
                I want to build software and IoT projects that help people in
                everyday life.
              </p>
              <p>Poetry, music, films, and books keep me curious.</p>
              <Link className="text-link" href="/media">
                Writing & media <Arrow />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
