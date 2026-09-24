import type { FC } from 'react';
import { CoverBack } from '@components/Feature/Book/components/htmlPages/CoverBack';
import { CoverFront } from '@components/Feature/Book/components/htmlPages/CoverFront';
import { COVER_SCALE } from '../constants';

export const getBookSheetScale = (Front: FC) =>
  Front === CoverFront || Front === CoverBack ? COVER_SCALE : 1;
