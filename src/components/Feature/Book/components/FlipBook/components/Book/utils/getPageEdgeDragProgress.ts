import { PAGE_EDGE_DRAG_PX } from '../constants';

type GetPageEdgeDragProgressParams = {
  mode: 'next' | 'prev';
  startX: number;
  clientX: number;
};

export const getPageEdgeDragProgress = ({
  mode,
  startX,
  clientX,
}: GetPageEdgeDragProgressParams) => {
  const delta =
    mode === 'next' ? startX - clientX : clientX - startX;
  return Math.min(1, Math.max(0, delta / PAGE_EDGE_DRAG_PX));
};

export const getOpenedAmountFromDrag = (
  mode: 'next' | 'prev',
  progress: number
) => (mode === 'next' ? progress : 1 - progress);
