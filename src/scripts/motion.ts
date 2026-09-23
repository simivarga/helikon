import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// Touch screens scroll on the compositor while JS-driven transforms follow a
// frame behind, which reads as jitter on iOS. Parallax is desktop-only.
const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

// `resize` must stay in the list: without it trigger positions went stale
// whenever the window changed size. ignoreMobileResize still skips the
// refresh caused by the mobile address bar showing and hiding.
ScrollTrigger.config({
  ignoreMobileResize: true,
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
});

/* ---- photo reveals ------------------------------------------------------ */

/**
 * Photographs marked `data-reveal="mask"` wipe up once, the first time they
 * reach the bottom of the viewport. Text is never animated on scroll.
 *
 * - One-shot: an element is revealed at most once and never hidden again.
 * - Anything already on screen at start-up, or scrolled past without being
 *   seen (anchor jumps, hash on load), is shown instantly.
 * - Photos that arrive together are staggered, capped at MAX_STAGGERED steps.
 * - Hiding only starts once this script runs (`motion-ready`), so if it never
 *   loads the photos are simply visible.
 */
const STAGGER_MS = 60;
const MAX_STAGGERED = 3;
// Start the wipe as the photo's top edge reaches this fraction of the
// viewport height, i.e. just before it becomes visible.
const TRIGGER_AT = 1.02;

function showInstantly(el: HTMLElement) {
  el.style.transition = 'none';
  el.classList.add('is-revealed');
  // Hand the transition back to the stylesheet once the revealed state has
  // been painted.
  requestAnimationFrame(() => requestAnimationFrame(() => el.style.removeProperty('transition')));
}

function initReveals() {
  const pending = new Set(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!pending.size) return;

  if (prefersReducedMotion) {
    pending.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  let queued = false;
  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      sweep(false);
    });
  };

  function sweep(initial: boolean) {
    const vh = window.innerHeight;
    // All reads first, then all writes, so the sweep never forces a layout
    // between style changes.
    const hits: { el: HTMLElement; passed: boolean }[] = [];
    pending.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * TRIGGER_AT) hits.push({ el, passed: r.bottom <= 0 });
    });

    let staggered = 0;
    hits.forEach(({ el, passed }) => {
      pending.delete(el);
      if (initial || passed) {
        showInstantly(el);
        return;
      }
      const delay = Math.min(staggered, MAX_STAGGERED - 1) * STAGGER_MS;
      staggered++;
      if (delay) el.style.transitionDelay = `${delay}ms`;
      el.classList.add('is-revealed');
    });

    if (!pending.size) {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }
  }

  // Whatever is already in view is shown as it is before hiding switches on,
  // so the first paint never flashes a photo away and back.
  sweep(true);
  document.documentElement.classList.add('motion-ready');

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
}

/* ---- parallax ----------------------------------------------------------- */

/** Slow drift on elements marked `data-parallax="0.05"` (fraction of height). */
function initParallax() {
  if (prefersReducedMotion || coarsePointer) return;

  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const strength = parseFloat(el.dataset.parallax || '0.05');
    gsap.fromTo(
      el,
      { yPercent: -strength * 100 },
      {
        yPercent: strength * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: 'top bottom',
          end: 'bottom top',
          // No numeric scrub: Lenis already smooths the scroll source, and
          // stacking a second lag makes the parallax feel detached.
          scrub: true,
          // Promote only while actually scrubbing, not for the whole session.
          onToggle: (self) => {
            el.style.willChange = self.isActive ? 'transform' : '';
          },
        },
      },
    );
  });
}

/* ---- smooth scroll ------------------------------------------------------ */

function initSmoothScroll() {
  if (prefersReducedMotion) return;

  const lenis = new Lenis({
    // `lerp`, not `duration`: Lenis applies duration+easing to *every* wheel
    // tick, resetting the ease to t=0 each time. `lerp` damps continuously
    // and stays velocity-stable.
    lerp: 0.1,
    smoothWheel: true,
    wheelMultiplier: 1,
    // Touch scrolling stays native.
    syncTouch: false,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Exposed so automated checks and the browser console can drive scrolling;
  // Lenis owns the scroll position, so window.scrollTo alone does nothing.
  (window as unknown as { lenis?: Lenis }).lenis = lenis;

  // Anchor links need to go through Lenis or they fight each other.
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      // A deliberate jump is the one case where a fixed duration and ease are
      // the right tool.
      lenis.scrollTo(target as HTMLElement, {
        offset: -80,
        duration: 0.9,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });
    });
  });
}

/* ---- layout changes ----------------------------------------------------- */

/**
 * Refresh trigger positions whenever the document height changes after the
 * initial layout (late fonts, anything the `load` refresh missed).
 */
function watchLayout() {
  let lastHeight = document.documentElement.scrollHeight;
  let timer = 0;
  new ResizeObserver(() => {
    const height = document.documentElement.scrollHeight;
    if (height === lastHeight) return;
    lastHeight = height;
    window.clearTimeout(timer);
    timer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
  }).observe(document.body);
}

/** Condense the header once the hero is behind us. */
function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;

  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => header.classList.toggle('is-condensed', self.scroll() > 80),
  });
}

function init() {
  initSmoothScroll();
  initReveals();
  initParallax();
  initHeader();
  watchLayout();
  ScrollTrigger.refresh();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
