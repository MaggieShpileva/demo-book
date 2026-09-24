import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useBookDragContext } from '../components/BookDragState';
import { BOOK_FRAME_DELTA_MAX, EASING_FACTOR } from '../constants';
import { getBookCameraPose } from '../utils/getBookCameraPose';
import { getBookOpenedPage } from '../utils/getBookOpenedPage';
import { isBookPoseSettled } from '../utils/isBookPoseSettled';

export const useBookCamera = (delayedPage: number) => {
  const { dragRef } = useBookDragContext();
  const lookReady = useRef(false);

  useFrame((state, delta) => {
    const pose = getBookCameraPose(
      getBookOpenedPage(delayedPage, dragRef.current)
    );
    const { camera } = state;
    const dt = Math.min(delta, BOOK_FRAME_DELTA_MAX);

    if (!lookReady.current) {
      camera.position.set(pose.x, pose.y, pose.z);
      camera.lookAt(0, 0, 0);
      lookReady.current = true;
      return;
    }

    easing.damp3(camera.position, [pose.x, pose.y, pose.z], EASING_FACTOR, dt);
    camera.lookAt(0, 0, 0);

    if (
      !isBookPoseSettled(camera.position.x, pose.x) ||
      !isBookPoseSettled(camera.position.z, pose.z)
    ) {
      state.invalidate();
    }
  });
};
