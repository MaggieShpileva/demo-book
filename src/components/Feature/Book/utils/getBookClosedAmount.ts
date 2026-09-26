import type { BookDragState } from './bookDrag';
import { clampBookOpenedAmount } from './clampBookOpenedAmount';

export const getBookClosedAmount = (
  delayedPage: number,
  sheetCount: number,
  drag: BookDragState | null,
  sheetAmounts?: readonly number[]
) => {
  const lastSheet = Math.max(0, sheetCount - 1);
  const frontAmount = sheetAmounts?.[0];
  const backAmount = sheetAmounts?.[lastSheet];

  if (frontAmount != null && backAmount != null) {
    return clampBookOpenedAmount(Math.max(1 - frontAmount, backAmount));
  }

  if (drag?.sheet === 0) {
    return clampBookOpenedAmount(1 - drag.amount);
  }

  if (drag?.sheet === lastSheet) {
    return clampBookOpenedAmount(drag.amount);
  }

  return delayedPage === 0 || delayedPage === sheetCount ? 1 : 0;
};
