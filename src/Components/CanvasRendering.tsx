import React, { useEffect, useRef } from 'react';

interface CanvasRenderingProps {
  stripes: string[];
  nbStripes:number;
  width: number;
  height: number;
}

function CanvasRendering({ stripes, nbStripes, width, height } : CanvasRenderingProps) {
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

    const stripeWidth = width / nbStripes;
    context.clearRect(0,0, width, height);

    stripes.map((stripe, index) => {
      let image = new Image();
      image.src = stripe;

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
    });
  }, [stripes, nbStripes, width, height]);


  return (
    <canvas
      ref={refCanvas}
    />
  );
}

export default CanvasRendering;
