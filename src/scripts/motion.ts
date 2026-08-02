import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Reveal anything marked `data-reveal`. Children of a `data-reveal-group` are
 * staggered in document order, which keeps the markup free of index bookkeeping.
 */
// Pending stagger timers, so a fast scroll cannot leave a stale timeout that
// re-reveals an element the trigger has already marked as left.
const pending = new WeakMap<HTMLElement, number>();

function clearPending(el: HTMLElement) {
  const id = pending.get(el);
  if (id !== undefined) {
    window.clearTimeout(id);
    pending.delete(el);
  }
}

function showGroup(members: HTMLElement[]) {
  members.forEach((el, i) => {
    clearPending(el);
    if (i === 0) {
      el.classList.add('is-revealed');
      return;
    }
    pending.set(
      el,
      window.setTimeout(() => {
        pending.delete(el);
        el.classList.add('is-revealed');
      }, i * 70),
    );
  });
}

function hideGroup(members: HTMLElement[]) {
  members.forEach((el) => {
    clearPending(el);
    el.classList.remove('is-revealed');
  });
}

function initReveals() {
  const items = gsap.utils.toArray<HTMLElement>('[data-reveal]');

  if (prefersReducedMotion) {
    items.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  // One trigger per group rather than per element. Every member of a group
  // shared identical start/end bounds, so N triggers were doing one trigger's
  // work and firing N separate callbacks in the same frame.
  const groups = new Map<Element, HTMLElement[]>();
  items.forEach((el) => {
    const key = el.closest('[data-reveal-group]') ?? el;
    const list = groups.get(key);
    if (list) list.push(el);
    else groups.set(key, [el]);
  });

  groups.forEach((members, trigger) => {
    // Not `once`: the animation replays every time a section leaves the
    // viewport and comes back, scrolling either way.
    ScrollTrigger.create({
      trigger,
      start: 'top 88%',
      end: 'bottom 8%',
      onEnter: () => showGroup(members),
      onEnterBack: () => showGroup(members),
      onLeave: () => hideGroup(members),
      onLeaveBack: () => hideGroup(members),
    });
  });
}

/** Slow drift on elements marked `data-parallax="0.15"` (fraction of height). */
function initParallax() {
  if (prefersReducedMotion) return;

  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const strength = parseFloat(el.dataset.parallax || '0.12');
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
          // Promote only while actually scrubbing. Setting will-change at load
          // kept three large photographs on their own GPU layers for the whole
          // session, even if the user never scrolled to them.
          onToggle: (self) => {
            el.style.willChange = self.isActive ? 'transform' : '';
          },
        },
      },
    );
  });
}

function initSmoothScroll() {
  if (prefersReducedMotion) return;

  const lenis = new Lenis({
    // `lerp`, not `duration`: Lenis applies duration+easing to *every* wheel
    // tick, resetting the ease to t=0 each time. With an ease-out curve that
    // keeps the scroll permanently in the fast opening of the curve, which is
    // what read as bumpy. `lerp` damps continuously and stays velocity-stable.
    lerp: 0.1,
    smoothWheel: true,
    wheelMultiplier: 1,
    // touchMultiplier is deliberately absent: with syncTouch false Lenis never
    // touches touch events, so it was dead configuration.
    syncTouch: false,
  });

  lenis.on('scroll', ScrollTrigger.update);
  // Let ScrollTrigger settle triggers immediately after a fast scroll instead
  // of firing every intermediate one.
  ScrollTrigger.config({ ignoreMobileResize: true, autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load' });
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
  ScrollTrigger.refresh();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
