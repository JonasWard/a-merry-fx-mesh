import { Version0Type } from '../../modelDefinition/types/version0.generatedType';
import sharedMethods from '../../Shaders/tpmsShared.glsl?raw';

export const getWavesFragmentShader = (data: Version0Type): string => {
  const waveCount = (data['Main Methods'].v as any).waveCount.value;
  const relativeWaveSpacing = (data['Main Methods'].v as any).waveSpacing.value;
  const waveFronts = (data['Main Methods'].v as any).waveFronts.value;
  const uPhaseShift = (data['Main Methods'].v as any).uPhaseShift.value.toFixed(3);
  const amplitude = (data['Main Methods'].v as any).amplitude.value;
  const waveHeight = (data['Main Methods'].v as any).waveHeight.value;
  const period = (data['Main Methods'].v as any).period.value;
  const anglePeriod = (Math.PI * 2.0) / period;
  const totalHeight = amplitude + waveHeight;
  const oX = ((data['Main Methods'].v as any).stackOffsetX.value * period).toFixed(2);
  const oY = ((data['Main Methods'].v as any).stackOffsetY.value * totalHeight).toFixed(2);
  const oYStart = ((data['Main Methods'].v as any).stackOffsetYStart.value * totalHeight * (waveFronts - 1)).toFixed(2);
  const areColorsStepped = (data['Main Methods'].v as any).stepColors.value;
  const areHeightsStepped = (data['Main Methods'].v as any).stepHeights.value;

  return `
const float amplitude = ${(amplitude * 0.5).toFixed(1)};
const float waveHeight = ${(waveHeight * 0.5).toFixed(1)};
const vec2 stackDelta = vec2(${oX}, ${oY});
const int waveCount = ${waveCount};
const float[] waveFrontOffsetScale = float[${waveFronts}](${[...new Array(waveFronts)].map((_, i) => (i / waveFronts).toFixed(3)).join(', ')});
const float[] waveFrontShift = float[${waveFronts}](${[...new Array(waveFronts)].map((_, i) => ((waveHeight * i * 0.5) / waveFronts).toFixed(3)).join(', ')});
const int waveFronts = ${waveFronts};
const float waveShift = ${(data['Main Methods'].v as any).waveShift.value.toFixed(1)};
const float baseY = ${((waveCount - 1) * -0.5 * (amplitude + waveHeight)).toFixed(1)};
const float[] deltaT = float[](${[...new Array(waveCount)].map((_, i) => (i * totalHeight * relativeWaveSpacing).toFixed(2)).join(', ')});

${sharedMethods}

float sdSine(vec2 uv) {
  return waveHeight - abs(uv.y - (sin(uv.x * ${anglePeriod.toFixed(3)}) * amplitude));
}

float sdMethod(vec2 uv) {
  float d = -10000.;
  for(int i=0;i<waveCount;++i) {
    for(int j=0;j<waveFronts;++j) {
      float dSine = sdSine(uv + vec2(waveFrontOffsetScale[j] * ${period.toFixed(
        2
      )} * waveShift + (waveFrontOffsetScale[j] * waveShift + 1.0) * uTime * ${uPhaseShift}, baseY + deltaT[i]) + stackDelta * float(j) + ${oYStart}) ${
    areHeightsStepped ? ' - waveFrontShift[j]' : ''
  };
      d = max(d, ${areColorsStepped ? `min(dSine, 1.0 - waveFrontOffsetScale[j])` : 'dSine'});
     
    }
  }

  return d;
}
  
void main() {
  float d = sdMethod(uvV.xy + vec2(uTime * ${uPhaseShift}, 0.0));
  gl_FragColor = vec4(getColor(d), 1.0);
}`;
};
