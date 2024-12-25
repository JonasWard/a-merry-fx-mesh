import React, { ReactNode } from 'react';
import { CiLineHeight, CiTextAlignCenter } from 'react-icons/ci';
import { FaKey, FaCog, FaRegCircle } from 'react-icons/fa';
import { FaRegSquareFull } from 'react-icons/fa6';
import { PiChurchDuotone, PiCirclesThree, PiCylinderThin, PiDotsNineLight, PiStackPlusFill, PiWaveSine } from 'react-icons/pi';
import { GiFootprint, GiShardSword, GiWireframeGlobe } from 'react-icons/gi';
import { MdGrid4X4, MdOutlineFitScreen } from 'react-icons/md';
import { DataType } from 'url-safe-bitpacking';
import { AttributeNames } from 'src/modelDefinition/enums/attributeNames';
import { VersionNames } from 'src/modelDefinition/enums/versionNames';
import { MethodNames, ShaderNames } from 'src/modelDefinition/types/methodSemantics';
import { AiOutlineBgColors } from 'react-icons/ai';
import { HiOutlineColorSwatch } from 'react-icons/hi';
import { BsGrid3X3, BsGrid3X3Gap, BsNoiseReduction, BsSoundwave } from 'react-icons/bs';
import { TbArrowCurveLeft, TbTriangles } from 'react-icons/tb';
import { GrPaint } from 'react-icons/gr';
import { VscDatabase } from 'react-icons/vsc';
import { LuWaves } from 'react-icons/lu';
import { IoCubeOutline } from 'react-icons/io5';

import imagegyroid from 'src/assets/icons/gyroid.png';
import imagemandelbrot from 'src/assets/icons/mandelbrot.png';
import imageneovius from 'src/assets/icons/neovius.png';
import imageperlin from 'src/assets/icons/perlin.png';
import imageschwarzD from 'src/assets/icons/schwarzD.png';
import imageschwarzP from 'src/assets/icons/schwarzP.png';
import imageSine from 'src/assets/icons/sine.png';
import imageCosine from 'src/assets/icons/cosine.png';
import imageNone from 'src/assets/icons/none.png';
import imageAlternateTiling from 'src/assets/icons/modAlternateTiling.png';
import imageeComplexTiling from 'src/assets/icons/modeComplexTiling.png';
import imageTiling from 'src/assets/icons/modTiling.png';

export interface IconRendererProps {
  name: string;
  type?: DataType;
  noName?: boolean;
  size?: number;
}

