import { Suspense, type FC } from 'react';
import { Canvas } from '@react-three/fiber';
import { NoToneMapping, PCFSoftShadowMap } from 'three';
import { BOOK_CAMERA_CLOSED_POSITION, BOOK_CAMERA_FOV } from '../../constants';
import type { BookPoseOverride } from '../../utils/getBookPose';
import { BookExperience } from '../BookExperience';
import { BookLights } from '../BookLights';
import styles from './BookCanvas.module.scss';

type BookCanvasProps = {
  page: number;
  delayedPage: number;
  closedPose: BookPoseOverride;
  presentPose: BookPoseOverride;
};

export const BookCanvas: FC<BookCanvasProps> = ({
  page,
  delayedPage,
  closedPose,
  presentPose,
}) => (
  <Canvas
    className={styles.canvas}
    frameloop="demand"
    dpr={[3, 5]}
    shadows
    camera={{
      position: [...BOOK_CAMERA_CLOSED_POSITION],
      fov: BOOK_CAMERA_FOV,
    }}
    gl={{
      antialias: true,
      alpha: false,
      toneMapping: NoToneMapping,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    }}
    onCreated={({ gl }) => {
      gl.setClearColor(0xffffff, 1);
      gl.shadowMap.enabled = true;
      gl.shadowMap.type = PCFSoftShadowMap;
    }}
  >
    <Suspense fallback={null}>
      <BookLights />
      <BookExperience
        page={page}
        delayedPage={delayedPage}
        closedPose={closedPose}
        presentPose={presentPose}
      />
    </Suspense>
  </Canvas>
);
