import {
  useCallback,
  useMemo,
  useState,
  type FC,
  type ReactNode,
} from 'react';
import { selectBookCornerIdleNonce } from '@/store/features/book';
import { useAppSelector } from '@/store/hooks';
import { bookSheets } from '../../utils/buildBookSheets';
import { ContentsPage } from '@/pages/ContentsPage';
import { useBookDragContext } from '../BookDragState';
import { useBookStage } from '../BookStage';
import {
  BookCornerCurlContext,
  type BookCornerCurlContextValue,
} from './BookCornerCurlContext';
import { usePageCornerIdleAutoplay } from './hooks/usePageCornerIdleAutoplay';

type BookCornerCurlProviderProps = {
  page: number;
  children: ReactNode;
};

const isCurlableSheet = (sheet: number, sheetCount: number) => {
  const lastSheet = sheetCount - 1;
  // Covers + contents — no dog-ear idle hint.
  if (sheet <= 0 || sheet >= lastSheet) {
    return false;
  }
  return bookSheets[sheet]?.Front !== ContentsPage;
};

export const BookCornerCurlProvider: FC<BookCornerCurlProviderProps> = ({
  page,
  children,
}) => {
  const [curledSheet, setCurledSheet] = useState<number | null>(null);
  const { isDragging } = useBookDragContext();
  const { stage } = useBookStage();
  const idleNonce = useAppSelector(selectBookCornerIdleNonce);
  const sheetCount = bookSheets.length;
  const activeSheet = isCurlableSheet(page, sheetCount) ? page : null;
  const enabled = stage === 'reading' && activeSheet !== null;

  usePageCornerIdleAutoplay({
    activeSheet,
    page,
    idleNonce,
    isDragging,
    enabled,
    setCurledSheet,
  });

  const isSheetCurled = useCallback(
    (sheet: number) => curledSheet === sheet,
    [curledSheet]
  );

  const value = useMemo<BookCornerCurlContextValue>(
    () => ({
      curledSheet,
      activeSheet,
      isCurled: curledSheet !== null && curledSheet === activeSheet,
      isSheetCurled,
    }),
    [activeSheet, curledSheet, isSheetCurled]
  );

  return (
    <BookCornerCurlContext.Provider value={value}>
      {children}
    </BookCornerCurlContext.Provider>
  );
};
