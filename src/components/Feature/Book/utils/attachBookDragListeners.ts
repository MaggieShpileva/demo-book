import type { MutableRefObject } from 'react';
import type { BookDragSession, BookDragState } from './bookDrag';
import {
  getBookDragAmount,
  getBookDragRestAmount,
  getBookDragStartAmount,
  resolveBookDragRelease,
  shouldStartBookDrag,
} from './resolveBookDrag';
import { runBookDragSettle } from './runBookDragSettle';

type AttachBookDragListenersParams = {
  sessionRef: MutableRefObject<BookDragSession | null>;
  dragRef: MutableRefObject<BookDragState | null>;
  settleRef: MutableRefObject<(() => void) | null>;
  pageRef: MutableRefObject<number>;
  setPage: (page: number) => void;
  setBusy: (busy: boolean) => void;
};

const writeDrag = (
  dragRef: MutableRefObject<BookDragState | null>,
  session: BookDragSession,
  amount: number
) => {
  dragRef.current = {
    sheet: session.sheet,
    amount: Math.min(1, Math.max(0, amount)),
  };
};

export const attachBookDragListeners = ({
  sessionRef,
  dragRef,
  settleRef,
  pageRef,
  setPage,
  setBusy,
}: AttachBookDragListenersParams) => {
  const onPointerMove = (event: PointerEvent) => {
    const session = sessionRef.current;
    if (session == null) {
      return;
    }

    if (
      dragRef.current == null &&
      !shouldStartBookDrag(session, event.clientX)
    ) {
      return;
    }

    writeDrag(dragRef, session, getBookDragAmount(session, event.clientX));
  };

  const finish = (session: BookDragSession, result: 'commit' | 'cancel') => {
    const from =
      dragRef.current?.amount ?? getBookDragStartAmount(session.mode);
    const to = getBookDragRestAmount(session.mode, result);
    settleRef.current?.();
    settleRef.current = runBookDragSettle(
      from,
      to,
      (amount) => writeDrag(dragRef, session, amount),
      () => {
        settleRef.current = null;
        dragRef.current = null;
        if (result === 'commit') {
          setPage(
            session.mode === 'next' ? pageRef.current + 1 : pageRef.current - 1
          );
        }
        setBusy(false);
      }
    );
  };

  const onPointerUp = (event: PointerEvent) => {
    const session = sessionRef.current;
    if (session == null) {
      return;
    }

    sessionRef.current = null;
    const didDrag = dragRef.current != null;
    const visualOpened =
      dragRef.current?.amount ?? (session.mode === 'next' ? 0 : 1);
    finish(
      session,
      resolveBookDragRelease(session, event.clientX, didDrag, visualOpened)
    );
  };

  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);
  return () => {
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('pointercancel', onPointerUp);
  };
};
