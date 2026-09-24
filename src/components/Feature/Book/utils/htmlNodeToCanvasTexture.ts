import {
  CanvasTexture,
  LinearFilter,
  LinearMipmapLinearFilter,
  SRGBColorSpace,
} from 'three';
import { PAGE_TEXTURE_MAX_DPR } from '../constants';

let cachedSanitizedCss: string | null = null;

const collectDocumentCss = () => {
  if (cachedSanitizedCss != null) {
    return cachedSanitizedCss;
  }

  const rawCss = [...document.styleSheets]
    .map((sheet) => {
      try {
        return [...sheet.cssRules].map((rule) => rule.cssText).join('\n');
      } catch {
        // Cross-origin stylesheets throw — skip them.
        return '';
      }
    })
    .join('\n');

  cachedSanitizedCss = sanitizeCssForSvg(rawCss);
  return cachedSanitizedCss;
};

const sanitizeCssForSvg = (css: string) =>
  css
    .replace(/]]>/g, '')
    // foreignObject often drops `text-box` / trim and clips glyphs — strip them.
    .replace(/\btext-box(?:-edge|-trim)?\s*:[^;]+;?/gi, '')
    .replace(
      /rgba?\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\/\s*([\d.]+%?)\s*\)/g,
      (_match, red, green, blue, alpha) => {
        const normalizedAlpha = String(alpha).endsWith('%')
          ? Number.parseFloat(alpha) / 100
          : alpha;

        return `rgba(${red}, ${green}, ${blue}, ${normalizedAlpha})`;
      }
    );

type HtmlNodeToCanvasTextureOptions = {
  background?: string;
};

export const htmlNodeToCanvasTexture = async (
  node: HTMLElement,
  width: number,
  height: number,
  options: HtmlNodeToCanvasTextureOptions = {}
) => {
  const background = options.background ?? '#fafafa';
  const cssBackground =
    background === 'transparent' ? 'rgba(0,0,0,0)' : background;
  const dpr = Math.min(
    typeof window !== 'undefined' ? window.devicePixelRatio : 1,
    PAGE_TEXTURE_MAX_DPR
  );
  const pixelWidth = Math.round(width * dpr);
  const pixelHeight = Math.round(height * dpr);
  const css = collectDocumentCss();
  const markup = new XMLSerializer().serializeToString(node);
  // Paint HTML at layout size inside a larger SVG viewBox so the browser
  // supersamples without CSS transform (transform breaks foreignObject layout).
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${pixelWidth}" height="${pixelHeight}" viewBox="0 0 ${width} ${height}">
    <foreignObject width="${width}" height="${height}">
      <div xmlns="http://www.w3.org/1999/xhtml" style="width:${width}px;height:${height}px;background:${cssBackground};--page-scale:1;">
        <style><![CDATA[${css}]]></style>
        ${markup}
      </div>
    </foreignObject>
  </svg>`;

  const image = new Image();
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error('Failed to rasterize HTML page'));
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  });

  const canvas = document.createElement('canvas');
  canvas.width = pixelWidth;
  canvas.height = pixelHeight;
  const context = canvas.getContext('2d');
  if (context == null) {
    throw new Error('Failed to rasterize HTML page');
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  if (background === 'transparent' || background === 'rgba(0,0,0,0)') {
    context.clearRect(0, 0, pixelWidth, pixelHeight);
  } else {
    context.fillStyle = background;
    context.fillRect(0, 0, pixelWidth, pixelHeight);
  }
  context.drawImage(image, 0, 0, pixelWidth, pixelHeight);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = LinearMipmapLinearFilter;
  texture.magFilter = LinearFilter;
  texture.needsUpdate = true;
  return texture;
};
