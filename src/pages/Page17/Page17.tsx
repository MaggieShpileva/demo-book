import type { FC } from 'react';
import { Template07 } from '@components/Feature';
import { STAGE2 } from '@/data';

export const Page17: FC = () => {
  const product = STAGE2[7];

  if (!product) {
    return null;
  }

  return (
    <Template07
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
