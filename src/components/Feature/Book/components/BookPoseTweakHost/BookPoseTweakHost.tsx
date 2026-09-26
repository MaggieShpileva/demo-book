import type { FC } from 'react';
import {
  BookClosedPoseTweak,
  type BookClosedPose,
} from '../BookClosedPoseTweak';
import { useBookStage } from '../BookStage';

type BookPoseTweakHostProps = {
  closedPose: BookClosedPose;
  presentPose: BookClosedPose;
  setClosedPose: (next: BookClosedPose) => void;
  setPresentPose: (next: BookClosedPose) => void;
};

/** TEMP: remove with BookClosedPoseTweak after poses are locked. */
export const BookPoseTweakHost: FC<BookPoseTweakHostProps> = ({
  closedPose,
  presentPose,
  setClosedPose,
  setPresentPose,
}) => {
  const { stage } = useBookStage();
  const isPresent = stage === 'presented';

  return (
    <BookClosedPoseTweak
      stage={stage}
      value={isPresent ? presentPose : closedPose}
      onChange={isPresent ? setPresentPose : setClosedPose}
    />
  );
};
