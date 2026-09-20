import { StarEntrance } from '@/components/star-entrance';
import { EntranceVideo } from '@/components/entrance-video';
import { HeroCopy } from '@/components/hero-copy';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import {
  SectionHeading,
  ProjectPreview,
  AboutMe,
  AwayFromKeyboard,
} from '@/components/site';
import { WorkSlideshow } from '@/components/work-slideshow';
import { projects } from '@/lib/content';
import { Skills } from '@/components/skills';
export default function Home() {
  return (
    <main id="main" tabIndex={-1} className="slides">
      <StarEntrance />
      <section id="hello" className="slide slide-full hero">
        <EntranceVideo />
        <div className="hero-inner">
          <p className="hero-hello">Hey there! I&rsquo;m</p>
          <h1 className="hero-name" data-glow-text="SHAHRUL AZIB.">
            SHAHRUL AZIB<span className="hero-period">.</span>
          </h1>
          <HeroCopy />
          <div className="hero-actions">
            <a className="ghost-button" href="#selected-work">
              Work <ArrowDown className="hero-button-icon" aria-hidden="true" />
            </a>
            <a className="ghost-button" href="#about-me">
              More about me <ArrowUpRight className="hero-button-icon" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <div className="home-grid slide">
        <div className="work-column">
          <AboutMe />
          <WorkSlideshow>
            <div data-slide="out">
              <SectionHeading number="02" title="WORKS // PROJECTS" />
            </div>
            <div className="work-list">
              <ProjectPreview
                project={{
                  slug: 'lululemon-reimagined',
                  name: 'Lululemon Reimagined',
                  liveUrl: 'https://lulu-reimagined.cowboyazib.com',
                  description:
                    'A self-initiated e-commerce redesign exploring how Lululemon’s digital experience could feel more editorial, expressive, and interaction-driven while remaining responsive and product-focused.',
                  tech: ['Next.js', 'TypeScript', 'React', 'CSS', 'Vercel'],
                }}
                screenshot={{
                  src: '/images/projects/lululemon-reimagined.png',
                  width: 2000,
                  height: 1441,
                  alt: 'Lululemon Reimagined homepage featuring the Wunder Train collection',
                }}
                status="IN PROGRESS"
                featured
                reveal
              />
              <ProjectPreview
                project={projects[0]}
                screenshot={{
                  src: '/images/projects/rapidkl-companion.png',
                  width: 1602,
                  height: 1036,
                  alt: 'RapidKL Companion hub showing Klang Valley rail line statuses',
                }}
                featured
                reveal
              />
              <ProjectPreview
                project={{
                  slug: 'hotel-management-system',
                  name: 'Hotel Management System',
                  liveUrl: 'https://github.com/cowboybreaux/hotelManagement',
                  description:
                    'Object-oriented hotel management desktop application for managing guests, bookings, rooms, availability, and booking receipts, with local file-based data storage.',
                  tech: ['Java', 'Swing / AWT', 'OOP', 'File I/O'],
                }}
                label={
                  <>
                    Desktop app –<br />
                    Object oriented programming mini project
                  </>
                }
                featured
                reveal
              />
            </div>
          </WorkSlideshow>
          <Skills />
          <AwayFromKeyboard />
        </div>
      </div>
    </main>
  );
}
