import {
  BufferGeometry,
  Float32BufferAttribute,
  Uint16BufferAttribute,
} from 'three';
import {
  PAGE_DEPTH,
  PAGE_FACE_LIFT,
  PAGE_HEIGHT,
  PAGE_SEGMENTS,
  PAGE_WIDTH,
  PAGE_HTML_HEIGHT_PX,
  PAGE_HTML_WIDTH_PX,
} from '../constants';
import type { BookPageOverlayPadding } from './bookPageOverlay';
import { BOOK_SEGMENT_WIDTH } from './createBookGeometry';

/**
 * Thin plane covering the page plus CSS-px overlay padding (world units).
 * Skinned like the sheet so print overflow turns with the page.
 */
export const createPageOverlayGeometry = (padding: BookPageOverlayPadding) => {
  const padLeft = (padding.left / PAGE_HTML_WIDTH_PX) * PAGE_WIDTH;
  const padRight = (padding.right / PAGE_HTML_WIDTH_PX) * PAGE_WIDTH;
  const padTop = (padding.top / PAGE_HTML_HEIGHT_PX) * PAGE_HEIGHT;
  const padBottom = (padding.bottom / PAGE_HTML_HEIGHT_PX) * PAGE_HEIGHT;

  const x0 = -padLeft;
  const x1 = PAGE_WIDTH + padRight;
  const y0 = -PAGE_HEIGHT / 2 - padBottom;
  const y1 = PAGE_HEIGHT / 2 + padTop;
  const z = PAGE_DEPTH / 2 + PAGE_FACE_LIFT * 2;

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const skinIndexes: number[] = [];
  const skinWeights: number[] = [];

  const segsX = PAGE_SEGMENTS;
  const segsY = 8;

  for (let j = 0; j <= segsY; j += 1) {
    const ty = j / segsY;
    const y = y0 + (y1 - y0) * ty;
    const v = ty;

    for (let i = 0; i <= segsX; i += 1) {
      const tx = i / segsX;
      const x = x0 + (x1 - x0) * tx;
      positions.push(x, y, z);
      uvs.push(tx, v);

      const clampedX = Math.min(PAGE_WIDTH, Math.max(0, x));
      const skinIndex = Math.max(
        0,
        Math.min(PAGE_SEGMENTS - 1, Math.floor(clampedX / BOOK_SEGMENT_WIDTH))
      );
      const skinWeight =
        (clampedX - skinIndex * BOOK_SEGMENT_WIDTH) / BOOK_SEGMENT_WIDTH;
      skinIndexes.push(skinIndex, skinIndex + 1, 0, 0);
      skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
    }
  }

  const stride = segsX + 1;
  for (let j = 0; j < segsY; j += 1) {
    for (let i = 0; i < segsX; i += 1) {
      const a = j * stride + i;
      const b = a + 1;
      const c = a + stride;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
  geometry.setAttribute('skinIndex', new Uint16BufferAttribute(skinIndexes, 4));
  geometry.setAttribute(
    'skinWeight',
    new Float32BufferAttribute(skinWeights, 4)
  );
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
};
