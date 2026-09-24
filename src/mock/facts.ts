import WEBP_CHANEL_LIPSTICK from '@assets/images/fact/chanel-lipstick.webp';
import type { Fact } from '@/types/fact';

export const FACTS: Fact[] = [
  {
    id: 1,
    badge: 'Факт №1',
    title: 'Первая помада Chanel появилась в 1924 году.',
    lead: 'Дом Chanel выпустил свою первую коллекцию декоративной косметики, в которую вошли пудры и помады.',
    body: 'В том же году была создана компания Société des Parfums Chanel, предназначенная для производства и продажи парфюмерии и косметических средств. Это стало важным шагом в развитии Дома: Chanel перестал быть исключительно модным брендом и начал формировать целостный образ женщины — от одежды и аромата до макияжа.',
    image: WEBP_CHANEL_LIPSTICK,
    imageAlt: 'Помада Chanel в руке',
  },
];

export const getFactById = (id: number): Fact | undefined =>
  FACTS.find((fact) => fact.id === id);
