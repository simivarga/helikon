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

// `<Font preload />` emits a preload for every subset of every family, so a
// Hungarian visitor was fetching 103 kB of Cyrillic and an English one 280 kB
// of Cyrillic plus Latin-Extended — none of it ever rendered. @font-face
// unicode-range already fetches subsets on demand; preloading all of them
// defeats it and makes the unused bytes compete with the hero image.
//
// This drops the preload links a page's own language cannot use. The
// @font-face rules are untouched, so a stray character outside the expected
// range still loads its subset normally — only the guaranteed-waste
// up-front fetches go away.
const SUBSET_BY_RANGE = [
  ['cyrillic-ext', 'U+0460-052F'],
  ['cyrillic', 'U+0400-045F'],
  ['latin-ext', 'U+0100-02BA'],
  ['latin', 'U+0000-00FF'],
];
/** @type {Record<string, string[]>} */
const NEEDED = {
  // Ukrainian's і ї є ґ all sit in the base cyrillic range, but the hryvnia
  // sign ₴ (U+20B4) is filed under cyrillic-ext and appears in every salt-room
  // price — without it those prices would swap fonts mid-render.
  uk: ['cyrillic', 'cyrillic-ext', 'latin'],
  hu: ['latin', 'latin-ext'], // ő and ű are Latin Extended-A
  en: ['latin'],
};

/** @returns {import('astro').AstroIntegration} */
function localeFontPreloads() {
  return {
    name: 'helikon:locale-font-preloads',
    hooks: {
      'astro:build:done': async ({ dir, pages, logger }) => {
        const { readFile, writeFile } = await import('node:fs/promises');
        const { fileURLToPath } = await import('node:url');
        const { join } = await import('node:path');
        const root = fileURLToPath(dir);

        let saved = 0;
        for (const { pathname } of pages) {
          const file = join(root, pathname, 'index.html');
          let html;
          try {
            html = await readFile(file, 'utf8');
          } catch {
            continue;
          }

          // The Fonts API inlines its @font-face rules in each page's <head>,
          // so the file → subset map is read from the page itself.
          const subsetOf = new Map();
          const inline = (html.match(/<style>[\s\S]*?<\/style>/g) ?? []).join('\n');
          for (const face of inline.match(/@font-face\s*\{[^}]*\}/g) ?? []) {
            const f = face.match(/([A-Za-z0-9_-]+\.woff2?)/)?.[1];
            if (!f) continue;
            const hit = SUBSET_BY_RANGE.find(([, r]) => face.includes(r));
            if (hit) subsetOf.set(f, hit[0]);
          }

          const seg = pathname.split('/').filter(Boolean)[0];
          const keep = NEEDED[seg in NEEDED ? seg : 'uk'];
          let dropped = 0;
          const out = html.replace(/<link[^>]+rel="preload"[^>]*>/g, (tag) => {
            const name = tag.match(/([A-Za-z0-9_-]+\.woff2?)/)?.[1];
            const subset = name && subsetOf.get(name);
            if (!subset || keep.includes(subset)) return tag;
            dropped++;
            return '';
          });
          if (dropped) {
            await writeFile(file, out);
            saved += dropped;
            logger.info(`${pathname || '/'} → dropped ${dropped} unused font preload(s)`);
          }
        }
        if (!saved) logger.warn('no font preloads matched — check the subset map');
      },
    },
  };
}

// hreflang is language-only on purpose. `hu-HU` tells Google the Hungarian
// page is for Hungary, yet the largest Hungarian-speaking audience for a hotel
// in Transcarpathia lives in Ukraine itself (and in Romania and Slovakia).
// `hu` covers every Hungarian reader, wherever they are. Must match the
// hreflang tags Base.astro prints in the page head.
const HREFLANG = { uk: 'uk', hu: 'hu', en: 'en' };

// x-default is the page for a visitor whose language matches none of the
// three. English serves a Polish, German or Romanian traveller better than
// the Ukrainian root page does.
const X_DEFAULT_LOCALE = 'en';

const IS_PREVIEW = process.env.PUBLIC_PREVIEW === '1';

/**
 * robots.txt has to name the sitemap by absolute URL, which depends on the
 * host and base path this build is for. A hand-written file pointed every
 * preview host at production's sitemap. Preview builds keep `Allow: /` (a
 * crawler that is blocked never sees the page's noindex) but drop the sitemap
 * line, so they do not invite crawling.
 * @returns {import('astro').AstroIntegration}
 */
function robotsTxt() {
  return {
    name: 'helikon:robots-txt',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const { writeFile } = await import('node:fs/promises');
        const { fileURLToPath } = await import('node:url');
        const { join } = await import('node:path');
        const sitemap = new URL(`${BASE.replace(/\/+$/, '')}/sitemap-index.xml`, SITE).href;
        const lines = IS_PREVIEW
          ? ['# Preview build: every page also carries <meta name="robots" content="noindex, nofollow">.', 'User-agent: *', 'Allow: /']
          : ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemap}`];
        await writeFile(join(fileURLToPath(dir), 'robots.txt'), `${lines.join('\n')}\n`);
        logger.info(IS_PREVIEW ? 'preview robots.txt (no sitemap line)' : `robots.txt → ${sitemap}`);
      },
    },
  };
}

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
      i18n: { defaultLocale: 'uk', locales: HREFLANG },
      // The integration writes one alternate per locale but no x-default, so
      // the sitemap and the page head disagreed. Added from the same rule.
      serialize(item) {
        const fallback = item.links?.find((l) => l.lang === HREFLANG[X_DEFAULT_LOCALE]);
        if (fallback && !item.links?.some((l) => l.lang === 'x-default')) {
          item.links = [...(item.links ?? []), { url: fallback.url, lang: 'x-default' }];
        }
        return item;
      },
    }),
    localeFontPreloads(),
    robotsTxt(),
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
      // Normal only: no italic is rendered anywhere on the site, and shipping
      // it cost ~198 kB of preloaded font on every page, in every locale.
      styles: ['normal'],
      subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
      fallbacks: ['Georgia', 'ui-serif', 'serif'],
    },
  ],

  // The whole site's CSS is one ~58 kB file (about 10 kB compressed) that
  // every page needs before first paint. Lighthouse's mobile run measured it
  // as the only render-blocking request, costing 300-900 ms. Inlining it
  // removes that round trip, the one that matters most on a phone at the
  // border with a weak signal.
  build: {
    inlineStylesheets: 'always',
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
