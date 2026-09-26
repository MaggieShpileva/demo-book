import { useRef } from 'react';
import type { FC, MutableRefObject, RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group, SkinnedMesh } from 'three';
import { BOOK_PRESENT_OPEN_AMOUNT } from '../bookIntroConstants';
import { BOOK_FRAME_DELTA_MAX } from '../constants';
import { useBookDragContext } from '../components/BookDragState';
import { useBookStage } from '../components/BookStage';
import { animateBookBones } from '../utils/animateBookBones';
import {
  clearBookPackFlipIfDone,
  getBookPackFlip,
  getPackAmountTarget,
} from '../utils/bookPackFlip';
import { getBookClosedAmount } from '../utils/getBookClosedAmount';
import { getBookOpenedPage } from '../utils/getBookOpenedPage';
import {
  getContentsSheetTransform,
  isContentsSheetFront,
} from '../utils/getBookSheetScale';
import { getBookStackZ } from '../utils/getBookStackZ';

type UseBookPagePoseParams = {
  groupRef: RefObject<Group | null>;
  mesh: SkinnedMesh;
  Front: FC;
  opened: boolean;
  number: number;
  delayedPage: number;
  sheetCount: number;
  sheetAmountsRef: MutableRefObject<number[]>;
};

export const useBookPagePose = ({
  groupRef,
  mesh,
  Front,
  opened,
  number,
  delayedPage,
  sheetCount,
  sheetAmountsRef,
}: UseBookPagePoseParams) => {
  const { dragRef } = useBookDragContext();
  const { stage } = useBookStage();
  const turnedAt = useRef(0);
  const lastOpened = useRef(opened);
  const openedAmount = useRef(opened ? 1 : 0);
  const posed = useRef(false);
  const isContents = isContentsSheetFront(Front);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (group == null) {
      return;
    }

    const drag = dragRef.current;
    const amounts = sheetAmountsRef.current;
    const bookClosedAmount = getBookClosedAmount(
      delayedPage,
      sheetCount,
      drag,
      amounts
    );
    const stackZ = getBookStackZ(
      number,
      getBookOpenedPage(delayedPage, drag, amounts)
    );
    const closedRestAmount =
      (stage === 'presented' || stage === 'exiting') &&
      number === 0 &&
      !opened
        ? BOOK_PRESENT_OPEN_AMOUNT
        : 0;
    const packFlip = getBookPackFlip();
    const packAmountTarget = getPackAmountTarget(
      number,
      opened,
      closedRestAmount,
      packFlip
    );
    const animating = animateBookBones({
      group,
      mesh,
      delta: Math.min(delta, BOOK_FRAME_DELTA_MAX),
      opened,
      bookClosedAmount,
      number,
      turnedAt,
      lastOpened,
      openedAmount,
      dragOpenedAmount: drag?.sheet === number ? drag.amount : null,
      dragMode: drag?.sheet === number ? drag.mode : null,
      stackZ,
      force: !posed.current,
      closedRestAmount,
      amountTargetOverride: packFlip != null ? packAmountTarget : null,
    });
    amounts[number] = openedAmount.current;
    posed.current = true;
    clearBookPackFlipIfDone(packFlip);

    let contentsChanged = false;
    if (isContents) {
      const { scale, offsetY } = getContentsSheetTransform(
        openedAmount.current
      );
      contentsChanged =
        group.scale.x !== scale[0] ||
        group.scale.y !== scale[1] ||
        group.position.y !== offsetY;
      group.scale.set(scale[0], scale[1], scale[2]);
      group.position.y = offsetY;
    }

    if (animating || contentsChanged || packFlip != null) {
      state.invalidate();
    }
  });
};
