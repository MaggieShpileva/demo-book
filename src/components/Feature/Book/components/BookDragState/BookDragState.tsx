import type { FC, ReactNode } from 'react';
import { useBookDrag } from '../../hooks/useBookDrag';
import { BookDragContext } from './BookDragContext';

type BookDragProviderProps = {
  page: number;
  setPage: (page: number) => void;
  children: ReactNode;
};

export const BookDragProvider: FC<BookDragProviderProps> = ({
  page,
  setPage,
  children,
}) => {
  const value = useBookDrag(page, setPage);

  return (
    <BookDragContext.Provider value={value}>
      {children}
    </BookDragContext.Provider>
  );
};
