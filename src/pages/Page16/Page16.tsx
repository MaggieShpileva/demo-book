import type { FC } from 'react';
import { Template06 } from '@components/Feature';
import { STAGE2 } from '@/data';

export const Page16: FC = () => {
  const product = STAGE2[6];

  if (!product) {
    return null;
  }

  return (
    <Template06
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
