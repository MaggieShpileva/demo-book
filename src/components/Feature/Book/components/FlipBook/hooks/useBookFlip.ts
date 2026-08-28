import { useEffect, useRef, useState } from 'react';
import { runFlipAnimation } from '../utils/runFlipAnimation';
import type { FlipMotion } from '../types';

const createIdleMotion = (currentPage: number): FlipMotion => ({
  currentPage,
  movingIndex: -1,
  fromAngle: 0,
  toAngle: 0,
  startMs: 0,
});

export const useBookFlip = (
  pageCount: number,
  onFlip: (page: number) => void
) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const motionRef = useRef<FlipMotion>(createIdleMotion(0));

  useEffect(() => {
    if (!isAnimating) {
      return;
    }

    return runFlipAnimation(motionRef, (nextPage) => {
      setCurrentPage(nextPage);
      setIsAnimating(false);
      onFlip(nextPage);
    });
  }, [isAnimating, onFlip]);

  const flipNext = () => {
    const motion = motionRef.current;
    if (motion.movingIndex >= 0 || motion.currentPage >= pageCount - 1) {
      return;
    }

    motion.movingIndex = motion.currentPage;
    motion.fromAngle = 0;
    motion.toAngle = -Math.PI;
    motion.startMs = performance.now();
    setIsAnimating(true);
  };

  const flipPrev = () => {
    const motion = motionRef.current;
    if (motion.movingIndex >= 0 || motion.currentPage <= 0) {
      return;
    }

    motion.movingIndex = motion.currentPage - 1;
    motion.fromAngle = -Math.PI;
    motion.toAngle = 0;
    motion.startMs = performance.now();
    setIsAnimating(true);
  };

  return { currentPage, isAnimating, motionRef, flipNext, flipPrev };
};
