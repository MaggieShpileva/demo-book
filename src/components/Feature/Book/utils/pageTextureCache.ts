import type { FC } from 'react';
import type { CanvasTexture } from 'three';
import type { BookPageOverlayRaster } from './bookPageOverlay';
import { rasterizeReactPage } from './rasterizeReactPage';

type PageTextureEntry = {
  page: CanvasTexture;
  overlay: BookPageOverlayRaster | null;
  hasLive: boolean;
};

const textureCache = new Map<FC, PageTextureEntry>();
const pendingCache = new Map<FC, Promise<PageTextureEntry>>();

export const peekPageTexture = (Page: FC) => textureCache.get(Page)?.page;

export const peekPageOverlay = (Page: FC) => textureCache.get(Page)?.overlay;

export const peekPageHasLive = (Page: FC) =>
  textureCache.get(Page)?.hasLive === true;

export const getPageTexture = (Page: FC) => {
  const cached = textureCache.get(Page);
  if (cached != null) {
    return Promise.resolve(cached.page);
  }

  const pending = pendingCache.get(Page);
  if (pending != null) {
    return pending.then((entry) => entry.page);
  }

  const next = rasterizeReactPage(Page).then(
    (result) => {
      const entry: PageTextureEntry = {
        page: result.page,
        overlay: result.overlay,
        hasLive: result.hasLive,
      };
      textureCache.set(Page, entry);
      pendingCache.delete(Page);
      return entry;
    },
    (error: unknown) => {
      pendingCache.delete(Page);
      throw error;
    }
  );

  pendingCache.set(Page, next);
  return next.then((entry) => entry.page);
};

export const getPageOverlay = (Page: FC) =>
  getPageTexture(Page).then(() => peekPageOverlay(Page) ?? null);

export const loadPageHtmlTextures = (
  Front: FC,
  Back: FC,
  onLoad: (maps: {
    front: CanvasTexture;
    back: CanvasTexture;
    frontOverlay: BookPageOverlayRaster | null;
    backOverlay: BookPageOverlayRaster | null;
  }) => void
) => {
  let cancelled = false;

  void Promise.all([getPageTexture(Front), getPageTexture(Back)]).then(
    () => {
      if (cancelled) {
        return;
      }

      const front = peekPageTexture(Front);
      const back = peekPageTexture(Back);
      if (front == null || back == null) {
        return;
      }

      onLoad({
        front,
        back,
        frontOverlay: peekPageOverlay(Front) ?? null,
        backOverlay: peekPageOverlay(Back) ?? null,
      });
    },
    () => undefined
  );

  return () => {
    cancelled = true;
  };
};

export const clearPageTextureCache = () => {
  textureCache.forEach((entry) => {
    entry.page.dispose();
    entry.overlay?.texture.dispose();
  });
  textureCache.clear();
  pendingCache.clear();
};

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    clearPageTextureCache();
  });
}
