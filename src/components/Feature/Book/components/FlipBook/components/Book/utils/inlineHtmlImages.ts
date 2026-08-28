const waitForImage = (image: HTMLImageElement) =>
  new Promise<void>((resolve, reject) => {
    if (image.complete && image.naturalWidth > 0) {
      resolve();
      return;
    }

    image.onload = () => resolve();
    image.onerror = () =>
      reject(new Error(`Failed to load image: ${image.currentSrc || image.src}`));
  });

const imageToDataUrl = (image: HTMLImageElement) => {
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext('2d');
  if (context == null) {
    throw new Error('Failed to encode image for page texture');
  }

  context.drawImage(image, 0, 0);
  return canvas.toDataURL('image/jpeg', 0.92);
};

/**
 * SVG foreignObject (used by page rasterizer) cannot load external img URLs.
 * Inline same-origin images as data URLs before serializeToString.
 */
export const inlineHtmlImages = async (root: HTMLElement) => {
  const images = [...root.querySelectorAll('img')];

  await Promise.all(
    images.map(async (image) => {
      if (image.src.startsWith('data:')) {
        return;
      }

      await waitForImage(image);
      image.src = imageToDataUrl(image);
    })
  );
};
