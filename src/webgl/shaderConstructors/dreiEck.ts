import { Version0Type } from '../../modelDefinition/types/version0.generatedType';
import { getColor } from '../helpermethods';
import { AttributeNames } from '../../modelDefinition/enums/attributeNames';
import { getMainMethod } from './sharedMethods';
import tpmsMethodDefinitions from '../../Shaders/tpmsMethodDefinitions.glsl?raw';
import sharedMethods from '../../Shaders/tpmsShared.glsl?raw';

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
  switch ((data['Main Methods'].v as any).warpDirection.value) {
    case 0:
      return 'return v + oR;';
    case 1:
      return `vec3 v3 = vec3(v, 0.0) + offset + oR;
  return v + vec2(getNormal(v3).x, 0.0) * warpMagnitude * getMainDistance(v3);`;
    case 2:
      return `vec3 v3 = vec3(v, 0.0) + offset + oR;
  return v + vec2(0.0, getNormal(v3).y) * warpMagnitude * getMainDistance(v3);`;
    case 3:
    default:
      return `vec3 v3 = vec3(v, 0.0) + offset + oR;
  return v + getNormal(v3).xy * warpMagnitude * getMainDistance(v3);`;
  }
};

const getDistanceMapping = (data: Version0Type): string => {
  let methodString = (data['Main Methods'].v as any).inverted.value ? '1.0 - ' : '';
  if ((data['Main Methods'].v as any).filled.value) return methodString + '(.5 + sdMethod(uvV.xy) * .5)';
  else return methodString + '(abs(sdMethod(uvV.xy)))';
};

export const getDreiEckFragmentShader = (data: Version0Type): string => {
  const sdfMethod = getMainMethod((data['Main Methods'].v as any)[AttributeNames.DotMethods]);

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
const float warpMagnitude = ${(data['Main Methods'].v as any).warpMagnitude.value.toFixed(1)};
const bool alternatingTriangles = ${(data['Main Methods'].v as any).alternating.value};
const vec3 offset = vec3(${(data['Main Methods'].v as any).xOffset.value.toFixed(4)}, ${(data['Main Methods'].v as any).yOffset.value.toFixed(4)}, ${(
    data['Main Methods'].v as any
  ).zOffset.value.toFixed(4)});
const float uTimeMultiplier = .1;
const float uR = 500.0;

${tpmsMethodDefinitions}
${sdfMethod}
${sharedMethods}

vec2 getBaseCoordinate(vec2 index) {
  return xAxis * index.x + yAxis * index.y;
}

vec3 getNormal(vec3 p)
{
    const float h = 0.001; // replace by an appropriate value
    const vec2 k = vec2(1,-1);
    return normalize( k.xyy * getMainDistance( p + k.xyy * h ) + 
                      k.yyx * getMainDistance( p + k.yyx * h ) + 
                      k.yxy * getMainDistance( p + k.yxy * h ) + 
                      k.xxx * getMainDistance( p + k.xxx * h ) );
}

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
  deltaIndex = getIterativeCorrectedIndex(p, index);
  if (deltaIndex.x == 0.0 && deltaIndex.y == 0.0) {
    return index;
  }
  index += deltaIndex;
  deltaIndex = getIterativeCorrectedIndex(p, index);
  if (deltaIndex.x == 0.0 && deltaIndex.y == 0.0) {
    return index;
  }
  index += deltaIndex;
  deltaIndex = getIterativeCorrectedIndex(p, index);
  if (deltaIndex.x == 0.0 && deltaIndex.y == 0.0) {
    return index;
  }
  index += deltaIndex;
  deltaIndex = getIterativeCorrectedIndex(p, index);
  if (deltaIndex.x == 0.0 && deltaIndex.y == 0.0) {
    return index;
  }
  index += deltaIndex;
  deltaIndex = getIterativeCorrectedIndex(p, index);
  if (deltaIndex.x == 0.0 && deltaIndex.y == 0.0) {
    return index;
  }
  index += deltaIndex;
  deltaIndex = getIterativeCorrectedIndex(p, index);
  if (deltaIndex.x == 0.0 && deltaIndex.y == 0.0) {
    return index;
  }
  index += deltaIndex;
  deltaIndex = getIterativeCorrectedIndex(p, index);
  if (deltaIndex.x == 0.0 && deltaIndex.y == 0.0) {
    return index;
  }
  index += deltaIndex;
  deltaIndex = getIterativeCorrectedIndex(p, index);
  if (deltaIndex.x == 0.0 && deltaIndex.y == 0.0) {
    return index;
  }
  index += deltaIndex;
  deltaIndex = getIterativeCorrectedIndex(p, index);
  if (deltaIndex.x == 0.0 && deltaIndex.y == 0.0) {
    return index;
  }
  index += deltaIndex;
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
