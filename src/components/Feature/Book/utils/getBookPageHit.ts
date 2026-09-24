import {
  PAGE_DEPTH,
  PAGE_HEIGHT,
  PAGE_HIT_RATIO,
  PAGE_WIDTH,
} from '../constants';

export type BookHitSide = 'next' | 'prevEdge' | 'prevPage';

const HIT_LIFT = 0.02;

export const getBookPageHit = (side: BookHitSide) => {
  const edgeWidth = PAGE_WIDTH * PAGE_HIT_RATIO;

  if (side === 'next') {
    return {
      position: [
        PAGE_WIDTH - edgeWidth / 2,
        0,
        PAGE_DEPTH / 2 + HIT_LIFT,
      ] as const,
      size: [edgeWidth, PAGE_HEIGHT] as const,
    };
  }

  if (side === 'prevEdge') {
    return {
      position: [edgeWidth / 2, 0, PAGE_DEPTH / 2 + HIT_LIFT] as const,
      size: [edgeWidth, PAGE_HEIGHT] as const,
    };
  }

  return {
    position: [PAGE_WIDTH / 2, 0, -PAGE_DEPTH / 2 - HIT_LIFT] as const,
    size: [PAGE_WIDTH, PAGE_HEIGHT] as const,
  };
};
