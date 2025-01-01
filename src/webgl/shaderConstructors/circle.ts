import { getNNumbersForSeed } from './sharedMethods';
import circleMethods from '../../Shaders/tpmsCircles.glsl?raw';
import sharedMethods from '../../Shaders/tpmsShared.glsl?raw';
import { MAX_WIDTH, MAX_HEIGHT } from './screenBounds';
import { Version0Type } from '../../modelDefinition/types/version0.generatedType';

const CIRCLE_COUNT_VARIABLE_NAME = 'CIRCLE_COUNT';
const CIRCLES_VARIABLE_NAME = 'CIRCLES';
const getCircleEntry = (c: [number, number, number]) => `vec3( ${c[0].toFixed(3)}, ${c[1].toFixed(3)}, ${c[2].toFixed(3)} )`;

const getCircleArray = (circles: [number, number, number][]) => {
  const circleArray = circles.map(getCircleEntry).join(',');

  return `const int ${CIRCLE_COUNT_VARIABLE_NAME} = ${circles.length};
vec3 ${CIRCLES_VARIABLE_NAME}[${circles.length}] = vec3[](${circleArray});
`;
};

const getCircles = (minSize: number, maxSize: number, count: number, seed: number): [number, number, number][] => {
  const xs = getNNumbersForSeed(count, `${seed}.circle.x`).map((v) => (v - 0.5) * MAX_WIDTH);
  const ys = getNNumbersForSeed(count, `${seed}.circle.y`).map((v) => (v - 0.5) * MAX_HEIGHT);
  const rs = getNNumbersForSeed(count, `${seed}.circle.r`).map((v) => v * (maxSize - minSize) + minSize);

  return xs.map((x, i) => [x, ys[i], rs[i]]);
};

export const getCircleFragmentShader = (data: Version0Type): string => {
  const [sizeMin, sizeMax] = [(data['Main Methods'].v as any).minSize.value, (data['Main Methods'].v as any).maxSize.value].sort((a, b) => a - b);
  const circles = getCircles(sizeMin, sizeMax, (data['Main Methods'].v as any).count.value, (data['Main Methods'].v as any).seed.value);

  return `
const float ROTATION_VELOCITY = ${(data['Main Methods'].v as any).rotationSpeed.value.toFixed(3)};
const float ANGLE_MULTIPLIER = ${(data['Main Methods'].v as any).angleMultiplier.value.toFixed(3)};
const float CENTER_OFFSET_MULTIPLIER = ${(data['Main Methods'].v as any).centerOffsetMultiplier.value.toFixed(3)};
const float EDGE_THICKNESS = ${(data['Main Methods'].v as any).edgeThickness.value.toFixed(3)};

${getCircleArray(circles)}
${sharedMethods}
${circleMethods}

float sdMethod(vec2 p) {
  float d = 10000.0;
  for (int i = 0; i < ${CIRCLE_COUNT_VARIABLE_NAME}; i++) {
    d = sdUnion(sdCircle(rotateCircleAroundCenter(${CIRCLES_VARIABLE_NAME}[i]), p), d);
  }
  
  return d;
}

void main() {
  float d = sdMethod(uvV.xy);

  ${
    (data['Main Methods'].v as any).sinAmplitude.value > 0
      ? `d = sin(d * ${(data['Main Methods'].v as any).sinAmplitude.value.toFixed(3)}) * 0.5 + 0.5;`
      : `if (d < EDGE_THICKNESS) {
    d = max(pow(d / EDGE_THICKNESS, 1.9), 0.0);
  }
  else {
    d = 1.0;
  }`
  }

  gl_FragColor = vec4(getColor(d), 1.0);
  
}

`;
};
