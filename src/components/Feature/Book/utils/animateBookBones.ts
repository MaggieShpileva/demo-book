import { type Group, type SkinnedMesh } from 'three';
import { easing } from 'maath';
import type { MutableRefObject } from 'react';
import {
  BOOK_DRAG_EASING,
  EASING_FACTOR,
  EASING_FACTOR_FOLD,
  PAGE_TURN_CURL_MS,
} from '../constants';
import type { BookDragMode } from './bookDrag';
import { clampBookOpenedAmount } from './clampBookOpenedAmount';
import { getBookBonePose } from './getBookBonePose';
import {
  clampHingeToActiveRest,
  getBookHingeRotation,
} from './getBookHingeRotation';
import { getBookTurnRestAmount } from './getBookTurnRestAmount';
import { isBookPoseSettled } from './isBookPoseSettled';

type AnimateBookBonesParams = {
  group: Group;
  mesh: SkinnedMesh;
  delta: number;
  opened: boolean;
  bookClosedAmount: number;
  number: number;
  turnedAt: MutableRefObject<number>;
  lastOpened: MutableRefObject<boolean>;
  openedAmount: MutableRefObject<number>;
  dragOpenedAmount: number | null;
  dragMode: BookDragMode | null;
  stackZ: number;
  force: boolean;
  /** Rest open amount when closed (e.g. presented cover ajar). */
  closedRestAmount?: number;
  /** Overrides opened/drag target (e.g. pack-flip sheet lag). */
  amountTargetOverride?: number | null;
};

const getTurningTime = (
  dragOpenedAmount: number | null,
  dragMode: BookDragMode | null,
  opened: boolean,
  turnedAt: number
) => {
  if (dragOpenedAmount != null) {
    const progress =
      dragMode === 'prev' || (dragMode == null && opened)
        ? 1 - dragOpenedAmount
        : dragOpenedAmount;
    return Math.sin(progress * Math.PI);
  }

  const elapsed = Math.min(PAGE_TURN_CURL_MS, Date.now() - turnedAt);
  return Math.sin((elapsed / PAGE_TURN_CURL_MS) * Math.PI);
};

const applyBonePose = (
  group: Group,
  mesh: SkinnedMesh,
  hingeRotation: number,
  targetRotation: number,
  turningTime: number,
  bookClosedAmount: number,
  delta: number,
  immediate: boolean
) => {
  const bones = mesh.skeleton.bones;
  let moving = false;

  for (let index = 0; index < bones.length; index += 1) {
    const target = index === 0 ? group : bones[index];
    const pose = getBookBonePose(
      index,
      bones.length,
      hingeRotation,
      targetRotation,
      turningTime,
      bookClosedAmount
    );

    if (immediate || index === 0) {
      target.rotation.y = pose.y;
      target.rotation.x = pose.x;
      continue;
    }

    if (!isBookPoseSettled(target.rotation.y, pose.y)) {
      easing.dampAngle(target.rotation, 'y', pose.y, EASING_FACTOR, delta);
      moving = true;
    } else {
      target.rotation.y = pose.y;
    }

    if (!isBookPoseSettled(target.rotation.x, pose.x)) {
      easing.dampAngle(target.rotation, 'x', pose.x, EASING_FACTOR_FOLD, delta);
      moving = true;
    } else {
      target.rotation.x = pose.x;
    }
  }

  return moving;
};

export const animateBookBones = ({
  group,
  mesh,
  delta,
  opened,
  bookClosedAmount,
  number,
  turnedAt,
  lastOpened,
  openedAmount,
  dragOpenedAmount,
  dragMode,
  stackZ,
  force,
  closedRestAmount = 0,
  amountTargetOverride = null,
}: AnimateBookBonesParams) => {
  if (lastOpened.current !== opened) {
    turnedAt.current = Date.now();
    lastOpened.current = opened;
  }

  const restAmount = opened ? 1 : closedRestAmount;
  const turnRestAmount =
    dragMode == null ? restAmount : getBookTurnRestAmount(opened, dragMode);
  const amountTarget =
    amountTargetOverride != null
      ? clampBookOpenedAmount(amountTargetOverride)
      : dragOpenedAmount == null
        ? restAmount
        : clampBookOpenedAmount(dragOpenedAmount);

  if (force) {
    openedAmount.current = amountTarget;
    mesh.position.z = stackZ;
  } else if (dragOpenedAmount != null) {
    easing.damp(openedAmount, 'current', amountTarget, BOOK_DRAG_EASING, delta);
    openedAmount.current = clampBookOpenedAmount(openedAmount.current);
  } else if (!isBookPoseSettled(openedAmount.current, amountTarget)) {
    easing.damp(openedAmount, 'current', amountTarget, EASING_FACTOR, delta);
    openedAmount.current = clampBookOpenedAmount(openedAmount.current);
  } else {
    openedAmount.current = amountTarget;
  }

  const turningTime = force
    ? 0
    : getTurningTime(
        dragOpenedAmount,
        dragMode,
        opened,
        turnedAt.current
      );
  const hingeRotation = clampHingeToActiveRest(
    getBookHingeRotation(openedAmount.current, number, bookClosedAmount),
    dragMode,
    number,
    bookClosedAmount
  );
  const targetRotation = getBookHingeRotation(
    turnRestAmount,
    number,
    bookClosedAmount
  );
  const amountSettled = isBookPoseSettled(openedAmount.current, amountTarget);
  const stackSettled = isBookPoseSettled(mesh.position.z, stackZ);
  const curlDone = turningTime < 0.001;
  const closedSettled =
    isBookPoseSettled(bookClosedAmount, 0) ||
    isBookPoseSettled(bookClosedAmount, 1);

  if (
    force ||
    (amountSettled &&
      stackSettled &&
      curlDone &&
      closedSettled &&
      dragOpenedAmount == null)
  ) {
    mesh.position.z = stackZ;
    if (force || !isBookPoseSettled(group.rotation.y, hingeRotation)) {
      applyBonePose(
        group,
        mesh,
        hingeRotation,
        targetRotation,
        0,
        bookClosedAmount,
        delta,
        true
      );
    }
    return false;
  }

  mesh.position.z = stackZ;

  const bonesMoving = applyBonePose(
    group,
    mesh,
    hingeRotation,
    targetRotation,
    turningTime,
    bookClosedAmount,
    delta,
    false
  );

  return (
    !amountSettled ||
    !stackSettled ||
    !curlDone ||
    !closedSettled ||
    dragOpenedAmount != null ||
    bonesMoving
  );
};
