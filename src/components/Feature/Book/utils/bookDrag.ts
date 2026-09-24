export type BookDragMode = 'next' | 'prev';

export type BookDragSession = {
  sheet: number;
  mode: BookDragMode;
  startX: number;
};

export type BookDragState = {
  sheet: number;
  amount: number;
};
