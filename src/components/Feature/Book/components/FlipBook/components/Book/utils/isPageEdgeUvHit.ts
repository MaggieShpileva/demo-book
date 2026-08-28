import { PAGE_EDGE_RATIO } from '../constants';

/** Outer page strip in bind-pose UVs (matches red edge on the texture). */
export const isPageEdgeUvHit = (
  uvX: number,
  opened: boolean,
  faceNormalZ?: number
) => {
  if (faceNormalZ != null) {
    const isBackFace = faceNormalZ < 0;
    if (opened !== isBackFace) {
      return false;
    }
  }

  return opened ? uvX <= PAGE_EDGE_RATIO : uvX >= 1 - PAGE_EDGE_RATIO;
};
