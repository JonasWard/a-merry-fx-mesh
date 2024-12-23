import { DataType } from 'url-safe-bitpacking';
import { AttributeNames } from '../enums/attributeNames';

export type ColorType = {
  ['R']: {
    value: number;
    name: 'R';
    type: DataType.INT;
    min: 0;
    max: 255;
    bits: 8;
  };
  ['G']: {
    value: number;
    name: 'G';
    type: DataType.INT;
    min: 0;
    max: 255;
    bits: 8;
  };
  ['B']: {
    value: number;
    name: 'B';
    type: DataType.INT;
    min: 0;
    max: 255;
    bits: 8;
  };
};

export type Version0Type = {
  ['Main Methods']:
    | {
        s: { value: 0; name: 'Main Methods'; type: DataType.ENUM; max: 1; bits: 1 };
        v: {
          ['MainMethodEnum']: { value: number; name: 'MainMethodEnum'; type: DataType.ENUM; max: 6; bits: 3 };
          ['count']: { value: number; name: 'count'; type: DataType.INT; min: 1; max: 100; bits: 7 };
          ['minSize']: { value: number; name: 'minSize'; type: DataType.FLOAT; min: 0.01; max: 5; precision: 2; significand: 9 };
          ['maxSize']: { value: number; name: 'maxSize'; type: DataType.FLOAT; min: 0.01; max: 5; precision: 2; significand: 9 };
          ['seed']: { value: number; name: 'seed'; type: DataType.INT; min: 0; max: 1023; bits: 10 };
          ['sinAmplitude']: { value: number; name: 'sinAmplitude'; type: DataType.FLOAT; min: 0; max: 1023; bits: 10 };
        };
      }
    | {
        s: { value: 1; name: 'Main Methods'; type: DataType.ENUM; max: 1; bits: 1 };
        v: {
          ['MainMethodEnum']: { value: number; name: 'MainMethodEnum'; type: DataType.ENUM; max: 6; bits: 3 };
          ['MethodScale']: { value: number; name: 'MethodScale'; type: DataType.FLOAT; min: 0.001; max: 1000; precision: 3; significand: 20 };
        };
      };
  ['Material']: {
    ['Normal Material']:
      | {
          s: { value: true; name: 'Normal Material'; type: DataType.BOOLEAN };
          v: {
            ['color']: {
              ['R']: { value: number; name: 'R'; type: DataType.INT; min: 0; max: 255; bits: 8 };
              ['G']: { value: number; name: 'G'; type: DataType.INT; min: 0; max: 255; bits: 8 };
              ['B']: { value: number; name: 'B'; type: DataType.INT; min: 0; max: 255; bits: 8 };
            };
          };
        }
      | {
          s: { value: false; name: 'Normal Material'; type: DataType.BOOLEAN };
          v: {};
        };
  };
  ['Text']: {
    s: { value: 3; name: 'Text'; type: DataType.INT; min: 1; max: 4; bits: 2 };
    v: {
      ['Text']: { value: number; name: 'Text'; type: DataType.INT; min: 0; max: 63; bits: 6 };
    }[];
  };
};
