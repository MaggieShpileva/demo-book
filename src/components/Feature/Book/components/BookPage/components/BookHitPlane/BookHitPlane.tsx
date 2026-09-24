import type { FC } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import { DoubleSide } from 'three';
import {
  getBookPageHit,
  type BookHitSide,
} from '@components/Feature/Book/utils/getBookPageHit';

type BookHitPlaneProps = {
  side: BookHitSide;
  onPointerDown: (event: ThreeEvent<PointerEvent>) => void;
};

export const BookHitPlane: FC<BookHitPlaneProps> = ({
  side,
  onPointerDown,
}) => {
  const { position, size } = getBookPageHit(side);

  return (
    <mesh
      position={[...position]}
      renderOrder={40}
      onPointerDown={onPointerDown}
    >
      <planeGeometry args={[...size]} />
      <meshBasicMaterial
        transparent
        opacity={0}
        depthTest={false}
        depthWrite={false}
        side={DoubleSide}
      />
    </mesh>
  );
};
