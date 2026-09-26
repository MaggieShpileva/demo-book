import {
  setBookPagePack,
  selectBookIntroComplete,
  selectBookPage,
} from '@/store/features/book';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  BOOK_NAV_SECTIONS,
  formatBookNavProgress,
  getBookNavFillRatio,
  getBookNavSectionIndex,
} from '../utils/bookNav';

export const useHeaderNav = () => {
  const page = useAppSelector(selectBookPage);
  const isVisible = useAppSelector(selectBookIntroComplete);
  const dispatch = useAppDispatch();
  const activeIndex = getBookNavSectionIndex(page);

  return {
    sections: BOOK_NAV_SECTIONS,
    activeIndex,
    page,
    isVisible,
    setSection: (index: number) => {
      const section = BOOK_NAV_SECTIONS[index];
      if (section == null) {
        return;
      }

      // Any nav section jump: flip intermediate sheets as one pack (both ways).
      dispatch(setBookPagePack(section.page));
    },
    getProgress: (index: number) => {
      const section = BOOK_NAV_SECTIONS[index];

      if (section.start == null || section.count == null) {
        return undefined;
      }

      return formatBookNavProgress(page, section.start, section.count);
    },
    getFillRatio: (index: number) => {
      const section = BOOK_NAV_SECTIONS[index];

      return getBookNavFillRatio(page, section.start, section.count);
    },
  };
};
