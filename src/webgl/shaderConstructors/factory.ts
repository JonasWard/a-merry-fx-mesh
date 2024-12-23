import { Version0Type } from '../../modelDefinition/types/version0.generatedType';
import { getColor } from '../helpermethods';
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
        (data['Main Methods'].v as any).seed.value,
        (data['Main Methods'].v as any).sinAmplitude.value,
        getColor(data.Material['Normal Material']['color 0']),
        getColor(data.Material['Normal Material']['color 1']),
        (data['Main Methods'].v as any).rotationSpeed.value,
        (data['Main Methods'].v as any).angleMultiplier.value,
        (data['Main Methods'].v as any).centerOffsetMultiplier.value,
        (data['Main Methods'].v as any).edgeThickness.value
      );
    default:
      return simpleUVShader;
  }
};
