const EAGER_SHEET_RADIUS = 2;

export const isBookSheetEager = (
  number: number,
  page: number,
  delayedPage: number
) =>
  Math.abs(number - page) <= EAGER_SHEET_RADIUS ||
  Math.abs(number - delayedPage) <= EAGER_SHEET_RADIUS;
