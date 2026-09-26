import { bookPages } from '@/data/bookPages';
import { HEADER_COPY } from '../../../constants';

/** bookPages: [CoverFront, ContentsPage, Page1…Page20, CoverBack]. */
const CONTENTS_PAGE = 1;
const ARCHIVE_START = 2;
const GLOSS_START = 12;
const SECTION_PAGE_COUNT = 10;

export type BookNavSection = {
  id: 'contents' | 'archive' | 'gloss' | 'back';
  page: number;
  ariaLabel: string;
  label?: string;
  start?: number;
  count?: number;
};

export const BOOK_NAV_SECTIONS: BookNavSection[] = [
  {
    id: 'contents',
    page: CONTENTS_PAGE,
    ariaLabel: HEADER_COPY.navContents,
  },
  {
    id: 'archive',
    page: ARCHIVE_START,
    start: ARCHIVE_START,
    count: SECTION_PAGE_COUNT,
    label: 'Архив',
    ariaLabel: 'Архив',
  },
  {
    id: 'gloss',
    page: GLOSS_START,
    start: GLOSS_START,
    count: SECTION_PAGE_COUNT,
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
  if (page <= CONTENTS_PAGE) {
    return 0;
  }

  if (page < GLOSS_START) {
    return 1;
  }

  if (page <= GLOSS_START + SECTION_PAGE_COUNT - 1) {
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
