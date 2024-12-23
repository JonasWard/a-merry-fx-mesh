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

export const MainMethodLabels = shaderMethods.map((value, index) => ({ value: index, label: value }));
export const enumSemantics = { [AttributeNames.MainMethods]: MainMethodLabels, [AttributeNames.Version]: [{ value: 0, label: VersionNames.Alpha }] };
