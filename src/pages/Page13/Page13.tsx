import type { FC } from 'react';
import { Template03 } from '@components/Feature';
import { STAGE2 } from '@/data';

export const Page13: FC = () => {
  const product = STAGE2[3];

  if (!product) {
    return null;
  }

  return (
    <Template03
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
