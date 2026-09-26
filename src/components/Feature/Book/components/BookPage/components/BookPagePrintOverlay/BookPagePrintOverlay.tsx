import { useEffect, useMemo, type FC } from 'react';
import type { SkinnedMesh } from 'three';
import { SkinnedMesh as ThreeSkinnedMesh } from 'three';
import type { BookPageOverlayRaster } from '@components/Feature/Book/utils/bookPageOverlay';
import { createPageOverlayGeometry } from '@components/Feature/Book/utils/createPageOverlayGeometry';
import { createPageOverlayMaterial } from '@components/Feature/Book/utils/pageMaterials';

type BookPagePrintOverlayProps = {
  pageMesh: SkinnedMesh;
  overlay: BookPageOverlayRaster | null;
  renderOrder: number;
};

/** Transparent print overflow skinned with the page sheet. */
export const BookPagePrintOverlay: FC<BookPagePrintOverlayProps> = ({
  pageMesh,
  overlay,
  renderOrder,
}) => {
  const mesh = useMemo(() => {
    if (overlay == null) {
      return null;
    }

    const geometry = createPageOverlayGeometry(overlay.padding);
    const material = createPageOverlayMaterial(overlay.texture);
    const next = new ThreeSkinnedMesh(geometry, material);
    next.frustumCulled = false;
    next.castShadow = false;
    next.receiveShadow = false;
    next.bind(pageMesh.skeleton);
    return next;
  }, [overlay, pageMesh.skeleton]);

  useEffect(() => {
    return () => {
      if (!mesh) {
        return;
      }
      mesh.geometry.dispose();
      const { material } = mesh;
      if (Array.isArray(material)) {
        material.forEach((item) => item.dispose());
      } else {
        material.dispose();
      }
    };
  }, [mesh]);

  if (!mesh) {
    return null;
  }

  mesh.renderOrder = renderOrder;

  return <primitive object={mesh} />;
};
