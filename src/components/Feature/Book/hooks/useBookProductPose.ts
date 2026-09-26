import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { MathUtils, MeshBasicMaterial, Vector3, type Mesh } from 'three';
import {
  BOOK_PRODUCT_LEVITATE_SPEED,
  BOOK_PRODUCTS_APPEAR_DELAY_MS,
  BOOK_PRODUCTS_FADE_MS,
} from '../bookIntroConstants';
import { BOOK_FRAME_DELTA_MAX, EASING_FACTOR } from '../constants';
import type { BookProduct } from '../data/bookProducts';
import { useBookStage } from '../components/BookStage';

/** Seconds to ease levitation amplitude from 0 → full. */
const LEVITATE_FADE_IN_S = 1.2;

const smoothstep01 = (value: number) => {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
};

export const useBookProductPose = (
  meshRef: RefObject<Mesh | null>,
  product: BookProduct
) => {
  const { stage, presentSettled, notifyProductsLevitating } = useBookStage();
  const ready = useRef(false);
  const appearAtMs = useRef<number | null>(null);
  const levitatePhase = useRef(0);
  const levitateStartedAt = useRef<number | null>(null);
  const fadeStartedAt = useRef<number | null>(null);
  /** World position at the moment fade begins (includes levitation offset). */
  const fadeFrom = useRef(new Vector3());
  /** Settles to `end` without levitation; mesh = logical + Y offset. */
  const logical = useRef(new Vector3());
  const endPoint = useRef(
    new Vector3(product.end[0], product.end[1], product.end[2])
  );

  useEffect(() => {
    endPoint.current.set(product.end[0], product.end[1], product.end[2]);
  }, [product.end]);

  useEffect(() => {
    if (!presentSettled) {
      appearAtMs.current = null;
      levitateStartedAt.current = null;
      fadeStartedAt.current = null;
    }
  }, [presentSettled]);

  useEffect(() => {
    if (stage !== 'reading') {
      fadeStartedAt.current = null;
    }
  }, [stage]);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (mesh == null) {
      return;
    }

    const material =
      mesh.material instanceof MeshBasicMaterial ? mesh.material : null;
    const dt = Math.min(delta, BOOK_FRAME_DELTA_MAX);
    const canAppear =
      (stage === 'presented' ||
        stage === 'exiting' ||
        stage === 'reading') &&
      presentSettled;
    const [startX, startY, startZ] = product.start;
    const end = endPoint.current;

    if (!canAppear) {
      appearAtMs.current = null;
      levitateStartedAt.current = null;
    } else if (appearAtMs.current == null) {
      appearAtMs.current = performance.now() + BOOK_PRODUCTS_APPEAR_DELAY_MS;
      state.invalidate();
    }

    const delayDone =
      appearAtMs.current != null && performance.now() >= appearAtMs.current;

    if (!ready.current) {
      logical.current.set(startX, startY, startZ);
      mesh.position.copy(logical.current);
      mesh.visible = false;
      if (material != null) {
        material.opacity = 1;
      }
      ready.current = true;
      return;
    }

    if (!canAppear) {
      logical.current.set(startX, startY, startZ);
      mesh.position.copy(logical.current);
      mesh.visible = false;
      if (material != null) {
        material.opacity = 1;
      }
      return;
    }

    if (!delayDone) {
      mesh.visible = false;
      state.invalidate();
      return;
    }

    if (stage === 'reading') {
      if (fadeStartedAt.current == null) {
        fadeStartedAt.current = performance.now();
        fadeFrom.current.copy(mesh.position);
      }

      const fadeLinear = Math.min(
        1,
        (performance.now() - fadeStartedAt.current) / BOOK_PRODUCTS_FADE_MS
      );
      const t = smoothstep01(fadeLinear);
      const opacity = 1 - t;

      mesh.position.set(
        MathUtils.lerp(fadeFrom.current.x, startX, t),
        MathUtils.lerp(fadeFrom.current.y, startY, t),
        MathUtils.lerp(fadeFrom.current.z, startZ, t)
      );
      logical.current.set(startX, startY, startZ);

      if (opacity <= 0.001) {
        mesh.visible = false;
        if (material != null) {
          material.opacity = 0;
        }
        return;
      }

      mesh.visible = true;
      if (material != null) {
        material.opacity = opacity;
      }
      state.invalidate();
      return;
    }

    mesh.visible = true;
    if (material != null) {
      material.opacity = 1;
    }

    easing.damp3(logical.current, end, EASING_FACTOR, dt);

    if (
      levitateStartedAt.current == null &&
      logical.current.distanceTo(end) < 0.04
    ) {
      levitateStartedAt.current = state.clock.elapsedTime;
      levitatePhase.current =
        -state.clock.elapsedTime * BOOK_PRODUCT_LEVITATE_SPEED;
      notifyProductsLevitating();
    }

    let yOffset = 0;
    if (levitateStartedAt.current != null && product.levitate > 0) {
      const fade = Math.min(
        1,
        (state.clock.elapsedTime - levitateStartedAt.current) /
          LEVITATE_FADE_IN_S
      );
      const ease = fade * fade * (3 - 2 * fade);
      yOffset =
        Math.sin(
          state.clock.elapsedTime * BOOK_PRODUCT_LEVITATE_SPEED +
            levitatePhase.current
        ) *
        product.levitate *
        ease;
    }

    mesh.position.set(
      logical.current.x,
      logical.current.y + yOffset,
      logical.current.z
    );
    state.invalidate();
  });
};
