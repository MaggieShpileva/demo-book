export const getBookSheetAmounts = (sheetCount: number, delayedPage: number) =>
  Array.from({ length: sheetCount }, (_, index) => (delayedPage > index ? 1 : 0));
