import type { FC } from 'react';
import type { ProductProps, TemplateId } from '@/types/product';
import { Template02 } from './Template02';
import { Template03 } from './Template03';
import { Template04 } from './Template04';
import { Template05 } from './Template05';
import { Template06 } from './Template06';
import { Template07 } from './Template07';
import { Template08 } from './Template08';
import { Template09 } from './Template09';
import { Template10 } from './Template10';

export const templateRegistry: Partial<Record<TemplateId, FC<ProductProps>>> = {
  2: Template02,
  3: Template03,
  4: Template04,
  5: Template05,
  6: Template06,
  7: Template07,
  8: Template08,
  9: Template09,
  10: Template10,
};
