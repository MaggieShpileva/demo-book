export type EraId = 1 | 2 | 3;

export type TemplateId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type ProductAttribute = {
  key: string;
  value: string;
};

export type ProductProps = {
  itemId: string;
  name: string;
  brand: string;
  description: string[];
  images: string[];
  purchaseUrl: string;
  attributes: ProductAttribute[];
};

export type Product = ProductProps & {
  id: number;
  templateId: TemplateId;
  eraId: EraId;
  points?: Point[];
};

export type Point = {
  top: number;
  left: number;
  factId?: number;
};
