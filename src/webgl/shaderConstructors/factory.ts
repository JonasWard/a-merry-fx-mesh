import { Version0Type } from '../../modelDefinition/types/version0.generatedType';
import { getCircleFragmentShader } from './circle';
import { getDotsFragmentShader } from './dots';
import { getDreiEckFragmentShader } from './dreiEck';
import { getColorAsignment } from './sharedMethods';
import { getWarpedGridFragmentShader } from './warpedGrid';
import { getWavesFragmentShader } from './waves';

const simpleUVShader = `
varying vec3 uvV;

void main() {
  gl_FragColor = vec4(uvV, 1.0);
}`;

export const getFragmentShader = (data: Version0Type): string => {
  let shader = simpleUVShader;
  try {
    switch (data['Main Methods'].s.value) {
      case 0: // circle
        shader = getCircleFragmentShader(data);
        break;
      case 1: // dots
        shader = getDotsFragmentShader(data);
        break;
      // case 2: // line-art
      //   shader = getLineArtFragmentShader(data);
      //   break;
      case 3: // waves
        shader = getWavesFragmentShader(data);
        break;
      case 5: // drei eck
        shader = getDreiEckFragmentShader(data);
        break;
      case 6: // warped grid
        shader = getWarpedGridFragmentShader(data);
      default:
    }
  } catch (e) {
    console.error('something went wrong when trying to create the shader');
    console.warn(e);
  }
  if (import.meta.env.DEV) console.log(shader);
  return `
  ${getColorAsignment(data)}
  ${shader}`;
};
