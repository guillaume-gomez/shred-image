import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useSpring, animated } from '@react-spring/three';
import React, { useRef, useEffect } from 'react';
import { ThreeElements, useLoader } from '@react-three/fiber';

interface ThreeJsStripeProps {
  base64Texture: string;
  meshProps: ThreeElements['mesh'];
  stripeWidth: number;
  stripeHeight: number;
}


function ThreeJsStripe({meshProps, base64Texture, stripeWidth, stripeHeight}: ThreeJsStripeProps) {
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

  console.log(stripeWidth, stripeHeight)

  return (
    <animated.mesh
      position={position as any}
      ref={mesh}
      /*{...meshProps}*/
    >
      <boxGeometry args={[stripeWidth, stripeHeight, 0.1]} />
      <meshStandardMaterial map={texture} />
    </animated.mesh>
  )
}

export default ThreeJsStripe;