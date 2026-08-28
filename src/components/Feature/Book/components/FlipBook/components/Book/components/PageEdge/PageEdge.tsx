import type { FC } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import { DoubleSide } from 'three';
import { PAGE_DEPTH, PAGE_HEIGHT } from '../../constants';
import {
  getPageEdgePositionOnBone,
  getPageEdgeWidth,
} from '../../utils/getPageEdgeTransform';

type PageEdgeProps = {
  opened: boolean;
  depth?: number;
  onPointerDown: (event: ThreeEvent<PointerEvent>) => void;
  onHoverChange: (hovered: boolean) => void;
};

export const PageEdge: FC<PageEdgeProps> = ({
  opened,
  depth = PAGE_DEPTH,
  onPointerDown,
  onHoverChange,
}) => (
  <mesh
    position={getPageEdgePositionOnBone(opened, depth)}
    renderOrder={30}
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
    <planeGeometry args={[getPageEdgeWidth(), PAGE_HEIGHT]} />
    <meshBasicMaterial
      transparent
      opacity={0}
      depthTest={false}
      depthWrite={false}
      side={DoubleSide}
    />
  </mesh>
);
