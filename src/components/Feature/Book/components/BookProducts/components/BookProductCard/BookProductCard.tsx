import { useRef, type FC } from 'react';
import { useTexture } from '@react-three/drei';
import type { Mesh } from 'three';
import { BOOK_PRODUCT_RENDER_ORDER } from '@components/Feature/Book/constants';
import type { BookProduct } from '@components/Feature/Book/data/bookProducts';
import { useBookProductPose } from '@components/Feature/Book/hooks/useBookProductPose';

type BookProductCardProps = {
  product: BookProduct;
};

export const BookProductCard: FC<BookProductCardProps> = ({ product }) => {
  const meshRef = useRef<Mesh>(null);
  const texture = useTexture(product.image);

  useBookProductPose(meshRef, product);

  return (
    <mesh
      ref={meshRef}
      position={[...product.start]}
      renderOrder={BOOK_PRODUCT_RENDER_ORDER}
      visible={false}
    >
      <planeGeometry args={[product.width, product.height]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} />
    </mesh>
  );
};
