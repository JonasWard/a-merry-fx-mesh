import { Version0Type } from '../../modelDefinition/types/version0.generatedType';
import sharedMethods from '../../Shaders/tpmsShared.glsl?raw';

const getDeltaValues = (count: number, baseValue: number, type: number, minMax?: [number, number]): number[] => {
  const baseValues = [...new Array(count)].map(() => baseValue);
  const [sMin, sMax] = minMax ?? [1.0, 1.0];

  switch (type) {
    case 1: // pairs
      return baseValues.map((v, i) => (i % 2 === 0 ? v * sMin : v * sMax));
    case 2: // trees
      return baseValues.map((v, i) => (i % 3 === 0 ? v * sMin : i % 3 === 1 ? v * (sMin + sMax) * 0.5 : v * sMax));
    case 3: // ramped
      return baseValues.map((v, i) => v * (sMin + (i / (count - 1)) * (sMax - sMin)));
    case 0: // all the same
    default:
      return baseValues;
  }
};

export const getMoireeFragmantShader = (data: Version0Type): string => {
  const directionCount = (data['Main Methods'].v as any).directionCount.value;
  const directionWidth = (data['Main Methods'].v as any).directionWidth.value;
  const directionDelta = (data['Main Methods'].v as any).directionDelta.value;

  const moireeDeltaPattern = (data['Main Methods'].v as any).moireeDeltaPattern.s.value;
  const mDPMin = (data['Main Methods'].v as any).moireeDeltaPattern?.v?.minMultiplier?.value;
  const mDPMax = (data['Main Methods'].v as any).moireeDeltaPattern?.v?.maxMultiplier?.value;
  const diretionDeltaValues = getDeltaValues(
    directionCount,
    directionDelta,
    moireeDeltaPattern,
    mDPMin !== undefined && mDPMax !== undefined ? [mDPMin, mDPMax] : undefined
  );

  const centerDelta = (data['Main Methods'].v as any).centerDelta.value;
  const moireeCenterPattern = (data['Main Methods'].v as any).moireeCenterPattern.s.value;
  const mCPMin = (data['Main Methods'].v as any).moireeCenterPattern?.v?.minMultiplier?.value;
  const mCPMax = (data['Main Methods'].v as any).moireeCenterPattern?.v?.maxMultiplier?.value;
  const centerRadii = getDeltaValues(
    directionCount,
    centerDelta,
    moireeCenterPattern,
    mCPMin !== undefined && mCPMax !== undefined ? [mCPMin, mCPMax] : undefined
  );

  const alphaDelta = Math.PI / directionCount;
  const moireeAngleVariationPattern = (data['Main Methods'].v as any).moireeAngleVariationPattern.s.value;
  const mAVPin = (data['Main Methods'].v as any).moireeAngleVariationPattern?.v?.minMultiplier?.value;
  const mAVPax = (data['Main Methods'].v as any).moireeAngleVariationPattern?.v?.maxMultiplier?.value;
  const angleDeltas = getDeltaValues(
    directionCount,
    alphaDelta,
    moireeAngleVariationPattern,
    mAVPin !== undefined && mAVPax !== undefined ? [mAVPin, mAVPax] : undefined
  );
  const hardEdge = (data['Main Methods'].v as any).hardEdge.value;
  const uAlphaDelta = (data['Main Methods'].v as any).uAlphaDeltaMultiplier.value * alphaDelta;

  return `
const int directionCount = ${directionCount};
const float directionWidth = ${(directionWidth * 0.5).toFixed(3)};
const float[] deltas = float[${directionCount}](${diretionDeltaValues.map((v) => v.toFixed(3)).join(', ')});
const float[] directions = float[${directionCount}](${angleDeltas.map((v, i) => (v + alphaDelta * i).toFixed(3)).join(', ')});
const vec2[] centers = vec2[${directionCount}](${centerRadii.map((v) => `vec2(${v.toFixed(3)}, ${v.toFixed(3)})`).join(', ')});
const float uTM = ${(data['Main Methods'].v as any).uTimeMultiplier.value.toFixed(3)};

${sharedMethods}

vec2 rotateVec2AroundPoint(vec2 v, float a, vec2 t) {
  return t + mat2(cos(a), sin(a), -sin(a), cos(a)) * (v - t);
}

float sdMoiree(vec2 uv, float delta) {
  return (abs(mod(uv.x, delta) - delta * 0.5)) ${hardEdge ? '- directionWidth * .5' : ` * ${(2 / directionWidth).toFixed(3)}`};
  
}

float sdMethod(vec2 uv) {
  float d = 1000.;
  for (int i = 0; i < directionCount; i++) {
    d = min(d, sdMoiree(rotateVec2AroundPoint(uv, directions[i] + sin(uTime * uTM + float(i) * 100.
    ) * ${uAlphaDelta.toFixed(3)},centers[i] * sin(uTime * uTM * .1 + float(i) * .01) * 10.), deltas[i] + float(i) * sin(uTime * uTM * .1) * 10.));
  }

  return d;
}
  
void main() {
  float d = sdMethod(uvV.xy);
  gl_FragColor = vec4(getColor(d), 1.0);
}`;
};
