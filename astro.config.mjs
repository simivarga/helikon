// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const LOCALES = ['uk', 'hu', 'en'];

// Host-dependent settings come from the environment so the same source builds
// for the real domain, a Netlify/Cloudflare preview, or a GitHub Pages project
// path (which serves from /<repo>/ and therefore needs `base`).
const SITE = process.env.SITE_URL ?? 'https://hotel-helikon.com';
const BASE = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site: SITE,
  base: BASE,

  // Ukrainian is the default and lives at the root (/), Hungarian at /hu/, English at /en/.
  i18n: {
    defaultLocale: 'uk',
    locales: LOCALES,
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'uk',
        locales: { uk: 'uk-UA', hu: 'hu-HU', en: 'en' },
      },
    }),
  ],

  image: {
    // Responsive images by default: Astro emits srcset + sizes and the sharp
    // service generates AVIF/WebP. Source photos are only ~1280px, so we never
    // upscale; layouts are art-directed around that ceiling.
    layout: 'constrained',
    responsiveStyles: true,
  },

  // Self-hosted, subsetted fonts. Cyrillic subsets are mandatory: Ukrainian is
  // the default locale, and EB Garamond / Montserrat both ship full Cyrillic.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Montserrat',
      cssVariable: '--fh-sans',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'EB Garamond',
      cssVariable: '--fh-display',
      weights: [400, 500, 600],
      styles: ['normal', 'italic'],
      subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
      fallbacks: ['Georgia', 'ui-serif', 'serif'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
