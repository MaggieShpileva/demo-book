import type { FC } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import { PageLiveOverlays } from '@components/Feature/Book/components/PageLiveOverlay';
import {
  PAGE_DEPTH,
  PAGE_HEIGHT,
  PAGE_WIDTH,
} from '@components/Feature/Book/constants';
import { BookPageHits } from '../BookPageHits';

type BookPageChromeProps = {
  Front: FC;
  Back: FC;
  pageNumber: number;
  delayedPage: number;
  targetPage: number;
  sheetCount: number;
  showCover: boolean;
  showNext: boolean;
  showPrevEdge: boolean;
  showPrevPage: boolean;
  onNext: (event: ThreeEvent<PointerEvent>) => void;
  onPrev: (event: ThreeEvent<PointerEvent>) => void;
};

export const BookPageChrome: FC<BookPageChromeProps> = ({
  Front,
  Back,
  pageNumber,
  delayedPage,
  targetPage,
  sheetCount,
  showCover,
  showNext,
  showPrevEdge,
  showPrevPage,
  onNext,
  onPrev,
}) => (
  <>
    <PageLiveOverlays
      Front={Front}
      Back={Back}
      pageNumber={pageNumber}
      delayedPage={delayedPage}
      targetPage={targetPage}
      requireLive={false}
      sheetCount={sheetCount}
      width={PAGE_WIDTH}
      height={PAGE_HEIGHT}
      depth={PAGE_DEPTH}
    />
    <BookPageHits
      showCover={showCover}
      showNext={showNext}
      showPrevEdge={showPrevEdge}
      showPrevPage={showPrevPage}
      onNext={onNext}
      onPrev={onPrev}
    />
  </>
);
