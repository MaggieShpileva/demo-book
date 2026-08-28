import { FLIP_DURATION_MS, SHEET_Z_GAP } from '../constants';
import { easeInOutCubic } from './easeInOutCubic';
import type { FlipMotion } from '../types';

export const getSheetRotationY = (index: number, motion: FlipMotion) => {
  if (motion.movingIndex === index) {
    const raw = (performance.now() - motion.startMs) / FLIP_DURATION_MS;
    const t = easeInOutCubic(Math.min(1, Math.max(0, raw)));
    return motion.fromAngle + (motion.toAngle - motion.fromAngle) * t;
  }

  return index < motion.currentPage ? -Math.PI : 0;
};

export const getSheetPositionZ = (
  index: number,
  pageCount: number,
  motion: FlipMotion
) => {
  if (motion.movingIndex === index) {
    return pageCount * SHEET_Z_GAP + 0.04;
  }

  return (pageCount - index) * SHEET_Z_GAP;
};

export const shouldRenderSheet = (index: number, currentPage: number) =>
  Math.abs(index - currentPage) <= 1;
