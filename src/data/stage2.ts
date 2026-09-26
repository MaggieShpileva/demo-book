import WEBP_PAGE11 from '@assets/images/stage2/page11.webp';
import WEBP_PAGE12 from '@assets/images/stage2/page12.webp';
import WEBP_PAGE13_PORTRAIT from '@assets/images/stage2/page13-portrait.webp';
import WEBP_PAGE13_PRODUCT from '@assets/images/stage2/page13-product.webp';
import WEBP_PAGE14_CAMERA from '@assets/images/stage2/page14-camera.webp';
import WEBP_PAGE14_COMPACT from '@assets/images/stage2/page14-compact.webp';
import WEBP_PAGE14_STRAP from '@assets/images/stage2/page14-strap.webp';
import WEBP_PAGE15 from '@assets/images/stage2/page15.webp';
import WEBP_PAGE15_FOAM from '@assets/images/stage2/page15-foam.webp';
import WEBP_PAGE15_FACE from '@assets/images/stage2/page15-face.webp';
import WEBP_PAGE16_PRODUCT from '@assets/images/stage2/page16-product.webp';
import WEBP_PAGE17_PORTRAIT from '@assets/images/stage2/page17-portrait.webp';
import WEBP_PAGE17_PRODUCT from '@assets/images/stage2/page17-product.webp';
import WEBP_PAGE18_PORTRAIT from '@assets/images/stage2/page18-portrait.webp';
import WEBP_PAGE18_MODEL from '@assets/images/stage2/page18-model.webp';
import WEBP_PAGE18_PRODUCT from '@assets/images/stage2/page18-product.webp';
import WEBP_PAGE19 from '@assets/images/stage2/page19.webp';
import WEBP_PAGE20 from '@assets/images/stage2/page20.webp';

import type { Point } from '@/data/pages';

export type Stage2Page = {
  id: number;
  title: string;
  description: string | string[];
  highlight: string;
  image: string;
  name: string;
  extraImage?: string;
  extraHighlight?: string;
  extraDescription?: string;
  detailImage?: string;
  watermark?: string;
  caption?: string;
  sideLabel?: string;
  points?: Point[];
};

