import type { Product } from '@/types/product';
import type { Template01Props } from '../Template01';
import { formatTemplate01PageNumber } from './formatTemplate01PageNumber';

const PRODUCT_TYPE_KEY = 'тип продукта';

export const getTemplate01Props = (
  product: Product,
  pageNumber?: string
): Template01Props => {
  const formatted = formatTemplate01PageNumber(
    pageNumber ?? String(product.id)
  );
  const productType = product.attributes.find(
    (item) => item.key === PRODUCT_TYPE_KEY
  )?.value;

  return {
    id: product.id,
    title: `${product.brand}\n${product.name}`,
    description: product.description,
    image: product.images[0] ?? '',
    sku: product.itemId,
    name: productType ?? product.name,
    pageNumber: formatted.index,
    label: formatted.label,
  };
};
