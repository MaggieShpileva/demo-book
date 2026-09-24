import { PAGE_HTML_HEIGHT_PX, PAGE_HTML_WIDTH_PX } from '../constants';

/** foreignObject often breaks container queries — lock layout scale for raster. */
export const preparePageNodeForRaster = (node: HTMLElement) => {
  node.style.setProperty('--page-scale', '1');
  node.style.width = `${PAGE_HTML_WIDTH_PX}px`;
  node.style.maxWidth = `${PAGE_HTML_WIDTH_PX}px`;
  node.style.minHeight = `${PAGE_HTML_HEIGHT_PX}px`;
  node.style.height = `${PAGE_HTML_HEIGHT_PX}px`;
  node.style.overflow = 'hidden';
  node.style.containerType = 'normal';
};
