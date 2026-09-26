import type { BufferGeometry } from 'three';
import {
  PAGE_FOLD_AXIS,
  PAGE_FOLD_ORIGIN,
  PAGE_TIP_SIDE_DIR,
} from '../constants';

export type PageCornerTipCache = {
  /** Vertex indices that belong to the dog-ear (signedDist > 0). */
  vertexIndices: Uint32Array;
  /** 1 if vertex is a tip vert (length = geometry vertex count). */
  tipMask: Uint8Array;
  /** Index-buffer offsets (multiples of 3) for faces that touch the tip. */
  faceOffsets: Uint32Array;
};

const tipSignedDist = (x: number, y: number, z: number) => {
  const dx = x - PAGE_FOLD_ORIGIN.x;
  const dy = y - PAGE_FOLD_ORIGIN.y;
  const dz = z - PAGE_FOLD_ORIGIN.z;
  const along =
    dx * PAGE_FOLD_AXIS.x + dy * PAGE_FOLD_AXIS.y + dz * PAGE_FOLD_AXIS.z;
  const px = dx - PAGE_FOLD_AXIS.x * along;
  const py = dy - PAGE_FOLD_AXIS.y * along;
  const pz = dz - PAGE_FOLD_AXIS.z * along;
  return (
    px * PAGE_TIP_SIDE_DIR.x +
    py * PAGE_TIP_SIDE_DIR.y +
    pz * PAGE_TIP_SIDE_DIR.z
  );
};

/** Build tip vertex/face caches once per page geometry. */
export const buildPageCornerTipCache = (
  geometry: BufferGeometry
): PageCornerTipCache => {
  const rest =
    geometry.getAttribute('rest') ?? geometry.getAttribute('position');
  const tipVerts: number[] = [];
  const tipMask = new Uint8Array(rest.count);

  for (let index = 0; index < rest.count; index += 1) {
    if (
      tipSignedDist(rest.getX(index), rest.getY(index), rest.getZ(index)) >
      1e-5
    ) {
      tipVerts.push(index);
      tipMask[index] = 1;
    }
  }

  const indexAttr = geometry.getIndex();
  const faceOffsets: number[] = [];

  if (indexAttr) {
    for (let offset = 0; offset < indexAttr.count; offset += 3) {
      const a = indexAttr.getX(offset);
      const b = indexAttr.getX(offset + 1);
      const c = indexAttr.getX(offset + 2);
      if (tipMask[a] || tipMask[b] || tipMask[c]) {
        faceOffsets.push(offset);
      }
    }
  }

  return {
    vertexIndices: new Uint32Array(tipVerts),
    tipMask,
    faceOffsets: new Uint32Array(faceOffsets),
  };
};

export const getPageCornerTipCache = (
  geometry: BufferGeometry
): PageCornerTipCache => {
  const existing = geometry.userData.pageCornerTip as
    | PageCornerTipCache
    | undefined;
  // clone() may JSON-copy userData and drop typed arrays — rebuild if needed.
  if (
    existing?.tipMask instanceof Uint8Array &&
    existing.vertexIndices instanceof Uint32Array &&
    existing.faceOffsets instanceof Uint32Array
  ) {
    return existing;
  }

  const cache = buildPageCornerTipCache(geometry);
  geometry.userData.pageCornerTip = cache;
  return cache;
};
