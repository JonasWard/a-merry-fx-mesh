import { Version0Type } from '../../modelDefinition/types/version0.generatedType';
import { getCircleFragmentShader } from './circle';

const simpleUVShader = `
varying vec3 uvV;

void main() {
  gl_FragColor = vec4(uvV, 1.0);
}`;

export const getFragmentShader = (data: Version0Type): string => {
  switch (data['Main Methods'].s.value) {
    case 0: // circle
      return getCircleFragmentShader(
        (data['Main Methods'].v as any).count.value,
        (data['Main Methods'].v as any).minSize.value,
        (data['Main Methods'].v as any).maxSize.value,
        (data['Main Methods'].v as any).seed.value
      );
    default:
      return simpleUVShader;
  }
};
