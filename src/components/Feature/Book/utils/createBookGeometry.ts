import {
  BoxGeometry,
  BufferGeometry,
  Float32BufferAttribute,
  Uint16BufferAttribute,
} from 'three';
import {
  PAGE_DEPTH,
  PAGE_HEIGHT,
  PAGE_HEIGHT_SEGMENTS,
  PAGE_SEGMENTS,
  PAGE_WIDTH,
} from '../constants';
import {
  PAGE_CORNER_A,
  PAGE_CORNER_B,
  PAGE_CORNER_TIP,
  PAGE_FLAP_ALONG_SEGMENTS,
  PAGE_FLAP_DEPTH_SEGMENTS,
  PAGE_FOLD_AXIS,
  PAGE_FOLD_ORIGIN,
  PAGE_TIP_SIDE_DIR,
} from '../components/BookPageCorner/constants';
import { buildPageCornerTipCache } from '../components/BookPageCorner/utils/pageCornerTipCache';

export const BOOK_SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;

/** Covers: no tip patch (avoids a visible square on the board). */
const COVER_HEIGHT_SEGMENTS = 2;

/** Depth resolution on thin edges. */
const PAGE_EDGE_Z_SEGMENTS = 1;

type GeometryAccum = {
  positions: number[];
  normals: number[];
  uvs: number[];
  indices: number[];
  groups: { start: number; count: number; materialIndex: number }[];
};

const createAccum = (): GeometryAccum => ({
  positions: [],
  normals: [],
  uvs: [],
  indices: [],
  groups: [],
});

const pushVertex = (
  accum: GeometryAccum,
  x: number,
  y: number,
  z: number,
  nx: number,
  ny: number,
  nz: number,
  u: number,
  v: number
) => {
  const index = accum.positions.length / 3;
  accum.positions.push(x, y, z);
  accum.normals.push(nx, ny, nz);
  accum.uvs.push(u, v);
  return index;
};

const beginGroup = (accum: GeometryAccum, materialIndex: number) => {
  accum.groups.push({
    start: accum.indices.length,
    count: 0,
    materialIndex,
  });
};

const endGroup = (accum: GeometryAccum) => {
  const group = accum.groups[accum.groups.length - 1];
  group.count = accum.indices.length - group.start;
};

const uvFront = (x: number, y: number) => [
  x / PAGE_WIDTH,
  (y + PAGE_HEIGHT / 2) / PAGE_HEIGHT,
] as const;

const uvBack = (x: number, y: number) => [
  1 - x / PAGE_WIDTH,
  (y + PAGE_HEIGHT / 2) / PAGE_HEIGHT,
] as const;

/** Axis-aligned grid; optional skip of tip-triangle quads (dog-ear only). */
const addGrid = (
  accum: GeometryAccum,
  x0: number,
  x1: number,
  y0: number,
  y1: number,
  z: number,
  segsX: number,
  segsY: number,
  nx: number,
  ny: number,
  nz: number,
  uv: (x: number, y: number) => readonly [number, number],
  flip: boolean,
  skipTipTriangle = false
) => {
  const row: number[][] = [];

  for (let j = 0; j <= segsY; j += 1) {
    const ty = j / segsY;
    const y = y0 + (y1 - y0) * ty;
    const line: number[] = [];

    for (let i = 0; i <= segsX; i += 1) {
      const tx = i / segsX;
      const x = x0 + (x1 - x0) * tx;
      const [u, v] = uv(x, y);
      line.push(pushVertex(accum, x, y, z, nx, ny, nz, u, v));
    }

    row.push(line);
  }

  const tipSide = (x: number, y: number) => {
    const dx = x - PAGE_FOLD_ORIGIN.x;
    const dy = y - PAGE_FOLD_ORIGIN.y;
    const along = dx * PAGE_FOLD_AXIS.x + dy * PAGE_FOLD_AXIS.y;
    const px = PAGE_FOLD_ORIGIN.x + PAGE_FOLD_AXIS.x * along;
    const py = PAGE_FOLD_ORIGIN.y + PAGE_FOLD_AXIS.y * along;
    return (x - px) * PAGE_TIP_SIDE_DIR.x + (y - py) * PAGE_TIP_SIDE_DIR.y;
  };

  for (let j = 0; j < segsY; j += 1) {
    for (let i = 0; i < segsX; i += 1) {
      const a = row[j][i];
      const b = row[j][i + 1];
      const c = row[j + 1][i];
      const d = row[j + 1][i + 1];

      if (skipTipTriangle) {
        const ax = accum.positions[a * 3];
        const ay = accum.positions[a * 3 + 1];
        const bx = accum.positions[b * 3];
        const by = accum.positions[b * 3 + 1];
        const cx = accum.positions[c * 3];
        const cy = accum.positions[c * 3 + 1];
        const dx = accum.positions[d * 3];
        const dy = accum.positions[d * 3 + 1];
        const mx = (ax + bx + cx + dx) * 0.25;
        const my = (ay + by + cy + dy) * 0.25;
        if (tipSide(mx, my) > 1e-4) {
          continue;
        }
      }

      if (flip) {
        accum.indices.push(a, b, c, b, d, c);
      } else {
        accum.indices.push(a, c, b, b, c, d);
      }
    }
  }
};

