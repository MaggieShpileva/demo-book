import { useLayoutEffect, useRef, type FC } from 'react';
import { useThree } from '@react-three/fiber';
import type { Group } from 'three';
import { useBookCamera } from '../../hooks/useBookCamera';
import { useBookInvalidate } from '../../hooks/useBookInvalidate';
import { useBookPose } from '../../hooks/useBookPose';
import { bookSheets } from '../../utils/buildBookSheets';
import { getBookSheetAmounts } from '../../utils/getBookSheetAmounts';
import type { BookPoseOverride } from '../../utils/getBookPose';
import { useBookStage } from '../BookStage';
import { BookMesh } from '../BookMesh';
import { BookProducts } from '../BookProducts';

type BookExperienceProps = {
  page: number;
  delayedPage: number;
  closedPose: BookPoseOverride;
  presentPose: BookPoseOverride;
};

export const BookExperience: FC<BookExperienceProps> = ({
  page,
  delayedPage,
  closedPose,
  presentPose,
}) => {
  const groupRef = useRef<Group>(null);
  const closedPoseRef = useRef(closedPose);
  const presentPoseRef = useRef(presentPose);
  const initialPose = useRef(closedPose);
  const sheetCount = bookSheets.length;
  const sheetAmountsRef = useRef(getBookSheetAmounts(sheetCount, delayedPage));
  const invalidate = useThree((state) => state.invalidate);
  const { stage, presentSettled } = useBookStage();

  closedPoseRef.current = closedPose;
  presentPoseRef.current = presentPose;

  useBookInvalidate(page, delayedPage);
  useBookCamera(delayedPage);
  useBookPose(
    groupRef,
    delayedPage,
    sheetCount,
    sheetAmountsRef,
    closedPoseRef,
    presentPoseRef
  );

  useLayoutEffect(() => {
    invalidate();
  }, [closedPose, invalidate, presentPose, presentSettled, stage]);

  return (
    <>
      <group
        ref={groupRef}
        position={[...initialPose.current.position]}
        rotation={[...initialPose.current.rotation]}
      >
        <BookMesh
          key={stage === 'reading' && delayedPage >= 1 ? 'reading' : 'intro'}
          page={page}
          delayedPage={delayedPage}
          sheetAmountsRef={sheetAmountsRef}
        />
      </group>
      <BookProducts />
    </>
  );
};
