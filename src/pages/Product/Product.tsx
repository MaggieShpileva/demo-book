import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { templateRegistry } from '@components/Feature';
import { getProductById } from '@/mock';

export const Product: FC = () => {
  const { id } = useParams();
  const product = getProductById(Number(id));

  if (!product) {
    return <p>Product not found</p>;
  }

  const Template = templateRegistry[product.templateId];

  if (!Template) {
    return <p>Product not found</p>;
  }

  return (
    <Template
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
