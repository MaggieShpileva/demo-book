import { useRef } from 'react';
import type { RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group, SkinnedMesh } from 'three';
import { BOOK_FRAME_DELTA_MAX } from '../constants';
import { useBookDragContext } from '../components/BookDragState';
import { animateBookBones } from '../utils/animateBookBones';

type UseBookPagePoseParams = {
  groupRef: RefObject<Group | null>;
  mesh: SkinnedMesh;
  opened: boolean;
  bookClosed: boolean;
  number: number;
  stackZ: number;
};

export const useBookPagePose = ({
  groupRef,
  mesh,
  opened,
  bookClosed,
  number,
  stackZ,
}: UseBookPagePoseParams) => {
  const { dragRef } = useBookDragContext();
  const turnedAt = useRef(0);
  const lastOpened = useRef(opened);
  const openedAmount = useRef(opened ? 1 : 0);
  const posed = useRef(false);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (group == null) {
      return;
    }

    const animating = animateBookBones({
      group,
      mesh,
      delta: Math.min(delta, BOOK_FRAME_DELTA_MAX),
      opened,
      bookClosed,
      number,
      turnedAt,
      lastOpened,
      openedAmount,
      dragOpenedAmount:
        dragRef.current?.sheet === number ? dragRef.current.amount : null,
      stackZ,
      force: !posed.current,
    });
    posed.current = true;

    if (animating) {
      state.invalidate();
    }
  });
};
