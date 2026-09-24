import type { FC } from 'react';
import { Template02 } from '@components/Feature';
import { STAGE2 } from '@/data';

export const Page12: FC = () => {
  const product = STAGE2[1];

  if (!product) {
    return null;
  }

  return (
    <Template02
      itemId={product.itemId}
      name={product.name}
      brand={product.brand}
      description={product.description}
      images={product.images}
      purchaseUrl={product.purchaseUrl}
      attributes={product.attributes}
    />
  );
};
