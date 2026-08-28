import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { PAGE_TURN_MS } from '../constants';

const walkTowardPage = (
  page: number,
  setDelayedPage: Dispatch<SetStateAction<number>>
) => {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  const goToPage = () => {
    setDelayedPage((delayedPage) => {
      if (page === delayedPage) {
        return delayedPage;
      }

      // Match turn duration so the next sheet does not start mid-flip.
      timeout = setTimeout(
        goToPage,
        Math.abs(page - delayedPage) > 2 ? PAGE_TURN_MS / 3 : PAGE_TURN_MS
      );

      if (page > delayedPage) {
        return delayedPage + 1;
      }
      if (page < delayedPage) {
        return delayedPage - 1;
      }
      return delayedPage;
    });
  };

  goToPage();
  return () => {
    if (timeout != null) {
      clearTimeout(timeout);
    }
  };
};

export const useDelayedPage = (page: number) => {
  const [delayedPage, setDelayedPage] = useState(page);

  useEffect(() => walkTowardPage(page, setDelayedPage), [page]);

  return delayedPage;
};
