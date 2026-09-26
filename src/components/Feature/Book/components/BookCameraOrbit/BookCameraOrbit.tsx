import { useEffect, type FC } from 'react';
import { useThree } from '@react-three/fiber';
import {
  BOOK_CAMERA_CLOSED_POSITION,
  BOOK_CAMERA_POSITION,
} from '../../constants';

type BookCameraOrbitProps = {
  page: number;
};

export const BookCameraOrbit: FC<BookCameraOrbitProps> = ({ page }) => {
  const camera = useThree((state) => state.camera);
  const invalidate = useThree((state) => state.invalidate);
  const pose = page === 0 ? BOOK_CAMERA_CLOSED_POSITION : BOOK_CAMERA_POSITION;

  useEffect(() => {
    camera.position.set(pose[0], pose[1], pose[2]);
    camera.lookAt(0, 0, 0);
    invalidate();
  }, [camera, invalidate, pose]);

  return null;
};
