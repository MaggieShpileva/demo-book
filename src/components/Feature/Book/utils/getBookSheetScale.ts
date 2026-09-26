import type { FC } from 'react';
import { CoverBack } from '@components/Feature/Book/components/htmlPages/CoverBack';
import { CoverFront } from '@components/Feature/Book/components/htmlPages/CoverFront';
import { ContentsPage } from '@/pages/ContentsPage';
import {
  CONTENTS_SCALE_X,
  CONTENTS_SCALE_Y,
  COVER_SCALE,
  PAGE_HEIGHT,
} from '../constants';

export const getBookSheetScale = (Front: FC): [number, number, number] => {
  if (Front === CoverFront || Front === CoverBack) {
    return [COVER_SCALE, COVER_SCALE, 1];
  }

  if (Front === ContentsPage) {
    return [CONTENTS_SCALE_X, CONTENTS_SCALE_Y, 1];
  }

  return [1, 1, 1];
};

/** Keep the bottom edge on the same line as a 1× page when scaleY > 1. */
export const getBookSheetYOffset = (scaleY: number) =>
  (PAGE_HEIGHT / 2) * (scaleY - 1);

/**
 * Contents front is oversized; after the sheet passes camera-perpendicular
 * (`openedAmount >= 0.5`) snap to normal page size so the verso matches.
 */
export const getContentsSheetTransform = (openedAmount: number) => {
  const showBack = openedAmount >= 0.5;
  const scaleX = showBack ? 1 : CONTENTS_SCALE_X;
  const scaleY = showBack ? 1 : CONTENTS_SCALE_Y;

  return {
    scale: [scaleX, scaleY, 1] as [number, number, number],
    offsetY: getBookSheetYOffset(scaleY),
  };
};

export const isContentsSheetFront = (Front: FC) => Front === ContentsPage;
