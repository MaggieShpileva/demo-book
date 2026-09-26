import { useEffect, useRef, useState } from 'react';
import {
  clearBookPackJump,
  selectBookPackJump,
} from '@/store/features/book';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { PAGE_TURN_CURL_MS } from '../constants';
import { startBookPackFlip } from '../utils/bookPackFlip';
import { setBookLoadPause } from '../utils/bookLoadPause';
import { runDelayedPageWalk } from '../utils/runDelayedPageWalk';

const WALK_SETTLE_MS = PAGE_TURN_CURL_MS + 160;

export const useBookDelayedPage = (page: number, instant = false) => {
  const dispatch = useAppDispatch();
  const packJump = useAppSelector(selectBookPackJump);
  const [delayedPage, setDelayedPage] = useState(page);
  const delayedPageRef = useRef(page);
  /** Target page for an active pack jump; survives packJump clear + Strict Mode. */
  const packTargetRef = useRef<number | null>(null);
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

  useEffect(() => {
    if (!packJump) {
      return;
    }

    packTargetRef.current = page;
    dispatch(clearBookPackJump());
  }, [dispatch, packJump, page]);

  useEffect(() => {
    if (instant) {
      packTargetRef.current = null;
      delayedPageRef.current = page;
      setDelayedPage(page);
      return;
    }

    const usePack = packTargetRef.current === page;
    if (!usePack) {
      packTargetRef.current = null;
      return runDelayedPageWalk(
        page,
        () => delayedPageRef.current,
        (next) => {
          delayedPageRef.current = next;
          setDelayedPage(next);
        }
      );
    }

    // Instant page target + per-sheet lag in the hinge animation.
    const from = delayedPageRef.current;
    startBookPackFlip(from, page);
    packTargetRef.current = null;
    delayedPageRef.current = page;
    setDelayedPage(page);
    return undefined;
  }, [instant, page]);

  useEffect(
    () => () => {
      setBookLoadPause('walk', false);
    },
    []
  );

  return delayedPage;
};
