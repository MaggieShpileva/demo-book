import type { FC } from 'react';
import type { BookSheet } from '../types';
import { BlankPage } from '../htmlPages/BlankPage';

export const buildBookSheets = (
  pages: FC[],
  singlePage: boolean
): BookSheet[] => {
  if (singlePage) {
    return pages.map((Front) => ({ Front, Back: BlankPage }));
  }

  const sheets: BookSheet[] = [];

  for (let index = 0; index < pages.length; index += 2) {
    sheets.push({
      Front: pages[index],
      Back: pages[index + 1] ?? BlankPage,
    });
  }

  return sheets;
};
