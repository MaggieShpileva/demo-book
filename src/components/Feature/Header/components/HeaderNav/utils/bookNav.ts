import { bookPages } from '@/data/bookPages';
import { HEADER_COPY } from '../../../constants';

export type BookNavSection = {
  id: 'cover' | 'archive' | 'gloss' | 'back';
  page: number;
  ariaLabel: string;
  label?: string;
  start?: number;
  count?: number;
};

export const BOOK_NAV_SECTIONS: BookNavSection[] = [
  { id: 'cover', page: 0, ariaLabel: HEADER_COPY.navCover },
  {
    id: 'archive',
    page: 1,
    start: 1,
    count: 10,
    label: 'Архив',
    ariaLabel: 'Архив',
  },
  {
    id: 'gloss',
    page: 11,
    start: 11,
    count: 10,
    label: 'Глянец',
    ariaLabel: 'Глянец',
  },
  {
    id: 'back',
    page: bookPages.length,
    ariaLabel: HEADER_COPY.navBack,
  },
];

export const getBookNavSectionIndex = (page: number) => {
  if (page <= 0) {
    return 0;
  }

  if (page <= 10) {
    return 1;
  }

  if (page <= 20) {
    return 2;
  }

  return 3;
};

export const getBookNavProgressCurrent = (
  page: number,
  start: number,
  count: number
) => Math.min(count, Math.max(1, page - start + 1));

export const formatBookNavProgress = (
  page: number,
  start: number,
  count: number
) => {
  const current = getBookNavProgressCurrent(page, start, count);

  return `${String(current).padStart(2, '0')}/${String(count).padStart(2, '0')}`;
};

export const getBookNavFillRatio = (
  page: number,
  start?: number,
  count?: number
) => {
  if (start == null || count == null || count <= 0) {
    return 1;
  }

  return getBookNavProgressCurrent(page, start, count) / count;
};
