import type { BufferGeometry } from 'three';
import type { PageCornerTipCache } from './pageCornerTipCache';

/**
 * Recompute normals only for tip faces/verts — avoids full-mesh
 * computeVertexNormals every curl frame (main CPU cost).
 */
export const recomputePageCornerTipNormals = (
  geometry: BufferGeometry,
  tip: PageCornerTipCache
) => {
  const position = geometry.getAttribute('position');
  const normal = geometry.getAttribute('normal');
  const indexAttr = geometry.getIndex();
  if (!indexAttr || !normal) {
    return;
  }

  for (let i = 0; i < tip.vertexIndices.length; i += 1) {
    normal.setXYZ(tip.vertexIndices[i], 0, 0, 0);
  }

  for (let f = 0; f < tip.faceOffsets.length; f += 1) {
    const offset = tip.faceOffsets[f];
    const a = indexAttr.getX(offset);
    const b = indexAttr.getX(offset + 1);
    const c = indexAttr.getX(offset + 2);

    const ax = position.getX(a);
    const ay = position.getY(a);
    const az = position.getZ(a);
    const bx = position.getX(b) - ax;
    const by = position.getY(b) - ay;
    const bz = position.getZ(b) - az;
    const cx = position.getX(c) - ax;
    const cy = position.getY(c) - ay;
    const cz = position.getZ(c) - az;

    const nx = by * cz - bz * cy;
    const ny = bz * cx - bx * cz;
    const nz = bx * cy - by * cx;

    if (tip.tipMask[a]) {
      normal.setXYZ(
        a,
        normal.getX(a) + nx,
        normal.getY(a) + ny,
        normal.getZ(a) + nz
      );
    }
    if (tip.tipMask[b]) {
      normal.setXYZ(
        b,
        normal.getX(b) + nx,
        normal.getY(b) + ny,
        normal.getZ(b) + nz
      );
    }
    if (tip.tipMask[c]) {
      normal.setXYZ(
        c,
        normal.getX(c) + nx,
        normal.getY(c) + ny,
        normal.getZ(c) + nz
      );
    }
  }

  for (let i = 0; i < tip.vertexIndices.length; i += 1) {
    const vertex = tip.vertexIndices[i];
    const nx = normal.getX(vertex);
    const ny = normal.getY(vertex);
    const nz = normal.getZ(vertex);
    const length = Math.hypot(nx, ny, nz) || 1;
    normal.setXYZ(vertex, nx / length, ny / length, nz / length);
  }

  normal.needsUpdate = true;
};
