import type { FC } from 'react';
import { Template01, getTemplate01Props } from '@components/Feature/Template01';
import { STAGE2 } from '@/data';

export const Page11: FC = () => {
  const product = STAGE2[0];

  if (!product) {
    return null;
  }

  return <Template01 {...getTemplate01Props(product, '11')} />;
};
