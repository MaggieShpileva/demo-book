import type { FC } from 'react';
import { PageLiveOverlays } from '@components/Feature/Book/components/PageLiveOverlay';
import { PAGE_DEPTH, PAGE_HEIGHT, PAGE_WIDTH } from '../../constants';
import { useBookPageHits } from '../../hooks/useBookPageHits';
import { useBookPageMesh } from '../../hooks/useBookPageMesh';
import { useBookPagePose } from '../../hooks/useBookPagePose';
import { getBookSheetScale } from '../../utils/getBookSheetScale';
import { getBookStackZ } from '../../utils/getBookStackZ';
import { isBookSheetEager } from '../../utils/isBookSheetEager';
import { BookPageHits } from './components/BookPageHits';
import type { BookPageProps } from './types';

export const BookPage: FC<BookPageProps> = ({
  number,
  front,
  back,
  opened,
  bookClosed,
  delayedPage,
  sheetCount,
  page,
}) => {
  const { groupRef, mesh } = useBookPageMesh(
    front,
    back,
    isBookSheetEager(number, page, delayedPage)
  );
  const { showNext, showPrevEdge, showPrevPage, handleNext, handlePrev } =
    useBookPageHits({ number, opened, page, delayedPage, sheetCount });
  const stackZ = getBookStackZ(number, delayedPage);
  const scale = getBookSheetScale(front);

  useBookPagePose({
    groupRef,
    mesh,
    opened,
    bookClosed,
    number,
    stackZ,
  });

  return (
    <group ref={groupRef} scale={[scale, scale, 1]}>
      <primitive object={mesh} />
      <PageLiveOverlays
        Front={front}
        Back={back}
        pageNumber={number}
        delayedPage={delayedPage}
        targetPage={page}
        requireLive={false}
        sheetCount={sheetCount}
        width={PAGE_WIDTH}
        height={PAGE_HEIGHT}
        depth={PAGE_DEPTH}
      />
      <BookPageHits
        showNext={showNext}
        showPrevEdge={showPrevEdge}
        showPrevPage={showPrevPage}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </group>
  );
};
