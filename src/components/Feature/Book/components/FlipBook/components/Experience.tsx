import type { FC } from 'react';
import { ContactShadows } from '@react-three/drei';
import { Book } from './Book';
import { PAGE_WIDTH } from './Book/constants';
import { useFitBookCamera } from '../hooks/useFitBookCamera';

const BOOK_ROTATION: [number, number, number] = [-Math.PI / 9, Math.PI, 0];

type ExperienceProps = {
  singlePage?: boolean;
};

export const Experience: FC<ExperienceProps> = ({ singlePage = false }) => {
  useFitBookCamera(singlePage);

  return (
    <>
      <group
        position={singlePage ? [-PAGE_WIDTH / 2, 0, 0] : [0, 0, 0]}
        rotation={BOOK_ROTATION}
      >
        <Book singlePage={singlePage} />
      </group>
      <directionalLight
        position={[1, 3, 2]}
        intensity={0.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      <pointLight position={[1, 0, 10]} decay={0.0001} intensity={2} />
      <ContactShadows
        position={singlePage ? [-PAGE_WIDTH / 2, -0.86, 0] : [0, -0.86, 0]}
        opacity={0.5}
        scale={4}
        blur={1.4}
        far={2}
      />
    </>
  );
};