export const getIconForKey = (
  name: string,
  type?: DataType,
  size?: number
): {
  mainIcon: ReactNode;
  subscript?: string;
  superscript?: string;
} => {
  if (type !== undefined)
    switch (name) {
      default:
        switch (type) {
          case DataType.INT:
            return { mainIcon: 'i', subscript: name };
          case DataType.FLOAT:
            return { mainIcon: 'f', subscript: name };
          case DataType.BOOLEAN:
            return { mainIcon: 'b', subscript: name };
          case DataType.VERSION:
            return { mainIcon: 'v', subscript: name };
        }
    }
  switch (name) {
    case AttributeNames.Viewport:
      return { mainIcon: <MdOutlineFitScreen size={size} /> };
    case AttributeNames.CanvasFullScreen:
      return { mainIcon: <GiFootprint size={size} /> };
    case AttributeNames.CanvasWidth:
      return { mainIcon: <CiLineHeight size={size} /> };
    case AttributeNames.CanvasHeight:
      return { mainIcon: <FaRegSquareFull size={size} /> };
    case AttributeNames.Version:
    case AttributeNames.Viewport:
    case AttributeNames.Canvas:
    case AttributeNames.CanvasFullScreen:
    case AttributeNames.CanvasWidth:
    case AttributeNames.CanvasHeight:
    case AttributeNames.Rotation:
    case AttributeNames.ZoomLevel:
    case AttributeNames.MousePosition:
    case AttributeNames.PositionX:
    case AttributeNames.PositionY:
    case AttributeNames.Methods:
      return { mainIcon: <MdGrid4X4 size={size} /> };
    case AttributeNames.MainMethods:
      return { mainIcon: <FaKey size={size} /> };
    case AttributeNames.MethodEnumMain:
    case AttributeNames.MethodScale:
    case AttributeNames.Shmuck:
      return { mainIcon: <AiOutlineBgColors size={size} /> };
    case AttributeNames.ColorCount:
      return { mainIcon: <HiOutlineColorSwatch size={size} /> };
    case VersionNames.Alpha:
      return { mainIcon: 'α' };
    case VersionNames.Beta:
      return { mainIcon: 'β' };
    case VersionNames.Gamma:
      return { mainIcon: 'γ' };
    case VersionNames.Delta:
      return { mainIcon: 'δ' };
    case ShaderNames.Circles:
      return { mainIcon: <PiCirclesThree /> };
    case ShaderNames.Dots:
      return { mainIcon: <PiDotsNineLight size={size} /> };
    case ShaderNames.LineArt:
      return { mainIcon: <BsSoundwave size={size} /> };
    case ShaderNames.Waves:
      return { mainIcon: <LuWaves size={size} /> };
    case ShaderNames.Moiree:
      return { mainIcon: <BsNoiseReduction size={size} /> };
    case ShaderNames.DreiEck:
      return { mainIcon: <TbTriangles size={size} /> };
    case ShaderNames.WarpedGrid:
      return { mainIcon: <BsGrid3X3Gap size={size} /> };
    case AttributeNames.Heights:
      return { mainIcon: <CiLineHeight size={size} /> };
    case 'Sin Method':
      return { mainIcon: <PiWaveSine size={size} /> };
    case 'None Method':
      return { mainIcon: <PiStackPlusFill size={size} /> };
    case 'heightProcessingMethod':
      return { mainIcon: <PiStackPlusFill size={size} /> };
    case VersionNames.Alpha:
      return { mainIcon: 'α' };
    case VersionNames.Beta:
      return { mainIcon: 'β' };
    case VersionNames.Gamma:
      return { mainIcon: 'γ' };
    case VersionNames.Delta:
      return { mainIcon: 'δ' };
    case 'Cube':
      return { mainIcon: <IoCubeOutline size={size} /> };
    case 'Cylinder':
      return { mainIcon: <PiCylinderThin size={size} /> };
    case 'Hanging':
      return { mainIcon: <FaRegCircle size={size} /> };
    case AttributeNames.Settings:
      return { mainIcon: <FaCog size={size} /> };
    case AttributeNames.Material:
      return { mainIcon: <GrPaint size={size} /> };
    case AttributeNames.Base:
      return { mainIcon: <VscDatabase size={size} /> };
    case AttributeNames.Wireframe:
      return { mainIcon: <GiWireframeGlobe size={size} /> };
    case AttributeNames.VerticalProfile:
      return { mainIcon: <TbArrowCurveLeft size={size} /> };
    case 'Church':
      return { mainIcon: <PiChurchDuotone size={size} /> };
    case AttributeNames.NormalMaterial:
      return { mainIcon: <FaRegCircle size={size} /> };
    case AttributeNames.GlobalGeometry:
      return { mainIcon: <BsGrid3X3 size={size} /> };
    case AttributeNames.Visualization:
      return { mainIcon: <GiShardSword size={size} /> };
    case AttributeNames.Vertices:
      return { mainIcon: <IoCubeOutline size={size} /> };
    case AttributeNames.Text:
      return { mainIcon: <CiTextAlignCenter size={size} /> };
    case MethodNames.Gyroid:
      return { mainIcon: <img src={imagegyroid} width={size} /> };
    case MethodNames.SchwarzD:
      return { mainIcon: <img src={imageschwarzD} width={size} /> };
    case MethodNames.SchwarzP:
      return { mainIcon: <img src={imageschwarzP} width={size} /> };
    case MethodNames.Perlin:
      return { mainIcon: <img src={imageperlin} width={size} /> };
    case MethodNames.Neovius:
      return { mainIcon: <img src={imageneovius} width={size} /> };
    case MethodNames.Mandelbrot:
      return { mainIcon: <img src={imagemandelbrot} width={size} /> };
    case MethodNames.Complex:
      return { mainIcon: <img src={imageeComplexTiling} width={size} /> };
    case MethodNames.Modulus:
      return { mainIcon: <img src={imageTiling} width={size} /> };
    case MethodNames.AlternatingMoldus:
      return { mainIcon: <img src={imageAlternateTiling} width={size} /> };
    case MethodNames.Sin:
      return { mainIcon: <img src={imageSine} width={size} /> };
    case MethodNames.Cos:
      return { mainIcon: <img src={imageCosine} width={size} /> };
    case MethodNames.None:
      return { mainIcon: <img src={imageNone} width={size} /> };
    default:
      return { mainIcon: name };
  }
};

export const IconRenderer: React.FC<IconRendererProps> = ({ name, type, noName = false, size = 20 }) => {
  const { mainIcon, subscript, superscript } = getIconForKey(name, type, size);
  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: size * 1.3 }}>
      <div style={{ fontSize: size, alignItems: 'center' }}>{mainIcon}</div>
      {superscript || subscript ? (
        <div
          style={{
            fontSize: size * 0.5,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {superscript ? <div key='superscript'>{superscript}</div> : <div style={{ height: '50%' }} />}
          {subscript ? <div key='subscript'>{subscript}</div> : <div style={{ height: '50%' }} />}
        </div>
      ) : noName ? null : (
        <span style={{ marginLeft: 10 }}>{name}</span>
      )}
    </div>
  );
};
