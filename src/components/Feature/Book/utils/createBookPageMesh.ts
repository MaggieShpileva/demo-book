import { Bone, Skeleton, SkinnedMesh } from 'three';
import type { FC } from 'react';
import { CoverBack } from '@components/Feature/Book/components/htmlPages/CoverBack';
import { CoverFront } from '@components/Feature/Book/components/htmlPages/CoverFront';
import { peekPageTexture } from '@components/Feature/Book/utils/pageTextureCache';
import {
  createPageEdgeMaterials,
  createPageFaceMaterial,
} from '@components/Feature/Book/utils/pageMaterials';
import { ContentsPage } from '@/pages/ContentsPage';
import { PAGE_SEGMENTS } from '../constants';
import {
  bookCoverGeometry,
  bookPageGeometry,
  BOOK_SEGMENT_WIDTH,
} from './createBookGeometry';

const isCoverFace = (Front: FC) =>
  Front === CoverFront || Front === CoverBack;

/** Covers + contents: no tip patch (avoids a white corner triangle). */
const usesPlainGeometry = (Front: FC) =>
  isCoverFace(Front) || Front === ContentsPage;

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
  const source = usesPlainGeometry(Front)
    ? bookCoverGeometry
    : bookPageGeometry;
  const frontTransparent = Front === ContentsPage;
  // Per-page clone: corner curl mutates tip vertices without affecting other sheets.
  const mesh = new SkinnedMesh(source.clone(), [
    ...createPageEdgeMaterials(),
    createPageFaceMaterial(peekPageTexture(Front), 'white', {
      transparent: frontTransparent,
    }),
    createPageFaceMaterial(peekPageTexture(Back)),
  ]);

  mesh.frustumCulled = false;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.add(skeleton.bones[0]);
  mesh.bind(skeleton);

  return mesh;
};
