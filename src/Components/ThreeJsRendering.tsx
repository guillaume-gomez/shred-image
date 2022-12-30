import React, { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useFullscreen } from "rooks";
import ThreeJsStripe from "./ThreeJsStripe";


interface ThreejsRenderingProps {
  stripes: string[];
  padding:number;
  width: number;
  height: number;
  depth: number;
}

function ThreejsRendering({ stripes, padding, width, height, depth } : ThreejsRenderingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toggleFullscreen } = useFullscreen({ target: canvasRef });
  const totalPadding = useMemo(() => stripes.length * padding, [stripes, padding]);
  const normelizedPadding =useMemo(() => padding/width, [padding, width]);
  const widthStripe = useMemo(() => ((width - totalPadding)/stripes.length)/width, [width, stripes]);
  const widthStripes = useMemo(() => stripes.length *(widthStripe + normelizedPadding), [stripes, widthStripe, normelizedPadding]);
  
  if(stripes.length === 0) {
    return <p>Nothing to render</p>
  }

  function randomRange(min :number, max : number) {
    const sign = Math.random() >= 0.5 ? -1 : 1;
    return (Math.random() * (( max - min ) + min)) * sign;
  }

  console.log(randomRange(-depth, depth));

  return (
    <Canvas
      camera={{ position: [0, 0.0, 1], fov: 75, far: 5 }}
      dpr={window.devicePixelRatio}
      onDoubleClick={toggleFullscreen}
      ref={canvasRef}
      style={{width, height}}
    >
      <color attach="background" args={['#DD6E70']} />
      <OrbitControls makeDefault />
      {/*<ambientLight />*/}
      <pointLight position={[10, 10, 10]} />
      <group
        position={[-0.5
          , 0, 0]}
      >
        {
          stripes.map((stripe, index) => {
            return <ThreeJsStripe
                      key={index}
                      widthStripe={widthStripe}
                      heightStripe={height/height}
                      base64Texture={stripe}
                      meshProps={{position:[(index * (widthStripe + normelizedPadding)), 0, randomRange(0, depth)]}}
                   />
          })
        }
      </group>
    </Canvas>
  );
}

export default ThreejsRendering;
