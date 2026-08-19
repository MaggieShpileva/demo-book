import { useState } from 'react';
import type { FC } from 'react';
import clsx from 'clsx';
import WEBP_bonusCoin from '@assets/images/tasks/bonus-coin.webp';
import SVG_chevronDown from '@assets/icons/chevron-down.svg?react';
import { TaskSubtaskItem } from '../TaskSubtaskItem';
import { TASKS_COPY, type TaskSubtask } from '../../mock';
import styles from './TaskGroup.module.scss';

type TaskGroupProps = {
  title: string;
  description: string;
  reward: number;
  coverSrc: string;
  progressDone: number;
  progressTotal: number;
  subtasks: TaskSubtask[];
  className?: string;
};

export const TaskGroup: FC<TaskGroupProps> = (props) => {
  const { title, description, reward, coverSrc, progressDone, progressTotal, subtasks, className } =
    props;
  const [isOpen, setIsOpen] = useState(false);
  const progressRatio = progressTotal > 0 ? progressDone / progressTotal : 0;

  return (
    <article className={clsx(styles.card, className)}>
      <div className={styles.summary}>
        <div className={styles.media}>
          <img className={styles.cover} src={coverSrc} alt={`Обложка группы: ${title}`} />
          <span className={styles.reward}>
            <img className={styles.coin} src={WEBP_bonusCoin} alt="Бонусная монета" width={14} height={14} />
            + {reward}
          </span>
        </div>
        <div className={styles.body}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          <div className={styles.footer}>
            <div className={styles.progress}>
              <span className={styles.progressFill} style={{ width: `${progressRatio * 100}%` }} />
              <span className={styles.progressText}>{TASKS_COPY.progressLabel(progressDone, progressTotal)}</span>
            </div>
            <button
              type="button"
              className={clsx(styles.toggle, { [styles.toggleOpen]: isOpen })}
              aria-expanded={isOpen}
              aria-label={isOpen ? TASKS_COPY.collapseLabel : TASKS_COPY.expandLabel}
              onClick={() => setIsOpen((value) => !value)}
            >
              <SVG_chevronDown width={20} height={20} aria-hidden />
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <ul className={styles.list}>
          {subtasks.map((subtask) => (
            <TaskSubtaskItem key={subtask.id} subtask={subtask} />
          ))}
        </ul>
      )}
    </article>
  );
};