/**
 * Tip triangle with rows parallel to crease A→B (straight fold line),
 * welded into the page front/back — not a separate overlay mesh.
 */
const addCreaseAlignedTip = (
  accum: GeometryAccum,
  z: number,
  nx: number,
  ny: number,
  nz: number,
  uv: (x: number, y: number) => readonly [number, number],
  flip: boolean,
  depthSegments: number,
  alongSegments: number
) => {
  const row: number[][] = [];

  for (let i = 0; i <= depthSegments; i += 1) {
    const t = i / depthSegments;
    const line: number[] = [];

    for (let j = 0; j <= alongSegments; j += 1) {
      const s = j / alongSegments;
      const onCreaseX =
        PAGE_CORNER_A.x + (PAGE_CORNER_B.x - PAGE_CORNER_A.x) * s;
      const onCreaseY =
        PAGE_CORNER_A.y + (PAGE_CORNER_B.y - PAGE_CORNER_A.y) * s;
      const x = onCreaseX + (PAGE_CORNER_TIP.x - onCreaseX) * t;
      const y = onCreaseY + (PAGE_CORNER_TIP.y - onCreaseY) * t;
      const [u, v] = uv(x, y);
      line.push(pushVertex(accum, x, y, z, nx, ny, nz, u, v));
    }

    row.push(line);
  }

  for (let i = 0; i < depthSegments; i += 1) {
    for (let j = 0; j < alongSegments; j += 1) {
      const a = row[i][j];
      const b = row[i][j + 1];
      const c = row[i + 1][j];
      const d = row[i + 1][j + 1];

      if (flip) {
        accum.indices.push(a, b, c, b, d, c);
      } else {
        accum.indices.push(a, c, b, b, c, d);
      }
    }
  }
};

const addPageFace = (
  accum: GeometryAccum,
  materialIndex: number,
  z: number,
  nz: number,
  uv: (x: number, y: number) => readonly [number, number],
  flip: boolean
) => {
  beginGroup(accum, materialIndex);

  // Full page sheet; tip-triangle cells are omitted (no tip square cutout).
  addGrid(
    accum,
    0,
    PAGE_WIDTH,
    -PAGE_HEIGHT / 2,
    PAGE_HEIGHT / 2,
    z,
    PAGE_SEGMENTS,
    PAGE_HEIGHT_SEGMENTS,
    0,
    0,
    nz,
    uv,
    flip,
    true
  );

  // Only the dog-ear triangle — dense crease-aligned patch.
  addCreaseAlignedTip(
    accum,
    z,
    0,
    0,
    nz,
    uv,
    !flip,
    PAGE_FLAP_DEPTH_SEGMENTS,
    PAGE_FLAP_ALONG_SEGMENTS
  );

  endGroup(accum);
};

const addEdgeFace = (
  accum: GeometryAccum,
  materialIndex: number,
  getPoint: (
    a: number,
    b: number
  ) => { x: number; y: number; z: number; u: number; v: number },
  segsA: number,
  segsB: number,
  nx: number,
  ny: number,
  nz: number,
  flip: boolean
) => {
  beginGroup(accum, materialIndex);
  const row: number[][] = [];

  for (let j = 0; j <= segsB; j += 1) {
    const tb = j / segsB;
    const line: number[] = [];

    for (let i = 0; i <= segsA; i += 1) {
      const ta = i / segsA;
      const point = getPoint(ta, tb);
      line.push(
        pushVertex(
          accum,
          point.x,
          point.y,
          point.z,
          nx,
          ny,
          nz,
          point.u,
          point.v
        )
      );
    }

    row.push(line);
  }

  for (let j = 0; j < segsB; j += 1) {
    for (let i = 0; i < segsA; i += 1) {
      const a = row[j][i];
      const b = row[j][i + 1];
      const c = row[j + 1][i];
      const d = row[j + 1][i + 1];

      if (flip) {
        accum.indices.push(a, b, c, b, d, c);
      } else {
        accum.indices.push(a, c, b, b, c, d);
      }
    }
  }

  endGroup(accum);
};

