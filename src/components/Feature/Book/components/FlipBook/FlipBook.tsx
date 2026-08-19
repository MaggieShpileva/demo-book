import { forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { BookPage } from '../BookPage';
import { BOOK_PAGES } from '../../mock';
import styles from '../../Book.module.scss';

type FlipBookApi = {
  pageFlip: () => {
    flipPrev: () => void;
    flipNext: () => void;
  };
};

type FlipBookProps = {
  onFlip: (pageIndex: number) => void;
};

const FLIP_BOOK_PROPS = {
  width: 420,
  height: 560,
  size: 'stretch' as const,
  minWidth: 280,
  maxWidth: 480,
  minHeight: 380,
  maxHeight: 640,
  showCover: true,
  drawShadow: true,
  flippingTime: 900,
  usePortrait: true,
  startZIndex: 0,
  autoSize: true,
  maxShadowOpacity: 0.55,
  mobileScrollSupport: true,
  clickEventForward: true,
  useMouseEvents: true,
  swipeDistance: 30,
  showPageCorners: true,
  disableFlipByClick: false,
  startPage: 0,
  className: styles.flipBook,
  style: {},
};

export const FlipBook = forwardRef<FlipBookApi, FlipBookProps>(({ onFlip }, ref) => (
  <HTMLFlipBook
    ref={ref}
    {...FLIP_BOOK_PROPS}
    onFlip={(event: { data: number }) => onFlip(event.data)}
  >
    {BOOK_PAGES.map((page) => (
      <BookPage key={page.id} page={page} />
    ))}
  </HTMLFlipBook>
));

FlipBook.displayName = 'FlipBook';
