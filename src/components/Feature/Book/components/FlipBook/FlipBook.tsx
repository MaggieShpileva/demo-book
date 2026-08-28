import { forwardRef, Suspense, useImperativeHandle } from 'react';
import { Canvas } from '@react-three/fiber';
import { useBookFlip } from './hooks/useBookFlip';
import { useSinglePageBook } from './hooks/useSinglePageBook';
import { bookPages } from './components/Book/htmlPages';
import { buildBookSheets } from './components/Book/utils/buildBookSheets';
import styles from './FlipBook.module.scss';
import type { FlipBookApi } from './types';
import { Experience } from './components/Experience';

type FlipBookProps = {
  onFlip: (pageIndex: number) => void;
};

export const FlipBook = forwardRef<FlipBookApi, FlipBookProps>(
  ({ onFlip }, ref) => {
    const singlePage = useSinglePageBook();
    const sheetCount = buildBookSheets(bookPages, singlePage).length;
    const pageCount = singlePage ? sheetCount : sheetCount + 1;
    const { flipNext, flipPrev } = useBookFlip(pageCount, onFlip);

    useImperativeHandle(ref, () => ({
      pageFlip: () => ({ flipPrev, flipNext }),
    }));

    return (
      <Canvas
        className={styles.canvas}
        shadows
        camera={{ position: [0, 1.5, 4], fov: 42 }}
      >
        <group position-y={0}>
          <Suspense fallback={null}>
            <Experience singlePage={singlePage} />
          </Suspense>
        </group>
      </Canvas>
    );
  }
);

FlipBook.displayName = 'FlipBook';
