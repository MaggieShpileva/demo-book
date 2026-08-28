import { useEffect, useState } from 'react';
import { preloadBookTextures } from '../components/Book/utils/preloadBookTextures';
import { clearPageTextureCache } from '../components/Book/utils/pageTextureCache';
import { useSinglePageBook } from './useSinglePageBook';

export const useBookTexturesReady = () => {
  const singlePage = useSinglePageBook();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsReady(false);
    clearPageTextureCache();

    void preloadBookTextures().then(() => {
      if (!cancelled) {
        setIsReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [singlePage]);

  return isReady;
};
