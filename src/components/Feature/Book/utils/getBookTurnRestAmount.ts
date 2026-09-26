import type { BookDragMode } from './bookDrag';

export const getBookTurnRestAmount = (
  opened: boolean,
  dragMode: BookDragMode | null
) => {
  if (dragMode === 'next') {
    return 1;
  }

  if (dragMode === 'prev') {
    return 0;
  }

  return opened ? 1 : 0;
};
