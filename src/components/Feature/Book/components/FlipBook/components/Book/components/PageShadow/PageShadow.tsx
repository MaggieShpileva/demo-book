import type { FC } from 'react';
import { PAGE_HEIGHT, PAGE_WIDTH_STEP } from '../../constants';
import { getPageWorldWidth } from '../../utils/getPageWidthScale';

type PageShadowProps = {
  pageIndex: number;
  currentPage: number;
  sheetCount: number;
  positionZ: number;
};

export const PageShadow: FC<PageShadowProps> = ({
  pageIndex,
  currentPage,
  sheetCount,
  positionZ,
}) => {
  if (pageIndex <= 0) {
    return null;
  }

  const width = getPageWorldWidth(pageIndex, currentPage, sheetCount);

  return (
    <group position-z={positionZ}>
      <mesh position={[width / 2, 0, 0.0012]} renderOrder={-1}>
        <planeGeometry args={[width, PAGE_HEIGHT]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.2}
          depthWrite={false}
        />
      </mesh>
      <mesh
        position={[width - PAGE_WIDTH_STEP / 2, 0, 0.0018]}
        renderOrder={-1}
      >
        <planeGeometry args={[PAGE_WIDTH_STEP, PAGE_HEIGHT]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
