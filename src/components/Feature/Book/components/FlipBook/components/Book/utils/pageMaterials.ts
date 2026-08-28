import { Color, MeshStandardMaterial } from 'three';

const whiteColor = new Color('white');

export const pageEdgeMaterials = [
  new MeshStandardMaterial({ color: whiteColor }),
  new MeshStandardMaterial({ color: '#111' }),
  new MeshStandardMaterial({ color: whiteColor }),
  new MeshStandardMaterial({ color: whiteColor }),
];

export const emissiveColor = new Color('orange');
export { whiteColor };
