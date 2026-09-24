import type { FC } from 'react';
import type { CanvasTexture } from 'three';
import { peekPageTexture } from '@components/Feature/Book/utils/pageTextureCache';
import { isBookLoadPaused } from './bookLoadPause';

const WATCH_MS = 80;

type WatchBookPageTexturesReady = {
  front: CanvasTexture;
  back: CanvasTexture;
};

export const watchBookPageTextures = (
  Front: FC,
  Back: FC,
  onReady: (maps: WatchBookPageTexturesReady) => void
) => {
  let cancelled = false;
  let timeout = 0;

  const tick = () => {
    if (cancelled) {
      return;
    }

    const front = peekPageTexture(Front);
    const back = peekPageTexture(Back);
    if (front != null && back != null && !isBookLoadPaused()) {
      onReady({ front, back });
      return;
    }

    timeout = window.setTimeout(tick, WATCH_MS);
  };

  tick();

  return () => {
    cancelled = true;
    window.clearTimeout(timeout);
  };
};
