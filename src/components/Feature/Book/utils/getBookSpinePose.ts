import { COVER_HEIGHT, PAGE_DEPTH } from '../constants';

/** Cover-to-cover board: same height as the covers, depth follows the stack. */
export const getBookSpinePose = (sheetCount: number, delayedPage: number) => {
  const coverSpan = Math.max(0, sheetCount - 1) * PAGE_DEPTH;

  return {
    height: COVER_HEIGHT,
    depth: coverSpan + PAGE_DEPTH,
    z: delayedPage * PAGE_DEPTH - coverSpan / 2,
  };
};
