import { useEffect, useRef, useState } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import { PAGE_EDGE_COMMIT, PAGE_EDGE_START_PX } from '../constants';
import {
  getOpenedAmountFromDrag,
  getPageEdgeDragProgress,
} from '../utils/getPageEdgeDragProgress';

type UsePageEdgeDragParams = {
  enabled: boolean;
  opened: boolean;
  pageNumber: number;
  onCommit: (nextPage: number) => void;
};

type DragSession = {
  mode: 'next' | 'prev';
  startX: number;
};

const commitPage = (
  mode: 'next' | 'prev',
  pageNumber: number,
  onCommit: (nextPage: number) => void
) => {
  onCommit(mode === 'next' ? pageNumber + 1 : pageNumber);
};

export const usePageEdgeDrag = ({
  enabled,
  opened,
  pageNumber,
  onCommit,
}: UsePageEdgeDragParams) => {
  const sessionRef = useRef<DragSession | null>(null);
  const openedAmountRef = useRef<number | null>(null);
  const pendingCommitRef = useRef<'next' | 'prev' | null>(null);
  const [isHolding, setIsHolding] = useState(false);
  const [openedAmount, setOpenedAmount] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);

  openedAmountRef.current = openedAmount;

  useEffect(() => {
    const pending = pendingCommitRef.current;
    if (pending == null || isHolding) {
      return;
    }

    const matched =
      (pending === 'next' && opened) || (pending === 'prev' && !opened);
    if (!matched) {
      return;
    }

    pendingCommitRef.current = null;
    setOpenedAmount(null);
  }, [isHolding, opened]);

  useEffect(() => {
    if (!isHolding) {
      return;
    }

    const onPointerMove = (event: PointerEvent) => {
      const session = sessionRef.current;
      if (session == null) {
        return;
      }

      const progress = getPageEdgeDragProgress({
        mode: session.mode,
        startX: session.startX,
        clientX: event.clientX,
      });
      const absDelta = Math.abs(event.clientX - session.startX);

      if (openedAmountRef.current == null) {
        if (progress <= 0 || absDelta < PAGE_EDGE_START_PX) {
          return;
        }
      }

      setOpenedAmount(getOpenedAmountFromDrag(session.mode, progress));
    };

    const onPointerUp = (event: PointerEvent) => {
      const session = sessionRef.current;
      if (session == null) {
        return;
      }

      const progress = getPageEdgeDragProgress({
        mode: session.mode,
        startX: session.startX,
        clientX: event.clientX,
      });
      const absDelta = Math.abs(event.clientX - session.startX);
      const didDrag = openedAmountRef.current != null;
      const isClick = !didDrag && absDelta < PAGE_EDGE_START_PX;
      const shouldCommit = isClick || (didDrag && progress >= PAGE_EDGE_COMMIT);

      if (shouldCommit) {
        commitPage(session.mode, pageNumber, onCommit);
        if (didDrag) {
          pendingCommitRef.current = session.mode;
          // Pin to rest until `opened` updates — avoids snap-back.
          setOpenedAmount(session.mode === 'next' ? 1 : 0);
        } else {
          pendingCommitRef.current = null;
          setOpenedAmount(null);
        }
      } else {
        pendingCommitRef.current = null;
        setOpenedAmount(null);
      }

      sessionRef.current = null;
      setIsHolding(false);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [isHolding, onCommit, pageNumber]);

  const onPointerDown = (event: ThreeEvent<PointerEvent>) => {
    if (!enabled || sessionRef.current != null) {
      return;
    }

    event.stopPropagation();
    pendingCommitRef.current = null;
    sessionRef.current = {
      mode: opened ? 'prev' : 'next',
      startX: event.nativeEvent.clientX,
    };
    setIsHolding(true);
  };

  return {
    openedAmount,
    isDragging: openedAmount != null && isHolding,
    isHolding,
    hovered,
    setHovered,
    onPointerDown,
  };
};
