import type { ThreeEvent } from '@react-three/fiber';
import { useBookDragContext } from '../components/BookDragState';

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
  const isSettled = page === delayedPage && !isDragging;
  const showNext = isSettled && !opened && number === page && page < sheetCount;
  const showPrevEdge = isSettled && !opened && number === page && page > 0;
  const showPrevPage = isSettled && opened && number === page - 1 && page > 0;

  const handleNext = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    startDrag(page, 'next', event.nativeEvent.clientX);
  };

  const handlePrev = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    startDrag(page - 1, 'prev', event.nativeEvent.clientX);
  };

  return { showNext, showPrevEdge, showPrevPage, handleNext, handlePrev };
};
