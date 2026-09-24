import { Color, DoubleSide, MeshBasicMaterial, type Texture } from 'three';

/** Clone per mesh — never share Color/material instances across pages. */
export const createPageEdgeMaterials = (boardColor = 'white') =>
  Array.from(
    { length: 4 },
    () => new MeshBasicMaterial({ color: new Color(boardColor) })
  );

/** Unlit face — printed-page look without lighting grain on type. */
export const createPageFaceMaterial = (map?: Texture, boardColor = 'white') =>
  new MeshBasicMaterial({
    color: new Color(boardColor),
    map,
    toneMapped: false,
  });

/** Overflow print on the same skinned page mesh as the paper faces. */
export const createPageOverlayMaterial = (map?: Texture) =>
  new MeshBasicMaterial({
    map,
    transparent: true,
    alphaTest: 0.02,
    depthWrite: false,
    depthTest: true,
    toneMapped: false,
    side: DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: 1,
  });
