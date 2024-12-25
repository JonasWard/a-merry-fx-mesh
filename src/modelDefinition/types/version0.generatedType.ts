import { DataType } from 'url-safe-bitpacking';

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
          ['count']: { value: number; name: 'count'; type: DataType.INT; min: 1; max: 100; bits: 7 };
          ['minSize']: { value: number; name: 'minSize'; type: DataType.FLOAT; min: 1; max: 500; precision: 0; significand: 9 };
          ['maxSize']: { value: number; name: 'maxSize'; type: DataType.FLOAT; min: 1; max: 500; precision: 0; significand: 9 };
          ['sinAmplitude']: { value: number; name: 'sinAmplitude'; type: DataType.FLOAT; min: 0; max: 1; precision: 3; significand: 10 };
          ['seed']: { value: number; name: 'seed'; type: DataType.INT; min: 0; max: 1023; bits: 10 };
          ['rotationSpeed']: { value: number; name: 'rotationSpeed'; type: DataType.FLOAT; min: 0.001; max: 0.1; precision: 3; significand: 7 };
          ['angleMultiplier']: { value: number; name: 'angleMultiplier'; type: DataType.FLOAT; min: 1; max: 100; precision: 1; significand: 10 };
          ['centerOffsetMultiplier']: { value: number; name: 'centerOffsetMultiplier'; type: DataType.FLOAT; min: -5; max: 5; precision: 2; significand: 10 };
          ['edgeThickness']: { value: number; name: 'edgeThickness'; type: DataType.FLOAT; min: 0.1; max: 50; precision: 1; significand: 9 };
        };
      }
    | {
        s: { value: 1; name: 'Main Methods'; type: DataType.ENUM; max: 1; bits: 1 };
        v: {
          ['count']: { value: number; name: 'count'; type: DataType.INT; min: 1; max: 100; bits: 7 };
          ['minSize']: { value: number; name: 'minSize'; type: DataType.FLOAT; min: 1; max: 500; precision: 0; significand: 9 };
          ['maxSize']: { value: number; name: 'maxSize'; type: DataType.FLOAT; min: 1; max: 500; precision: 0; significand: 9 };
          ['DotMethods']: {
            s: { value: number; name: 'DotMethods'; type: DataType.INT; min: 1; max: 3; bits: 2 };
            v: {
              ['SDFMethod']: { value: number; name: 'SDFMethod'; type: DataType.ENUM; max: 6; bits: 3 };
              ['MethodScale']: { value: number; name: 'MethodScale'; type: DataType.FLOAT; min: 0.001; max: 1000; precision: 3; significand: 20 };
            }[];
          };
        };
      };
  ['Material']: {
    ['Normal Material']: {
      ['color 0']: ColorType;
      ['color 1']: ColorType;
    };
  };
  ['Text']: {
    s: { value: number; name: 'Text'; type: DataType.INT; min: 1; max: 4; bits: 2 };
    v: {
      ['Text']: { value: number; name: 'Text'; type: DataType.INT; min: 0; max: 63; bits: 6 };
    }[];
  };
};
