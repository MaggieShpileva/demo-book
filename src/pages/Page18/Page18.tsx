import type { FC } from 'react';
import { Template08 } from '@components/Feature';
import { STAGE2 } from '@/data';

export const Page18: FC = () => {
  const product = STAGE2[8];

  if (!product) {
    return null;
  }

  return (
    <Template08
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
