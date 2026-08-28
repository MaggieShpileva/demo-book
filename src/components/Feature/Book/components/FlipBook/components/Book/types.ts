import type { FC } from 'react';
import type { ThreeElements } from '@react-three/fiber';

export type BookSheet = {
  Front: FC;
  Back: FC;
};

export type BookProps = ThreeElements['group'];

export type PageProps = {
  number: number;
  Front: FC;
  Back: FC;
  page: number;
  sheetCount: number;
  opened: boolean;
  bookClosed: boolean;
} & ThreeElements['group'];
