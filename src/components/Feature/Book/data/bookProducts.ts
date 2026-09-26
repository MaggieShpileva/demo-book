import WEBP_PRODUCT_BOTTLE_01 from '@assets/images/template01/product-bottle.webp';
import WEBP_PRODUCT_BOTTLE_06 from '@assets/images/template06/product-bottle.webp';
import WEBP_PRODUCT_BOTTLE_07 from '@assets/images/template07/product-bottle.webp';

export type BookProduct = {
  id: string;
  /** Texture image for the product plane. */
  image: string;
  /** Plane width in scene units. */
  width: number;
  /** Plane height in scene units. */
  height: number;
  /** Start position for the rise animation. */
  start: readonly [number, number, number];
  /** End position after the product rises on present. */
  end: readonly [number, number, number];
  /**
   * Vertical levitation range around `end.y` after arrival (±value).
   * Set `0` to disable.
   */
  levitate: number;
};

/**
 * Products that rise after present.
 * Paint order (not Z): above page 1, under cover — `BOOK_PRODUCT_RENDER_ORDER`.
 */
export const BOOK_PRODUCTS: readonly BookProduct[] = [
  {
    id: 'template01',
    image: WEBP_PRODUCT_BOTTLE_01,
    width: 0.28,
    height: 0.7,
    start: [-0.2, -0.65, -3.1],
    end: [-0.35, 0.35, -2.7],
    levitate: 0.1,
  },
  {
    id: 'template06',
    image: WEBP_PRODUCT_BOTTLE_06,
    width: 0.34,
    height: 0.7,
    start: [0.2, -0.65, -2.9],
    end: [0.2, 0.85, -2.5],
    levitate: 0.06,
  },
  {
    id: 'template07',
    image: WEBP_PRODUCT_BOTTLE_07,
    width: 0.22,
    height: 0.7,
    start: [0.7, -0.7, -2.9],
    end: [1.1, 0.7, -1.9],
    levitate: 0.035,
  },
  {
    id: 'template06',
    image: WEBP_PRODUCT_BOTTLE_06,
    width: 0.34,
    height: 0.7,
    start: [0.4, -0.76, -2.9],
    end: [0.65, 0.9, -1.7],
    levitate: 0.03,
  },
  {
    id: 'template07',
    image: WEBP_PRODUCT_BOTTLE_07,
    width: 0.22,
    height: 0.7,
    start: [0.6, -0.7, -2.9],
    end: [0.6, 0.35, -2.9],
    levitate: 0.02,
  },
] as const;
