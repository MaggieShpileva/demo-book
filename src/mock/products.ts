import WEBP_TEMPLATE01_BOTTLE from '@assets/images/template01/product-bottle.webp';
import WEBP_TEMPLATE01_DETAIL from '@assets/images/template01/product-detail.webp';
import WEBP_TEMPLATE01_HERO from '@assets/images/template01/product-hero.webp';
import WEBP_TEMPLATE02_BOTTLE from '@assets/images/template02/product-bottle.webp';
import WEBP_TEMPLATE03_BOTTLE from '@assets/images/template03/product-bottle.webp';
import WEBP_TEMPLATE04_BOTTLE from '@assets/images/template04/product-bottle.webp';
import WEBP_TEMPLATE04_DETAIL from '@assets/images/template04/product-detail.webp';
import WEBP_TEMPLATE04_HERO from '@assets/images/template04/product-hero.webp';
import WEBP_TEMPLATE05_DETAIL from '@assets/images/template05/product-detail.webp';
import WEBP_TEMPLATE06_BOTTLE from '@assets/images/template06/product-bottle.webp';
import WEBP_TEMPLATE07_BOTTLE from '@assets/images/template07/product-bottle.webp';
import WEBP_TEMPLATE07_DETAIL from '@assets/images/template07/product-detail.webp';
import WEBP_TEMPLATE08_BOTTLE from '@assets/images/template08/product-bottle.webp';
import WEBP_TEMPLATE09_DETAIL from '@assets/images/template09/product-detail.webp';
import WEBP_TEMPLATE10_BOTTLE from '@assets/images/template10/product-bottle.webp';
import type { Product } from '@/types/product';

const DEFAULT_ERA_ID = 2 as const;

const TEMPLATE01_DESCRIPTION = [
  'Сыворотка Double Serum нового поколения демонстрирует последние антивозрастные инновации и еще более высокую эффективность.*',
  'Ее уникальная двойная формула, состоящая на 95% из натуральных ингредиентов, сочетает в себе 22 мощных растительных экстракта, включая легендарный экстракт куркумы, с 5 новыми очищенными молекулами, стимулирующими 5 жизненно важных функций кожи.',
  'Эпигенетика — наука, которая лежит в основе уникальной технологии защиты от эпистарения Epi-Aging Defence. Она направлена на борьбу с возрастными изменениями, вызванными образом жизни. Благодаря экстракту арундо тростникового в составе сыворотка повышает сопротивляемость кожи к воздействию внешних факторов, предотвращая появление признаков старения',
];

const TEMPLATE02_DESCRIPTION = [
  'Сыворотка Double Serum нового поколения демонстрирует последние антивозрастные инновации и еще более высокую эффективность.*',
  'Ее уникальная двойная формула, состоящая на 95% из натуральных ингредиентов, сочетает в себе 22 мощных растительных экстракта, включая легендарный экстракт куркумы, с 5 новыми очищенными молекулами, стимулирующими 5 жизненно важных функций кожи.',
  'Эпигенетика — наука, которая лежит в основе уникальной технологии защиты от эпистарения Epi-Aging Defence. Она направлена на борьбу с возрастными изменениями, вызванными образом жизни. Благодаря экстракту арундо тростникового в составе сыворотка повышает сопротивляемость кожи к воздействию внешних факторов, предотвращая появление признаков старения.',
];

const TEMPLATE03_DESCRIPTION = [
  'Новый флакон на 94%** состоит из материалов, пригодных для вторичной переработки.*** Его две части содержат разные фазы формулы [водная + липидная фаза], чтобы сохранить целостность и свойства различных активных компонентов.',
];

const TEMPLATE04_DESCRIPTION = [
  'Сыворотка Double Serum нового поколения демонстрирует последние антивозрастные инновации и еще более высокую эффективность.',
  'Ее уникальная двойная формула, состоящая на 95% из натуральных ингредиентов, сочетает в себе 22 мощных растительных экстракта, включая легендарный экстракт куркумы, с 5 новыми очищенными молекулами, стимулирующими 5 жизненно важных функций кожи.',
  'Эпигенетика — наука, которая лежит в основе уникальной технологии защиты от эпистарения Epi-Aging Defence.',
  'Она направлена на борьбу с возрастными изменениями, вызванными образом жизни.',
];

const TEMPLATE05_COLUMN_40ML =
  'Солнцезащитный легкий флюид с высоким фактором защиты SPF 50+ PA++++ обеспечивает длительную защиту от UVA и UVB-лучей, предотвращает преждевременное старение, появление морщин, пигментации и разрушение коллагена в клетках кожи.';

const TEMPLATE05_COLUMN_SPF =
  'Обогащенная фирменной водорослью Elemis Падиной Павоникой, формула эффективно увлажняет кожу, оставляя цвет лица свежим и со здоровым сиянием.';

