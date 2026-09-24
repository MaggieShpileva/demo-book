import {
  getOpenedAmountFromDrag,
  getPageEdgeDragProgress,
} from '@components/Feature/Book/utils/getPageEdgeDragProgress';
import {
  PAGE_COVER_DRAG_COMMIT,
  PAGE_EDGE_COMMIT,
  PAGE_EDGE_START_PX,
  PAGE_TAP_MAX_PX,
} from '@components/Feature/Book/constants';
import { BOOK_COVER_DRAG_PX, BOOK_DRAG_PX } from '../constants';
import type { BookDragMode, BookDragSession } from './bookDrag';
import { clampBookOpenedAmount } from './clampBookOpenedAmount';

const easeDragProgress = (progress: number) => {
  const t = clampBookOpenedAmount(progress);
  return t * t * (3 - 2 * t);
};

export const getBookDragAmount = (
  session: BookDragSession,
  clientX: number
) => {
  const progress = getPageEdgeDragProgress({
    mode: session.mode,
    startX: session.startX,
    clientX,
    dragPx: session.sheet === 0 ? BOOK_COVER_DRAG_PX : BOOK_DRAG_PX,
  });
  return clampBookOpenedAmount(
    getOpenedAmountFromDrag(session.mode, easeDragProgress(progress))
  );
};

export const shouldStartBookDrag = (
  session: BookDragSession,
  clientX: number
) => {
  const progress = getPageEdgeDragProgress({
    mode: session.mode,
    startX: session.startX,
    clientX,
    dragPx: session.sheet === 0 ? BOOK_COVER_DRAG_PX : BOOK_DRAG_PX,
  });
  return (
    progress > 0 && Math.abs(clientX - session.startX) >= PAGE_EDGE_START_PX
  );
};

export const resolveBookDragRelease = (
  session: BookDragSession,
  clientX: number,
  didDrag: boolean,
  visualOpened: number
): 'commit' | 'cancel' => {
  const progress = getPageEdgeDragProgress({
    mode: session.mode,
    startX: session.startX,
    clientX,
  });
  const isClick = Math.abs(clientX - session.startX) < PAGE_TAP_MAX_PX;

  if (session.sheet === 0 && didDrag && !isClick) {
    return visualOpened >= PAGE_COVER_DRAG_COMMIT ? 'commit' : 'cancel';
  }

  if (isClick || (didDrag && progress >= PAGE_EDGE_COMMIT)) {
    return 'commit';
  }

  return 'cancel';
};

export const getBookDragRestAmount = (
  mode: BookDragMode,
  result: 'commit' | 'cancel'
) => {
  if (mode === 'next') {
    return result === 'commit' ? 1 : 0;
  }

  return result === 'commit' ? 0 : 1;
};

export const getBookDragStartAmount = (mode: BookDragMode) =>
  mode === 'next' ? 0 : 1;
