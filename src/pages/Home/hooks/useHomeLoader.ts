import { useEffect, useState } from 'react';

const LOADER_TEXT_HOLD_MS = 400;
const LOADER_TEXT_FADE_MS = 400;

export const useHomeLoader = (loaderProgress: number) => {
  const isLoaderComplete = loaderProgress >= 100;
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);

  useEffect(() => {
    if (!isLoaderComplete) {
      setIsLoaderVisible(true);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsLoaderVisible(false);
    }, LOADER_TEXT_HOLD_MS + LOADER_TEXT_FADE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [isLoaderComplete]);

  return { isLoaderComplete, isLoaderVisible };
};
