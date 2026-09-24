import { Suspense, type FC } from 'react';
import { Canvas } from '@react-three/fiber';
import { NoToneMapping } from 'three';
import { BOOK_CAMERA_CLOSED_POSITION, BOOK_CAMERA_FOV } from '../../constants';
import { BookExperience } from '../BookExperience';
import styles from './BookCanvas.module.scss';

type BookCanvasProps = {
  page: number;
  delayedPage: number;
};

export const BookCanvas: FC<BookCanvasProps> = ({ page, delayedPage }) => (
  <Canvas
    className={styles.canvas}
    frameloop="demand"
    dpr={[3, 5]}
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
    }}
  >
    <Suspense fallback={null}>
      <BookExperience page={page} delayedPage={delayedPage} />
    </Suspense>
  </Canvas>
);
