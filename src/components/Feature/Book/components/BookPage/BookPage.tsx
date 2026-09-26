import type { FC } from 'react';
import {
  BOOK_COVER_RENDER_ORDER,
  BOOK_PAGE_RENDER_ORDER,
} from '../../constants';
import { useBookPageHits } from '../../hooks/useBookPageHits';
import { useBookPageMesh } from '../../hooks/useBookPageMesh';
import { useBookPagePose } from '../../hooks/useBookPagePose';
import { getBookSheetScale, getContentsSheetTransform } from '../../utils/getBookSheetScale';
import { isBookSheetEager } from '../../utils/isBookSheetEager';
import { ContentsPage } from '@/pages/ContentsPage';
import { useBookCornerCurl } from '../BookCornerCurlState';
import { BookPageCorner } from '../BookPageCorner';
import { BookPageChrome } from './components/BookPageChrome';
import { BookPagePrintOverlay } from './components/BookPagePrintOverlay';
import type { BookPageProps } from './types';

export const BookPage: FC<BookPageProps> = ({
  number,
  front,
  back,
  opened,
  delayedPage,
  sheetCount,
  page,
  sheetAmountsRef,
}) => {
  const { isSheetCurled } = useBookCornerCurl();
  const { groupRef, mesh, frontOverlay } = useBookPageMesh(
    front,
    back,
    isBookSheetEager(number, page, delayedPage),
    number === 0 ? BOOK_COVER_RENDER_ORDER : BOOK_PAGE_RENDER_ORDER
  );
  const hits = useBookPageHits({
    number,
    opened,
    page,
    delayedPage,
    sheetCount,
  });
  const isContentsSheet = front === ContentsPage;
  const contentsTransform = isContentsSheet
    ? getContentsSheetTransform(opened ? 1 : 0)
    : null;
  const scale = contentsTransform?.scale ?? getBookSheetScale(front);
  const offsetY = contentsTransform?.offsetY ?? 0;

  useBookPagePose({
    groupRef,
    mesh,
    Front: front,
    opened,
    number,
    delayedPage,
    sheetCount,
    sheetAmountsRef,
  });

  const isCoverSheet = number === 0 || number === sheetCount - 1;
  const showCorner = !isCoverSheet && !isContentsSheet && number === page;
  const baseOrder =
    number === 0 ? BOOK_COVER_RENDER_ORDER : BOOK_PAGE_RENDER_ORDER;

  return (
    <group ref={groupRef} scale={scale} position={[0, offsetY, 0]}>
      <primitive object={mesh} />
      <BookPagePrintOverlay
        pageMesh={mesh}
        overlay={frontOverlay}
        renderOrder={baseOrder + 1}
      />
      {showCorner ? (
        <BookPageCorner mesh={mesh} isCurled={isSheetCurled(number)} />
      ) : null}
      <BookPageChrome
        Front={front}
        Back={back}
        pageNumber={number}
        delayedPage={delayedPage}
        targetPage={page}
        sheetCount={sheetCount}
        showCover={hits.showCover}
        showNext={hits.showNext}
        showPrevEdge={hits.showPrevEdge}
        showPrevPage={hits.showPrevPage}
        onNext={hits.handleNext}
        onPrev={hits.handlePrev}
      />
    </group>
  );
};
