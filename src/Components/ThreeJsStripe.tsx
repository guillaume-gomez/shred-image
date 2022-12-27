import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame, ThreeElements, useLoader, useThree } from '@react-three/fiber';

interface ThreeJsStripeProps {
  base64Texture: string;
  meshProps: ThreeElements['mesh'];
  widthStripe: number;
  heightStripe: number;
}


function ThreeJsStripe({meshProps, base64Texture, widthStripe, heightStripe}: ThreeJsStripeProps) {
  const mesh = useRef<THREE.Mesh>(null!);
  const { size: { width, height } } = useThree();
 
  //useFrame((state, delta) => (mesh.current.rotation.x += delta));
  const [texture] = useLoader(TextureLoader, [
    base64Texture
  ]);


  if(!texture) {
    return <></>;
  }

    //console.log("width ", width)
  //console.log("height ", heightStripe/height)


  return (
    <mesh
      {...meshProps}
      ref={mesh}
    >
      <boxGeometry args={[1, 10, 0.1]} />
      <meshStandardMaterial map={texture} /*color={hovered ? 'hotpink' : 'orange'}*/ />
    </mesh>
  )
}

export default ThreeJsStripe;