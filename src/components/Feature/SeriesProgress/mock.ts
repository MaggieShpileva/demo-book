import WEBP_PrizeChest from '@assets/images/series-progress/prize-chest.webp';
import WEBP_Chest from '@assets/images/series-progress/chest.webp';

export type DayStatus = 'open' | 'locked';

export type PrizeStatus = 'claimed' | 'locked' | 'open';

export type StreakDayItem = {
  id: string;
  type: 'day';
  day: number;
  status: DayStatus;
};

export type StreakPrizeItem = {
  id: string;
  type: 'prize';
  day: number;
  status: PrizeStatus;
  label: string;
  amount: string;
  image: string;
};

export type StreakItem = StreakDayItem | StreakPrizeItem;

export const SERIES_PROGRESS_COPY = {
  heading: 'Прогресс серии',
  description:
    'Победы и поражения в серии равнозначны, выбирай свое направление',
  skipsLabel: 'Доступно пропусков',
} as const;

export const SERIES_PROGRESS_META = {
  skipsAvailable: 1,
  current: 9,
  total: 20,
  focusId: 'prize-15',
} as const;

export const MOCK_STREAK_ITEMS: StreakItem[] = [
  { id: 'day-11', type: 'day', day: 11, status: 'open' },
  { id: 'day-12', type: 'day', day: 12, status: 'open' },
  { id: 'day-13', type: 'day', day: 13, status: 'open' },
  { id: 'day-14', type: 'day', day: 14, status: 'open' },
  {
    id: 'prize-15',
    type: 'prize',
    day: 15,
    status: 'claimed',
    label: 'НАГРАДА\nПОЛУЧЕНА',
    amount: '100 000 ₽',
    image: WEBP_PrizeChest,
  },
  { id: 'day-16', type: 'day', day: 16, status: 'open' },
  { id: 'day-17', type: 'day', day: 17, status: 'locked' },
  { id: 'day-18', type: 'day', day: 18, status: 'locked' },
  { id: 'day-19', type: 'day', day: 19, status: 'locked' },
  {
    id: 'prize-20',
    type: 'prize',
    day: 20,
    status: 'locked',
    label: 'ГЛАВНЫЙ ПРИЗ',
    amount: '10 000 000 ₽',
    image: WEBP_Chest,
  },
];
