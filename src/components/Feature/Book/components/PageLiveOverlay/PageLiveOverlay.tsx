import type { FC } from 'react';
import { Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import {
  BookDragContext,
  useBookDragContext,
} from '@components/Feature/Book/components/BookDragState';
import { BookLiveOnlyProvider } from '@components/Feature/Book/components/BookLive';
import { StoreProvider } from '@/store/storeProvider';
import {
  PAGE_HTML_HEIGHT_PX,
  PAGE_HTML_WIDTH_PX,
} from '@components/Feature/Book/constants';
import { getBookLiveFacePose } from '@components/Feature/Book/utils/getBookLiveFacePose';
import { getBookLiveHtmlScale } from '@components/Feature/Book/utils/getBookLiveHtmlScale';
import { PageLiveFade } from './components/PageLiveFade';
import { usePageLiveMount } from './hooks/usePageLiveMount';
import { usePageLiveVisible } from './hooks/usePageLiveVisible';

type PageLiveOverlayProps = {
  Page: FC;
  side: 'front' | 'back';
  pageNumber: number;
  delayedPage: number;
  targetPage?: number;
  requireLive?: boolean;
  sheetCount: number;
  width: number;
  height: number;
  depth: number;
};

export const PageLiveOverlay: FC<PageLiveOverlayProps> = ({
  Page,
  side,
  pageNumber,
  delayedPage,
  targetPage,
  requireLive,
  width,
  height,
  depth,
}) => {
  const invalidate = useThree((state) => state.invalidate);
  const drag = useBookDragContext();
  const visible = usePageLiveVisible({
    Page,
    side,
    pageNumber,
    delayedPage,
    targetPage,
    requireLive,
  });
  const { mounted, onExitComplete } = usePageLiveMount(visible, invalidate);
  const pose = getBookLiveFacePose(side, width, depth);

  if (!mounted) {
    return null;
  }

  return (
    <Html
      transform
      pointerEvents="none"
      position={pose.position}
      rotation={pose.rotation}
      scale={getBookLiveHtmlScale(width, height)}
      style={{
        width: PAGE_HTML_WIDTH_PX,
        height: PAGE_HTML_HEIGHT_PX,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <PageLiveFade visible={visible} onExitComplete={onExitComplete}>
        {/* Html uses a separate React root — re-provide book contexts. */}
        <BookDragContext.Provider value={drag}>
          <StoreProvider>
            <BookLiveOnlyProvider>
              <Page />
            </BookLiveOnlyProvider>
          </StoreProvider>
        </BookDragContext.Provider>
      </PageLiveFade>
    </Html>
  );
};
