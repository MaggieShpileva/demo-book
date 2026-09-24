import type { FC } from 'react';
import { Template09 } from '@components/Feature';
import { STAGE2 } from '@/data';

export const Page19: FC = () => {
  const product = STAGE2[9];

  if (!product) {
    return null;
  }

  return (
    <Template09
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
