import { DataEntryFactory } from 'url-safe-bitpacking';
import { AttributeNames } from '../enums/attributeNames';
import { ArrayEntryDataType, EnumEntryDataType, OptionalEntryDataType, SingleLevelContentType } from 'url-safe-bitpacking/dist/types';

const mainMethods: EnumEntryDataType = [
  0,
  [
    DataEntryFactory.createInt(5, 1, 100, `count`),
    DataEntryFactory.createFloat(0.1, 0.01, 5, 2, `minSize`),
    DataEntryFactory.createFloat(0.1, 0.01, 5, 2, `maxSize`),
    DataEntryFactory.createInt(0, 0, 1023, `seed`),
  ],
  [DataEntryFactory.createFloat(1, 0.001, 1000, 3, `${AttributeNames.MethodScale}`)],
];

const normalsMaterial: OptionalEntryDataType = [
  false,
  [
    [
      'color',
      [
        DataEntryFactory.createInt(245, 0, 255, AttributeNames.R),
        DataEntryFactory.createInt(219, 0, 255, AttributeNames.G),
        DataEntryFactory.createInt(163, 0, 255, AttributeNames.B),
      ],
    ],
  ],
  [],
];

const materialDefinition: SingleLevelContentType[] = [[AttributeNames.NormalMaterial, normalsMaterial]];

const textArray: ArrayEntryDataType = [[1, 256], [DataEntryFactory.createInt(63, 0, 63, AttributeNames.Text)]];

export const verionArrayDefinition0: SingleLevelContentType[] = [
  [AttributeNames.MainMethods, mainMethods],
  [AttributeNames.Material, materialDefinition],
  [AttributeNames.Text, textArray],
];
