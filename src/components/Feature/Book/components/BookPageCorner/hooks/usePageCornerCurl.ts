import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils } from 'three';
import { PAGE_CORNER_CURL_SPEED } from '../constants';

export const usePageCornerCurl = (isCurled: boolean) => {
  const progressRef = useRef(0);
  const targetRef = useRef(isCurled ? 1 : 0);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    targetRef.current = isCurled ? 1 : 0;
    invalidate();
  }, [invalidate, isCurled]);

  useFrame((_, delta) => {
    const target = targetRef.current;
    const current = progressRef.current;

    if (Math.abs(current - target) < 0.0008) {
      if (current !== target) {
        progressRef.current = target;
        invalidate();
      }
      return;
    }

    progressRef.current = MathUtils.damp(
      current,
      target,
      PAGE_CORNER_CURL_SPEED,
      delta
    );
    invalidate();
  });

  return progressRef;
};
