import type { FC } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import { DoubleSide } from 'three';
import { PAGE_CORNER_SIZE } from '../../constants';
import { getPageCornerPosition } from '../../utils/getPageCornerPosition';

type PageCornerProps = {
  opened: boolean;
  enabled: boolean;
  isActive: boolean;
  onPointerDown: (event: ThreeEvent<PointerEvent>) => void;
  onHoverChange: (hovered: boolean) => void;
};

export const PageCorner: FC<PageCornerProps> = ({
  opened,
  enabled,
  isActive,
  onPointerDown,
  onHoverChange,
}) => {
  if (!enabled) {
    return null;
  }

  return (
    <mesh
      position={getPageCornerPosition(opened)}
      onPointerDown={onPointerDown}
      onPointerEnter={(event) => {
        event.stopPropagation();
        onHoverChange(true);
      }}
      onPointerLeave={(event) => {
        event.stopPropagation();
        onHoverChange(false);
      }}
    >
      <planeGeometry args={[PAGE_CORNER_SIZE, PAGE_CORNER_SIZE]} />
      <meshBasicMaterial
        color="#fffaf0"
        transparent
        opacity={isActive ? 0.35 : 0.12}
        depthWrite={false}
        side={DoubleSide}
      />
    </mesh>
  );
};
