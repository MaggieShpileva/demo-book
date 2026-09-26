import type { ThreeEvent } from '@react-three/fiber';
import { useBookDragContext } from '../components/BookDragState';
import { useBookSetPage } from '../components/BookPageState';
import { useBookStage } from '../components/BookStage';

type UseBookPageHitsParams = {
  number: number;
  opened: boolean;
  page: number;
  delayedPage: number;
  sheetCount: number;
};

export const useBookPageHits = ({
  number,
  opened,
  page,
  delayedPage,
  sheetCount,
}: UseBookPageHitsParams) => {
  const { startDrag, isDragging } = useBookDragContext();
  const setPage = useBookSetPage();
  const { stage } = useBookStage();
  const isSettled = page === delayedPage && !isDragging;
  const canHitCover = stage === 'idle' || stage === 'reading';
  /** Closed cover: idle starts intro; reading reopens to contents. */
  const showCover = isSettled && canHitCover && number === 0 && page === 0;
  const showNext =
    isSettled &&
    !opened &&
    number === page &&
    page < sheetCount &&
    !showCover;
  const showPrevEdge = isSettled && !opened && number === page && page > 0;
  /** Left page, or front cover (larger, may peek under the stack). */
  const showPrevPage =
    isSettled &&
    opened &&
    page > 0 &&
    (number === page - 1 || number === 0);

  const handleNext = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    startDrag(page, 'next', event.nativeEvent.clientX);
  };

  const handlePrev = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    if (number === 0 && page > 1) {
      setPage(0);
      return;
    }

    startDrag(page - 1, 'prev', event.nativeEvent.clientX);
  };

  return {
    showCover,
    showNext,
    showPrevEdge,
    showPrevPage,
    handleNext,
    handlePrev,
  };
};
