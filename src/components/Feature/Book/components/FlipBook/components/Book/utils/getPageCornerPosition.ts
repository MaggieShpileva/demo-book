import {
  PAGE_CORNER_SIZE,
  PAGE_DEPTH,
  PAGE_HEIGHT,
  PAGE_WIDTH,
} from '../constants';

export const getPageCornerPosition = (
  opened: boolean
): [number, number, number] => {
  const faceZ = opened ? -PAGE_DEPTH / 2 - 0.004 : PAGE_DEPTH / 2 + 0.004;
  return [
    PAGE_WIDTH - PAGE_CORNER_SIZE / 2,
    -PAGE_HEIGHT / 2 + PAGE_CORNER_SIZE / 2,
    faceZ,
  ];
};
