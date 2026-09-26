import type { FC } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import { BookHitPlane } from '../BookHitPlane';

type BookPageHitsProps = {
  showCover: boolean;
  showNext: boolean;
  showPrevEdge: boolean;
  showPrevPage: boolean;
  onNext: (event: ThreeEvent<PointerEvent>) => void;
  onPrev: (event: ThreeEvent<PointerEvent>) => void;
};

export const BookPageHits: FC<BookPageHitsProps> = ({
  showCover,
  showNext,
  showPrevEdge,
  showPrevPage,
  onNext,
  onPrev,
}) => (
  <>
    {showCover ? <BookHitPlane side="cover" onPointerDown={onNext} /> : null}
    {showNext ? <BookHitPlane side="next" onPointerDown={onNext} /> : null}
    {showPrevEdge ? (
      <BookHitPlane side="prevEdge" onPointerDown={onPrev} />
    ) : null}
    {showPrevPage ? (
      <BookHitPlane side="prevPage" onPointerDown={onPrev} />
    ) : null}
  </>
);
