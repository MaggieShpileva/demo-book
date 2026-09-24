const dataUrlCache = new Map<string, string>();

const waitForImage = (image: HTMLImageElement) =>
  new Promise<void>((resolve, reject) => {
    if (image.complete && image.naturalWidth > 0) {
      resolve();
      return;
    }

    image.onload = () => resolve();
    image.onerror = () =>
      reject(
        new Error(`Failed to load image: ${image.currentSrc || image.src}`)
      );
  });

/** PNG so alpha stays transparent (JPEG turns it black). */
const imageToDataUrl = (image: HTMLImageElement) => {
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext('2d');
  if (context == null) {
    throw new Error('Failed to encode image for page texture');
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0);
  return canvas.toDataURL('image/png');
};

const sourceToDataUrl = async (src: string) => {
  const cached = dataUrlCache.get(src);
  if (cached != null) {
    return cached;
  }

  const image = new Image();
  image.decoding = 'sync';
  image.src = src;
  await waitForImage(image);
  const dataUrl = imageToDataUrl(image);
  dataUrlCache.set(src, dataUrl);
  return dataUrl;
};

const collectCssUrls = (value: string) => {
  const urls: string[] = [];
  const pattern = /url\((['"]?)(.*?)\1\)/g;

  for (const match of value.matchAll(pattern)) {
    const url = match[2]?.trim();
    if (url != null && url !== '' && !url.startsWith('data:')) {
      urls.push(url);
    }
  }

  return urls;
};

const inlineBackgroundImages = async (root: HTMLElement) => {
  const elements = [root, ...root.querySelectorAll<HTMLElement>('*')];

  await Promise.all(
    elements.map(async (element) => {
      const backgroundImage = getComputedStyle(element).backgroundImage;
      const urls = collectCssUrls(backgroundImage);
      if (urls.length === 0) {
        return;
      }

      try {
        const dataUrls = await Promise.all(urls.map(sourceToDataUrl));
        element.style.backgroundImage = dataUrls
          .map((url) => `url("${url}")`)
          .join(', ');
      } catch (error) {
        console.error('[Book] Failed to inline page background:', error);
      }
    })
  );
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

      image.src = await sourceToDataUrl(image.currentSrc || image.src);
    })
  );
  await inlineBackgroundImages(root);
};
