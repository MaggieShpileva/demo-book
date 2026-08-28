import { PAGE_Z_GAP } from '../constants';

/** Clamp past-last index (back cover) so the last sheet stays the stack top. */
export const getStackPage = (currentPage: number, sheetCount: number) =>
  Math.min(currentPage, Math.max(0, sheetCount - 1));

export const getSheetStackDepth = (
  pageIndex: number,
  currentPage: number,
  sheetCount: number
) => {
  const page = getStackPage(currentPage, sheetCount);
  return pageIndex >= page
    ? pageIndex - page
    : Math.max(0, page - 1 - pageIndex);
};

export const getSheetPositionZ = (
  pageIndex: number,
  currentPage: number,
  sheetCount: number
) => (getStackPage(currentPage, sheetCount) - pageIndex) * PAGE_Z_GAP;
