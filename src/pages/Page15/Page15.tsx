import type { FC } from 'react';
import { Template05 } from '@components/Feature';
import { STAGE2 } from '@/data';

export const Page15: FC = () => {
  const product = STAGE2[5];

  if (!product) {
    return null;
  }

  return (
    <Template05
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
