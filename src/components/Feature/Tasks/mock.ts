import WEBP_taskCover from '@assets/images/tasks/task-cover.webp';
import WEBP_bonusCoin from '@assets/images/tasks/bonus-coin.webp';
import SVG_taskLocation from '@assets/icons/task-location.svg';

export type TaskSubtask = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  iconSrc: string;
};

export type TaskItem = {
  id: string;
  kind: 'simple' | 'claimable' | 'group';
  title: string;
  description: string;
  reward: number;
  coverSrc: string;
  timeLeft?: string;
  claimLabel?: string;
  progressDone?: number;
  progressTotal?: number;
  subtasks?: TaskSubtask[];
};

export const TASKS_SEASON_BONUSES = 1000;
export const TASKS_ACTIVE_BADGE_COUNT = 2;

export const TASKS_COPY = {
  backLabel: 'к билетам',
  title: 'Задания',
  subtitle: 'Выполняй задания и получай бонусы',
  seasonLabel: (amount: number) => `За сезон начислено ${amount} бонусов`,
  tabActive: (count: number) => `Задания (${count})`,
  tabCompleted: 'Завершенные',
  progressLabel: (done: number, total: number) => `Выполнено ${done}/${total}`,
  expandLabel: 'Развернуть группу заданий',
  collapseLabel: 'Свернуть группу заданий',
} as const;

export const MOCK_ACTIVE_TASKS: TaskItem[] = [
  {
    id: 'code-word',
    kind: 'simple',
    title: 'найдите кодовое слово из статьи',
    description:
      'Каждый месяц этот челлендж начинается заново — успей выполнить, чтобы получить награду. В следующем месяце можно повторить!',
    reward: 100,
    timeLeft: '59мин',
    coverSrc: WEBP_taskCover,
  },
  {
    id: 'purchase',
    kind: 'claimable',
    title: 'купите продукты из подборки',
    description: 'Выберите их из категории “Уходовая косметика” на сумму от 3000₽',
    reward: 250,
    timeLeft: '22д 20ч',
    claimLabel: 'забрать награду',
    coverSrc: WEBP_taskCover,
  },
  {
    id: 'game-intro',
    kind: 'group',
    title: 'знакомство с игрой',
    description: 'Группа заданий, чтобы изучить Твое путешествие',
    reward: 400,
    progressDone: 2,
    progressTotal: 4,
    coverSrc: WEBP_taskCover,
    subtasks: [
      {
        id: 'find-item',
        title: 'Найти первый предмет в игре',
        description:
          'Найди любой спрятанный предмет на любой локаций, не забывай про подсказки!',
        isCompleted: true,
        iconSrc: WEBP_taskCover,
      },
      {
        id: 'first-location',
        title: 'Пройти первую локацию',
        description: 'Для прохождения нужно найти все предметы на локации',
        isCompleted: true,
        iconSrc: SVG_taskLocation,
      },
      {
        id: 'find-item-2',
        title: 'Найти первый предмет в игре',
        description:
          'Найди любой спрятанный предмет на любой локаций, не забывай про подсказки!',
        isCompleted: false,
        iconSrc: WEBP_taskCover,
      },
      {
        id: 'first-location-2',
        title: 'Пройти первую локацию',
        description: 'Для прохождения нужно найти все предметы на локации',
        isCompleted: false,
        iconSrc: SVG_taskLocation,
      },
    ],
  },
];

export const MOCK_COMPLETED_TASKS: TaskItem[] = [];

export { WEBP_bonusCoin };
