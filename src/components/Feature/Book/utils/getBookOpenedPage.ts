import type { BookDragState } from './bookDrag';

export const getBookOpenedPage = (
  delayedPage: number,
  drag: BookDragState | null
) => (drag == null ? delayedPage : drag.sheet + drag.amount);
