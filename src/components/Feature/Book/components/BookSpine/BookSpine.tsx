import type { FC } from 'react';
import { BOOK_SPINE_COLOR, BOOK_SPINE_WIDTH } from '../../constants';
import { getBookSpinePose } from '../../utils/getBookSpinePose';

type BookSpineProps = {
  sheetCount: number;
  delayedPage: number;
};

export const BookSpine: FC<BookSpineProps> = ({ sheetCount, delayedPage }) => {
  const { height, depth, z } = getBookSpinePose(sheetCount, delayedPage);

  return (
    <mesh position={[-BOOK_SPINE_WIDTH / 2, 0, z]}>
      <boxGeometry args={[BOOK_SPINE_WIDTH, height, depth]} />
      <meshBasicMaterial color={BOOK_SPINE_COLOR} toneMapped={false} />
    </mesh>
  );
};
