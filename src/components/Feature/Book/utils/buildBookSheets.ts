import type { FC } from 'react';
import { BlankPage } from '@components/Feature/Book/components/htmlPages/BlankPage';
import { bookPages } from '@/data/bookPages';

export type BookSheet = {
  Front: FC;
  Back: FC;
};

/** One face per sheet — content on the right, blank on the left. */
export const buildBookSheets = (faces: FC[]): BookSheet[] =>
  faces.map((Front) => ({ Front, Back: BlankPage }));

export const bookSheets = buildBookSheets(bookPages);

export const bookFaces: FC[] = [
  ...new Set(bookSheets.flatMap((sheet) => [sheet.Front, sheet.Back])),
];
