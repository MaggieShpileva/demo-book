import { createContext, useContext } from 'react';

type BookPageContextValue = {
  setPage: (page: number) => void;
};

export const BookPageContext = createContext<BookPageContextValue | null>(null);

export const useBookSetPage = () => {
  const value = useContext(BookPageContext);
  if (value == null) {
    throw new Error('[Book] Page provider is missing');
  }

  return value.setPage;
};
