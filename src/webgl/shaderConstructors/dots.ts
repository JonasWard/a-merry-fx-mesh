import { AttributeNames } from '../../modelDefinition/enums/attributeNames';
import { Version0Type } from '../../modelDefinition/types/version0.generatedType';
import { getColor } from '../helpermethods';
import { getMainMethod } from './sharedMethods';
import tpmsMethodDefinitions from '../../Shaders/tpmsMethodDefinitions.glsl?raw';
import sharedMethods from '../../Shaders/tpmsShared.glsl?raw';

const getMinGridSize = (data: Version0Type): number => {
  switch ((data['Main Methods'].v as any).count.value as number) {
    case 1:
      return (data['Main Methods'].v as any).maxGridSize.value;
    case 2:
    case 3:
      return (data['Main Methods'].v as any).maxGridSize.value * 0.5;
    case 4:
    case 5:
      return (data['Main Methods'].v as any).maxGridSize.value * 0.25;
    case 6:
    case 7:
    default:
      return (data['Main Methods'].v as any).maxGridSize.value * 0.125;
  }
};

const getDotsArrays = (data: Version0Type): string => {
  const count = (data['Main Methods'].v as any).count.value as number;
  const divCount = count + 1;
  switch (count) {
    case 1:
      return `const float count = 1.0;
const float row0[1] = float[](0.5);`;
    case 2:
    case 3:
      return `const float count = 2.0;
const float row0[2] = float[](${(1 / divCount).toFixed(4)}, ${(3 / divCount).toFixed(4)});
const float row1[2] = float[](${(3 / divCount).toFixed(4)}, ${(2 / divCount).toFixed(4)});`;
    case 4:
    case 5:
      return `const float count = 4.0;
const float row0[4] = float[](${(1 / divCount).toFixed(4)}, ${(5 / divCount).toFixed(4)}, ${(3 / divCount).toFixed(4)}, ${(5 / divCount).toFixed(4)});
const float row1[4] = float[](${(5 / divCount).toFixed(4)}, ${(4 / divCount).toFixed(4)}, ${(5 / divCount).toFixed(4)}, ${(4 / divCount).toFixed(4)});
const float row2[4] = float[](${(3 / divCount).toFixed(4)}, ${(5 / divCount).toFixed(4)}, ${(2 / divCount).toFixed(4)}, ${(5 / divCount).toFixed(4)});
const float row3[4] = float[](${(5 / divCount).toFixed(4)}, ${(4 / divCount).toFixed(4)}, ${(5 / divCount).toFixed(4)}, ${(4 / divCount).toFixed(4)});
`;
    case 6:
    case 7:
    default:
      return `const float count = 8.0;
const float row0[8] = float[](${(1 / divCount).toFixed(4)}, ${(7 / divCount).toFixed(4)}, ${(5 / divCount).toFixed(4)}, ${(7 / divCount).toFixed(4)}, ${(
        3 / divCount
      ).toFixed(4)}, ${(7 / divCount).toFixed(4)}, ${(5 / divCount).toFixed(4)}, ${(7 / divCount).toFixed(4)});
const float row1[8] = float[](${(7 / divCount).toFixed(4)}, ${(6 / divCount).toFixed(4)}, ${(7 / divCount).toFixed(4)}, ${(6 / divCount).toFixed(4)}, ${(
        7 / divCount
      ).toFixed(4)}, ${(6 / divCount).toFixed(4)}, ${(7 / divCount).toFixed(4)}, ${(6 / divCount).toFixed(4)});
const float row2[8] = float[](${(5 / divCount).toFixed(4)}, ${(7 / divCount).toFixed(4)}, ${(4 / divCount).toFixed(4)}, ${(7 / divCount).toFixed(4)}, ${(
        5 / divCount
      ).toFixed(4)}, ${(7 / divCount).toFixed(4)}, ${(4 / divCount).toFixed(4)}, ${(7 / divCount).toFixed(4)});
const float row3[8] = float[](${(7 / divCount).toFixed(4)}, ${(6 / divCount).toFixed(4)}, ${(7 / divCount).toFixed(4)}, ${(6 / divCount).toFixed(4)}, ${(
        7 / divCount
      ).toFixed(4)}, ${(6 / divCount).toFixed(4)}, ${(7 / divCount).toFixed(4)}, ${(6 / divCount).toFixed(4)});
const float row4[8] = float[](${(3 / divCount).toFixed(4)}, ${(7 / divCount).toFixed(4)}, ${(5 / divCount).toFixed(4)}, ${(7 / divCount).toFixed(4)}, ${(
        2 / divCount
      ).toFixed(4)}, ${(7 / divCount).toFixed(4)}, ${(5 / divCount).toFixed(4)}, ${(7 / divCount).toFixed(4)});
const float row5[8] = float[](${(7 / divCount).toFixed(4)}, ${(6 / divCount).toFixed(4)}, ${(7 / divCount).toFixed(4)}, ${(6 / divCount).toFixed(4)}, ${(
        7 / divCount
      ).toFixed(4)}, ${(6 / divCount).toFixed(4)}, ${(7 / divCount).toFixed(4)}, ${(6 / divCount).toFixed(4)});
const float row6[8] = float[](${(5 / divCount).toFixed(4)}, ${(7 / divCount).toFixed(4)}, ${(4 / divCount).toFixed(4)}, ${(7 / divCount).toFixed(4)}, ${(
        5 / divCount
      ).toFixed(4)}, ${(7 / divCount).toFixed(4)}, ${(4 / divCount).toFixed(4)}, ${(7 / divCount).toFixed(4)});
const float row7[8] = float[](${(7 / divCount).toFixed(4)}, ${(6 / divCount).toFixed(4)}, ${(7 / divCount).toFixed(4)}, ${(6 / divCount).toFixed(4)}, ${(
        7 / divCount
      ).toFixed(4)}, ${(6 / divCount).toFixed(4)}, ${(7 / divCount).toFixed(4)}, ${(6 / divCount).toFixed(4)});
`;
  }
};

