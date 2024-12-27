import { Version0Type } from '../../modelDefinition/types/version0.generatedType';
import { getColor } from '../helpermethods';
import { AttributeNames } from '../../modelDefinition/enums/attributeNames';
import tpmsMethodDefinitions from '../../Shaders/tpmsMethodDefinitions.glsl?raw';
import sharedMethods from '../../Shaders/tpmsShared.glsl?raw';
import { SDFMethodNames } from './sharedMethods';

const getWarpVectorMethod = (data: Version0Type) => {
  let xMethod = '';
  let yMethod = '';
  let methodComposition = '';
  let warpMagnitude =
    (data['Main Methods'].v as any).Warp.s.value !== 3
      ? `const float warpMagnitude = ${(data['Main Methods'].v as any).Warp.v.warpMagnitude.value.toFixed(1)};\n`
      : '';
  let offset =
    (data['Main Methods'].v as any).Warp.s.value !== 3
      ? `const vec3 offset = vec3(${(data['Main Methods'].v as any).Warp.v.xOffset.value.toFixed(4)}, ${(
          data['Main Methods'].v as any
        ).Warp.v.yOffset.value.toFixed(4)}, ${(data['Main Methods'].v as any).Warp.v.zOffset.value.toFixed(4)});\n`
      : '';

  switch ((data['Main Methods'].v as any).Warp.s.value) {
    case 3:
      methodComposition = 'return vec2(0.0, 0.0)';
      break;
    case 0:
      xMethod = `float xSD(vec3 p) {
  return ${getMethodRecursive((data['Main Methods'].v as any).Warp.v.X.v)};
}\n`;
      methodComposition = 'return vec2(xSD(p), 0.0) * warpMagnitude';
      break;
    case 1:
      yMethod = `float ySD(vec3 p) {
  return ${getMethodRecursive((data['Main Methods'].v as any).Warp.v.Y.v)};
}\n`;
      methodComposition = 'return vec2(0.0, ySD(p)) * warpMagnitude';
      break;
    case 2:
      xMethod = `float xSD(vec3 p) {
  return ${getMethodRecursive((data['Main Methods'].v as any).Warp.v.X.v)};
}\n`;
      yMethod = `float ySD(vec3 p) {
  return ${getMethodRecursive((data['Main Methods'].v as any).Warp.v.Y.v)};
}\n`;
      methodComposition = 'return vec2(xSD(p), ySD(p)) * warpMagnitude';
      break;
  }

  return `
${warpMagnitude}${offset}

${xMethod}
            ${yMethod}

vec2 getWarpVector(vec3 p) {
  ${methodComposition};
}`;
};

const getMethodRecursive = (vs: any[]): string =>
  `${SDFMethodNames[vs[0][AttributeNames.SDFMethod].value]}(p, ${vs.length > 1 ? `${getMethodRecursive(vs.slice(1))} *` : ''}${vs[0][
    AttributeNames.MethodScale
  ].value.toFixed(3)})`;

const getGridSpacing = (data: Version0Type): [number, number] => [
  (data['Main Methods'].v as any).xSpacing.value,
  (data['Main Methods'].v as any).ySpacing.value,
];

const getXAxis = (data: Version0Type): [number, number] => [(data['Main Methods'].v as any).xSpacing.value, 0.0];

const getYAxis = (data: Version0Type): [number, number] => [
  (data['Main Methods'].v as any).alternating.value ? -0.5 * (data['Main Methods'].v as any).xSpacing.value : 0.0,
  (data['Main Methods'].v as any).ySpacing.value,
];

const getWarpDirection = (data: Version0Type): string => {
  switch ((data['Main Methods'].v as any).Warp.s.value) {
    case 3:
      return 'return v + oR.xy;';
    default:
      return `vec3 v3 = vec3(v, 0.0) + offset + oR;
  return v + getWarpVector(v3);`;
  }
};

const getDistanceMapping = (data: Version0Type): string => {
  let methodString = (data['Main Methods'].v as any).inverted.value ? '1.0 - ' : '';
  if ((data['Main Methods'].v as any).filled.value) return methodString + '(.5 + sdMethod(uvV.xy) * .5)';
  else return methodString + '(abs(sdMethod(uvV.xy)))';
};

