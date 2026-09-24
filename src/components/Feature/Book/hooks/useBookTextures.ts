import { useEffect, useState } from 'react';
import { setLoaderProgress } from '@/store/features/book';
import { useAppDispatch } from '@/store/hooks';
import { preloadBookTextures } from '../utils/preloadBookTextures';

export const useBookTextures = () => {
  const dispatch = useAppDispatch();
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    dispatch(setLoaderProgress(0));

    void preloadBookTextures({
      onProgress: (next) => {
        if (!cancelled) {
          setProgress(next);
          dispatch(setLoaderProgress(next));
        }
      },
      onInteractive: () => {
        if (!cancelled) {
          setReady(true);
        }
      },
    });

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  return { progress, ready };
};
