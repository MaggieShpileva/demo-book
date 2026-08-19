import type { FC } from 'react';
import SVG_checkSmall from '@assets/icons/check-small.svg?react';
import type { TaskSubtask } from '../../mock';
import styles from './TaskSubtaskItem.module.scss';

type TaskSubtaskItemProps = {
  subtask: TaskSubtask;
};

export const TaskSubtaskItem: FC<TaskSubtaskItemProps> = ({ subtask }) => (
  <li className={styles.subtask}>
    <div className={styles.media}>
      <img className={styles.icon} src={subtask.iconSrc} alt={subtask.title} />
    </div>
    <div className={styles.body}>
      <p className={styles.title}>{subtask.title}</p>
      <p className={styles.description}>{subtask.description}</p>
    </div>
    {subtask.isCompleted && (
      <span className={styles.check} aria-label="Выполнено">
        <SVG_checkSmall width={12} height={12} aria-hidden />
      </span>
    )}
  </li>
);