export const getDreiEckFragmentShader = (data: Version0Type): string => {
  const color0 = getColor(data.Material['Normal Material']['color 0']);
  const color1 = getColor(data.Material['Normal Material']['color 1']);

  // simple triangle grid
  const gridSpacing = getGridSpacing(data);
  const xAxis = getXAxis(data);
  const yAxis = getYAxis(data);

  return `
const vec3 color0 = vec3( ${color0[0].toFixed(4)}, ${color0[1].toFixed(4)}, ${color0[2].toFixed(4)} );
const vec3 color1 = vec3( ${color1[0].toFixed(4)}, ${color1[1].toFixed(4)}, ${color1[2].toFixed(4)} );
const vec2 grid = vec2(${gridSpacing[0].toFixed(4)}, ${gridSpacing[1].toFixed(4)});
const vec2 xAxis = vec2(${xAxis[0].toFixed(4)}, ${xAxis[1].toFixed(4)});
const vec2 yAxis = vec2(${yAxis[0].toFixed(4)}, ${yAxis[1].toFixed(4)});
const bool alternatingTriangles = ${(data['Main Methods'].v as any).alternating.value};
const float uTimeMultiplier = ${(data['Main Methods'].v as any).uTimeMultiplier.value.toFixed(1)};
const float uR = ${(data['Main Methods'].v as any).uR.value.toFixed(1)};

${tpmsMethodDefinitions}
${sharedMethods}

vec2 getBaseCoordinate(vec2 index) {
  return xAxis * index.x + yAxis * index.y;
}

${getWarpVectorMethod(data)}

vec2 getLocationForBaseVector(vec2 v) {
  vec3 oR = vec3(cos(uTime * uTimeMultiplier) * uR, sin(uTime * uTimeMultiplier) * uR, 0.0);
  ${getWarpDirection(data)}
}

vec2[4] getCornersForIndex(vec2 index) {
  vec2 base = getBaseCoordinate(index);

  return vec2[](
    getLocationForBaseVector(base),
    getLocationForBaseVector(base + yAxis),
    getLocationForBaseVector(base + xAxis + yAxis),
    getLocationForBaseVector(base + xAxis)
  );
}

vec2 getIndex(vec2 p) {
  float x = p.x / grid.x;
  float y = p.y / grid.y;
  return vec2(floor(x), floor(y));
}

vec2 getIterativeCorrectedIndex(vec2 p, vec2 index) {
  vec2[4] cs = getCornersForIndex(index);
  float deltaX = 0.0;
  float deltaY = 0.0;

  if (sdLineSigned(cs[1], cs[0] - cs[1], p) < 0.0) {
    deltaX = -1.0;
  } else if (sdLineSigned(cs[2], cs[3] - cs[2], p) > 0.0) {
    deltaX = 1.0;
  }

  if (sdLineSigned(cs[0], cs[3] - cs[0], p) < 0.0) {
    deltaY = -1.0;
  } else if (sdLineSigned(cs[1], cs[2] - cs[1], p) > 0.0) {
    deltaY = 1.0;
  }

  return vec2(deltaX, deltaY);
}

vec2 getDistanceCorrectedIndex(vec2 p) {
  int depth = 0;
  vec2 index = getIndex(p);
  vec2 deltaIndex = getIterativeCorrectedIndex(p, index);
  if (deltaIndex.x == 0.0 && deltaIndex.y == 0.0) {
    return index;
  }
  index += deltaIndex;
  ${[...new Array(12)]
    .map(
      () => `deltaIndex = getIterativeCorrectedIndex(p, index);
    if (deltaIndex.x == 0.0 && deltaIndex.y == 0.0) {
      return index;
    }
    index += deltaIndex;`
    )
    .join('\n')}
  return index + getIterativeCorrectedIndex(p, index);
}

float sdMethod(vec2 p) {
  vec2 index = getDistanceCorrectedIndex(p);

  // return mod((index.x + index.y) * .001,1.0); 

  vec2 base = getBaseCoordinate(index);
  vec2[4] cs = getCornersForIndex(index);

  if (!alternatingTriangles) {
    vec2 vTriangleTop = (cs[0] + cs[3]) * .5;

    float d0 = -sdLineSigned(cs[2], vTriangleTop - cs[2], p);
    float d1 = -sdLineSigned(vTriangleTop, cs[1] - vTriangleTop, p);
    float d2 = -sdLineSigned(cs[1], cs[2] - cs[1], p);
    float d3 = sdLineSigned(cs[3], cs[0] - cs[3], p);

    return max(min(min(d0, d1), d2), d3);
  } else {
    float d0 = sdLineSigned(cs[1], cs[0] - cs[1], p);
    float d1 = sdLineSigned(cs[2], cs[1] - cs[2], p);
    float d2 = sdLineSigned(cs[0], cs[2] - cs[0], p);
    float d3 = sdLineSigned(cs[2], cs[3] - cs[2], p);
    float d4 = sdLineSigned(cs[3], cs[0] - cs[3], p);

    return max(max(min(min(d0, d1), d2), d3), d4);
  }
}

void main() {
  float d = ${getDistanceMapping(data)};
  gl_FragColor = vec4(getColor(d), 1.0);
}`;
};
