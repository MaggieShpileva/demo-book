import type { FC } from 'react';
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
import WEBP_page1 from '@assets/images/pages/page1.webp';
import WEBP_page2 from '@assets/images/pages/page2.webp';
import WEBP_page3 from '@assets/images/pages/page3.webp';
import WEBP_page4 from '@assets/images/pages/page4.webp';
import WEBP_page5 from '@assets/images/pages/page5.webp';
import WEBP_page6 from '@assets/images/pages/page6.webp';
import WEBP_page7 from '@assets/images/pages/page7.webp';
import WEBP_page8 from '@assets/images/pages/page8.webp';
import WEBP_page9 from '@assets/images/pages/page9.webp';
import WEBP_page10 from '@assets/images/pages/page10.webp';
import WEBP_page11 from '@assets/images/pages/page11.webp';
import WEBP_page12 from '@assets/images/pages/page12.webp';
import WEBP_page13 from '@assets/images/pages/page13.webp';
import WEBP_page14 from '@assets/images/pages/page14.webp';
import WEBP_page15 from '@assets/images/pages/page15.webp';
import WEBP_page16 from '@assets/images/pages/page16.webp';
import WEBP_page17 from '@assets/images/pages/page17.webp';
import WEBP_page18 from '@assets/images/pages/page18.webp';
import WEBP_page19 from '@assets/images/pages/page19.webp';
import WEBP_page20 from '@assets/images/pages/page20.webp';

type PageImageSource = {
  src: string;
  hasLive: boolean;
};

const pageImageSources = new Map<FC, PageImageSource>([
  [Page1, { src: WEBP_page1, hasLive: true }],
  [Page2, { src: WEBP_page2, hasLive: false }],
  [Page3, { src: WEBP_page3, hasLive: false }],
  [Page4, { src: WEBP_page4, hasLive: false }],
  [Page5, { src: WEBP_page5, hasLive: false }],
  [Page6, { src: WEBP_page6, hasLive: false }],
  [Page7, { src: WEBP_page7, hasLive: false }],
  [Page8, { src: WEBP_page8, hasLive: false }],
  [Page9, { src: WEBP_page9, hasLive: false }],
  [Page10, { src: WEBP_page10, hasLive: false }],
  [Page11, { src: WEBP_page11, hasLive: true }],
  [Page12, { src: WEBP_page12, hasLive: true }],
  [Page13, { src: WEBP_page13, hasLive: true }],
  [Page14, { src: WEBP_page14, hasLive: true }],
  [Page15, { src: WEBP_page15, hasLive: true }],
  [Page16, { src: WEBP_page16, hasLive: true }],
  [Page17, { src: WEBP_page17, hasLive: true }],
  [Page18, { src: WEBP_page18, hasLive: true }],
  [Page19, { src: WEBP_page19, hasLive: true }],
  [Page20, { src: WEBP_page20, hasLive: true }],
]);

export const getPageImageSource = (Page: FC) =>
  pageImageSources.get(Page) ?? null;
