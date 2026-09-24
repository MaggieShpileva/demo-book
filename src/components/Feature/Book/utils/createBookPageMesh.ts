import { Bone, Skeleton, SkinnedMesh } from 'three';
import type { FC } from 'react';
import { peekPageTexture } from '@components/Feature/Book/utils/pageTextureCache';
import {
  createPageEdgeMaterials,
  createPageFaceMaterial,
} from '@components/Feature/Book/utils/pageMaterials';
import { PAGE_SEGMENTS } from '../constants';
import {
  bookPageGeometry,
  BOOK_SEGMENT_WIDTH,
} from './createBookGeometry';

export const createBookPageMesh = (Front: FC, Back: FC) => {
  const bones: Bone[] = [];

  for (let index = 0; index <= PAGE_SEGMENTS; index += 1) {
    const bone = new Bone();
    bone.position.x = index === 0 ? 0 : BOOK_SEGMENT_WIDTH;
    bones.push(bone);
    if (index > 0) {
      bones[index - 1].add(bone);
    }
  }

  const skeleton = new Skeleton(bones);
  const mesh = new SkinnedMesh(bookPageGeometry, [
    ...createPageEdgeMaterials(),
    createPageFaceMaterial(peekPageTexture(Front)),
    createPageFaceMaterial(peekPageTexture(Back)),
  ]);

  mesh.frustumCulled = false;
  mesh.add(skeleton.bones[0]);
  mesh.bind(skeleton);

  return mesh;
};
