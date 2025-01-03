import { DataEntryFactory } from 'url-safe-bitpacking';
import { AttributeNames } from '../enums/attributeNames';
import { ArrayEntryDataType, EnumEntryDataType, SingleLevelContentType } from 'url-safe-bitpacking/dist/types';
import { SDFMainMethodLabels } from './methodSemantics';

const dotsMethodVersionStack: ArrayEntryDataType = [
  [1, 3],
  [
    DataEntryFactory.createEnum(2, SDFMainMethodLabels.length - 1, AttributeNames.SDFMethod),
    DataEntryFactory.createFloat(0.01, 0.001, 1000, 3, AttributeNames.MethodScale),
  ],
];

const dreiEckWarp: EnumEntryDataType = [
  1,
  [
    DataEntryFactory.createFloat(20.0, 0.0, 100.0, 1, 'warpMagnitude'),
    DataEntryFactory.createFloat(0.0, -1000, 1000, 1, `xOffset`),
    DataEntryFactory.createFloat(0.0, -1000, 1000, 1, `yOffset`),
    DataEntryFactory.createFloat(0.0, -1000, 1000, 1, `zOffset`),
    [AttributeNames.X, dotsMethodVersionStack],
  ],
  [
    DataEntryFactory.createFloat(20.0, 0.0, 100.0, 1, 'warpMagnitude'),
    DataEntryFactory.createFloat(0.0, -1000, 1000, 1, `xOffset`),
    DataEntryFactory.createFloat(0.0, -1000, 1000, 1, `yOffset`),
    DataEntryFactory.createFloat(0.0, -1000, 1000, 1, `zOffset`),
    [AttributeNames.Y, dotsMethodVersionStack],
  ],
  [
    DataEntryFactory.createFloat(20.0, 0.0, 100.0, 1, 'warpMagnitude'),
    DataEntryFactory.createFloat(0.0, -1000, 1000, 1, `xOffset`),
    DataEntryFactory.createFloat(0.0, -1000, 1000, 1, `yOffset`),
    DataEntryFactory.createFloat(0.0, -1000, 1000, 1, `zOffset`),
    [AttributeNames.X, dotsMethodVersionStack],
    [AttributeNames.Y, dotsMethodVersionStack],
  ],
  [],
];

