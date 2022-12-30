import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useSpring, animated } from '@react-spring/three';
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, ThreeElements, useLoader, useThree } from '@react-three/fiber';

interface ThreeJsStripeProps {
  base64Texture: string;
  meshProps: ThreeElements['mesh'];
  widthStripe: number;
  heightStripe: number;
}


function ThreeJsStripe({meshProps, base64Texture, widthStripe, heightStripe}: ThreeJsStripeProps) {
  const { size: { width, height } } = useThree();
  const [{ position }, api] = useSpring<any>(() =>({
    from: meshProps.position,
    position: meshProps.position,
    config: { mass: 0.5, tension: 500, friction: 150, precision: 0.0001 }
  }))
  useEffect(() => {
    api.start({ to: {position: meshProps.position}})
  }, [meshProps, api])
 
  const mesh = useRef<THREE.Mesh>(null!);
  //useFrame((state, delta) => (mesh.current.rotation.x += delta));
  const [texture] = useLoader(TextureLoader, [
    base64Texture
  ]);


  if(!texture) {
    return <></>;
  }

  return (
    <animated.mesh
      position={position as any}
      ref={mesh}
      /*{...meshProps}*/
    >
      <boxGeometry args={[widthStripe, heightStripe, 0.1]} />
      <meshStandardMaterial map={texture} /*color={hovered ? 'hotpink' : 'orange'}*/ />
    </animated.mesh>
  )
}

export default ThreeJsStripe;