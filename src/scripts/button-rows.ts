/**
 * Button rows: one line when every label fits, otherwise a tidy stack.
 *
 * Fixed breakpoints could not decide this, because the same row holds
 * "Hívás" in Hungarian and "Зателефонувати" in Ukrainian. So each row is
 * measured with its buttons at their natural width, and gets one of:
 *   .is-inline  every button the same width, on one line
 *   .is-fluid   one line, widths following the labels (equal would not fit)
 *   .is-stacked full-width buttons; in a row of three the first (the primary
 *               action) sits alone on top and the other two share a line
 * Without the script the row simply wraps.
 */
const rows = document.querySelectorAll<HTMLElement>('[data-btn-row]');
const MODES = ['is-inline', 'is-fluid', 'is-stacked'];

function layout(row: HTMLElement) {
  const buttons = Array.from(row.children) as HTMLElement[];
  if (buttons.length < 2) return;

  row.classList.remove(...MODES);
  row.classList.add('is-measuring');
  const widths = buttons.map((b) => b.getBoundingClientRect().width);
  row.classList.remove('is-measuring');

  const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
  const room = row.clientWidth - gap * (buttons.length - 1);
  const mode =
    Math.max(...widths) * buttons.length <= room
      ? 'is-inline'
      : widths.reduce((a, b) => a + b, 0) <= room
        ? 'is-fluid'
        : 'is-stacked';
  row.classList.add(mode);
}

// Widths only: toggling a mode changes the row's height, and reacting to that
// would loop.
const lastWidth = new WeakMap<HTMLElement, number>();
const observer = new ResizeObserver((entries) => {
  for (const { target, contentRect } of entries) {
    const row = target as HTMLElement;
    if (lastWidth.get(row) === contentRect.width) continue;
    lastWidth.set(row, contentRect.width);
    layout(row);
  }
});

rows.forEach((row) => observer.observe(row));
// Web fonts change label widths after the first measurement.
document.fonts?.ready.then(() => rows.forEach(layout));
