import type { CanvasTexture } from 'three';

export type BookPageOverlayPadding = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export type BookPageOverlayRaster = {
  texture: CanvasTexture;
  padding: BookPageOverlayPadding;
};
