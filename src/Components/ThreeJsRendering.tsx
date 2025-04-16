import React, { useRef , useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Grid } from '@react-three/drei';
import { useFullscreen } from "rooks";
import ThreeJsStripe from "./ThreeJsStripe";
import { stripeDataInterface, ImageSize } from "../interfaces";
import PanCursor from "../panCursor.png";
import Help3D from "./Help3D";
import { useDoubleTap } from 'use-double-tap';


interface ThreejsRenderingProps {
  stripes: stripeDataInterface[];
  padding:number;
  width: number;
  height: number;
  depth: number;
  backgroundColor: string;
  imageSize: ImageSize;
}

function ThreejsRendering({ stripes, padding, width, height, depth, backgroundColor, imageSize } : ThreejsRenderingProps) {
  const ContainerCanvasRef = useRef<HTMLDivElement>(null);
  const { toggleFullscreen } = useFullscreen({ target: ContainerCanvasRef });
    const doubleTapEvent = useDoubleTap(() => {
      toggleFullscreen();
  });
  const totalPadding = useMemo(() => stripes.length * padding, [stripes, padding]);
  const normelizedPadding =useMemo(() => padding/imageSize.width, [padding, imageSize.width]);
  const stripeWidth = useMemo(() => ((imageSize.width - totalPadding)/stripes.length)/imageSize.width, [imageSize.width, stripes, totalPadding]);
  const shapeWidth = useMemo(() => stripes.length *(stripeWidth + normelizedPadding), [stripes, stripeWidth, normelizedPadding]);
  // before stripes are cut
  if(stripes.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <p>Upload an image to see the final result</p>
        <canvas style={{ background: backgroundColor, width, height }}/>
      </div>
    );
  }

  function randomRange(min :number, max : number) {
    const sign = Math.random() >= 0.5 ? -1 : 1;
    return (Math.random() * (( max - min ) + min)) * sign;
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <div
        className="h-screen w-full"
        ref={ContainerCanvasRef}
        {...doubleTapEvent}
      >
        <Canvas
          camera={{ position: [0, 0.0, 1], fov: 75, far: 5 }}
          dpr={window.devicePixelRatio}
        >
          <color attach="background" args={[backgroundColor]} />
          <OrbitControls makeDefault />
          {/*<Grid />*/}
          <Stage environment={null} adjustCamera shadows="contact">
            {
              stripes.map((stripe, index) => {
                return <ThreeJsStripe
                          key={stripe.index}
                          stripeWidth={stripeWidth}
                          stripeHeight={imageSize.height/imageSize.width}
                          base64Texture={stripe.base64Data}
                          meshProps={{position:[(index * (stripeWidth + normelizedPadding)), 0, randomRange(0, depth)]}}
                       />
              })
            }
          </Stage>
        </Canvas>
      </div>
      <img className="absolute opacity-75" src={PanCursor} width="44px" />
      <Help3D />
      <ul className="text-xs">
        <li>Double click/tap to switch to fullscreen</li>
        <li>Use your mouse or finger to move the camera</li>
      </ul>
    </div>
  );
}

export default ThreejsRendering;
