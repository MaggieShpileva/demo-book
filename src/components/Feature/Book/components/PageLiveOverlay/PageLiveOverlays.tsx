import type { FC } from 'react';
import { PageLiveOverlay } from './PageLiveOverlay';

type PageLiveOverlaysProps = {
  Front: FC;
  Back: FC;
  pageNumber: number;
  delayedPage: number;
  targetPage?: number;
  requireLive?: boolean;
  sheetCount: number;
  width: number;
  height: number;
  depth: number;
};

export const PageLiveOverlays: FC<PageLiveOverlaysProps> = ({
  Front,
  Back,
  ...face
}) => (
  <>
    <PageLiveOverlay Page={Front} side="front" {...face} />
    <PageLiveOverlay Page={Back} side="back" {...face} />
  </>
);
