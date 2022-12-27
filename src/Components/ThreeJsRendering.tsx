import React, { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ThreeJsStripe from "./ThreeJsStripe";


interface ThreejsRenderingProps {
  stripes: string[];
  width: number;
  height: number;
}

function ThreejsRendering({ stripes, width, height } : ThreejsRenderingProps) {
  const widthStripe = useMemo(() => width/stripes.length, [width, stripes]);
  if(stripes.length === 0) {
    return <p>J'ai rien à rendre mon gars</p>
  }

  return (
    <Canvas>
      <color attach="background" args={['#DDEE00']} />
      <OrbitControls makeDefault />
      {/*<ambientLight />*/}
      <pointLight position={[10, 10, 10]} />
      {
        stripes.map((stripe, index) => {
          return <ThreeJsStripe
                    key={index}
                    widthStripe={widthStripe}
                    heightStripe={height}
                    base64Texture={stripe}
                    meshProps={{position:[index, 0, Math.random()]}}
                 />
        })
      }
    </Canvas>
  );
}

export default ThreejsRendering;
