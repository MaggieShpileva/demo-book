import type { FC, ReactNode } from 'react';
import { BookPageContext } from './BookPageContext';

type BookPageProviderProps = {
  setPage: (page: number) => void;
  children: ReactNode;
};

export const BookPageProvider: FC<BookPageProviderProps> = ({
  setPage,
  children,
}) => (
  <BookPageContext.Provider value={{ setPage }}>
    {children}
  </BookPageContext.Provider>
);
