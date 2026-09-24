import type { FC } from 'react';
import { CoverBack } from '@components/Feature/Book/components/htmlPages/CoverBack';
import { CoverFront } from '@components/Feature/Book/components/htmlPages/CoverFront';
import { Page1 } from '@/pages/Page1';
import { Page2 } from '@/pages/Page2';
import { Page3 } from '@/pages/Page3';
import { Page4 } from '@/pages/Page4';
import { Page5 } from '@/pages/Page5';
import { Page6 } from '@/pages/Page6';
import { Page7 } from '@/pages/Page7';
import { Page8 } from '@/pages/Page8';
import { Page9 } from '@/pages/Page9';
import { Page10 } from '@/pages/Page10';
import { Page11 } from '@/pages/Page11';
import { Page12 } from '@/pages/Page12';
import { Page13 } from '@/pages/Page13';
import { Page14 } from '@/pages/Page14';
import { Page15 } from '@/pages/Page15';
import { Page16 } from '@/pages/Page16';
import { Page17 } from '@/pages/Page17';
import { Page18 } from '@/pages/Page18';
import { Page19 } from '@/pages/Page19';
import { Page20 } from '@/pages/Page20';
/** Flat faces: index 0 = outer front cover, last = outer back cover, rest = pages. */
export const bookPages: FC[] = [
  CoverFront,
  Page1,
  Page2,
  Page3,
  Page4,
  Page5,
  Page6,
  Page7,
  Page8,
  Page9,
  Page10,
  Page11,
  Page12,
  Page13,
  Page14,
  Page15,
  Page16,
  Page17,
  Page18,
  Page19,
  Page20,
  CoverBack,
];
