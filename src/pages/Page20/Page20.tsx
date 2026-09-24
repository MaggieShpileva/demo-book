import type { FC } from 'react';
import { Template10 } from '@components/Feature';
import { STAGE2 } from '@/data';

export const Page20: FC = () => {
  const product = STAGE2[9];

  if (!product) {
    return null;
  }

  return (
    <Template10
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
