import { Canvas } from '@react-three/fiber';
import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import { ShaderMaterial } from 'three';
import vsSource from 'src/Shaders/tpmsVertexShader.glsl?raw';
// import fsSource from 'src/Shaders/tpmsCircles.glsl?raw';
import { useData } from '../state/state';
import { getText } from './helpermethods';
import { Version0Type } from '../modelDefinition/types/version0.generatedType';
import { Text } from '@react-three/drei';
import { getCircleFragmentShader } from './shaderConstructors/circle';
import { getFragmentShader } from './shaderConstructors/factory';

const size = 1000;

// prettier-ignore
const vertices = new Float32Array([
  -size, -size, 0,
  size, -size, 0,
  size, size, 0,
  size, size, 0,
  -size, size, 0, 
  -size, -size, 0
]);

// prettier-ignore
const uvs = new Float32Array([
  -size, -size,
  size, -size,
  size, size,
  size, size,
  -size, size, 
  -size, -size
]);

const Plane = (...props: any) => {
  const data = useData((s) => s.data);
  const materialRef = useRef<ShaderMaterial>(null);
  const [fShader, setState] = useState(getFragmentShader(data as any as Version0Type));

  useEffect(() => {
    setState(getFragmentShader(data as any as Version0Type));
    if (materialRef.current) materialRef.current.needsUpdate = true;
  }, [data]);

  return (
    <mesh {...props}>
      <bufferGeometry>
        <bufferAttribute attach='attributes-position' count={6} array={vertices} itemSize={3} />
        <bufferAttribute attach='attributes-uv' count={6} array={uvs} itemSize={2} />
      </bufferGeometry>
      <shaderMaterial needsUpdate={true} ref={materialRef} fragmentShader={fShader} vertexShader={vsSource} />
    </mesh>
  );
};

export const ThreeCanvas: React.FC<{
  canvasRef: LegacyRef<HTMLCanvasElement>;
}> = ({ canvasRef }) => {
  const data = useData((s) => s.data);
  const text = getText((data as any as Version0Type).Text as any);

  return (
    <Canvas
      gl={{ preserveDrawingBuffer: true }}
      key='threejs-canvas'
      ref={canvasRef}
      orthographic
      camera={{ zoom: 100, position: [0, 0, 1] }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <Plane />
      <Text anchorX='center' anchorY='middle' color='black' textAlign='center' fontSize={0.5} maxWidth={10} children={text} />
    </Canvas>
  );
};
