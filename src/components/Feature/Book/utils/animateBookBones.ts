import { type Group, type SkinnedMesh } from 'three';
import { easing } from 'maath';
import type { MutableRefObject } from 'react';
import {
  BOOK_DRAG_EASING,
  EASING_FACTOR,
  EASING_FACTOR_FOLD,
  PAGE_TURN_CURL_MS,
} from '../constants';
import { clampBookOpenedAmount } from './clampBookOpenedAmount';
import { getBookBonePose } from './getBookBonePose';
import { getBookHingeRotation } from './getBookHingeRotation';
import { isBookPoseSettled } from './isBookPoseSettled';

type AnimateBookBonesParams = {
  group: Group;
  mesh: SkinnedMesh;
  delta: number;
  opened: boolean;
  bookClosed: boolean;
  number: number;
  turnedAt: MutableRefObject<number>;
  lastOpened: MutableRefObject<boolean>;
  openedAmount: MutableRefObject<number>;
  dragOpenedAmount: number | null;
  stackZ: number;
  force: boolean;
};

const getTurningTime = (
  dragOpenedAmount: number | null,
  opened: boolean,
  turnedAt: number
) => {
  if (dragOpenedAmount != null) {
    const progress = opened ? 1 - dragOpenedAmount : dragOpenedAmount;
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
  bookClosed: boolean,
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
      bookClosed
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
  bookClosed,
  number,
  turnedAt,
  lastOpened,
  openedAmount,
  dragOpenedAmount,
  stackZ,
  force,
}: AnimateBookBonesParams) => {
  if (lastOpened.current !== opened) {
    turnedAt.current = Date.now();
    lastOpened.current = opened;
  }

  const restAmount = opened ? 1 : 0;
  const amountTarget =
    dragOpenedAmount == null
      ? restAmount
      : clampBookOpenedAmount(dragOpenedAmount);

  if (force) {
    openedAmount.current = amountTarget;
    mesh.position.z = stackZ;
  } else if (dragOpenedAmount != null) {
    easing.damp(
      openedAmount,
      'current',
      amountTarget,
      BOOK_DRAG_EASING,
      delta
    );
    openedAmount.current = clampBookOpenedAmount(openedAmount.current);
  } else if (!isBookPoseSettled(openedAmount.current, amountTarget)) {
    easing.damp(openedAmount, 'current', amountTarget, EASING_FACTOR, delta);
    openedAmount.current = clampBookOpenedAmount(openedAmount.current);
  } else {
    openedAmount.current = amountTarget;
  }

  const turningTime = force
    ? 0
    : getTurningTime(dragOpenedAmount, opened, turnedAt.current);
  const hingeRotation = getBookHingeRotation(
    openedAmount.current,
    number,
    bookClosed
  );
  const targetRotation = getBookHingeRotation(
    restAmount,
    number,
    bookClosed
  );
  const amountSettled = isBookPoseSettled(
    openedAmount.current,
    amountTarget
  );
  const stackSettled = isBookPoseSettled(mesh.position.z, stackZ);
  const curlDone = turningTime < 0.001;

  if (
    force ||
    (amountSettled && stackSettled && curlDone && dragOpenedAmount == null)
  ) {
    mesh.position.z = stackZ;
    if (force || !isBookPoseSettled(group.rotation.y, hingeRotation)) {
      applyBonePose(
        group,
        mesh,
        hingeRotation,
        targetRotation,
        0,
        bookClosed,
        delta,
        true
      );
    }
    return false;
  }

  if (!stackSettled) {
    easing.damp(mesh.position, 'z', stackZ, EASING_FACTOR, delta);
  } else {
    mesh.position.z = stackZ;
  }

  const bonesMoving = applyBonePose(
    group,
    mesh,
    hingeRotation,
    targetRotation,
    turningTime,
    bookClosed,
    delta,
    false
  );

  return (
    !amountSettled ||
    !stackSettled ||
    !curlDone ||
    dragOpenedAmount != null ||
    bonesMoving
  );
};
