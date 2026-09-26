import { useEffect, useMemo, useRef, type FC, type RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshBasicMaterial, type Mesh } from 'three';
import { PAGE_DEPTH } from '../../../../constants';
import {
  PAGE_CORNER_SHADOW_OPACITY,
  PAGE_CORNER_SHADOW_Z,
  PAGE_CORNER_VISIBLE_EPS,
} from '../../constants';
import {
  createPageCornerShadowGeometry,
  createPageCornerShadowMap,
} from '../../utils/createPageCornerShadow';

type BookPageCornerShadowProps = {
  progressRef: RefObject<number>;
  renderOrder: number;
};

/** Soft contact shadow under the lifted tip. */
export const BookPageCornerShadow: FC<BookPageCornerShadowProps> = ({
  progressRef,
  renderOrder,
}) => {
  const meshRef = useRef<Mesh>(null);
  const geometry = useMemo(() => createPageCornerShadowGeometry(), []);
  const map = useMemo(() => createPageCornerShadowMap(), []);
  const material = useMemo(
    () =>
      new MeshBasicMaterial({
        map: map ?? undefined,
        color: '#000000',
        transparent: true,
        opacity: 0,
        depthWrite: false,
        toneMapped: false,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2,
      }),
    [map]
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
      map?.dispose();
    };
  }, [geometry, map, material]);

  useFrame(() => {
    const progress = progressRef.current ?? 0;
    const target = meshRef.current;
    if (!target) {
      return;
    }

    target.visible = progress > PAGE_CORNER_VISIBLE_EPS;
    // Strong under the flap for the whole curl; peak while lifting.
    const amount = Math.min(
      1,
      progress * 0.95 + Math.sin(progress * Math.PI) * 0.55
    );
    material.opacity = PAGE_CORNER_SHADOW_OPACITY * amount;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={[0, 0, PAGE_DEPTH / 2 + PAGE_CORNER_SHADOW_Z]}
      renderOrder={renderOrder}
      visible={false}
    />
  );
};