const applySkinAttributes = (geometry: BufferGeometry) => {
  const position = geometry.attributes.position;
  const skinIndexes: number[] = [];
  const skinWeights: number[] = [];

  for (let index = 0; index < position.count; index += 1) {
    const x = position.getX(index);
    const skinIndex = Math.max(
      0,
      Math.min(PAGE_SEGMENTS - 1, Math.floor(x / BOOK_SEGMENT_WIDTH))
    );
    const skinWeight = (x - skinIndex * BOOK_SEGMENT_WIDTH) / BOOK_SEGMENT_WIDTH;

    skinIndexes.push(skinIndex, skinIndex + 1, 0, 0);
    skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
  }

  geometry.setAttribute('skinIndex', new Uint16BufferAttribute(skinIndexes, 4));
  geometry.setAttribute(
    'skinWeight',
    new Float32BufferAttribute(skinWeights, 4)
  );
};

/**
 * Thin page box whose top-right tip is crease-aligned and dense so corner
 * curl deforms the sheet itself (no floating flap overlay).
 */
export const createBookGeometry = () => {
  const accum = createAccum();
  const zFront = PAGE_DEPTH / 2;
  const zBack = -PAGE_DEPTH / 2;
  const halfH = PAGE_HEIGHT / 2;
  const edgeYSegs = PAGE_HEIGHT_SEGMENTS + PAGE_FLAP_ALONG_SEGMENTS;

  // BoxGeometry material order: +x, -x, +y, -y, +z, -z
  addEdgeFace(
    accum,
    0,
    (ta, tb) => ({
      x: PAGE_WIDTH,
      y: -halfH + PAGE_HEIGHT * ta,
      z: zBack + PAGE_DEPTH * tb,
      u: tb,
      v: ta,
    }),
    edgeYSegs,
    PAGE_EDGE_Z_SEGMENTS,
    1,
    0,
    0,
    false
  );

  addEdgeFace(
    accum,
    1,
    (ta, tb) => ({
      x: 0,
      y: -halfH + PAGE_HEIGHT * ta,
      z: zBack + PAGE_DEPTH * tb,
      u: tb,
      v: ta,
    }),
    edgeYSegs,
    PAGE_EDGE_Z_SEGMENTS,
    -1,
    0,
    0,
    true
  );

  addEdgeFace(
    accum,
    2,
    (ta, tb) => ({
      x: PAGE_WIDTH * ta,
      y: halfH,
      z: zBack + PAGE_DEPTH * tb,
      u: ta,
      v: tb,
    }),
    PAGE_SEGMENTS,
    PAGE_EDGE_Z_SEGMENTS,
    0,
    1,
    0,
    false
  );

  addEdgeFace(
    accum,
    3,
    (ta, tb) => ({
      x: PAGE_WIDTH * ta,
      y: -halfH,
      z: zBack + PAGE_DEPTH * tb,
      u: ta,
      v: tb,
    }),
    PAGE_SEGMENTS,
    PAGE_EDGE_Z_SEGMENTS,
    0,
    -1,
    0,
    true
  );

  addPageFace(accum, 4, zFront, 1, uvFront, true);
  addPageFace(accum, 5, zBack, -1, uvBack, false);

  const geometry = new BufferGeometry();
  geometry.setAttribute(
    'position',
    new Float32BufferAttribute(accum.positions, 3)
  );
  geometry.setAttribute('normal', new Float32BufferAttribute(accum.normals, 3));
  geometry.setAttribute('uv', new Float32BufferAttribute(accum.uvs, 2));
  geometry.setIndex(accum.indices);
  accum.groups.forEach((group) => {
    geometry.addGroup(group.start, group.count, group.materialIndex);
  });

  applySkinAttributes(geometry);
  geometry.setAttribute(
    'rest',
    new Float32BufferAttribute(new Float32Array(accum.positions), 3)
  );
  geometry.computeVertexNormals();
  geometry.userData.pageCornerTip = buildPageCornerTipCache(geometry);

  return geometry;
};

/** Plain skinned box — used for covers so the tip square never shows. */
export const createBookCoverGeometry = () => {
  const geometry = new BoxGeometry(
    PAGE_WIDTH,
    PAGE_HEIGHT,
    PAGE_DEPTH,
    PAGE_SEGMENTS,
    COVER_HEIGHT_SEGMENTS
  );

  geometry.translate(PAGE_WIDTH / 2, 0, 0);
  applySkinAttributes(geometry);
  geometry.setAttribute(
    'rest',
    new Float32BufferAttribute(
      new Float32Array(geometry.attributes.position.array as Float32Array),
      3
    )
  );

  return geometry;
};

export const bookPageGeometry = createBookGeometry();
export const bookCoverGeometry = createBookCoverGeometry();
