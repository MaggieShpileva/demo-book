export const isBookLiveFaceVisible = (
  side: 'front' | 'back',
  pageNumber: number,
  delayedPage: number
) =>
  side === 'front'
    ? delayedPage === pageNumber
    : delayedPage === pageNumber + 1;
