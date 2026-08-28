import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import type { FC } from 'react';
import { PAGE_HTML_HEIGHT_PX, PAGE_HTML_WIDTH_PX } from '../constants';
import { htmlNodeToCanvasTexture } from './htmlNodeToCanvasTexture';
import { inlineHtmlImages } from './inlineHtmlImages';

const waitNextPaint = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });

let rasterQueue: Promise<unknown> = Promise.resolve();

const enqueueRaster = <T>(task: () => Promise<T>) => {
  const next = rasterQueue.then(task, task);
  rasterQueue = next.then(() => undefined, () => undefined);
  return next;
};

export const rasterizeReactPage = (Page: FC) =>
  enqueueRaster(async () => {
    const host = document.createElement('div');
    host.style.cssText = `position:fixed;left:-10000px;top:0;width:${PAGE_HTML_WIDTH_PX}px;height:${PAGE_HTML_HEIGHT_PX}px;`;
    document.body.appendChild(host);

    const root = createRoot(host);
    root.render(createElement(Page));

    try {
      await document.fonts.ready;
      await waitNextPaint();
      const node = host.firstElementChild;
      if (!(node instanceof HTMLElement)) {
        throw new Error('Failed to rasterize HTML page');
      }
      await inlineHtmlImages(node);
      return await htmlNodeToCanvasTexture(
        node,
        PAGE_HTML_WIDTH_PX,
        PAGE_HTML_HEIGHT_PX
      );
    } finally {
      root.unmount();
      host.remove();
    }
  });
