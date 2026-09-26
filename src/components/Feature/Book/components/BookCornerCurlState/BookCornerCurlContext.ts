import { createContext, useContext } from 'react';

export type BookCornerCurlContextValue = {
  curledSheet: number | null;
  activeSheet: number | null;
  isCurled: boolean;
  isSheetCurled: (sheet: number) => boolean;
};

export const BookCornerCurlContext =
  createContext<BookCornerCurlContextValue | null>(null);

export const useBookCornerCurl = () => {
  const value = useContext(BookCornerCurlContext);
  if (!value) {
    throw new Error('useBookCornerCurl must be used within BookCornerCurlProvider');
  }
  return value;
};
