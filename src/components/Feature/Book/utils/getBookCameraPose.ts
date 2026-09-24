import { degToRad } from 'three/src/math/MathUtils.js';
import {
  BOOK_CAMERA_FACE_PAGE,
  BOOK_CAMERA_POSITION,
  BOOK_PAGE_FAN_DEG,
} from '../constants';

const [CAMERA_X, CAMERA_Y, CAMERA_Z] = BOOK_CAMERA_POSITION;
const CAMERA_RADIUS = Math.hypot(CAMERA_X, CAMERA_Z);

export const getBookCameraYaw = (openedPage: number) =>
  (BOOK_CAMERA_FACE_PAGE - openedPage) * degToRad(BOOK_PAGE_FAN_DEG);

export const getBookCameraPose = (openedPage: number) => {
  const yaw = getBookCameraYaw(openedPage);

  return {
    x: Math.sin(yaw) * CAMERA_RADIUS,
    y: CAMERA_Y,
    z: Math.cos(yaw) * CAMERA_RADIUS,
  };
};
