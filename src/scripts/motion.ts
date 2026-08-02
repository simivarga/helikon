import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Reveal anything marked `data-reveal`. Children of a `data-reveal-group` are
 * staggered in document order, which keeps the markup free of index bookkeeping.
 */
function reveal(el: HTMLElement, index: number) {
  // setTimeout rather than gsap.delayedCall: this fires for every reveal on
  // every re-entry, and each delayedCall added a tween to the global timeline.
  if (index === 0) el.classList.add('is-revealed');
  else window.setTimeout(() => el.classList.add('is-revealed'), index * 70);
}

function initReveals() {
  const items = gsap.utils.toArray<HTMLElement>('[data-reveal]');

  if (prefersReducedMotion) {
    items.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  items.forEach((el) => {
    const group = el.closest('[data-reveal-group]');
    const siblings = group ? Array.from(group.querySelectorAll<HTMLElement>('[data-reveal]')) : [el];
    const index = siblings.indexOf(el);

    // Not `once`: Kristof wants the animation to play again every time a
    // section leaves the viewport and comes back, scrolling either way.
    ScrollTrigger.create({
      trigger: group ?? el,
      start: 'top 88%',
      end: 'bottom 8%',
      onEnter: () => reveal(el, index),
      onEnterBack: () => reveal(el, index),
      onLeave: () => el.classList.remove('is-revealed'),
      onLeaveBack: () => el.classList.remove('is-revealed'),
    });
  });
}

/** Slow drift on elements marked `data-parallax="0.15"` (fraction of height). */
function initParallax() {
  if (prefersReducedMotion) return;

  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const strength = parseFloat(el.dataset.parallax || '0.12');
    // Promote to its own layer so scrubbing never repaints the section.
    el.style.willChange = 'transform';
    el.style.backfaceVisibility = 'hidden';
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
          scrub: true,
        },
      },
    );
  });
}

function initSmoothScroll() {
  if (prefersReducedMotion) return;

  const lenis = new Lenis({
    // Shorter and less aggressive than before: at duration 1.1 the page kept
    // gliding after the wheel stopped, which reads as lag rather than smooth.
    duration: 0.85,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.6,
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
      lenis.scrollTo(target as HTMLElement, { offset: -80 });
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
