import type { FC } from 'react';

export type BookPageProps = {
  number: number;
  front: FC;
  back: FC;
  opened: boolean;
  bookClosed: boolean;
  delayedPage: number;
  sheetCount: number;
  page: number;
};
