import { PAGE_FACE_LIFT } from '../constants';

type BookLiveFacePose = {
  position: [number, number, number];
  rotation: [number, number, number];
};

export const getBookLiveFacePose = (
  side: 'front' | 'back',
  pageWidth: number,
  depth: number
): BookLiveFacePose => {
  const faceZ =
    side === 'front' ? depth / 2 + PAGE_FACE_LIFT : -depth / 2 - PAGE_FACE_LIFT;

  return {
    position: [pageWidth / 2, 0, faceZ],
    rotation: side === 'back' ? [0, Math.PI, 0] : [0, 0, 0],
  };
};
