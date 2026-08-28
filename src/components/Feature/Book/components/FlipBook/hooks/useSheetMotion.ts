import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { MutableRefObject } from 'react';
import type { Group } from 'three';
import {
  getSheetPositionZ,
  getSheetRotationY,
} from '../utils/getSheetTransform';
import type { FlipMotion } from '../types';

export const useSheetMotion = (
  index: number,
  pageCount: number,
  motionRef: MutableRefObject<FlipMotion>
) => {
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    const group = groupRef.current;
    if (group == null) {
      return;
    }

    const motion = motionRef.current;
    group.rotation.y = getSheetRotationY(index, motion);
    group.position.z = getSheetPositionZ(index, pageCount, motion);
  });

  return groupRef;
};
