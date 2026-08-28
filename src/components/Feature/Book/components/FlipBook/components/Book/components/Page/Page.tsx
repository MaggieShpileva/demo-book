import type { FC } from 'react';
import { useEffect } from 'react';
import { createPortal } from '@react-three/fiber';
import { useCursor } from '@react-three/drei';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { cornerFoldAtom, coverDragOpenedAtom, pageAtom } from '../../../UI';
import { PageEdge } from '../PageEdge';
import { COVER_PAGE_DEPTH, PAGE_DEPTH, PAGE_SEGMENTS } from '../../constants';
import { usePageEdgeDrag } from '../../hooks/usePageEdgeDrag';
import { usePageTurn } from '../../hooks/usePageTurn';
import { useSkinnedPage } from '../../hooks/useSkinnedPage';
import type { PageProps } from '../../types';

const noRaycast = () => undefined;

export const Page: FC<PageProps> = ({
  number, Front, Back, page, sheetCount, opened, bookClosed, ...props
}) => {
  const [, setPage] = useAtom(pageAtom);
  const cornerFold = useAtomValue(cornerFoldAtom);
  const setCoverDragOpened = useSetAtom(coverDragOpenedAtom);
  const pageDepth = number === 0 ? COVER_PAGE_DEPTH : PAGE_DEPTH;
  const canFlip = number === page || number === page - 1;
  const edgeDrag = usePageEdgeDrag({
    enabled: canFlip,
    opened,
    pageNumber: number,
    onCommit: setPage,
  });
  const mesh = useSkinnedPage(Front, Back, pageDepth);
  const { sheetRef, groupRef, meshRef } = usePageTurn({
    opened,
    bookClosed,
    number,
    page,
    sheetCount,
    openedAmount: edgeDrag.openedAmount,
    cornerFold: number === page && !opened && cornerFold ? 1 : 0,
  });
  useCursor(
    canFlip && (edgeDrag.hovered || edgeDrag.isHolding),
    edgeDrag.isDragging ? 'grabbing' : 'grab'
  );

  useEffect(() => {
    if (number !== 0) {
      return;
    }

    setCoverDragOpened(edgeDrag.openedAmount);
    return () => setCoverDragOpened(null);
  }, [edgeDrag.openedAmount, number, setCoverDragOpened]);

  return (
    <group {...props} ref={sheetRef}>
      <group ref={groupRef}>
        <primitive object={mesh} ref={meshRef} raycast={noRaycast} />
        {canFlip
          ? createPortal(
              <PageEdge
                opened={opened}
                depth={pageDepth}
                onPointerDown={edgeDrag.onPointerDown}
                onHoverChange={edgeDrag.setHovered}
              />,
              mesh.skeleton.bones[PAGE_SEGMENTS]
            )
          : null}
      </group>
    </group>
  );
};
