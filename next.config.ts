import type { NextConfig } from 'next';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

const config: NextConfig = {
  // Standard Next.js output works with Vercel and npm start on a Node.js host.
  outputFileTracingRoot: projectRoot,
  turbopack: { root: projectRoot },
  trailingSlash: true,
  images: { unoptimized: true },
};
export default config;
