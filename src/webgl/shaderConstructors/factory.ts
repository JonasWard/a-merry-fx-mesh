import { Version0Type } from '../../modelDefinition/types/version0.generatedType';
import { getColor } from '../helpermethods';
import { getCircleFragmentShader } from './circle';
import { getDotsFragmentShader } from './dots';
import { getDreiEckFragmentShader } from './dreiEck';

const simpleUVShader = `
varying vec3 uvV;

void main() {
  gl_FragColor = vec4(uvV, 1.0);
}`;

export const getFragmentShader = (data: Version0Type): string => {
  let shader = simpleUVShader;
  switch (data['Main Methods'].s.value) {
    case 0: // circle
      shader = getCircleFragmentShader(
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
      break;
    case 1: // dots
      shader = getDotsFragmentShader(data);
      break;
    case 5: // drei eck
      shader = getDreiEckFragmentShader(data);
      break;
    default:
  }
  if (import.meta.env.DEV) console.log(shader);
  return shader;
};
