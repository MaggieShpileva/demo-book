import type { FC } from 'react';
import { Template04 } from '@components/Feature';
import { STAGE2 } from '@/data';

export const Page14: FC = () => {
  const product = STAGE2[4];

  if (!product) {
    return null;
  }

  return (
    <Template04
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
