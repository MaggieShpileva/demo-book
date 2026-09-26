import { BufferGeometry, CanvasTexture, Float32BufferAttribute } from 'three';
import {
  PAGE_CORNER_A,
  PAGE_CORNER_B,
  PAGE_CORNER_SHADOW_SEGMENTS,
  PAGE_CORNER_TIP,
  PAGE_MAX_FOLD_DIST,
  PAGE_TIP_SIDE_DIR,
} from '../constants';

const tipIndex = (i: number, j: number, segments: number) => {
  let index = 0;
  for (let row = 0; row < i; row += 1) {
    index += segments - row + 1;
  }
  return index + j;
};

export const createPageCornerShadowMap = () => {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  if (!context) {
    return null;
  }

  const gradient = context.createRadialGradient(
    size * 0.62,
    size * 0.62,
    size * 0.04,
    size * 0.48,
    size * 0.48,
    size * 0.82
  );
  gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
  gradient.addColorStop(0.28, 'rgba(0, 0, 0, 0.88)');
  gradient.addColorStop(0.58, 'rgba(0, 0, 0, 0.4)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

/** Soft tip triangle, slightly expanded past the crease for blur. */
export const createPageCornerShadowGeometry = (
  segments = PAGE_CORNER_SHADOW_SEGMENTS
): BufferGeometry => {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const expand = PAGE_MAX_FOLD_DIST * 0.12;

  const tip = PAGE_CORNER_TIP;
  const a = PAGE_CORNER_A.clone().addScaledVector(PAGE_TIP_SIDE_DIR, -expand);
  const b = PAGE_CORNER_B.clone().addScaledVector(PAGE_TIP_SIDE_DIR, -expand);

  for (let i = 0; i <= segments; i += 1) {
    for (let j = 0; j <= segments - i; j += 1) {
      const u = i / segments;
      const v = j / segments;
      const w = 1 - u - v;
      positions.push(
        w * tip.x + u * a.x + v * b.x,
        w * tip.y + u * a.y + v * b.y,
        0
      );
      uvs.push(0.12 + w * 0.72, 0.12 + w * 0.72);
    }
  }

  for (let i = 0; i < segments; i += 1) {
    for (let j = 0; j < segments - i; j += 1) {
      const p0 = tipIndex(i, j, segments);
      const p1 = tipIndex(i + 1, j, segments);
      const p2 = tipIndex(i, j + 1, segments);
      indices.push(p0, p1, p2);
      if (j < segments - i - 1) {
        const p3 = tipIndex(i + 1, j + 1, segments);
        indices.push(p1, p3, p2);
      }
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
};
