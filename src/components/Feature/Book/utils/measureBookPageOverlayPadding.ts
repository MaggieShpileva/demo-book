import type { BookPageOverlayPadding } from './bookPageOverlay';

/** CSS-px overflow of `[data-book-overlay]` beyond the page root. */
export const measureBookPageOverlayPadding = (
  root: HTMLElement
): BookPageOverlayPadding => {
  const overlays = root.querySelectorAll('[data-book-overlay]');
  if (overlays.length === 0) {
    return { left: 0, top: 0, right: 0, bottom: 0 };
  }

  const rootRect = root.getBoundingClientRect();
  let left = 0;
  let top = 0;
  let right = 0;
  let bottom = 0;

  overlays.forEach((node) => {
    const rect = node.getBoundingClientRect();
    left = Math.max(left, rootRect.left - rect.left);
    top = Math.max(top, rootRect.top - rect.top);
    right = Math.max(right, rect.right - rootRect.right);
    bottom = Math.max(bottom, rect.bottom - rootRect.bottom);
  });

  return {
    left: Math.ceil(left),
    top: Math.ceil(top),
    right: Math.ceil(right),
    bottom: Math.ceil(bottom),
  };
};
