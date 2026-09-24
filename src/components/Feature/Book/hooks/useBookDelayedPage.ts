import { useEffect, useRef, useState } from 'react';
import { PAGE_TURN_CURL_MS } from '../constants';
import { setBookLoadPause } from '../utils/bookLoadPause';
import { runDelayedPageWalk } from '../utils/runDelayedPageWalk';

const WALK_SETTLE_MS = PAGE_TURN_CURL_MS + 160;

export const useBookDelayedPage = (page: number) => {
  const [delayedPage, setDelayedPage] = useState(page);
  const delayedPageRef = useRef(page);
  const prevRef = useRef({ page, delayedPage });

  useEffect(() => {
    const changed =
      prevRef.current.page !== page ||
      prevRef.current.delayedPage !== delayedPage;
    prevRef.current = { page, delayedPage };

    if (!changed) {
      return;
    }

    setBookLoadPause('walk', true);

    if (page !== delayedPage) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setBookLoadPause('walk', false);
    }, WALK_SETTLE_MS);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [delayedPage, page]);

  useEffect(
    () =>
      runDelayedPageWalk(
        page,
        () => delayedPageRef.current,
        (next) => {
          delayedPageRef.current = next;
          setDelayedPage(next);
        }
      ),
    [page]
  );

  useEffect(
    () => () => {
      setBookLoadPause('walk', false);
    },
    []
  );

  return delayedPage;
};