const getIndexTresholdMethod = (data: Version0Type): string => {
  let content = '';
  switch ((data['Main Methods'].v as any).count.value as number) {
    case 1:
      content = `return row0[0] < d;`;
      break;
    case 2:
    case 3:
      content = `if (y == 0) {
  return row0[x] < d;
} else {
  return row1[x] < d;
}`;
      break;
    case 4:
    case 5:
      content = content = `if (y == 0) {
  return row0[x] < d;
} else if (y == 1) {
  return row1[x] < d;
} else if (y == 2) {
  return row2[x] < d;
} else {
  return row3[x] < d;
}`;
      break;
    case 6:
    case 7:
    default:
      content = `if (y == 0) {
  return row0[x] < d;
} else if (y == 1) {
  return row1[x] < d;
} else if (y == 2) {
  return row2[x] < d;
} else if (y == 3) {
  return row3[x] < d;
} else if (y == 4) {
  return row4[x] < d;
} else if (y == 5) {
  return row5[x] < d;
} else if (y == 6) {
  return row6[x] < d;
} else {
  return row7[x] < d;
}`;
      break;
  }
  return `bool isDot(vec2 idx, float d) {
  // calculating the index
  
  highp int x = int(idx.x);
  highp int y = int(idx.y);
  

  ${content}
}`;
};

export const getDotsFragmentShader = (data: Version0Type): string => {
  const sdfMethod = getMainMethod((data['Main Methods'].v as any)[AttributeNames.DotMethods]);

  const color0 = getColor(data.Material['Normal Material']['color 0']);
  const color1 = getColor(data.Material['Normal Material']['color 1']);

  const minGridSize = getMinGridSize(data);
  const dotRadius = minGridSize * 0.5 * (data['Main Methods'].v as any).relativeDotSize.value;

  return `
const vec3 color0 = vec3( ${color0[0].toFixed(3)}, ${color0[1].toFixed(3)}, ${color0[2].toFixed(3)} );
const vec3 color1 = vec3( ${color1[0].toFixed(3)}, ${color1[1].toFixed(3)}, ${color1[2].toFixed(3)} );

${sharedMethods}

const float minGridSize = ${minGridSize.toFixed(2)};
const float dotRadius = ${dotRadius.toFixed(1)};

${tpmsMethodDefinitions}
${sdfMethod}
${getDotsArrays(data)}
${getIndexTresholdMethod(data)}

float getGridIndex(vec3 p) {
  float timedGridSize = minGridSize * (1.0 + .5 * sin(uTime * .5));
  float timedDotRadius = dotRadius * (1.0 + .25 * sin(uTime * 1.0));
  vec2 idx = floor(p.xy / timedGridSize);
  vec2 center = (idx + vec2(.5)) * timedGridSize;
  float d = getMainDistance(vec3((idx + vec2(.5)) * timedGridSize, 0.5));

  if (isDot(mod(idx, count), d)) {
    return sdCircle(vec3(center, dotRadius), p.xy) * .5;
  } else {
    return 1.0;
  }
}

float sdMethod(vec2 p) {
  return getGridIndex(vec3(p, 0.0));
}

void main() {
  float d = sdMethod(uvV.xy);
  gl_FragColor = vec4(getColor(d), 1.0);
}`;
};
