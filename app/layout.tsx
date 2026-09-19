import type { Metadata } from 'next';
import { Navigation, Footer } from '@/components/site';
import { SlideReveal } from '@/components/slide-reveal';
import './globals.css';
export const metadata: Metadata = {
  title: { default: 'Azib', template: '%s — CowboyAzib' },
  description:
    'Shahrul Azib. IT student, builder, and writer. Projects, writing, and current interests.',
  icons: { icon: '/icon.png' },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // The pre-paint script intentionally changes only this element's entrance
    // attribute before hydration, as in Next.js's no-flash theme pattern.
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* Arms the entrance animations before first paint. Without JS, or with
            reduced motion, the attribute is absent and content stays visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.entrance='pending'}}catch(e){}",
          }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SlideReveal />
        <div className="site-shell">
          <Navigation />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
