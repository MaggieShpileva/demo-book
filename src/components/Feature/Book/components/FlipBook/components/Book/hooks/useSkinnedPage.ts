import { useEffect, useMemo } from 'react';
import type { FC } from 'react';
import type { MeshStandardMaterial } from 'three';
import { createSkinnedPageMesh } from '../utils/createSkinnedPageMesh';
import {
  loadPageHtmlTextures,
  peekPageTexture,
} from '../utils/pageTextureCache';

export const useSkinnedPage = (Front: FC, Back: FC, depth?: number) => {
  const mesh = useMemo(
    () =>
      createSkinnedPageMesh({
        frontMap: peekPageTexture(Front),
        backMap: peekPageTexture(Back),
        depth,
      }),
    [Front, Back, depth]
  );

  useEffect(() => {
    if (peekPageTexture(Front) != null && peekPageTexture(Back) != null) {
      return;
    }

    return loadPageHtmlTextures(Front, Back, ({ front, back }) => {
      const materials = mesh.material;
      if (!Array.isArray(materials)) {
        return;
      }

      const frontMaterial = materials[4] as MeshStandardMaterial;
      const backMaterial = materials[5] as MeshStandardMaterial;
      frontMaterial.map = front;
      backMaterial.map = back;
      frontMaterial.needsUpdate = true;
      backMaterial.needsUpdate = true;
    });
  }, [Front, Back, mesh]);

  return mesh;
};
