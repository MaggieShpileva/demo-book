import { SWIPE_DISTANCE_PX } from '../constants';

type SheetPointerUpParams = {
  startX: number;
  clientX: number;
  rect: DOMRect;
  onPrev: () => void;
  onNext: () => void;
};

export const handleSheetPointerUp = ({
  startX,
  clientX,
  rect,
  onPrev,
  onNext,
}: SheetPointerUpParams) => {
  const deltaX = clientX - startX;

  if (deltaX <= -SWIPE_DISTANCE_PX) {
    onNext();
    return;
  }

  if (deltaX >= SWIPE_DISTANCE_PX) {
    onPrev();
    return;
  }

  if (startX > rect.left + rect.width / 2) {
    onNext();
    return;
  }

  onPrev();
};
