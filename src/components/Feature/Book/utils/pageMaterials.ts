import {
  Color,
  DoubleSide,
  MeshLambertMaterial,
  type Texture,
} from 'three';

/** Clone per mesh — never share Color/material instances across pages. */
export const createPageEdgeMaterials = (boardColor = 'white') =>
  Array.from({ length: 4 }, () => {
    const color = new Color(boardColor);
    return new MeshLambertMaterial({
      color,
      emissive: color.clone(),
      emissiveIntensity: 0.35,
      toneMapped: false,
    });
  });

/**
 * Bright printed page: emissive floor + Lambert so directional shadows
 * still darken under a curled corner without making the sheet dull.
 */
export const createPageFaceMaterial = (
  map?: Texture,
  boardColor = 'white',
  options: { transparent?: boolean } = {}
) => {
  const color = new Color(boardColor);
  const transparent = options.transparent === true;
  return new MeshLambertMaterial({
    color,
    map,
    emissive: color.clone(),
    emissiveMap: map,
    emissiveIntensity: 0.55,
    toneMapped: false,
    // Cutout (alphaTest) + depthWrite so the sheet occludes pages underneath
    // the same way opaque body pages do.
    transparent,
    alphaTest: transparent ? 0.05 : 0,
    depthWrite: true,
  });
};

/** Overflow print on the same skinned page mesh as the paper faces. */
export const createPageOverlayMaterial = (map?: Texture) =>
  new MeshLambertMaterial({
    map,
    emissiveMap: map,
    emissiveIntensity: 0.55,
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
