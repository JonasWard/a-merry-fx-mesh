import { AttributeNames } from '../../modelDefinition/enums/attributeNames';
import { Version0Type } from '../../modelDefinition/types/version0.generatedType';
import { getMainMethod } from './sharedMethods';
import tpmsMethodDefinitions from '../../Shaders/tpmsMethodDefinitions.glsl?raw';
import sharedMethods from '../../Shaders/tpmsShared.glsl?raw';

export const getPatternGenFragmentShader = (data: Version0Type): string => {
  const sdfMethod = getMainMethod((data['Main Methods'].v as any)[AttributeNames.DotMethods]);
  const xO = (data['Main Methods'].v as any).xOffset.value;
  const yO = (data['Main Methods'].v as any).yOffset.value;
  const zO = (data['Main Methods'].v as any).zOffset.value;
  const hardEdges = (data['Main Methods'].v as any).hardEdges.value;
  const uR = (data['Main Methods'].v as any).uR.value;
  const uT = (data['Main Methods'].v as any).uTimeMultiplier.value;

  return `
const vec2 baseOffset = vec2(${xO.toFixed(3)}, ${yO.toFixed(3)});
const vec2 centerOffset = vec2(${(uR.toFixed(3), 0.0)});
const float uTimeMultiplier = ${uT.toFixed(3)};
const float uR = ${uR.toFixed(3)};

${sharedMethods}
${tpmsMethodDefinitions}
${sdfMethod}
float sdMethod (vec2 p) {
  p += baseOffset;
  p += vec2(cos(uTime * uTimeMultiplier) * uR, sin(uTime * uTimeMultiplier) * uR);
  return getMainDistance(vec3(p, ${zO.toFixed(3)}))${hardEdges ? ' * 1000.0' : ''};
}
  
void main() {
  float d = sdMethod(uvV.xy);
  gl_FragColor = vec4(getColor(d), 1.0);
}`;
};
