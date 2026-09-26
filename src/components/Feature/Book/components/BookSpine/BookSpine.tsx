import { useState, type FC, type MutableRefObject } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
  BOOK_COVER_RENDER_ORDER,
  BOOK_SPINE_COLOR,
} from '../../constants';
import { getBookSpinePose } from '../../utils/getBookSpinePose';
import { isBookPoseSettled } from '../../utils/isBookPoseSettled';

type BookSpineProps = {
  sheetCount: number;
  delayedPage: number;
  sheetAmountsRef: MutableRefObject<number[]>;
};

export const BookSpine: FC<BookSpineProps> = ({
  sheetCount,
  delayedPage,
  sheetAmountsRef,
}) => {
  const invalidate = useThree((state) => state.invalidate);
  const [visible, setVisible] = useState(() => delayedPage === 0);

  useFrame(() => {
    const frontClosed = delayedPage === 0;
    const backClosedTarget = delayedPage === sheetCount;

    if (frontClosed) {
      if (!visible) {
        setVisible(true);
        invalidate();
      }
      return;
    }

    if (!backClosedTarget) {
      if (visible) {
        setVisible(false);
        invalidate();
      }
      return;
    }

    /** Back cover: show spine only after the close flip has settled. */
    const lastSheet = sheetCount - 1;
    const amount = sheetAmountsRef.current[lastSheet] ?? 0;
    const settled = isBookPoseSettled(amount, 1);

    if (settled !== visible) {
      setVisible(settled);
      invalidate();
    }
  });

  if (!visible) {
    return null;
  }

  const { sizeX, sizeY, sizeZ, position } = getBookSpinePose(
    sheetCount,
    delayedPage
  );

  return (
    <mesh position={position} renderOrder={BOOK_COVER_RENDER_ORDER + 1}>
      <boxGeometry args={[sizeX, sizeY, sizeZ]} />
      <meshBasicMaterial color={BOOK_SPINE_COLOR} toneMapped={false} />
    </mesh>
  );
};
