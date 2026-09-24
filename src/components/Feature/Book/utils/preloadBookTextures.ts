import { getPageTexture } from '@components/Feature/Book/utils/pageTextureCache';
import { BOOK_PRIORITY_FACES } from '../constants';
import { bookFaces } from './buildBookSheets';
import { waitBookLoadResume } from './bookLoadPause';

type PreloadBookTexturesParams = {
  onProgress: (progress: number) => void;
  onInteractive: () => void;
};

const yieldToMain = () =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, 0);
  });

const yieldToIdle = () =>
  new Promise<void>((resolve) => {
    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback(() => resolve(), { timeout: 120 });
      return;
    }

    setTimeout(resolve, 16);
  });

export const preloadBookTextures = async ({
  onProgress,
  onInteractive,
}: PreloadBookTexturesParams) => {
  const total = Math.max(bookFaces.length, 1);
  let loaded = 0;
  let notifiedInteractive = false;

  for (const face of bookFaces) {
    await waitBookLoadResume();

    try {
      await getPageTexture(face);
    } catch (error) {
      console.error(
        '[Book] Failed to rasterize page texture:',
        face.name || 'page',
        error
      );
    }

    loaded += 1;
    onProgress(Math.round((loaded / total) * 100));

    if (
      !notifiedInteractive &&
      loaded >= Math.min(BOOK_PRIORITY_FACES, total)
    ) {
      notifiedInteractive = true;
      onInteractive();
    }

    if (loaded < total) {
      await (notifiedInteractive ? yieldToIdle() : yieldToMain());
    }
  }

  if (!notifiedInteractive) {
    onInteractive();
  }
};
