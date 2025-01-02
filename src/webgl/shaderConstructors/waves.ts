import { Version0Type } from '../../modelDefinition/types/version0.generatedType';
import sharedMethods from '../../Shaders/tpmsShared.glsl?raw';

export const getWavesFragmentShader = (data: Version0Type): string => {
  return `
const float amplitude = ${((data['Main Methods'].v as any).amplitude.value * 0.5).toFixed(1)};
const float waveHeight = ${((data['Main Methods'].v as any).waveHeight.value * 0.5).toFixed(1)};
const float period = ${((Math.PI * 2.0) / (data['Main Methods'].v as any).period.value).toFixed(3)};
const vec2 stackDelta = vec2(${(data['Main Methods'].v as any).stackOffsetX.value.toFixed(1)}, ${(data['Main Methods'].v as any).stackOffsetY.value.toFixed(
    1
  )});
const int waveCount = ${(data['Main Methods'].v as any).waveCount.value};
const int waveFronts = ${(data['Main Methods'].v as any).waveFronts.value};
const float waveShift = ${(data['Main Methods'].v as any).waveShift.value.toFixed(1)};
const float baseY = ${(
    ((data['Main Methods'].v as any).waveCount.value - 1) *
    -0.5 *
    ((data['Main Methods'].v as any).amplitude.value + (data['Main Methods'].v as any).waveHeight.value)
  ).toFixed(1)};
const float deltaT = ${((data['Main Methods'].v as any).amplitude.value + (data['Main Methods'].v as any).waveHeight.value).toFixed(1)};

${sharedMethods}

float sdSine(vec2 uv) {
  return waveHeight - abs(uv.y - (sin(uv.x * period) * amplitude));
}

float sdMethod(vec2 uv) {
  float d = -10000.;
  for(int i=0;i<waveCount;++i) {
    for(int j=0;j<waveFronts;++j) {
      d = max(d, sdSine(uv + vec2((1.0 - .5 * float(i) / float(waveFronts)) * waveShift * uTime * ${(data['Main Methods'].v as any).uPhaseShift.value.toFixed(
        3
      )}, baseY + float(i) * deltaT) + stackDelta * float(j)) - waveHeight * float(j) / float(waveFronts));
    }
  }

  return d;
}
  
void main() {
  float d = sdMethod(uvV.xy + vec2(uTime * ${(data['Main Methods'].v as any).uPhaseShift.value.toFixed(3)}, 0.0));
  gl_FragColor = vec4(getColor(d), 1.0);
}`;
};