const TEMPLATE05_COLUMN_QUALITY =
  'Инновационная формула насыщена активными компонентами из стволовых клеток литопса';

const TEMPLATE05_DESCRIPTION = [
  TEMPLATE05_COLUMN_40ML,
  TEMPLATE05_COLUMN_SPF,
  TEMPLATE05_COLUMN_QUALITY,
];

const TEMPLATE06_INTRO =
  'Солнцезащитный легкий флюид с высоким фактором защиты SPF 50+ PA++++ обеспечивает длительную защиту от UVA и UVB-лучей, предотвращает преждевременное старение, появление морщин, пигментации и разрушение коллагена в клетках кожи.';

const TEMPLATE06_BENEFITS = [
  'Преимущества:',
  '- Защита от солнца широкого спектра действия.',
  '- Увлажнение и защита кожи.',
  '- Некомедогенен и подходит для людей, склонных к акне.',
  '- Легкий, нежирный, быстро впитывается .',
  '- Прекрасно наносится поверх увлажняющего крема, не скатываясь.',
  '- Увлажняет кожу, идеально подходит под макияж.',
  '- Не оставляет белого налета, прекрасно сочетается со всеми тонами кожи.',
].join('\n');

const TEMPLATE06_DESCRIPTION = [TEMPLATE06_INTRO, TEMPLATE06_BENEFITS];

const TEMPLATE07_DESCRIPTION = [
  'Солнцезащитный легкий флюид с высоким фактором защиты SPF 50+ PA++++ обеспечивает длительную защиту от UVA и UVB-лучей, предотвращает преждевременное старение, появление морщин, пигментации и разрушение коллагена в клетках кожи.',
];

const TEMPLATE08_DESCRIPTION = [
  'Солнцезащитный легкий флюид с высоким фактором защиты SPF 50+ PA++++ обеспечивает длительную защиту от UVA и UVB-лучей, предотвращает преждевременное старение, появление морщин, пигментации и разрушение коллагена в клетках кожи. Обогащенная фирменной водорослью Elemis Падиной Павоникой, формула эффективно увлажняет кожу, оставляя цвет лица свежим и со здоровым сиянием.',
];

const TEMPLATE09_DESCRIPTION = [
  'Солнцезащитный легкий флюид с высоким фактором защиты SPF 50+ PA++++ обеспечивает длительную защиту от UVA и UVB-лучей, предотвращает преждевременное старение, появление морщин, пигментации и разрушение коллагена в клетках кожи.',
  'Обогащенная фирменной водорослью Elemis Падиной Павоникой, формула эффективно увлажняет кожу, оставляя цвет лица свежим и со здоровым сиянием.',
];

const TEMPLATE10_COLUMN_SPF =
  'Солнцезащитный легкий флюид с высоким фактором защиты SPF 50+ PA++++ обеспечивает длительную защиту от UVA и UVB-лучей, предотвращает преждевременное старение, появление морщин, пигментации и разрушение коллагена в клетках кожи.';

const TEMPLATE10_COLUMN_ELEMIS =
  'Обогащенная фирменной водорослью Elemis Падиной Павоникой, формула эффективно увлажняет кожу, оставляя цвет лица свежим и со здоровым сиянием.';

const TEMPLATE10_COLUMN_LITHOPS =
  'Инновационная формула насыщена активными компонентами из стволовых клеток литопса';

