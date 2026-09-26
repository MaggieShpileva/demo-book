import type { FC } from 'react';
import type { SkinnedMesh } from 'three';
import { BookPageCornerShadow } from './components/BookPageCornerShadow';
import { usePageCornerCurl } from './hooks/usePageCornerCurl';
import { usePageCornerDeform } from './hooks/usePageCornerDeform';

type BookPageCornerProps = {
  mesh: SkinnedMesh;
  isCurled: boolean;
};

/** Tip curl on the page mesh; contact shadow only. */
export const BookPageCorner: FC<BookPageCornerProps> = ({
  mesh,
  isCurled,
}) => {
  const progressRef = usePageCornerCurl(isCurled);
  usePageCornerDeform(mesh, progressRef);

  return (
    <BookPageCornerShadow
      progressRef={progressRef}
      renderOrder={mesh.renderOrder + 1}
    />
  );
};
