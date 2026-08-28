import {
  BoxGeometry,
  Float32BufferAttribute,
  Uint16BufferAttribute,
  Vector3,
} from 'three';
import {
  PAGE_DEPTH,
  PAGE_HEIGHT,
  PAGE_SEGMENTS,
  PAGE_WIDTH,
  SEGMENT_WIDTH,
} from '../constants';

export const createPageGeometry = (depth = PAGE_DEPTH) => {
  const geometry = new BoxGeometry(
    PAGE_WIDTH,
    PAGE_HEIGHT,
    depth,
    PAGE_SEGMENTS,
    2
  );
  geometry.translate(PAGE_WIDTH / 2, 0, 0);

  const position = geometry.attributes.position;
  const vertex = new Vector3();
  const skinIndexes: number[] = [];
  const skinWeights: number[] = [];

  for (let i = 0; i < position.count; i++) {
    vertex.fromBufferAttribute(position, i);
    // Bones are 0..PAGE_SEGMENTS; clamp so skinIndex+1 never goes past the last bone.
    let skinIndex = Math.floor(vertex.x / SEGMENT_WIDTH);
    let skinWeight = vertex.x / SEGMENT_WIDTH - skinIndex;
    if (skinIndex >= PAGE_SEGMENTS) {
      skinIndex = PAGE_SEGMENTS - 1;
      skinWeight = 1;
    } else if (skinIndex < 0) {
      skinIndex = 0;
      skinWeight = 0;
    }
    skinIndexes.push(skinIndex, skinIndex + 1, 0, 0);
    skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
  }

  geometry.setAttribute('skinIndex', new Uint16BufferAttribute(skinIndexes, 4));
  geometry.setAttribute(
    'skinWeight',
    new Float32BufferAttribute(skinWeights, 4)
  );

  return geometry;
};
