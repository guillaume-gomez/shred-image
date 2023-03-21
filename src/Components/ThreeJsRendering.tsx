import React, { useRef , useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useFullscreen } from "rooks";
import ThreeJsStripe from "./ThreeJsStripe";
import { stripeDataInterface } from "../interfaces";
import PanCursor from "../panCursor.png";


interface ThreejsRenderingProps {
  stripes: stripeDataInterface[];
  padding:number;
  width: number;
  height: number;
  depth: number;
  backgroundColor: string;
}

function ThreejsRendering({ stripes, padding, width, height, depth, backgroundColor } : ThreejsRenderingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toggleFullscreen } = useFullscreen({ target: canvasRef });
  const totalPadding = useMemo(() => stripes.length * padding, [stripes, padding]);
  const normelizedPadding =useMemo(() => padding/width, [padding, width]);
  const stripeWidth = useMemo(() => ((width - totalPadding)/stripes.length)/width, [width, stripes, totalPadding]);
  const shapeWidth = useMemo(() => stripes.length *(stripeWidth + normelizedPadding), [stripes, stripeWidth, normelizedPadding]);
  
  // before stripes are cut
  if(stripes.length === 0) {
    return <canvas width={width} height={height} style={{ background: backgroundColor }}/>
  }

  function randomRange(min :number, max : number) {
    const sign = Math.random() >= 0.5 ? -1 : 1;
    return (Math.random() * (( max - min ) + min)) * sign;
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <Canvas
        camera={{ position: [0, 0.0, 1], fov: 75, far: 5 }}
        dpr={window.devicePixelRatio}
        onDoubleClick={toggleFullscreen}
        ref={canvasRef}
        style={{width, height}}
      >
        <color attach="background" args={[backgroundColor]} />
        <OrbitControls makeDefault />
        <pointLight position={[10, 10, 10]} />
        <group
          position={[-shapeWidth/2
            , 0, 0]}
        >
          {
            stripes.map((stripe, index) => {
              return <ThreeJsStripe
                        key={stripe.index}
                        stripeWidth={stripeWidth}
                        stripeHeight={height/height}
                        base64Texture={stripe.base64Data}
                        meshProps={{position:[(index * (stripeWidth + normelizedPadding)), 0, randomRange(0, depth)]}}
                     />
            })
          }
        </group>
      </Canvas>
      <img className="absolute opacity-75" src={PanCursor} width="44px" />
      <ul className="text-xs">
        <li>Double click to switch to fullscreen</li>
        <li>Use your mouse or finger to move the camera</li>
      </ul>
    </div>
  );
}

export default ThreejsRendering;
