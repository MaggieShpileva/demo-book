import type { FC } from 'react';
import { TaskCard } from '../TaskCard';
import { TaskGroup } from '../TaskGroup';
import type { TaskItem } from '../../mock';

type TaskListItemProps = {
  task: TaskItem;
};

export const TaskListItem: FC<TaskListItemProps> = ({ task }) => {
  if (task.kind === 'group') {
    return (
      <TaskGroup
        title={task.title}
        description={task.description}
        reward={task.reward}
        coverSrc={task.coverSrc}
        progressDone={task.progressDone ?? 0}
        progressTotal={task.progressTotal ?? 0}
        subtasks={task.subtasks ?? []}
      />
    );
  }

  return (
    <TaskCard
      title={task.title}
      description={task.description}
      reward={task.reward}
      coverSrc={task.coverSrc}
      timeLeft={task.timeLeft}
      claimLabel={task.claimLabel}
    />
  );
};
