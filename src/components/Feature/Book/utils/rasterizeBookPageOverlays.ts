import { PAGE_HTML_HEIGHT_PX, PAGE_HTML_WIDTH_PX } from '../constants';
import type { BookPageOverlayRaster } from './bookPageOverlay';
import { htmlNodeToCanvasTexture } from './htmlNodeToCanvasTexture';
import { inlineHtmlImages } from './inlineHtmlImages';
import { measureBookPageOverlayPadding } from './measureBookPageOverlayPadding';

/**
 * Rasterize only `[data-book-overlay]` nodes into a padded transparent texture.
 * Avoids serializing the full page (and its inlined images) a second time.
 */
export const rasterizeBookPageOverlays = async (
  pageRoot: HTMLElement
): Promise<BookPageOverlayRaster | null> => {
  const overlays = [
    ...pageRoot.querySelectorAll<HTMLElement>('[data-book-overlay]'),
  ];
  if (overlays.length === 0) {
    return null;
  }

  const padding = measureBookPageOverlayPadding(pageRoot);
  const width = PAGE_HTML_WIDTH_PX + padding.left + padding.right;
  const height = PAGE_HTML_HEIGHT_PX + padding.top + padding.bottom;
  const pageRect = pageRoot.getBoundingClientRect();

  const frame = document.createElement('div');
  frame.style.cssText = `width:${width}px;height:${height}px;position:relative;background:transparent;overflow:visible;`;

  overlays.forEach((overlay) => {
    const rect = overlay.getBoundingClientRect();
    const clone = overlay.cloneNode(true);
    if (!(clone instanceof HTMLElement)) {
      return;
    }
    clone.style.position = 'absolute';
    clone.style.left = `${rect.left - pageRect.left + padding.left}px`;
    clone.style.top = `${rect.top - pageRect.top + padding.top}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.right = 'auto';
    clone.style.bottom = 'auto';
    clone.style.margin = '0';
    frame.appendChild(clone);
  });

  document.body.appendChild(frame);
  try {
    await inlineHtmlImages(frame);
    const texture = await htmlNodeToCanvasTexture(frame, width, height, {
      background: 'transparent',
    });
    // Page face already has the in-bounds art — keep only the bleed here.
    const canvas = texture.image;
    if (canvas instanceof HTMLCanvasElement) {
      const context = canvas.getContext('2d');
      if (context) {
        const scaleX = canvas.width / width;
        const scaleY = canvas.height / height;
        context.clearRect(
          padding.left * scaleX,
          padding.top * scaleY,
          PAGE_HTML_WIDTH_PX * scaleX,
          PAGE_HTML_HEIGHT_PX * scaleY
        );
        texture.needsUpdate = true;
      }
    }
    return { texture, padding };
  } finally {
    frame.remove();
  }
};
