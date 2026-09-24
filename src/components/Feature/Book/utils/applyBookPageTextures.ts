import { MeshBasicMaterial, type SkinnedMesh, type Texture } from 'three';

const FACE_MATERIAL_OFFSET = 4;

export const applyBookPageTextures = (
  mesh: SkinnedMesh,
  front: Texture,
  back: Texture
) => {
  const materials = mesh.material;
  if (!Array.isArray(materials)) {
    return;
  }

  const frontMaterial = materials[FACE_MATERIAL_OFFSET];
  const backMaterial = materials[FACE_MATERIAL_OFFSET + 1];
  if (
    !(frontMaterial instanceof MeshBasicMaterial) ||
    !(backMaterial instanceof MeshBasicMaterial)
  ) {
    return;
  }

  frontMaterial.map = front;
  backMaterial.map = back;
  frontMaterial.needsUpdate = true;
  backMaterial.needsUpdate = true;
};
