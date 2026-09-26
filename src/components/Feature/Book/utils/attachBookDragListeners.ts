import type { MutableRefObject } from 'react';
import { PAGE_TAP_MAX_PX } from '../constants';
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
  shouldPresentCover: () => boolean;
  presentCover: () => void;
  presentOpenAmount: number;
};

const writeDrag = (
  dragRef: MutableRefObject<BookDragState | null>,
  session: BookDragSession,
  amount: number
) => {
  dragRef.current = {
    sheet: session.sheet,
    mode: session.mode,
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
  shouldPresentCover,
  presentCover,
  presentOpenAmount,
}: AttachBookDragListenersParams) => {
  let didMove = false;

  const onPointerMove = (event: PointerEvent) => {
    const session = sessionRef.current;
    if (session == null) {
      return;
    }

    if (!didMove && !shouldStartBookDrag(session, event.clientX)) {
      return;
    }

    didMove = true;
    writeDrag(dragRef, session, getBookDragAmount(session, event.clientX));
  };

  const finish = (session: BookDragSession, result: 'commit' | 'cancel') => {
    const willPresent =
      result === 'commit' && session.sheet === 0 && shouldPresentCover();
    const from =
      dragRef.current?.amount ?? getBookDragStartAmount(session.mode);
    const to = willPresent
      ? presentOpenAmount
      : getBookDragRestAmount(session.mode, result);

    // Start pose damp immediately so present transition is smooth.
    if (willPresent) {
      presentCover();
    }

    settleRef.current?.();
    settleRef.current = runBookDragSettle(
      from,
      to,
      (amount) => writeDrag(dragRef, session, amount),
      () => {
        settleRef.current = null;
        dragRef.current = null;
        if (!willPresent && result === 'commit') {
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
    const didDrag = didMove;
    const isTap = Math.abs(event.clientX - session.startX) < PAGE_TAP_MAX_PX;

    if (isTap && session.onTap) {
      session.onTap();
      finish(session, 'cancel');
      return;
    }

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
