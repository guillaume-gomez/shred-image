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
  const widthStripe = useMemo(() => (width/stripes.length)/width, [width, stripes]);
  if(stripes.length === 0) {
    return <p>Nothing to render</p>
  }

  console.log(widthStripe/width);

  return (
    <Canvas
      camera={{ position: [0, 0.0, 1.5], fov: 75, far: 5 }}
      dpr={window.devicePixelRatio}
      style={{width, height }}
    >
      <color attach="background" args={['#DD6E70']} />
      <OrbitControls makeDefault />
      {/*<ambientLight />*/}
      <pointLight position={[10, 10, 10]} />
      {
        stripes.map((stripe, index) => {
          return <ThreeJsStripe
                    key={index}
                    widthStripe={widthStripe}
                    heightStripe={height/height}
                    base64Texture={stripe}
                    meshProps={{position:[-0.5 + index * widthStripe, 0, 0]}}
                 />
        })
      }
    </Canvas>
  );
}

export default ThreejsRendering;
