import { FLIP_DURATION_MS } from '../constants';
import type { FlipMotion } from '../types';
import type { MutableRefObject } from 'react';

export const runFlipAnimation = (
  motionRef: MutableRefObject<FlipMotion>,
  onComplete: (nextPage: number) => void
) => {
  let raf = 0;

  const tick = () => {
    const motion = motionRef.current;
    if (motion.movingIndex < 0) {
      return;
    }

    if (performance.now() - motion.startMs < FLIP_DURATION_MS) {
      raf = requestAnimationFrame(tick);
      return;
    }

    const nextPage =
      motion.toAngle < motion.fromAngle
        ? motion.currentPage + 1
        : motion.currentPage - 1;
    motion.currentPage = nextPage;
    motion.movingIndex = -1;
    onComplete(nextPage);
  };

  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
};
