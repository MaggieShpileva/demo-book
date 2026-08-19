import type { FC } from 'react';
import clsx from 'clsx';
import { TASKS_COPY } from '../../mock';
import styles from './TasksTabs.module.scss';

export type TasksTabId = 'active' | 'completed';

type TasksTabsProps = {
  activeTab: TasksTabId;
  activeCount: number;
  onChange: (tab: TasksTabId) => void;
  className?: string;
};

export const TasksTabs: FC<TasksTabsProps> = ({
  activeTab,
  activeCount,
  onChange,
  className,
}) => (
  <div className={clsx(styles.tabs, className)} role="tablist" aria-label="Фильтр заданий">
    <button
      type="button"
      role="tab"
      aria-selected={activeTab === 'active'}
      className={clsx(styles.tab, { [styles.tabActive]: activeTab === 'active' })}
      onClick={() => onChange('active')}
    >
      {TASKS_COPY.tabActive(activeCount)}
    </button>
    <button
      type="button"
      role="tab"
      aria-selected={activeTab === 'completed'}
      className={clsx(styles.tab, { [styles.tabActive]: activeTab === 'completed' })}
      onClick={() => onChange('completed')}
    >
      {TASKS_COPY.tabCompleted}
    </button>
  </div>
);
