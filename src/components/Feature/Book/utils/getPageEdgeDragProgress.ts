import { PAGE_COVER_DRAG_PX, PAGE_EDGE_DRAG_PX } from '../constants';

type GetPageEdgeDragProgressParams = {
  mode: 'next' | 'prev';
  startX: number;
  clientX: number;
  dragPx?: number;
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const smoothstep01 = (value: number) => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};

export const getPageEdgeDragProgress = ({
  mode,
  startX,
  clientX,
  dragPx = PAGE_EDGE_DRAG_PX,
}: GetPageEdgeDragProgressParams) => {
  const delta = mode === 'next' ? startX - clientX : clientX - startX;
  return clamp01(delta / dragPx);
};

export const getOpenedAmountFromDrag = (
  mode: 'next' | 'prev',
  progress: number
) => (mode === 'next' ? progress : 1 - progress);

/** Longer swipe + ease so a sharp cover flick does not jump the pose. */
export const getCoverOpenedAmountFromDrag = (
  params: GetPageEdgeDragProgressParams
) => {
  const linear = getPageEdgeDragProgress({
    ...params,
    dragPx: params.dragPx ?? PAGE_COVER_DRAG_PX,
  });
  return getOpenedAmountFromDrag(params.mode, smoothstep01(linear));
};
