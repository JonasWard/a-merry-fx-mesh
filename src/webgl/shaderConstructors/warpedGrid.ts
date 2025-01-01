import { Version0Type } from '../../modelDefinition/types/version0.generatedType';
import { getColor } from '../helpermethods';
import { getMethodRecursive } from './sharedMethods';
import { AttributeNames } from '../../modelDefinition/enums/attributeNames';

import sharedMethods from '../../Shaders/tpmsShared.glsl?raw';
import warpedGridMethods from '../../Shaders/tpmsWarpedGrid.glsl?raw';
import tpmsMethodDefinitions from '../../Shaders/tpmsMethodDefinitions.glsl?raw';

export const getWarpedGridFragmentShader = (data: Version0Type): string => {
  const color0 = getColor(data.Material['Normal Material']['color 0']);
  const color1 = getColor(data.Material['Normal Material']['color 1']);

  return `
const vec3 color0 = vec3( ${color0[0].toFixed(3)}, ${color0[1].toFixed(3)}, ${color0[2].toFixed(3)} );
const vec3 color1 = vec3( ${color1[0].toFixed(3)}, ${color1[1].toFixed(3)}, ${color1[2].toFixed(3)} );
const vec3 offset = vec3(${(data['Main Methods'].v as any).xOffset.value.toFixed(4)}, ${(data['Main Methods'].v as any).yOffset.value.toFixed(4)}, ${(
    data['Main Methods'].v as any
  ).zOffset.value.toFixed(4)});
const float uTimeMultiplier = ${(data['Main Methods'].v as any).uTimeMultiplier.value.toFixed(3)};
const vec3 zOffset = vec3(0., 0., ${(data['Main Methods'].v as any).uZShift.value.toFixed(3)});

${tpmsMethodDefinitions}
${sharedMethods}
${warpedGridMethods}

float sdMethod(vec3 p) {
  return 2.0 * (${getMethodRecursive((data['Main Methods'].v as any)[AttributeNames.DotMethods].v)});
}

float localDistanceMethod(vec3 pX, vec3 pY) {
  return ${(data['Main Methods'].v as any).internalDistance.value ? 'abs' : ''}(${(data['Main Methods'].v as any).edgeShift.value.toFixed(
    3
  )} + max(sdMethod(pX), sdMethod(pY))) - ${(data['Main Methods'].v as any).edgeThickness.value.toFixed(3)};
}

bool internalDistanceDistanceMethod (vec3 pX, vec3 pY) {
  return localDistanceMethod(pX, pY) > 0.0;
}

bool euclidicLineThickness(vec3 pX, vec3 pY) {
  return sign(localDistanceMethod(pX + vec3(1.0, .0, .0), pY)) != sign(localDistanceMethod(pX + vec3(-1.0, .0, .0), pY)) || sign(localDistanceMethod(pX, pY + vec3(.0, 1.0, .0))) != sign(localDistanceMethod(pX, pY + vec3(.0, -1.0, .0)));
}

void main() {
  vec3 pX = vec3(uvV.x, .0, .0) + offset + zOffset * uTimeMultiplier * uTime;
  vec3 pY = vec3(.0, uvV.y, .0) + offset + zOffset * uTimeMultiplier * uTime;
  float d = 1.0;
  if (${(data['Main Methods'].v as any).euclidic.value ? 'euclidicLineThickness' : 'internalDistanceDistanceMethod'}(pX, pY)) {
    d = 0.0;
  };

  gl_FragColor = vec4(getColor(${(data['Main Methods'].v as any).inverted.value ? '1. - d' : 'd'}), 1.0);
  
}

`;
};
