import { useState } from 'react';
import {
  BOOK_CLOSED_POSITION,
  BOOK_PRESENT_POSITION,
  BOOK_PRESENT_ROTATION,
  BOOK_ROTATION,
} from '../bookIntroConstants';
import type { BookClosedPose } from '../components/BookClosedPoseTweak';
import type { BookPoseOverride } from '../utils/getBookPose';

const toOverride = (pose: BookClosedPose): BookPoseOverride => ({
  position: pose.position,
  rotation: pose.rotationDeg.map((deg) => (deg * Math.PI) / 180) as [
    number,
    number,
    number,
  ],
});

const INITIAL_CLOSED_POSE: BookClosedPose = {
  position: [...BOOK_CLOSED_POSITION],
  rotationDeg: [...BOOK_ROTATION],
};

const INITIAL_PRESENT_POSE: BookClosedPose = {
  position: [...BOOK_PRESENT_POSITION],
  rotationDeg: [...BOOK_PRESENT_ROTATION],
};

/** TEMP: remove with BookClosedPoseTweak after poses are locked. */
export const useBookClosedPoseTweak = () => {
  const [closedPose, setClosedPose] = useState(INITIAL_CLOSED_POSE);
  const [presentPose, setPresentPose] = useState(INITIAL_PRESENT_POSE);

  return {
    closedPose,
    setClosedPose,
    presentPose,
    setPresentPose,
    closedPoseOverride: toOverride(closedPose),
    presentPoseOverride: toOverride(presentPose),
  };
};
