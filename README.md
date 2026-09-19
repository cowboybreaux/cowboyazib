# CowboyAzib — editable source

This is the complete source project for Shahrul Azib’s personal website. It preserves the existing pages, content, layout, and assets. It runs independently with Next.js, TypeScript, and Tailwind CSS; no AI-hosted service or account is required.

## Quick start

Use Node.js 24 LTS with npm (`.nvmrc` is included). If you use nvm, run `nvm use` first.

Inside the extracted `cowboyazib` folder:

```sh
npm install
npm run dev
```

Open the local address printed in the terminal, normally http://localhost:3000. Stop the server with Ctrl+C. No environment variables are needed. `.env.example` documents this explicitly.

For installation using the exact dependency lockfile, use `npm ci` instead of `npm install`. Both `package.json` and `package-lock.json` are included. Internet access is needed for the initial package download.

## Production locally or on a Node.js host

```sh
npm run build
npm start
```

The build produces the standard Next.js `.next/` directory. `npm start` serves that production build. Configure your host to install packages, run the build, and start the server. The default is port 3000; use `npm start -- --port 3001` to choose another port.

Development and production builds use Next.js’s Webpack compiler for consistency. This is still a standard Next.js application.

## Deploy to Vercel

1. Put the contents of this project folder in your own Git repository and push it to your Git provider.
2. Import that repository as a project in Vercel. Select the folder containing `package.json` as the project root if it is nested in a larger repository.
3. Use the **Next.js** framework preset, Node.js **24.x**, and build command `npm run build`. Leave the output directory at the framework default. No environment variables are required.
4. Deploy. After the deployment works, add `cowboyazib.com` in the project’s domain settings and follow the DNS instructions Vercel provides.

You can also deploy with Vercel’s CLI from this folder. See [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs). No `vercel.json` or platform-specific plugin is needed for this project.

The real domain is not connected by this source handoff. Any domain registration and hosting account remain under your control.

## Routes

| URL                     | Purpose                                                      |
| ----------------------- | ------------------------------------------------------------ |
| `/`                     | Introduction, selected work, current status, latest writing  |
| `/me`                   | About, direction, experience, education, projects, interests |
| `/media`                | Writing archive, listening, reading, watching                |
| `/projects/[slug]`      | Individual project case studies                              |
| `/media/writing/[slug]` | Individual readable writing pages                            |

There is no `/home` route or `/projects` index. The CowboyAzib brand returns to `/`. Unknown addresses use the custom 404 page.

Project and writing pages are generated from `lib/content.ts`. Adding a record with a unique slug there also adds its detail route at the next build.

## Where to edit

```text
app/
  layout.tsx                   Shared layout and site metadata
  globals.css                  Tailwind import, theme, layout, responsive styles
  page.tsx                     Homepage
  me/page.tsx                  About and professional background
  media/page.tsx               Creative archive
  media/writing/[slug]/page.tsx Writing detail template
  projects/[slug]/page.tsx      Project detail template
  not-found.tsx                Custom 404
components/
  navigation.tsx               Navigation and active-page state
  site.tsx                     Shared site components, status, and footer
  ui/                          Included reusable UI primitives
hooks/                         Shared UI hooks
lib/
  content.ts                   Projects, writing, experience, and media data
  utils.ts                     Shared utility functions
public/
  favicon.svg                  The site’s local icon
  cowboy-logo.png              Supplied cowboy logo, original image unchanged
```

Shared site components include Navigation, ProjectPreview, CurrentStatus, WritingPreview, ExperienceTimeline, MediaEntry, SectionHeading, and Footer.

- **Projects, writing, media, experience:** edit `lib/content.ts`.
- **About, education, goals:** edit `app/me/page.tsx`.
- **Current snapshot and social links:** edit `components/site.tsx`.
- **Homepage introduction:** edit `app/page.tsx`.
- **Typography, colour, spacing, breakpoints:** edit `app/globals.css`.
- **Page titles and descriptions:** edit the relevant page’s metadata and `app/layout.tsx`.
- **New images:** put them in `public/` and reference them using `/filename.ext`.

Tailwind CSS v4 is configured through `postcss.config.mjs` and the CSS theme in `app/globals.css`; a separate `tailwind.config.js` is not required. `components.json` documents the included UI primitive setup. TypeScript configuration is in `tsconfig.json`. Next.js regenerates `next-env.d.ts` and route types during development/builds.

The site uses system fonts and a local SVG favicon. There are no external image downloads, remote fonts, or hidden asset dependencies. RapidKL APIs, Google Maps, and IoT hardware are mentioned in project descriptions; the personal website does not connect to those services.

## Placeholder content

RapidKL Companion is the only project. Its supplied stack is retained, while its status remains labelled as a sample. Existing experience, dates, university details, media entries, and writing remain labelled placeholders. The degree is Bachelor of Information Technology (Internet of Things). The sample poems are not represented as Azib’s original work.

Social destinations have not been guessed. Add your verified GitHub, LinkedIn, and email links in Footer.

## Maintenance

```sh
npm run typecheck
npm run lint
npm run format
npm run build
```

Keep `package-lock.json` under version control and update it together with `package.json` when changing dependencies. The bundled `components/ui` directory is available for future features; only the components imported by the site are shipped to visitors. Lint checks the maintained site code; vendored UI primitives and their mobile hook are excluded from style/accessibility lint rules. TypeScript and production builds still check them.

For future revisions, upload this source folder or a ZIP of it. Continue editing this project directly, preserving its route structure, shared components, and content model. There is no need to scaffold a new website.

When preparing an upload, omit `node_modules/`, `.next/`, `out/`, `.git/`, and any private `.env` files. Keep the source, public assets, package lockfile, configuration, and this README. `.gitignore` covers dependencies, build artifacts, local environment files, and caches.

## Refinement pass

- Preserved the existing Next.js setup, routes, reusable components, serif typography, and editorial layout.
- Shortened page introductions and supporting copy; kept existing creative writing and placeholder disclosures.
- Removed the two mock projects and their generated detail routes. RapidKL Companion remains, without the decorative card number or a self-referencing next-project link.
- Added the supplied logo unchanged, sticky navigation, anchor offsets, and visible keyboard focus states.
- Applied `#895129` to main text and the featured project background. Off-white text is used on brown; existing `#a33527` red accents stay red on light backgrounds.
- Made Words, lately a compact bordered module with a 6px corner radius.
- Removed the footer progress note and visible version label.

All dependencies remain declared and pinned in the included package manifest and lockfile. Install them with `npm ci`; generated dependencies and build caches are excluded from the source archive.

No CMS, database, authentication, analytics, or third-party integrations are required.
