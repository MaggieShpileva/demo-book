import { PAGE_WIDTH, PAGE_WIDTH_STEP } from '../constants';
import { getSheetStackDepth } from './getSheetPositionZ';

export const getPageWidthScale = (
  pageIndex: number,
  currentPage: number,
  sheetCount: number
) => {
  const depth = getSheetStackDepth(pageIndex, currentPage, sheetCount);
  return Math.max(0.88, (PAGE_WIDTH - depth * PAGE_WIDTH_STEP) / PAGE_WIDTH);
};

export const getPageWorldWidth = (
  pageIndex: number,
  currentPage: number,
  sheetCount: number
) => PAGE_WIDTH * getPageWidthScale(pageIndex, currentPage, sheetCount);
