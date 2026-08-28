import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { MathUtils } from 'three';
import type { Group, MeshStandardMaterial, SkinnedMesh } from 'three';
import { useAtomValue } from 'jotai';
import { coverDragOpenedAtom } from '../../UI';
import {
  COVER_CURVE_SCALE,
  EASING_FACTOR_CLOSED,
  PAGE_DRAG_CURL_BLEND,
  PAGE_DRAG_TURNING_SCALE,
  PAGE_TURN_MS,
} from '../constants';
import { animatePageBones } from '../utils/animatePageBones';
import { getPageWidthScale } from '../utils/getPageWidthScale';
import {
  getSheetPositionZ,
  getSheetStackDepth,
} from '../utils/getSheetPositionZ';

type UsePageTurnParams = {
  opened: boolean;
  bookClosed: boolean;
  number: number;
  page: number;
  sheetCount: number;
  /** While dragging edge: 0..1 override. Null = click/turn via `opened`. */
  openedAmount: number | null;
  /** 0..1 peels the outer free edge of the active page. */
  cornerFold?: number;
};

export const usePageTurn = ({
  opened,
  bookClosed,
  number,
  page,
  sheetCount,
  openedAmount: openedAmountOverride,
  cornerFold = 0,
}: UsePageTurnParams) => {
  const coverDragOpened = useAtomValue(coverDragOpenedAtom);
  const sheetRef = useRef<Group>(null);
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<SkinnedMesh>(null);
  const turnedAtRef = useRef(Date.now());
  const lastOpenedRef = useRef(opened);
  const poseReadyRef = useRef(false);
  const closedAmountRef = useRef(bookClosed ? 1 : 0);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    const sheet = sheetRef.current;
    if (mesh == null) {
      return;
    }

    const stackDepth = getSheetStackDepth(number, page, sheetCount);
    const isDragging = openedAmountOverride != null;
    // Keep the turning sheet drawn above the stack (cover is thicker than neighbors).
    mesh.renderOrder =
      isDragging || number === page ? 24 - stackDepth : 12 - stackDepth;

    const materials = mesh.material;
    if (Array.isArray(materials)) {
      const front = materials[4] as MeshStandardMaterial;
      const back = materials[5] as MeshStandardMaterial;
      front.polygonOffset = back.polygonOffset = true;
      front.polygonOffsetFactor = back.polygonOffsetFactor = stackDepth;
      front.polygonOffsetUnits = back.polygonOffsetUnits = stackDepth;
    }

    const openedAmount = openedAmountOverride ?? (opened ? 1 : 0);

    if (isDragging) {
      // After drag-commit pin reaches rest + `opened` updates — don't re-pulse.
      const atOpenRest = openedAmountOverride >= 0.999 && opened;
      const atClosedRest = openedAmountOverride <= 0.001 && !opened;
      if (atOpenRest || atClosedRest) {
        lastOpenedRef.current = opened;
        turnedAtRef.current = Date.now() - PAGE_TURN_MS;
      }
    } else if (lastOpenedRef.current !== opened) {
      turnedAtRef.current = Date.now();
      lastOpenedRef.current = opened;
    }

    // Click: time envelope toward binary target. Drag: distance from rest pose.
    const turnFrom = opened ? 1 : 0;
    const turnTo = 1 - turnFrom;
    const turnProgress = isDragging
      ? Math.abs(openedAmount - turnFrom)
      : Math.min(PAGE_TURN_MS, Date.now() - turnedAtRef.current) / PAGE_TURN_MS;

    // While the cover is scrubbed, the whole stack follows its open amount so the
    // page underneath already has volume (not only after the cover settles).
    let closedTarget =
      coverDragOpened != null
        ? 1 - coverDragOpened
        : bookClosed
          ? 1
          : 0;
    if (number === 0 && isDragging && turnProgress < 0.999) {
      const startRigid =
        turnProgress <= 0.5 ? 1 - turnProgress / 0.5 : 0;
      closedTarget = Math.max(closedTarget, startRigid);
    }

    const group = groupRef.current;
    if (!poseReadyRef.current) {
      if (group == null || sheet == null) {
        return;
      }
      poseReadyRef.current = true;
      turnedAtRef.current = Date.now() - PAGE_TURN_MS;
      closedAmountRef.current = closedTarget;
      sheet.position.z = getSheetPositionZ(number, page, sheetCount);
      mesh.scale.x = getPageWidthScale(number, page, sheetCount);
      animatePageBones({
        group,
        mesh,
        delta,
        openedAmount,
        cornerFold: isDragging ? 0 : cornerFold,
        closedAmount: closedAmountRef.current,
        number,
        turningTime: 0,
        immediate: true,
      });
      return;
    }

    if (coverDragOpened != null && number !== 0) {
      // Follow the cover scrub immediately so the stack already has volume mid-drag.
      closedAmountRef.current = closedTarget;
    } else {
      easing.damp(
        closedAmountRef,
        'current',
        closedTarget,
        EASING_FACTOR_CLOSED,
        delta
      );
    }

    if (sheet != null) {
      easing.damp(
        sheet.position,
        'z',
        getSheetPositionZ(number, page, sheetCount),
        EASING_FACTOR_CLOSED,
        delta
      );
    }
    easing.damp(
      mesh.scale,
      'x',
      getPageWidthScale(number, page, sheetCount),
      EASING_FACTOR_CLOSED,
      delta
    );

    const turningTime =
      Math.sin(turnProgress * Math.PI) *
      (isDragging ? PAGE_DRAG_TURNING_SCALE : 1);
    // Cover: soft curl from start through mid (open + close, drag + nav).
    const coverSoftAmount = (() => {
      if (number !== 0) {
        return 0;
      }
      if (turnProgress <= 0.001 || turnProgress >= 0.999) {
        return 0;
      }
      return turnProgress <= 0.5 ? 1 : 2 * (1 - turnProgress);
    })();
    const curveScale =
      number === 0
        ? MathUtils.lerp(1, COVER_CURVE_SCALE, coverSoftAmount)
        : 1;

    animatePageBones({
      group,
      mesh,
      delta,
      openedAmount,
      // Blend toward click extreme — full extreme on mid-scrub over-twists.
      curlOpenedAmount: isDragging
        ? MathUtils.lerp(openedAmount, turnTo, PAGE_DRAG_CURL_BLEND)
        : openedAmount,
      cornerFold: isDragging ? 0 : cornerFold,
      closedAmount: closedAmountRef.current,
      number,
      turningTime,
      curveScale,
      immediate: false,
    });
  });

  return { sheetRef, groupRef, meshRef };
};
