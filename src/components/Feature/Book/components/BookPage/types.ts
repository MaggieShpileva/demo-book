import type { FC, MutableRefObject } from 'react';

export type BookPageProps = {
  number: number;
  front: FC;
  back: FC;
  opened: boolean;
  delayedPage: number;
  sheetCount: number;
  page: number;
  sheetAmountsRef: MutableRefObject<number[]>;
};
