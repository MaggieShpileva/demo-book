import { createContext, useContext, type MutableRefObject } from 'react';
import type {
  BookDragMode,
  BookDragState,
} from '../../utils/bookDrag';

type BookDragContextValue = {
  dragRef: MutableRefObject<BookDragState | null>;
  startDrag: (sheet: number, mode: BookDragMode, startX: number) => void;
  isDragging: boolean;
};

export const BookDragContext = createContext<BookDragContextValue | null>(
  null
);

export const useBookDragContext = () => {
  const value = useContext(BookDragContext);
  if (value == null) {
    throw new Error('[Book] Drag provider is missing');
  }

  return value;
};
