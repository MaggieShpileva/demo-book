import type { FC, ReactNode } from 'react';
import { Html } from '@react-three/drei';
import {
  PAGE_HTML_DISTANCE_FACTOR,
  PAGE_HTML_HEIGHT_PX,
  PAGE_HTML_WIDTH_PX,
} from '../../constants';
import { getPageHtmlPosition } from '../../utils/getPageHtmlPosition';

type BookHtmlFaceProps = {
  side: 'front' | 'back';
  children: ReactNode;
};

export const BookHtmlFace: FC<BookHtmlFaceProps> = ({ side, children }) => (
  <Html
    transform
    pointerEvents="none"
    distanceFactor={PAGE_HTML_DISTANCE_FACTOR}
    position={getPageHtmlPosition(side)}
    rotation={side === 'back' ? [0, Math.PI, 0] : [0, 0, 0]}
    style={{
      width: PAGE_HTML_WIDTH_PX,
      height: PAGE_HTML_HEIGHT_PX,
    }}
  >
    {children}
  </Html>
);
