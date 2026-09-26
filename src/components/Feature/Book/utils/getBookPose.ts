import {
  BOOK_CLOSED_POSITION,
  BOOK_CLOSED_ROTATION,
  BOOK_EXIT_POSITION,
  BOOK_EXIT_ROTATION,
  BOOK_PRESENT_POSITION,
  BOOK_PRESENT_ROTATION,
} from '../bookIntroConstants';
import { BOOK_BACK_CLOSE_SHIFT, BOOK_POSITION } from '../constants';
import type { BookStage } from '../components/BookStage';
import { clampBookOpenedAmount } from './clampBookOpenedAmount';

export type BookPoseOverride = {
  position: readonly [number, number, number];
  rotation: readonly [number, number, number];
};

const degToRad = (deg: number) => (deg * Math.PI) / 180;

const [OPEN_X, OPEN_Y, OPEN_Z] = BOOK_POSITION;
const [PRESENT_X, PRESENT_Y, PRESENT_Z] = BOOK_PRESENT_POSITION;
const PRESENT_RX = degToRad(BOOK_PRESENT_ROTATION[0]);
const PRESENT_RY = degToRad(BOOK_PRESENT_ROTATION[1]);
const PRESENT_RZ = degToRad(BOOK_PRESENT_ROTATION[2]);
const [EXIT_X, EXIT_Y, EXIT_Z] = BOOK_EXIT_POSITION;
const EXIT_RX = degToRad(BOOK_EXIT_ROTATION[0]);
const EXIT_RY = degToRad(BOOK_EXIT_ROTATION[1]);
const EXIT_RZ = degToRad(BOOK_EXIT_ROTATION[2]);

export const getBookPose = (
  openedPage: number,
  stage: BookStage,
  closed?: BookPoseOverride,
  present?: BookPoseOverride,
  /** 0–1 smoothed back-cover close progress; slides the group to keep it framed. */
  backCloseSlide = 0
) => {
  if (stage === 'exiting') {
    return {
      x: EXIT_X,
      y: EXIT_Y,
      z: EXIT_Z,
      rx: EXIT_RX,
      ry: EXIT_RY,
      rz: EXIT_RZ,
    };
  }

  if (stage === 'presented') {
    const [x, y, z] = present?.position ?? [
      PRESENT_X,
      PRESENT_Y,
      PRESENT_Z,
    ];
    const [rx, ry, rz] = present?.rotation ?? [
      PRESENT_RX,
      PRESENT_RY,
      PRESENT_RZ,
    ];

    return { x, y, z, rx, ry, rz };
  }

  if (openedPage > 0 || stage === 'reading') {
    const slide = clampBookOpenedAmount(backCloseSlide);
    return {
      x: OPEN_X - BOOK_BACK_CLOSE_SHIFT * slide,
      y: OPEN_Y,
      z: OPEN_Z,
      rx: 0,
      ry: Math.PI,
      rz: 0,
    };
  }

  const [x, y, z] = closed?.position ?? BOOK_CLOSED_POSITION;
  const [rx, ry, rz] = closed?.rotation ?? BOOK_CLOSED_ROTATION;

  return { x, y, z, rx, ry, rz };
};
