import { Canvas, useFrame } from '@react-three/fiber';
import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import { ShaderMaterial, Vector3 } from 'three';
import vsSource from 'src/Shaders/tpmsVertexShader.glsl?raw';
// import fsSource from 'src/Shaders/tpmsCircles.glsl?raw';
import { useData } from '../state/state';
import { getColor, getText } from './helpermethods';
import { Version0Type } from '../modelDefinition/types/version0.generatedType';
import { Text } from '@react-three/drei';
import { getFragmentShader } from './shaderConstructors/factory';

const size = 10000;

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

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime = { value: clock.getElapsedTime() };
    }
  });

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
      <shaderMaterial
        uniforms={{
          uTime: { value: 0.5 },
        }}
        needsUpdate={true}
        ref={materialRef}
        fragmentShader={fShader}
        vertexShader={vsSource}
      />
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
      camera={{ zoom: 1, position: [0, 0, 1] }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <Plane />
      <Text
        // material={new ShaderMaterial({ vertexShader: vsSource, fragmentShader: getFragmentShader({ 'Main Methods': { s: { name: 'Text', value: 2 } } }) })}
        anchorX='center'
        anchorY='middle'
        color='black'
        fillOpacity={0.3}
        textAlign='center'
        fontSize={50}
        maxWidth={500}
        children={text}
      />
    </Canvas>
  );
};
