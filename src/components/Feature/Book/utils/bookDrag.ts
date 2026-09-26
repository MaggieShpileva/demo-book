export type BookDragMode = 'next' | 'prev';

export type BookDragSession = {
  sheet: number;
  mode: BookDragMode;
  startX: number;
  /** If set, a tap cancels the turn and runs this instead (e.g. contents zones). */
  onTap?: () => void;
};

export type BookDragState = {
  sheet: number;
  mode: BookDragMode;
  amount: number;
};
