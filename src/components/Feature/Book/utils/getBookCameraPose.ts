import { degToRad } from 'three/src/math/MathUtils.js';
import {
  BOOK_CAMERA_CLOSED_POSITION,
  BOOK_CAMERA_FACE_PAGE,
  BOOK_CAMERA_POSITION,
  BOOK_PAGE_FAN_DEG,
} from '../constants';

const [CAMERA_X, CAMERA_Y, CAMERA_Z] = BOOK_CAMERA_POSITION;
const [CLOSED_X, CLOSED_Y, CLOSED_Z] = BOOK_CAMERA_CLOSED_POSITION;

export const getBookCameraYaw = (openedPage: number) =>
  (BOOK_CAMERA_FACE_PAGE - openedPage) * degToRad(BOOK_PAGE_FAN_DEG);

export const getBookCameraPose = (openedPage: number) => {
  if (openedPage === 0) {
    return { x: CLOSED_X, y: CLOSED_Y, z: CLOSED_Z };
  }

  return {
    x: CAMERA_X,
    y: CAMERA_Y,
    z: CAMERA_Z,
  };
};
