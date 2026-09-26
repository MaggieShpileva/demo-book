import { useLayoutEffect, type FC } from 'react';
import { useThree } from '@react-three/fiber';
import { useAppSelector } from '@/store/hooks';
import { selectModalIsOpen } from '@/store/features/modal';
import { useBookDragContext } from '@components/Feature/Book/components/BookDragState';
import { isBookLiveFaceVisible } from '@components/Feature/Book/utils/isBookLiveFaceVisible';
import { isBookLiveReady } from '@components/Feature/Book/utils/isBookLiveReady';
import { peekPageHasLive } from '@components/Feature/Book/utils/pageTextureCache';

type UsePageLiveVisibleParams = {
  Page: FC;
  side: 'front' | 'back';
  pageNumber: number;
  delayedPage: number;
  targetPage?: number;
  requireLive?: boolean;
};

export const usePageLiveVisible = ({
  Page,
  side,
  pageNumber,
  delayedPage,
  targetPage,
  requireLive = true,
}: UsePageLiveVisibleParams) => {
  const invalidate = useThree((state) => state.invalidate);
  const isModalOpen = useAppSelector(selectModalIsOpen);
  const { isDragging } = useBookDragContext();
  const ready = isBookLiveReady(
    delayedPage,
    targetPage ?? delayedPage,
    side,
    pageNumber
  );
  const hasLive = !requireLive || peekPageHasLive(Page);
  const faceVisible = isBookLiveFaceVisible(side, pageNumber, delayedPage);
  const visible =
    delayedPage > 0 &&
    ready &&
    hasLive &&
    faceVisible &&
    !isModalOpen &&
    !isDragging;

  useLayoutEffect(() => {
    if (!visible) {
      return;
    }

    invalidate();
    const frame = requestAnimationFrame(() => invalidate());
    return () => cancelAnimationFrame(frame);
  }, [invalidate, visible]);

  return visible;
};
