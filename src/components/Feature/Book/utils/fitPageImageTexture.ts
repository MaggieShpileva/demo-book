import { ClampToEdgeWrapping, type Texture } from 'three';
import { PAGE_HTML_HEIGHT_PX, PAGE_HTML_WIDTH_PX } from '../constants';

const getTextureImageSize = (texture: Texture) => {
  const image = texture.image as { width?: number; height?: number };
  const width = image.width ?? 0;
  const height = image.height ?? 0;
  return { width, height };
};

/** Fit image to page height, pin to the right edge, crop overflow. */
export const fitPageImageTexture = (texture: Texture) => {
  const { width, height } = getTextureImageSize(texture);
  if (width <= 0 || height <= 0) {
    return;
  }

  const pageAspect = PAGE_HTML_WIDTH_PX / PAGE_HTML_HEIGHT_PX;
  const imageAspect = width / height;
  const repeatX = Math.min(pageAspect / imageAspect, 1);

  texture.wrapS = ClampToEdgeWrapping;
  texture.wrapT = ClampToEdgeWrapping;
  texture.repeat.set(repeatX, 1);
  texture.offset.set(1 - repeatX, 0);
};
