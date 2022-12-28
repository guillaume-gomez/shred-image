import React, { useEffect, useRef } from 'react';

interface CanvasRenderingProps {
  stripes: string[];
  width: number;
  height: number;
}

function CanvasRendering({ stripes, width, height } : CanvasRenderingProps) {
  const refCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if(!refCanvas || !refCanvas.current) {
      console.error("Cannot find the canvas in CanvasRendering");
      return;
    }
    refCanvas.current.width = width;
    refCanvas.current.height = height;
    const context = refCanvas.current.getContext("2d");

    if(!context) {
      console.log("Could not find context")
      return;
    }
    
    const stripeWidth = width / stripes.length;
    context.clearRect(0,0, width, height);

    stripes.map((stripe, index) => {
      let image = new Image();
      image.src = stripe;
      image.onload = () => {
        context.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          index * stripeWidth,
          0,
          stripeWidth,
          height
        );
      }

    });
  }, [stripes, width, height]);


  return (
    <canvas
      ref={refCanvas}
    />
  );
}

export default CanvasRendering;
