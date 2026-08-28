import {
  Bone,
  MeshStandardMaterial,
  Skeleton,
  SkinnedMesh,
  Sphere,
  Vector3,
} from 'three';
import type { Texture } from 'three';
import {
  PAGE_DEPTH,
  PAGE_HEIGHT,
  PAGE_SEGMENTS,
  PAGE_WIDTH,
  SEGMENT_WIDTH,
} from '../constants';
import { createPageGeometry } from './createPageGeometry';
import { emissiveColor, pageEdgeMaterials, whiteColor } from './pageMaterials';

type CreateSkinnedPageMeshParams = {
  frontMap?: Texture;
  backMap?: Texture;
  depth?: number;
};

export const createSkinnedPageMesh = ({
  frontMap,
  backMap,
  depth = PAGE_DEPTH,
}: CreateSkinnedPageMeshParams = {}) => {
  const bones: Bone[] = [];

  for (let i = 0; i <= PAGE_SEGMENTS; i++) {
    const bone = new Bone();
    bones.push(bone);
    bone.position.x = i === 0 ? 0 : SEGMENT_WIDTH;
    if (i > 0) {
      bones[i - 1].add(bone);
    }
  }

  const skeleton = new Skeleton(bones);

  const materials = [
    ...pageEdgeMaterials,
    new MeshStandardMaterial({
      color: whiteColor,
      map: frontMap,
      roughness: 0.85,
      emissive: emissiveColor,
      emissiveIntensity: 0,
    }),
    new MeshStandardMaterial({
      color: whiteColor,
      map: backMap,
      roughness: 0.85,
      emissive: emissiveColor,
      emissiveIntensity: 0,
    }),
  ];

  // Build per mesh so HMR / PAGE_WIDTH changes never leave stale skin indexes.
  const geometry = createPageGeometry(depth);
  const mesh = new SkinnedMesh(geometry, materials);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.frustumCulled = false;
  mesh.boundingSphere = new Sphere(
    new Vector3(PAGE_WIDTH / 2, 0, 0),
    Math.hypot(PAGE_WIDTH, PAGE_HEIGHT) / 2 + depth
  );
  mesh.computeBoundingSphere = () => undefined;
  mesh.add(skeleton.bones[0]);
  mesh.bind(skeleton);

  return mesh;
};
