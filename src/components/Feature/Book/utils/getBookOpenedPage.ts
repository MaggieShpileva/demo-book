import type { BookDragState } from './bookDrag';

export const getBookOpenedPage = (
  delayedPage: number,
  drag: BookDragState | null,
  sheetAmounts?: readonly number[]
) => {
  if (sheetAmounts != null && sheetAmounts.length > 0) {
    return sheetAmounts.reduce((sum, amount) => sum + amount, 0);
  }

  if (drag != null) {
    return drag.sheet + drag.amount;
  }

  return delayedPage;
};