export const STAGE2: Stage2Page[] = [
  {
    id: 1,
    title: 'ICON SKIN\nretin-all',
    name: 'крем-актив',
    description: [
      'Крем-актив Icon Skin вызвал ажиотаж у аудитории и получил премию в номинации «Лучший запуск года». Он мелькает у блогеров как топ-средство с ретиноидами.',
      'А вы знали, что фундамент этого компонента заложили в 1990-х? И через год появилось предприятие с одноимённым названием.',
    ],
    highlight:
      'Ретиноиды омолаживают и борются с несовершенствами. Настоящий эликсир для кожи!',
    image: WEBP_PAGE11,
    points: [{ top: 29.7, left: 28, factId: 1 }],
  },
  {
    id: 2,
    title: 'SESDERMA\nc-vit 5',
    name: 'сыворотка\nлипосомальная',
    description:
      'Липосомальная сыворотка C–Vit 5 содержит гиалуроновую кислоту и касторовое масло. Роскошное сияние, антиэйдж-эффект, очищение пор — все про неё. Благодаря особой технологии компоненты помещаются в липосомы и быстрее проникают в глубокие слои кожи.',
    highlight:
      'Основатель Sesderma Габриэль Серрано родился в семье врачей и в 90-х начал выпускать дерматокосметику.',
    image: WEBP_PAGE12,
    points: [{ top: 38.6, left: 86.2, factId: 1 }],
  },
  {
    id: 3,
    title: 'MIXIT\nVitamin C',
    name: 'энзимная пудра для лица',
    highlight: 'В нулевые были скрабы с крупными частицами',
    description:
      'Тогда даже Скарлетт Йоханссон сожгла себе кожу пилингами с полиролями. Девушки терли лицо ради «сияния».',
    extraHighlight: 'Сегодня альтернатива — энзимная пудра\nMixit Vitamin C',
    extraDescription:
      'Она обновляет кожу без стресса. Ферменты папайи и ананаса уменьшают жирность, осветляют чёрные точки и помогают в борьбе с постакне.',
    watermark: 'ферменты папайи и ананаса',
    image: WEBP_PAGE13_PORTRAIT,
    extraImage: WEBP_PAGE13_PRODUCT,
    points: [{ top: 71.1, left: 79.4, factId: 1 }],
  },
  {
    id: 4,
    title: 'Catrice\nSun Lover Glow',
    name: 'бронзер для лица',
    description:
      'Нулевые — это «ледяной» макияж с голубыми тенями, суперматовые пудры и бронзеры для загара круглый год!',
    highlight: 'Последние обожала Дженнифер Лопес.',
    extraDescription:
      'Запечённая пудра-бронзер с сиянием Catrice создаёт красивый карамельный оттенок на коже, будто вы только вернулись из отпуска.',
    watermark: 'доступная роскошь',
    image: WEBP_PAGE14_CAMERA,
    extraImage: WEBP_PAGE14_COMPACT,
    detailImage: WEBP_PAGE14_STRAP,
    points: [{ top: 32.7, left: 50.9, factId: 1 }],
  },
  {
    id: 5,
    title: 'Eau Thermale Avène\nMousse Nettoyante',
    name: 'очищающая пенка',
    description: [
      'Пенка Avène снимает макияж, удаляет загрязнения и уменьшает выработку себума. Термальная вода в составе поддерживает увлажнение кожи.',
      'В 90-е же было кусковое мыло. Оно сушило и не всегда справлялось с задачей. Женщины красились на 2–3 дня: и экономия, и не нужно терпеть мыльные процедуры. От этого высыпания умножались. Бррр!',
    ],
    highlight: '',
    image: WEBP_PAGE15,
    extraImage: WEBP_PAGE15_FOAM,
    detailImage: WEBP_PAGE15_FACE,
    watermark: 'термальная вода',
    sideLabel: 'снятие макияжа',
    caption: 'очищение',
    points: [{ top: 12.5, left: 78.2, factId: 1 }],
  },
  {
    id: 6,
    title: 'Erborian\nRed Correct',
    name: 'корректирующий\nСС-крем\nдля лица',
    description:
      'Erborian прямиком из 2007-го. Он стоял у истоков расцвета гибридной косметики — макияж + уход. До этого женщины скрывали недостатки плотным тоном, а вечером лечили кожу от последствий макияжа.',
    highlight:
      'CC-крем Red Correct делает кожу «фарфоровой».\nЗеленые пигменты подстраиваются под тон и скрывают покраснения, а пантенол и центелла успокаивают.',
    image: WEBP_PAGE16_PRODUCT,
    points: [{ top: 60.3, left: 56.1, factId: 1 }],
  },
  {
    id: 7,
    title: 'Vivienne Sabó\nCabaret Premiere',
    name: 'тушь\nдля ресниц',
    highlight:
      'Уникальная щёточка прокрашивает ресницы от самых корней и наслаивается без комочков.',
    description:
      'Культ Наоми Кэмпбелл и Кейт Мосс заставил миллионы девушек мечтать о том самом выразительном взгляде моделей. Это легло в основу туши Cabaret Premiere. Название отсылает к французскому варьете, где взгляд артистки виден с задних рядов.',
    image: WEBP_PAGE17_PORTRAIT,
    extraImage: WEBP_PAGE17_PRODUCT,
    points: [{ top: 20.1, left: 76.1, factId: 1 }],
  },
  {
    id: 8,
    title: 'Bourjois\nLittle Round Pot',
    name: 'румяна\nдля лица',
    highlight:
      'Запечённая текстура продуктов в тренде — а придумал её Bourjois. Его румяна легко наносятся, наслаиваются и пахнут нежной розой.',
    description:
      'Нулевые захлестнула волна глянца и «блестящий» стиль Пэрис Хилтон. Макияж должен был кричать о роскоши, а лицо — сиять. Румяна Bourjois были в своём прайме: кожа мерцала на всех ковровых дорожках.',
    image: WEBP_PAGE18_PORTRAIT,
    extraImage: WEBP_PAGE18_MODEL,
    detailImage: WEBP_PAGE18_PRODUCT,
    points: [{ top: 68.4, left: 80.2, factId: 1 }],
  },
  {
    id: 9,
    title: 'COSRX\nThe Niacinamide 15 Serum',
    name: 'сыворотка для лица',
    description: [
      'Сыворотка The Niacinamide 15 борется с воспалениями, избыточной выработкой себума и постакне благодаря ниацинамиду в составе.',
      'Рецепт его успеха был написан дерматологами в 1990-х. Тогда впервые доказали эффективность его применения на лице, а не внутрь — до этого им лечили смертельно опасную болезнь, вызванную дефицитом В3.',
    ],
    highlight: '',
    image: WEBP_PAGE19,
    watermark: 'лечение акне',
    points: [{ top: 26.3, left: 67, factId: 1 }],
  },
  {
    id: 10,
    title: 'SHIKstudio\nVelvet Cover',
    name: 'тональный крем\nдля лица',
    description:
      'Velvet Cover скрывает несовершенства и создаёт естественное покрытие. В составе корень полигонума и листья зеленого чая. Ухаживает и создаёт естественный тон!',
    highlight:
      'В нулевые же процветала эпоха «шпаклёвки». Кристина Агилера и Бритни Спирс выходили на ковровые дорожки с лицами-масками. Технологи использовали большой процент грубого пудрового пигмента.',
    image: WEBP_PAGE20,
    points: [{ top: 64.9, left: 53.3, factId: 1 }],
  },
];