const TEMPLATE10_DESCRIPTION = [
  TEMPLATE10_COLUMN_SPF,
  TEMPLATE10_COLUMN_ELEMIS,
  TEMPLATE10_COLUMN_LITHOPS,
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    templateId: 1,
    eraId: DEFAULT_ERA_ID,
    itemId: '19000327179',
    name: 'Сыворотка Double Serum',
    brand: 'Clarins',
    description: TEMPLATE01_DESCRIPTION,
    images: [
      WEBP_TEMPLATE01_BOTTLE,
      WEBP_TEMPLATE01_HERO,
      WEBP_TEMPLATE01_DETAIL,
    ],
    purchaseUrl: 'https://goldapple.ru/19000327179-hydric-lipidic-system',
    attributes: [
      { key: 'тип продукта', value: 'сыворотка для лица' },
      { key: 'для кого', value: 'для женщин' },
    ],
    points: [
      { top: 35, left: 23, factId: 1 },
      { top: 69, left: 7, factId: 1 },
    ],
  },
  {
    id: 2,
    templateId: 2,
    eraId: DEFAULT_ERA_ID,
    itemId: '19000383497',
    name: 'Сыворотка Double Serum',
    brand: 'Clarins',
    description: TEMPLATE02_DESCRIPTION,
    images: [WEBP_TEMPLATE02_BOTTLE],
    purchaseUrl: 'https://goldapple.ru/19000383497',
    attributes: [
      {
        key: 'назначение',
        value:
          'Защита от солнца, увлажнение, против признаков старения, против пигментных пятен, выравнивание тона',
      },
    ],
  },
  {
    id: 3,
    templateId: 3,
    eraId: DEFAULT_ERA_ID,
    itemId: '26291300005',
    name: 'ЗАГОЛОВОК',
    brand: 'Clarins',
    description: TEMPLATE03_DESCRIPTION,
    images: [WEBP_TEMPLATE03_BOTTLE],
    purchaseUrl: 'https://goldapple.ru/',
    attributes: [{ key: 'guarantee', value: 'Гарантия качества продукции' }],
  },
  {
    id: 4,
    templateId: 4,
    eraId: DEFAULT_ERA_ID,
    itemId: '26291300005',
    name: 'Заголовок',
    brand: 'Clarins',
    description: TEMPLATE04_DESCRIPTION,
    images: [
      WEBP_TEMPLATE04_BOTTLE,
      WEBP_TEMPLATE04_HERO,
      WEBP_TEMPLATE04_DETAIL,
    ],
    purchaseUrl: 'https://goldapple.ru/',
    attributes: [{ key: 'overlay', value: 'Тексттекст' }],
  },
  {
    id: 5,
    templateId: 5,
    eraId: DEFAULT_ERA_ID,
    itemId: '26291300005',
    name: 'Заголовок',
    brand: 'Clarins',
    description: TEMPLATE05_DESCRIPTION,
    images: [WEBP_TEMPLATE05_DETAIL],
    purchaseUrl: 'https://goldapple.ru/',
    attributes: [
      { key: 'skinType', value: 'для всех типов кожи' },
      { key: '40 мл', value: TEMPLATE05_COLUMN_40ML },
      { key: 'spf 50+', value: TEMPLATE05_COLUMN_SPF },
      { key: 'КАЧЕСТВО', value: TEMPLATE05_COLUMN_QUALITY },
    ],
  },
  {
    id: 6,
    templateId: 6,
    eraId: DEFAULT_ERA_ID,
    itemId: '26291300005',
    name: 'Заголовок',
    brand: 'Clarins',
    description: TEMPLATE06_DESCRIPTION,
    images: [WEBP_TEMPLATE06_BOTTLE],
    purchaseUrl: 'https://goldapple.ru/',
    attributes: [],
  },
  {
    id: 7,
    templateId: 7,
    eraId: DEFAULT_ERA_ID,
    itemId: '26291300005',
    name: 'Заголовок',
    brand: 'Clarins',
    description: TEMPLATE07_DESCRIPTION,
    images: [WEBP_TEMPLATE07_BOTTLE, WEBP_TEMPLATE07_DETAIL],
    purchaseUrl: 'https://goldapple.ru/',
    attributes: [{ key: 'spf', value: 'spf 50+' }],
  },
  {
    id: 8,
    templateId: 8,
    eraId: DEFAULT_ERA_ID,
    itemId: '26291300005',
    name: 'Заголовок',
    brand: 'Clarins',
    description: TEMPLATE08_DESCRIPTION,
    images: [WEBP_TEMPLATE08_BOTTLE],
    purchaseUrl: 'https://goldapple.ru/',
    attributes: [
      { key: 'универсально', value: 'универсально' },
      { key: '40 мл', value: '40 мл' },
      { key: 'spf 50+', value: 'spf 50+' },
      { key: 'для всех типов кожи', value: 'для всех типов кожи' },
      { key: 'лицо, шея и декольте', value: 'лицо, шея и декольте' },
    ],
  },
  {
    id: 9,
    templateId: 9,
    eraId: DEFAULT_ERA_ID,
    itemId: '26291300005',
    name: 'Заголовок',
    brand: 'Clarins',
    description: TEMPLATE09_DESCRIPTION,
    images: [WEBP_TEMPLATE09_DETAIL],
    purchaseUrl: 'https://goldapple.ru/',
    attributes: [],
  },
  {
    id: 10,
    templateId: 10,
    eraId: DEFAULT_ERA_ID,
    itemId: '26291300005',
    name: 'Заголовок',
    brand: 'Clarins',
    description: TEMPLATE10_DESCRIPTION,
    images: [WEBP_TEMPLATE10_BOTTLE],
    purchaseUrl: 'https://goldapple.ru/',
    attributes: [
      { key: 'универсально', value: 'универсально' },
      { key: '40 мл', value: '40 мл' },
      { key: 'spf 50+', value: 'spf 50+' },
      { key: 'для всех типов кожи', value: 'для всех типов кожи' },
      { key: 'лицо, шея и декольте', value: 'лицо, шея и декольте' },
    ],
  },
];

export const getProductById = (id: number): Product | undefined =>
  PRODUCTS.find((product) => product.id === id);

export const getProductByTemplateId = (
  templateId: number
): Product | undefined =>
  PRODUCTS.find((product) => product.templateId === templateId);
