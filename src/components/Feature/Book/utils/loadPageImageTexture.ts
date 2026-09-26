import {
  LinearFilter,
  LinearMipmapLinearFilter,
  SRGBColorSpace,
  TextureLoader,
  type Texture,
} from 'three';
import { fitPageImageTexture } from './fitPageImageTexture';

export const loadPageImageTexture = (src: string) =>
  new Promise<Texture>((resolve, reject) => {
    const loader = new TextureLoader();

    loader.load(
      src,
      (texture) => {
        texture.colorSpace = SRGBColorSpace;
        texture.generateMipmaps = true;
        texture.minFilter = LinearMipmapLinearFilter;
        texture.magFilter = LinearFilter;
        fitPageImageTexture(texture);
        texture.needsUpdate = true;
        resolve(texture);
      },
      undefined,
      () => {
        reject(new Error('[Book] Failed to load page image texture'));
      }
    );
  });
