/** Keep live on the face that is not flipping while delayedPage walks. */
export const isBookLiveReady = (
  delayedPage: number,
  targetPage: number,
  side: 'front' | 'back',
  pageNumber: number
) => {
  if (delayedPage === targetPage) {
    return true;
  }

  if (targetPage > delayedPage) {
    return side === 'back' && pageNumber === delayedPage - 1;
  }

  return side === 'front' && pageNumber === delayedPage;
};
