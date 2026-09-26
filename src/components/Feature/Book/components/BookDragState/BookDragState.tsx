import type { FC, ReactNode } from 'react';
import { useBookDrag } from '../../hooks/useBookDrag';
import { useBookStage } from '../BookStage';
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
  const { stage, present } = useBookStage();
  const value = useBookDrag(page, setPage, {
    shouldPresentCover: () => stage === 'idle',
    presentCover: present,
  });

  return (
    <BookDragContext.Provider value={value}>
      {children}
    </BookDragContext.Provider>
  );
};
