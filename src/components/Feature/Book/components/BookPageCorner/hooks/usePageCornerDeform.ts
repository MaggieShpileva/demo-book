import { useEffect, useMemo, useRef, type RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import type { BufferAttribute, SkinnedMesh } from 'three';
import { deformPageCornerFlap } from '../utils/deformPageCornerFlap';
import { getPageCornerTipCache } from '../utils/pageCornerTipCache';
import { recomputePageCornerTipNormals } from '../utils/recomputePageCornerTipNormals';

const applyCornerProgress = (
  mesh: SkinnedMesh,
  rest: Float32Array,
  progress: number,
  tip: ReturnType<typeof getPageCornerTipCache>
) => {
  const position = mesh.geometry.getAttribute('position');
  const array = position.array as Float32Array;
  deformPageCornerFlap(rest, progress, array, tip);
  position.needsUpdate = true;
  recomputePageCornerTipNormals(mesh.geometry, tip);
};

/**
 * Curl tip verts only; skip work when settled flat; tip-local normals.
 * Restores rest pose on unmount so a curled tip does not stick after nav.
 */
export const usePageCornerDeform = (
  mesh: SkinnedMesh,
  progressRef: RefObject<number>
) => {
  const tip = useMemo(
    () => getPageCornerTipCache(mesh.geometry),
    [mesh.geometry]
  );

  const rest = useMemo(() => {
    const attribute = mesh.geometry.getAttribute('rest') as
      | BufferAttribute
      | undefined;
    if (attribute) {
      return attribute.array as Float32Array;
    }

    const position = mesh.geometry.getAttribute('position') as BufferAttribute;
    return new Float32Array(position.array as Float32Array);
  }, [mesh]);

  /** `null` = not applied yet — forces a flatten on first frame / remount. */
  const lastProgressRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      applyCornerProgress(mesh, rest, 0, tip);
    };
  }, [mesh, rest, tip]);

  useFrame(() => {
    const progress = progressRef.current ?? 0;
    const settledFlat = progress < 1e-5;
    const last = lastProgressRef.current;
    const wasFlat = last != null && last < 1e-5;

    if (settledFlat && wasFlat) {
      return;
    }

    applyCornerProgress(mesh, rest, progress, tip);
    lastProgressRef.current = progress;
  });
};
