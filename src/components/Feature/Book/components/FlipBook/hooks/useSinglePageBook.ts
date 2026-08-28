import { useEffect, useState } from 'react';
import { SINGLE_PAGE_MAX_WIDTH } from '../components/Book/constants';

export const useSinglePageBook = () => {
  const [singlePage, setSinglePage] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia(`(max-width: ${SINGLE_PAGE_MAX_WIDTH - 1}px)`).matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${SINGLE_PAGE_MAX_WIDTH - 1}px)`
    );
    const onChange = () => setSinglePage(mediaQuery.matches);

    onChange();
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  return singlePage;
};
