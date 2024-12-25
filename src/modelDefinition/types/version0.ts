import { DataEntryFactory } from 'url-safe-bitpacking';
import { AttributeNames } from '../enums/attributeNames';
import { ArrayEntryDataType, EnumEntryDataType, SingleLevelContentType } from 'url-safe-bitpacking/dist/types';
import { SDFMainMethodLabels } from './methodSemantics';

const dotsMethodVersionStack: ArrayEntryDataType = [
  [1, 3],
  [
    DataEntryFactory.createEnum(4, SDFMainMethodLabels.length - 1, AttributeNames.SDFMethod),
    DataEntryFactory.createFloat(0.025, 0.001, 1000, 3, AttributeNames.MethodScale),
  ],
];

const mainMethods: EnumEntryDataType = [
  0,
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
  [
    DataEntryFactory.createInt(5, 1, 7, `iterationCount`),
    DataEntryFactory.createFloat(50, 1, 500, 0, `maxGridSize`),
    DataEntryFactory.createFloat(0.6, 0.05, 1, 2, `relativeDotSize`),
    DataEntryFactory.createFloat(1000, 0, 10000, 0, `twinkleRate`),
    DataEntryFactory.createFloat(0.0, -100, 100, 1, `xOffset`),
    DataEntryFactory.createFloat(0.0, -100, 100, 1, `yOffset`),
    DataEntryFactory.createFloat(0.0, -100, 100, 1, `zOffset`),
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
