import { AttributeNames } from '../enums/attributeNames';
import { VersionNames } from '../enums/versionNames';

export enum ShaderNames {
  Circles = 'Circles',
  Dots = 'Dots',
  LineArt = 'Line Art',
  Waves = 'Waves',
  Moiree = 'Moiree',
  DreiEck = 'Drei Eck',
  WarpedGrid = 'Warped Grid',
}

export const shaderMethods = [
  ShaderNames.Circles,
  ShaderNames.Dots,
  ShaderNames.LineArt,
  ShaderNames.Waves,
  ShaderNames.Moiree,
  ShaderNames.DreiEck,
  ShaderNames.WarpedGrid,
];

export enum MethodNames {
  Gyroid = 'Gyroid',
  SchwarzD = 'SchwarzD',
  SchwarzP = 'SchwarzP',
  Perlin = 'Perlin',
  Neovius = 'Neovius',
  Mandelbrot = 'Mandelbrot',
  Sin = 'Sine',
  Cos = 'Cosine',
  Complex = 'Complex',
  Modulus = 'Modulus',
  AlternatingMoldus = 'AlternatingMoldus',
  None = 'None',
}

export const mainMethods = [
  MethodNames.Gyroid,
  MethodNames.SchwarzD,
  MethodNames.SchwarzP,
  MethodNames.Perlin,
  MethodNames.Neovius,
  MethodNames.Mandelbrot,
  MethodNames.Sin,
];

export const PointsMainMethodLabels = shaderMethods.map((value, index) => ({ value: index, label: value }));
export const SDFMainMethodLabels = mainMethods.map((value, index) => ({ value: index, label: value }));
export const enumSemantics = {
  [AttributeNames.MainMethods]: PointsMainMethodLabels,
  [AttributeNames.SDFMethod]: SDFMainMethodLabels,
  [AttributeNames.Version]: [{ value: 0, label: VersionNames.Alpha }],
};
