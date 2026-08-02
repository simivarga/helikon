import { ui, LOCALES, DEFAULT_LOCALE, type Locale } from './ui';

export { LOCALES, DEFAULT_LOCALE, type Locale };

/** Look up the locale from a URL, falling back to the default. */
export function getLocaleFromUrl(url: URL): Locale {
  const [, first] = stripBase(url.pathname).split('/');
  return (LOCALES as readonly string[]).includes(first) ? (first as Locale) : DEFAULT_LOCALE;
}

/**
 * Translation helper. Missing keys fall back to the default locale and then to
 * the key itself, so a half-finished translation degrades to Ukrainian rather
 * than rendering blank.
 */
export function useTranslations(locale: Locale) {
  return function t(key: string): string {
    return ui[locale][key] ?? ui[DEFAULT_LOCALE][key] ?? key;
  };
}

/**
 * Build a path for a locale. Ukrainian is served from the root, the others are
 * prefixed, matching astro.config's `prefixDefaultLocale: false`.
 *
 * Everything is prefixed with Astro's BASE_URL so the same code works when the
 * site is served from a sub-path — a GitHub Pages project site lives at
 * /<repo>/, and hand-built "/hu/" links would 404 there.
 */
function withBase(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const joined = `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
  return joined.startsWith('/') ? joined : `/${joined}`;
}

export function localePath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  const prefix = locale === DEFAULT_LOCALE ? '' : locale;
  const segments = [prefix, clean].filter(Boolean).join('/');
  return segments ? withBase(`${segments}/`) : withBase('');
}

/** Strip Astro's BASE_URL off a pathname so the remainder can be parsed. */
function stripBase(pathname: string): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
  if (base && pathname.startsWith(base)) return pathname.slice(base.length) || '/';
  return pathname;
}

/**
 * Same page, other language — used by the language switcher and hreflang.
 * The base has to come off first: under /<repo>/ the first path segment is the
 * repo name, and treating it as content produced /<repo>/hu/<repo>/.
 */
export function alternatePaths(currentPath: string): Record<Locale, string> {
  const segments = stripBase(currentPath).split('/').filter(Boolean);
  if ((LOCALES as readonly string[]).includes(segments[0] ?? '')) segments.shift();
  const rest = segments.join('/');
  return Object.fromEntries(LOCALES.map((l) => [l, localePath(l, rest)])) as Record<Locale, string>;
}

const INTL_TAG: Record<Locale, string> = { uk: 'uk-UA', hu: 'hu-HU', en: 'en-GB' };

/** Locale-aware number formatting, so 8.6 renders as 8,6 in uk/hu. */
export function formatNumber(locale: Locale, value: number): string {
  return new Intl.NumberFormat(INTL_TAG[locale]).format(value);
}

/**
 * Pick the right plural form. Ukrainian genuinely needs this: "254 відгуки"
 * (few) but "255 відгуків" (many). Hungarian keeps the noun singular after a
 * numeral, which the `other` form handles.
 */
export function plural(locale: Locale, count: number, forms: Partial<Record<Intl.LDMLPluralRule, string>>): string {
  const rule = new Intl.PluralRules(INTL_TAG[locale]).select(count);
  return forms[rule] ?? forms.other ?? '';
}
