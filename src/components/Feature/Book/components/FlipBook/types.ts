export type FlipMotion = {
  currentPage: number;
  movingIndex: number;
  fromAngle: number;
  toAngle: number;
  startMs: number;
};

export type FlipBookApi = {
  pageFlip: () => {
    flipPrev: () => void;
    flipNext: () => void;
  };
};
