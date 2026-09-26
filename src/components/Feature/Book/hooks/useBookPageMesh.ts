import { useEffect, useMemo, useRef, useState } from 'react';
import type { FC } from 'react';
import { useThree } from '@react-three/fiber';
import type { Group, Texture } from 'three';
import type { BookPageOverlayRaster } from '@components/Feature/Book/utils/bookPageOverlay';
import { loadPageHtmlTextures } from '@components/Feature/Book/utils/pageTextureCache';
import { applyBookPageTextures } from '../utils/applyBookPageTextures';
import {
  isBookLoadPaused,
  subscribeBookLoadPause,
} from '../utils/bookLoadPause';
import { createBookPageMesh } from '../utils/createBookPageMesh';
import { disposeBookPageMesh } from '../utils/disposeBookPageMesh';
import { watchBookPageTextures } from '../utils/watchBookPageTextures';

export const useBookPageMesh = (
  Front: FC,
  Back: FC,
  eager: boolean,
  renderOrder: number
) => {
  const groupRef = useRef<Group>(null);
  const mesh = useMemo(() => createBookPageMesh(Front, Back), [Front, Back]);
  const invalidate = useThree((state) => state.invalidate);
  const [frontOverlay, setFrontOverlay] =
    useState<BookPageOverlayRaster | null>(null);

  mesh.renderOrder = renderOrder;

  useEffect(() => {
    return () => {
      disposeBookPageMesh(mesh);
    };
  }, [mesh]);

  useEffect(() => {
    const apply = (
      front: Texture,
      back: Texture,
      nextFrontOverlay: BookPageOverlayRaster | null = null
    ) => {
      applyBookPageTextures(mesh, front, back);
      setFrontOverlay(nextFrontOverlay);
      invalidate();
    };

    let stop: (() => void) | undefined;

    const connect = () => {
      stop?.();

      if (eager && !isBookLoadPaused()) {
        stop = loadPageHtmlTextures(
          Front,
          Back,
          ({ front, back, frontOverlay: nextOverlay }) => {
            apply(front, back, nextOverlay);
          }
        );
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

  return { groupRef, mesh, frontOverlay };
};
