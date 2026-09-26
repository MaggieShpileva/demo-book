import type { FC } from 'react';
import { BlankPage } from '@components/Feature/Book/components/htmlPages/BlankPage';
import { CoverBack } from '@components/Feature/Book/components/htmlPages/CoverBack';
import { CoverBackInside } from '@components/Feature/Book/components/htmlPages/CoverBackInside';
import { CoverFront } from '@components/Feature/Book/components/htmlPages/CoverFront';
import { CoverFrontInside } from '@components/Feature/Book/components/htmlPages/CoverFrontInside';
import { Stage1LeftPage } from '@components/Feature/Book/components/htmlPages/Stage1LeftPage';
import { Stage2LeftPage } from '@components/Feature/Book/components/htmlPages/Stage2LeftPage';
import { bookPages } from '@/data/bookPages';
import { ContentsPage } from '@/pages/ContentsPage';

export type BookSheet = {
  Front: FC;
  Back: FC;
};

/**
 * bookPages: [CoverFront, ContentsPage, Page1…Page20, CoverBack].
 * Left of Page N is back of the previous sheet.
 */
const CONTENTS_INDEX = 1;
const PAGE1_INDEX = 2;
const PAGE9_INDEX = 10;
const PAGE10_INDEX = 11;
const PAGE19_INDEX = 20;

const getSheetBack = (Front: FC, index: number) => {
  if (Front === CoverFront) {
    return CoverFrontInside;
  }

  if (Front === CoverBack) {
    return CoverBackInside;
  }

  if (Front === ContentsPage || index === CONTENTS_INDEX) {
    // Verso facing Page1 — same stage-1 paper as other early left pages.
    return Stage1LeftPage;
  }

  if (index >= PAGE1_INDEX && index <= PAGE9_INDEX) {
    return Stage1LeftPage;
  }

  if (index >= PAGE10_INDEX && index <= PAGE19_INDEX) {
    return Stage2LeftPage;
  }

  return BlankPage;
};

/** One face per sheet; covers and stage verso faces are dedicated. */
export const buildBookSheets = (faces: FC[]): BookSheet[] =>
  faces.map((Front, index) => ({ Front, Back: getSheetBack(Front, index) }));

export const bookSheets = buildBookSheets(bookPages);

export const bookFaces: FC[] = [
  ...new Set(bookSheets.flatMap((sheet) => [sheet.Front, sheet.Back])),
];
