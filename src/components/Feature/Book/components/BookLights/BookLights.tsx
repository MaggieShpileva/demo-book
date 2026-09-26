import type { FC } from 'react';

/**
 * Bright fill + soft key light so pages stay readable,
 * while the curled tip still gets a visible shadow.
 */
export const BookLights: FC = () => (
  <>
    <ambientLight intensity={0.5} />
    <hemisphereLight args={['#ffffff', '#ececec', 0.4]} position={[0, 2, 0]} />
    <directionalLight
      castShadow
      intensity={0.5}
      position={[2, 1.8, 8]}
      shadow-mapSize={[2048, 2048]}
      shadow-bias={-0.00015}
      shadow-normalBias={0.03}
      shadow-camera-near={0.5}
      shadow-camera-far={16}
      shadow-camera-left={-3.5}
      shadow-camera-right={3.5}
      shadow-camera-top={3.5}
      shadow-camera-bottom={-3.5}
    />
  </>
);
