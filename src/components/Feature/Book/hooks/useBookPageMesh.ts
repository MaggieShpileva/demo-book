import { useEffect, useMemo, useRef } from 'react';
import type { FC } from 'react';
import { useThree } from '@react-three/fiber';
import type { CanvasTexture, Group } from 'three';
import { loadPageHtmlTextures } from '@components/Feature/Book/utils/pageTextureCache';
import { applyBookPageTextures } from '../utils/applyBookPageTextures';
import {
  isBookLoadPaused,
  subscribeBookLoadPause,
} from '../utils/bookLoadPause';
import { createBookPageMesh } from '../utils/createBookPageMesh';
import { disposeBookPageMesh } from '../utils/disposeBookPageMesh';
import { watchBookPageTextures } from '../utils/watchBookPageTextures';

export const useBookPageMesh = (Front: FC, Back: FC, eager: boolean) => {
  const groupRef = useRef<Group>(null);
  const mesh = useMemo(() => createBookPageMesh(Front, Back), [Front, Back]);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    return () => {
      disposeBookPageMesh(mesh);
    };
  }, [mesh]);

  useEffect(() => {
    const apply = (front: CanvasTexture, back: CanvasTexture) => {
      applyBookPageTextures(mesh, front, back);
      invalidate();
    };

    let stop: (() => void) | undefined;

    const connect = () => {
      stop?.();

      if (eager && !isBookLoadPaused()) {
        stop = loadPageHtmlTextures(Front, Back, ({ front, back }) => {
          apply(front, back);
        });
        return;
      }

      stop = watchBookPageTextures(Front, Back, ({ front, back }) => {
        apply(front, back);
      });
    };

    connect();
    const unsubscribe = subscribeBookLoadPause(connect);

    return () => {
      unsubscribe();
      stop?.();
    };
  }, [Front, Back, eager, invalidate, mesh]);

  return { groupRef, mesh };
};
