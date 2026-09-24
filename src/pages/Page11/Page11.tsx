import type { FC } from 'react';
import { Template01 } from '@components/Feature';
import { STAGE2 } from '@/data';

export const Page11: FC = () => {
  const product = STAGE2[0];

  if (!product) {
    return null;
  }

  return (
    <Template01
      itemId={product.itemId}
      name={product.name}
      brand={product.brand}
      description={product.description}
      images={product.images}
      purchaseUrl={product.purchaseUrl}
      attributes={product.attributes}
      pageNumber="11"
      imageSrc={product.images[0]}
      content={
        product.attributes.find((item) => item.key === 'тип продукта')?.value
      }
    />
  );
};
