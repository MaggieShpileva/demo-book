const hideMatching = (root: HTMLElement, selector: string) => {
  root.querySelectorAll(selector).forEach((node) => {
    if (node instanceof HTMLElement) {
      node.style.display = 'none';
    }
  });
};

export const pageHasLiveLayer = (root: HTMLElement) =>
  root.querySelector('[data-book-live], [data-book-hit]') != null;

/** Hide live-only HTML so it is not baked into a page or overlay texture. */
export const hideBookPageLive = (root: HTMLElement) => {
  hideMatching(root, '[data-book-live]');
};

/** Hide print overflow so it is not baked into the page texture. */
export const hideBookPageOverlays = (root: HTMLElement) => {
  hideMatching(root, '[data-book-overlay]');
};
