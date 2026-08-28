import { CanvasTexture, SRGBColorSpace } from 'three';

const collectDocumentCss = () =>
  [...document.styleSheets]
    .map((sheet) => {
      try {
        return [...sheet.cssRules].map((rule) => rule.cssText).join('\n');
      } catch {
        return '';
      }
    })
    .join('\n');

const sanitizeCssForSvg = (css: string) =>
  css
    .replace(/]]>/g, '')
    .replace(
      /rgba?\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\/\s*([\d.]+%?)\s*\)/g,
      (_match, red, green, blue, alpha) => {
        const normalizedAlpha = String(alpha).endsWith('%')
          ? Number.parseFloat(alpha) / 100
          : alpha;

        return `rgba(${red}, ${green}, ${blue}, ${normalizedAlpha})`;
      }
    );

export const htmlNodeToCanvasTexture = async (
  node: HTMLElement,
  width: number,
  height: number
) => {
  const css = sanitizeCssForSvg(collectDocumentCss());
  const markup = new XMLSerializer().serializeToString(node);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <foreignObject width="100%" height="100%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="width:${width}px;height:${height}px;background:#fafafa;">
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

  const dpr = 2;
  const canvas = document.createElement('canvas');
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  const context = canvas.getContext('2d');
  if (context == null) {
    throw new Error('Failed to rasterize HTML page');
  }

  context.scale(dpr, dpr);
  context.fillStyle = '#fafafa';
  context.fillRect(0, 0, width, height);
  context.drawImage(image, 0, 0, width, height);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
};
