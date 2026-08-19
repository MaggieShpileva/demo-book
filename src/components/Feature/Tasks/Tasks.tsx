import { useState } from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import WEBP_heroPlane from '@assets/images/tasks/hero-plane.webp';
import SVG_chevronLeft from '@assets/icons/chevron-left.svg?react';
import { TaskListItem } from './components/TaskListItem';
import { TasksTabs, type TasksTabId } from './components/TasksTabs';
import {
  MOCK_ACTIVE_TASKS,
  MOCK_COMPLETED_TASKS,
  TASKS_ACTIVE_BADGE_COUNT,
  TASKS_COPY,
  TASKS_SEASON_BONUSES,
  WEBP_bonusCoin,
} from './mock';
import styles from './Tasks.module.scss';

type TasksProps = {
  className?: string;
};

export const Tasks: FC<TasksProps> = ({ className }) => {
  const [tab, setTab] = useState<TasksTabId>('active');
  const tasks = tab === 'active' ? MOCK_ACTIVE_TASKS : MOCK_COMPLETED_TASKS;

  return (
    <section className={clsx(styles.root, className)} aria-labelledby="tasks-title">
      <img className={styles.hero} src={WEBP_heroPlane} alt="Самолёт на фоне облаков" />
      <Link to="/" className={styles.back}>
        <SVG_chevronLeft width={12} height={12} aria-hidden />
        {TASKS_COPY.backLabel}
      </Link>
      <header className={styles.intro}>
        <h1 id="tasks-title" className={styles.title}>
          {TASKS_COPY.title}
        </h1>
        <p className={styles.subtitle}>{TASKS_COPY.subtitle}</p>
      </header>
      <div className={styles.season}>
        <img className={styles.seasonCoin} src={WEBP_bonusCoin} alt="Бонусная монета" width={28} height={28} />
        <span>{TASKS_COPY.seasonLabel(TASKS_SEASON_BONUSES)}</span>
      </div>
      <div className={styles.panel}>
        <TasksTabs activeTab={tab} activeCount={TASKS_ACTIVE_BADGE_COUNT} onChange={setTab} />
        <ul className={styles.list}>
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskListItem task={task} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
