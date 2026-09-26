import { useEffect, useRef, type RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { MathUtils, type Group } from 'three';
import { useBookDragContext } from '../components/BookDragState';
import { useBookStage } from '../components/BookStage';
import {
  BOOK_EXIT_DURATION_MS,
  BOOK_READING_ENTER_DURATION_MS,
  BOOK_READING_ENTER_OFFSET_Y,
} from '../bookIntroConstants';
import { BOOK_FRAME_DELTA_MAX, BOOK_BACK_CLOSE_SHIFT_EASING, EASING_FACTOR } from '../constants';
import { getBookOpenedPage } from '../utils/getBookOpenedPage';
import { getBookPose, type BookPoseOverride } from '../utils/getBookPose';
import {
  isBookAngleSettled,
  isBookPoseSettled,
  isBookPresentPoseSettled,
} from '../utils/isBookPoseSettled';
import { clampBookOpenedAmount } from '../utils/clampBookOpenedAmount';

const smoothstep01 = (value: number) => {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
};

type TimedStartPose = {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
};

export const useBookPose = (
  groupRef: RefObject<Group | null>,
  delayedPage: number,
  sheetCount: number,
  sheetAmountsRef: RefObject<number[]>,
  closedPoseRef: RefObject<BookPoseOverride>,
  presentPoseRef: RefObject<BookPoseOverride>
) => {
  const { dragRef } = useBookDragContext();
  const { stage, setPresentSettled, enterReading } = useBookStage();
  const poseReady = useRef(false);
  const presentNotified = useRef(false);
  const presentStartedAt = useRef<number | null>(null);
  const exitStartedAt = useRef<number | null>(null);
  const exitFrom = useRef<TimedStartPose | null>(null);
  const exitCompleted = useRef(false);
  const readingStartedAt = useRef<number | null>(null);
  const readingFrom = useRef<TimedStartPose | null>(null);
  /** Smoothed 0–1 progress for back-close framing slide. */
  const backCloseSlideRef = useRef(0);

  useEffect(() => {
    if (stage === 'presented') {
      presentNotified.current = false;
      presentStartedAt.current = performance.now();
      exitStartedAt.current = null;
      exitFrom.current = null;
      exitCompleted.current = false;
      readingStartedAt.current = null;
      readingFrom.current = null;
      return;
    }

    if (stage === 'exiting') {
      presentStartedAt.current = null;
      exitCompleted.current = false;
      readingStartedAt.current = null;
      readingFrom.current = null;
      return;
    }

    if (stage === 'reading') {
      presentStartedAt.current = null;
      exitStartedAt.current = null;
      exitFrom.current = null;
      return;
    }

    presentNotified.current = false;
    presentStartedAt.current = null;
    exitStartedAt.current = null;
    exitFrom.current = null;
    exitCompleted.current = false;
    readingStartedAt.current = null;
    readingFrom.current = null;
  }, [stage]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (group == null) {
      return;
    }

    const openedPage = getBookOpenedPage(delayedPage, dragRef.current);
    const lastSheet = Math.max(0, sheetCount - 1);
    const backCoverAmount = clampBookOpenedAmount(
      sheetAmountsRef.current[lastSheet] ?? 0
    );
    const dt = Math.min(delta, BOOK_FRAME_DELTA_MAX);
    easing.damp(
      backCloseSlideRef,
      'current',
      backCoverAmount,
      BOOK_BACK_CLOSE_SHIFT_EASING,
      dt
    );
    const pose = getBookPose(
      openedPage,
      stage,
      closedPoseRef.current,
      presentPoseRef.current,
      backCloseSlideRef.current
    );
    const rotation = [pose.rx, pose.ry, pose.rz] as [
      number,
      number,
      number,
    ];
    const backSlideMoving = !isBookPoseSettled(
      backCloseSlideRef.current,
      backCoverAmount
    );

    if (!poseReady.current) {
      group.position.set(pose.x, pose.y, pose.z);
      group.rotation.set(pose.rx, pose.ry, pose.rz);
      poseReady.current = true;
      state.invalidate();
      return;
    }

    if (stage === 'exiting') {
      if (exitStartedAt.current == null) {
        exitStartedAt.current = performance.now();
        exitFrom.current = {
          x: group.position.x,
          y: group.position.y,
          z: group.position.z,
          rx: group.rotation.x,
          ry: group.rotation.y,
          rz: group.rotation.z,
        };
      }

      const from = exitFrom.current;
      if (from != null) {
        const linear = Math.min(
          1,
          (performance.now() - exitStartedAt.current) / BOOK_EXIT_DURATION_MS
        );
        const t = smoothstep01(linear);
        group.position.set(
          MathUtils.lerp(from.x, pose.x, t),
          MathUtils.lerp(from.y, pose.y, t),
          MathUtils.lerp(from.z, pose.z, t)
        );
        group.rotation.set(
          MathUtils.lerp(from.rx, pose.rx, t),
          MathUtils.lerp(from.ry, pose.ry, t),
          MathUtils.lerp(from.rz, pose.rz, t)
        );

        if (linear < 1) {
          state.invalidate();
        } else if (!exitCompleted.current) {
          exitCompleted.current = true;
          enterReading();
          state.invalidate();
        }
      }

      return;
    }

    if (stage === 'reading') {
      if (openedPage < 1) {
        state.invalidate();
        return;
      }

      if (readingStartedAt.current == null) {
        readingStartedAt.current = performance.now();
        readingFrom.current = {
          x: pose.x,
          y: pose.y + BOOK_READING_ENTER_OFFSET_Y,
          z: pose.z,
          rx: pose.rx,
          ry: pose.ry,
          rz: pose.rz,
        };
        group.position.set(
          readingFrom.current.x,
          readingFrom.current.y,
          readingFrom.current.z
        );
        group.rotation.set(pose.rx, pose.ry, pose.rz);
      }

      const from = readingFrom.current;
      if (from != null) {
        const linear = Math.min(
          1,
          (performance.now() - readingStartedAt.current) /
            BOOK_READING_ENTER_DURATION_MS
        );
        const t = smoothstep01(linear);
        group.position.set(
          MathUtils.lerp(from.x, pose.x, t),
          MathUtils.lerp(from.y, pose.y, t),
          MathUtils.lerp(from.z, pose.z, t)
        );
        group.rotation.set(pose.rx, pose.ry, pose.rz);

        if (linear < 1 || backSlideMoving) {
          state.invalidate();
        }
      }

      return;
    }

    easing.damp3(group.position, [pose.x, pose.y, pose.z], EASING_FACTOR, dt);
    easing.dampE(group.rotation, rotation, EASING_FACTOR, dt);

    const settled =
      stage === 'presented'
        ? isBookPresentPoseSettled(group.position.x, pose.x) &&
          isBookPresentPoseSettled(group.position.y, pose.y) &&
          isBookPresentPoseSettled(group.position.z, pose.z) &&
          isBookAngleSettled(group.rotation.x, pose.rx) &&
          isBookAngleSettled(group.rotation.y, pose.ry) &&
          isBookAngleSettled(group.rotation.z, pose.rz)
        : isBookPoseSettled(group.position.x, pose.x) &&
          isBookPoseSettled(group.position.y, pose.y) &&
          isBookPoseSettled(group.position.z, pose.z) &&
          isBookPoseSettled(group.rotation.x, pose.rx) &&
          isBookPoseSettled(group.rotation.y, pose.ry) &&
          isBookPoseSettled(group.rotation.z, pose.rz);

    const presentTimedOut =
      stage === 'presented' &&
      presentStartedAt.current != null &&
      performance.now() - presentStartedAt.current > 1500;

    if (!settled && !presentTimedOut) {
      state.invalidate();
      return;
    }

    if (stage === 'presented' && !presentNotified.current) {
      presentNotified.current = true;
      setPresentSettled(true);
      state.invalidate();
    }
  });
};
