import { PAGE_DEPTH, PAGE_EDGE_RATIO, PAGE_WIDTH } from '../constants';

export const getPageEdgeWidth = () => PAGE_WIDTH * PAGE_EDGE_RATIO;

/** Local position on the outermost page bone (x=0 is the outer tip). */
export const getPageEdgePositionOnBone = (
  opened: boolean,
  depth = PAGE_DEPTH
): [number, number, number] => {
  const width = getPageEdgeWidth();
  const faceZ = opened ? -depth / 2 - 0.02 : depth / 2 + 0.02;

  return [-width / 2, 0, faceZ];
};
