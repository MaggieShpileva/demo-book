import { useEffect, useRef, useState } from 'react';
import type {
  BookDragMode,
  BookDragSession,
  BookDragState,
} from '../utils/bookDrag';
import { attachBookDragListeners } from '../utils/attachBookDragListeners';
import { setBookLoadPause } from '../utils/bookLoadPause';

export const useBookDrag = (
  page: number,
  setPage: (page: number) => void
) => {
  const [isBusy, setBusy] = useState(false);
  const sessionRef = useRef<BookDragSession | null>(null);
  const dragRef = useRef<BookDragState | null>(null);
  const settleRef = useRef<(() => void) | null>(null);
  const pageRef = useRef(page);
  const setPageRef = useRef(setPage);

  useEffect(() => {
    pageRef.current = page;
    setPageRef.current = setPage;
  }, [page, setPage]);

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
    });
  }, [isBusy]);

  const startDrag = (sheet: number, mode: BookDragMode, startX: number) => {
    settleRef.current?.();
    settleRef.current = null;
    dragRef.current = null;
    sessionRef.current = { sheet, mode, startX };
    setBusy(true);
  };

  return { dragRef, startDrag, isDragging: isBusy };
};
