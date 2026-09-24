import { createElement } from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import type { FC } from 'react';
import { StoreProvider } from '@/store/storeProvider';
import { PAGE_HTML_HEIGHT_PX, PAGE_HTML_WIDTH_PX } from '../constants';
import type { BookPageOverlayRaster } from './bookPageOverlay';
import {
  hideBookPageLive,
  hideBookPageOverlays,
  pageHasLiveLayer,
} from './hideBookPageOverlays';
import { htmlNodeToCanvasTexture } from './htmlNodeToCanvasTexture';
import { inlineHtmlImages } from './inlineHtmlImages';
import { preparePageNodeForRaster } from './preparePageNodeForRaster';
import { rasterizeBookPageOverlays } from './rasterizeBookPageOverlays';

const waitNextPaint = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });

let rasterQueue: Promise<unknown> = Promise.resolve();

const enqueueRaster = <T>(task: () => Promise<T>) => {
  const next = rasterQueue.then(task, task);
  rasterQueue = next.then(
    () => undefined,
    () => undefined
  );
  return next;
};

export type RasterizeReactPageResult = {
  page: Awaited<ReturnType<typeof htmlNodeToCanvasTexture>>;
  overlay: BookPageOverlayRaster | null;
  hasLive: boolean;
};

export const rasterizeReactPage = (
  Page: FC
): Promise<RasterizeReactPageResult> =>
  enqueueRaster(async () => {
    const host = document.createElement('div');
    host.style.cssText = `position:fixed;left:-10000px;top:0;width:${PAGE_HTML_WIDTH_PX}px;height:${PAGE_HTML_HEIGHT_PX}px;overflow:visible;`;
    document.body.appendChild(host);

    const root = createRoot(host);

    try {
      flushSync(() => {
        root.render(createElement(StoreProvider, null, createElement(Page)));
      });
      await document.fonts.ready;
      await waitNextPaint();
      const node = host.firstElementChild;
      if (!(node instanceof HTMLElement)) {
        throw new Error('Failed to rasterize HTML page');
      }
      preparePageNodeForRaster(node);
      await waitNextPaint();
      await inlineHtmlImages(node);
      const hasLive = pageHasLiveLayer(node);
      console.info(
        '[raster]',
        Page.name,
        'hasLive',
        hasLive,
        'liveNodes',
        node.querySelectorAll('[data-book-live]').length
      );
      hideBookPageLive(node);
      const overlay = await rasterizeBookPageOverlays(node);
      hideBookPageOverlays(node);
      const page = await htmlNodeToCanvasTexture(
        node,
        PAGE_HTML_WIDTH_PX,
        PAGE_HTML_HEIGHT_PX
      );
      return { page, overlay, hasLive };
    } finally {
      root.unmount();
      host.remove();
    }
  });
