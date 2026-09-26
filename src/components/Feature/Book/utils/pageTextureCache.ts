import type { FC } from 'react';
import type { Texture } from 'three';
import type { BookPageOverlayRaster } from './bookPageOverlay';
import { loadPageImageTexture } from './loadPageImageTexture';
import { getPageImageSource } from './pageImageSources';
import { rasterizeReactPage } from './rasterizeReactPage';

type PageTextureEntry = {
  page: Texture;
  overlay: BookPageOverlayRaster | null;
  hasLive: boolean;
};

const loadPageTextureEntry = (Page: FC): Promise<PageTextureEntry> => {
  const imageSource = getPageImageSource(Page);
  if (imageSource != null) {
    return loadPageImageTexture(imageSource.src).then((page) => ({
      page,
      overlay: null,
      hasLive: imageSource.hasLive,
    }));
  }

  return rasterizeReactPage(Page).then((result) => ({
    page: result.page,
    overlay: result.overlay,
    hasLive: result.hasLive,
  }));
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

  const next = loadPageTextureEntry(Page).then(
    (entry) => {
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
    front: Texture;
    back: Texture;
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
