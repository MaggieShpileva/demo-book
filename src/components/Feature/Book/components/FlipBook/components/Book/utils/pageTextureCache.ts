import type { FC } from 'react';
import type { CanvasTexture } from 'three';
import { rasterizeReactPage } from './rasterizeReactPage';

const textureCache = new Map<FC, CanvasTexture>();
const pendingCache = new Map<FC, Promise<CanvasTexture>>();

export const clearPageTextureCache = () => {
  textureCache.forEach((texture) => texture.dispose());
  textureCache.clear();
  pendingCache.clear();
};

export const peekPageTexture = (Page: FC) => textureCache.get(Page);

export const getPageTexture = (Page: FC) => {
  const cached = textureCache.get(Page);
  if (cached != null) {
    return Promise.resolve(cached);
  }

  const pending = pendingCache.get(Page);
  if (pending != null) {
    return pending;
  }

  const next = rasterizeReactPage(Page).then((texture) => {
    textureCache.set(Page, texture);
    pendingCache.delete(Page);
    return texture;
  });

  pendingCache.set(Page, next);
  return next;
};

export const loadPageHtmlTextures = (
  Front: FC,
  Back: FC,
  onLoad: (maps: { front: CanvasTexture; back: CanvasTexture }) => void
) => {
  let cancelled = false;

  void Promise.all([getPageTexture(Front), getPageTexture(Back)]).then(
    ([front, back]) => {
      if (!cancelled) {
        onLoad({ front, back });
      }
    },
    () => undefined
  );

  return () => {
    cancelled = true;
  };
};
