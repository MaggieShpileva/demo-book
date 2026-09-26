import { useEffect, useRef, useState } from 'react';
import { BOOK_PRESENT_OPEN_AMOUNT } from '../bookIntroConstants';
import type {
  BookDragMode,
  BookDragSession,
  BookDragState,
} from '../utils/bookDrag';
import { attachBookDragListeners } from '../utils/attachBookDragListeners';
import { setBookLoadPause } from '../utils/bookLoadPause';
import { getBookDragStartAmount } from '../utils/resolveBookDrag';

type UseBookDragOptions = {
  shouldPresentCover: () => boolean;
  presentCover: () => void;
};

export const useBookDrag = (
  page: number,
  setPage: (page: number) => void,
  { shouldPresentCover, presentCover }: UseBookDragOptions
) => {
  const [isBusy, setBusy] = useState(false);
  const sessionRef = useRef<BookDragSession | null>(null);
  const dragRef = useRef<BookDragState | null>(null);
  const settleRef = useRef<(() => void) | null>(null);
  const pageRef = useRef(page);
  const setPageRef = useRef(setPage);
  const shouldPresentCoverRef = useRef(shouldPresentCover);
  const presentCoverRef = useRef(presentCover);

  useEffect(() => {
    pageRef.current = page;
    setPageRef.current = setPage;
    shouldPresentCoverRef.current = shouldPresentCover;
    presentCoverRef.current = presentCover;
  }, [page, setPage, shouldPresentCover, presentCover]);

  useEffect(() => {
    setBookLoadPause('drag', isBusy);
  }, [isBusy]);

  useEffect(
    () => () => {
      settleRef.current?.();
      setBookLoadPause('drag', false);
    },
    []
  );

  useEffect(() => {
    if (!isBusy) {
      return;
    }

    return attachBookDragListeners({
      sessionRef,
      dragRef,
      settleRef,
      pageRef,
      setPage: (next) => setPageRef.current(next),
      setBusy,
      shouldPresentCover: () => shouldPresentCoverRef.current(),
      presentCover: () => presentCoverRef.current(),
      presentOpenAmount: BOOK_PRESENT_OPEN_AMOUNT,
    });
  }, [isBusy]);

  const startDrag = (
    sheet: number,
    mode: BookDragMode,
    startX: number,
    options?: { onTap?: () => void }
  ) => {
    settleRef.current?.();
    settleRef.current = null;
    sessionRef.current = { sheet, mode, startX, onTap: options?.onTap };
    dragRef.current = {
      sheet,
      mode,
      amount: getBookDragStartAmount(mode),
    };
    setBusy(true);
  };

  return { dragRef, startDrag, isDragging: isBusy };
};
