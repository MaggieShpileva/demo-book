import { useLayoutEffect } from 'react';
import { useThree } from '@react-three/fiber';
import type { PerspectiveCamera } from 'three';
import { PAGE_HEIGHT, PAGE_WIDTH } from '../components/Book/constants';

const CAMERA_FOV = 42;
const DESKTOP_DISTANCE = 3;
const DESKTOP_CAMERA_Y = 1.2;
const SINGLE_PAGE_PADDING = 1.28;

export const useFitBookCamera = (singlePage: boolean) => {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);

  useLayoutEffect(() => {
    const perspectiveCamera = camera as PerspectiveCamera;
    perspectiveCamera.fov = CAMERA_FOV;

    if (!singlePage) {
      perspectiveCamera.position.set(0, DESKTOP_CAMERA_Y, DESKTOP_DISTANCE);
      perspectiveCamera.lookAt(0, 0, 0);
      perspectiveCamera.updateProjectionMatrix();
      return;
    }

    const aspect = size.width / Math.max(size.height, 1);
    const vFovRad = (CAMERA_FOV * Math.PI) / 180;
    const fitHeight = PAGE_HEIGHT * SINGLE_PAGE_PADDING;
    const fitWidth = PAGE_WIDTH * SINGLE_PAGE_PADDING;
    const halfFovTan = Math.tan(vFovRad / 2);

    let distance = fitHeight / (2 * halfFovTan);
    const visibleWidth = 2 * distance * halfFovTan * aspect;

    if (visibleWidth < fitWidth) {
      distance = fitWidth / (2 * halfFovTan * aspect);
    }

    const cameraY = distance * (DESKTOP_CAMERA_Y / DESKTOP_DISTANCE);
    perspectiveCamera.position.set(0, cameraY, distance);
    perspectiveCamera.lookAt(0, 0, 0);
    perspectiveCamera.updateProjectionMatrix();
  }, [camera, singlePage, size.height, size.width]);
};
