import type { FC } from 'react';
import { Html } from '@react-three/drei';
import { BookLiveOnlyProvider } from '@components/Feature/Book/components/BookLive';
import { StoreProvider } from '@/store/storeProvider';
import {
  PAGE_HTML_HEIGHT_PX,
  PAGE_HTML_WIDTH_PX,
} from '@components/Feature/Book/constants';
import { getBookLiveFacePose } from '@components/Feature/Book/utils/getBookLiveFacePose';
import { getBookLiveHtmlScale } from '@components/Feature/Book/utils/getBookLiveHtmlScale';
import { usePageLiveVisible } from './hooks/usePageLiveVisible';
import styles from './PageLiveOverlay.module.scss';

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
  const visible = usePageLiveVisible({
    Page,
    side,
    pageNumber,
    delayedPage,
    targetPage,
    requireLive,
  });
  const pose = getBookLiveFacePose(side, width, depth);

  if (!visible) {
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
      <StoreProvider>
        <BookLiveOnlyProvider>
          <div className={styles.root}>
            <Page />
          </div>
        </BookLiveOnlyProvider>
      </StoreProvider>
    </Html>
  );
};