const mainMethods: EnumEntryDataType = [
  0,
  // circles
  [
    DataEntryFactory.createInt(100, 1, 100, `count`),
    DataEntryFactory.createFloat(10, 1, 500, 0, `minSize`),
    DataEntryFactory.createFloat(10, 1, 500, 0, `maxSize`),
    DataEntryFactory.createFloat(0.05, 0, 1, 3, 'sinAmplitude'),
    DataEntryFactory.createInt(0, 0, 1023, `seed`),
    DataEntryFactory.createFloat(0.01, 0.001, 0.1, 3, `rotationSpeed`),
    DataEntryFactory.createFloat(10, 1, 100, 1, `angleMultiplier`),
    DataEntryFactory.createFloat(-0.5, -5, 5, 2, `centerOffsetMultiplier`),
    DataEntryFactory.createFloat(0.1, 0.1, 50, 1, `edgeThickness`),
  ],
  // dots
  [
    DataEntryFactory.createInt(5, 1, 7, `iterationCount`),
    DataEntryFactory.createFloat(50, 1, 500, 0, `maxGridSize`),
    DataEntryFactory.createFloat(0.6, 0.05, 1, 2, `relativeDotSize`),
    DataEntryFactory.createFloat(1000, 0, 10000, 0, `twinkleRate`),
    DataEntryFactory.createFloat(0.0, -1000, 1000, 1, `xOffset`),
    DataEntryFactory.createFloat(0.0, -1000, 1000, 1, `yOffset`),
    DataEntryFactory.createFloat(0.0, -1000, 1000, 1, `zOffset`),
    [AttributeNames.DotMethods, dotsMethodVersionStack],
  ],
  // line art
  [],
  // waves
  [
    DataEntryFactory.createFloat(5, 1, 100, 0, 'waveHeight'),
    DataEntryFactory.createInt(10, 1, 10, 'waveFronts'),
    DataEntryFactory.createInt(7, 1, 10, 'waveCount'),
    DataEntryFactory.createFloat(0.9, 0.01, 5.0, 2, 'waveSpacing'),
    DataEntryFactory.createFloat(1.98, 0, 5, 2, 'waveShift'),
    DataEntryFactory.createFloat(209, 2.0, 1000, 1, 'amplitude'),
    DataEntryFactory.createFloat(509, 2.0, 1000, 1, 'period'),
    DataEntryFactory.createFloat(-0.2, -1, 1, 2, 'stackOffsetX'),
    DataEntryFactory.createFloat(-1.0, -5, 5, 2, 'stackOffsetY'),
    DataEntryFactory.createFloat(-0.5, -1, 1, 2, 'stackOffsetYStart'),
    DataEntryFactory.createFloat(0.5, 0, 100, 2, 'uPhaseShift'),
    DataEntryFactory.createBoolean(false, 'stepColors'),
    DataEntryFactory.createBoolean(false, 'stepHeights'),
  ],
  // moiree
  [],
  // Drei Eck
  [
    DataEntryFactory.createFloat(100, 10, 250, 1, 'xSpacing'),
    DataEntryFactory.createFloat(100, 10, 250, 1, 'ySpacing'),
    DataEntryFactory.createBoolean(true, 'alternating'),
    DataEntryFactory.createBoolean(false, 'filled'),
    DataEntryFactory.createBoolean(false, 'inverted'),
    [AttributeNames.Warp, dreiEckWarp],
    DataEntryFactory.createFloat(0.1, 0.001, 1, 3, 'uTimeMultiplier'),
    DataEntryFactory.createInt(500, 0, 1000, 'uR'),
  ],
  // Warped Grid
  [
    DataEntryFactory.createBoolean(true, 'internalDistance'),
    DataEntryFactory.createBoolean(false, 'inverted'),
    DataEntryFactory.createBoolean(true, 'euclidic'),
    DataEntryFactory.createFloat(0.25, 0, 1.0, 3, 'edgeShift'),
    DataEntryFactory.createFloat(0.75, 0.01, 1, 2, 'edgeThickness'),
    DataEntryFactory.createFloat(0.0, -1000, 1000, 1, `xOffset`),
    DataEntryFactory.createFloat(0.0, -1000, 1000, 1, `yOffset`),
    DataEntryFactory.createFloat(0.0, -1000, 1000, 1, `zOffset`),
    DataEntryFactory.createFloat(0.1, 0.001, 1, 3, 'uTimeMultiplier'),
    DataEntryFactory.createFloat(20.0, -100, 100, 1, `uZShift`),
    [AttributeNames.DotMethods, dotsMethodVersionStack],
  ],
];

const normalsMaterial: SingleLevelContentType[] = [
  [
    'color 0',
    [
      DataEntryFactory.createInt(245, 0, 255, AttributeNames.R),
      DataEntryFactory.createInt(219, 0, 255, AttributeNames.G),
      DataEntryFactory.createInt(163, 0, 255, AttributeNames.B),
    ],
  ],
  [
    'color 1',
    [
      DataEntryFactory.createInt(245, 0, 255, AttributeNames.R),
      DataEntryFactory.createInt(152, 0, 255, AttributeNames.G),
      DataEntryFactory.createInt(30, 0, 255, AttributeNames.B),
    ],
  ],
  [
    'text',
    [
      DataEntryFactory.createInt(0, 0, 255, AttributeNames.R),
      DataEntryFactory.createInt(0, 0, 255, AttributeNames.G),
      DataEntryFactory.createInt(0, 0, 255, AttributeNames.B),
    ],
  ],
  [
    'text stroke',
    [
      DataEntryFactory.createInt(255, 0, 255, AttributeNames.R),
      DataEntryFactory.createInt(255, 0, 255, AttributeNames.G),
      DataEntryFactory.createInt(255, 0, 255, AttributeNames.B),
    ],
  ],
];

const materialDefinition: SingleLevelContentType[] = [[AttributeNames.NormalMaterial, normalsMaterial]];

const textArray: ArrayEntryDataType = [[1, 256], [DataEntryFactory.createInt(63, 0, 63, AttributeNames.Text)]];

export const verionArrayDefinition0: SingleLevelContentType[] = [
  [AttributeNames.MainMethods, mainMethods],
  [AttributeNames.Material, materialDefinition],
  [AttributeNames.Text, textArray],
];
