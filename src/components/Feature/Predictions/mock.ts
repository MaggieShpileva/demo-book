import WEBP_Player1 from '@assets/images/predictions/player-1.webp';
import WEBP_Player2 from '@assets/images/predictions/player-2.webp';

export type MatchParticipant = {
  name: string;
  image: string;
  odds: number;
};

export type MatchCardData = {
  id: string;
  hoursLeft: number;
  minutesLeft: number;
  status: string;
  sport: string;
  title: string;
  home: MatchParticipant;
  away: MatchParticipant;
  ctaLabel: string;
};

export const PREDICTIONS_COPY = {
  heading: 'Прогнозы',
  description:
    'Верные прогнозы продлевают серию. Можешь выбирать сам или следовать выбору других',
} as const;

export const MOCK_MATCH_CARDS: MatchCardData = {
  id: '1',
  hoursLeft: 21,
  minutesLeft: 39,
  status: 'Активный',
  sport: 'Теннис',
  title: 'Победитель на первой карте в матче',
  home: {
    name: 'А. Роберто Карбаллес Баэна',
    image: WEBP_Player1,
    odds: 1.89,
  },
  away: {
    name: 'Ботик ван де Зандсхюлп',
    image: WEBP_Player2,
    odds: 1.65,
  },
  ctaLabel: 'Перейти к прогнозу',
};
