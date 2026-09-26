import type { SkinnedMesh } from 'three';

export const disposeBookPageMesh = (mesh: SkinnedMesh) => {
  const materials = Array.isArray(mesh.material)
    ? mesh.material
    : [mesh.material];

  materials.slice(4).forEach((material) => {
    material.dispose();
  });
  mesh.geometry.dispose();
  mesh.skeleton.dispose();
};
