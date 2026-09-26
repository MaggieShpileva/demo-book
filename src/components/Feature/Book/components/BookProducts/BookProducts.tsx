import type { FC } from 'react';
import { BOOK_PRODUCTS } from '../../data/bookProducts';
import { BookProductCard } from './components/BookProductCard';

export const BookProducts: FC = () => (
  <group>
    {BOOK_PRODUCTS.map((product, index) => (
      <BookProductCard key={`${product.id}-${index}`} product={product} />
    ))}
  </group>
);
