import React, { useEffect, useRef } from 'react';

interface CanvasRenderingProps {
  stripes: string[];
  padding: number;
  width: number;
  height: number;
  backgroundColor: string;
}

function CanvasRendering({ stripes, padding, width, height, backgroundColor } : CanvasRenderingProps) {
  const refCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if(!refCanvas || !refCanvas.current) {
      console.error("Cannot find the canvas in CanvasRendering");
      return;
    }
    refCanvas.current.style.background = backgroundColor;
  }, [backgroundColor])

  useEffect(() => {
    if(!refCanvas || !refCanvas.current) {
      console.error("Cannot find the canvas in CanvasRendering");
      return;
    }
    refCanvas.current.width = width;
    refCanvas.current.height = height;

  }, [width, height]);

  useEffect(() => {
    if(!refCanvas || !refCanvas.current) {
      console.error("Cannot find the canvas in CanvasRendering");
      return;
    }
    const context = refCanvas.current.getContext("2d");

    if(!context) {
      console.log("Could not find context")
      return;
    }
    render(context, stripes);
  }, [stripes, width, height]);

  useEffect(() => {
    if(!refCanvas || !refCanvas.current) {
      console.error("Cannot find the canvas in CanvasRendering");
      return;
    }
    const context = refCanvas.current.getContext("2d");

    if(!context) {
      console.log("Could not find context")
      return;
    }
    render(context, stripes);
  }, [padding])


  function render(context : CanvasRenderingContext2D, stripes: string[]): void {
    const totalPadding = stripes.length * padding;
    const stripeWidth = (width - totalPadding) / stripes.length;
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
          index * (stripeWidth + padding),
          0,
          stripeWidth,
          height
        );
      }
    });
  }


  return (
    <canvas
      ref={refCanvas}
    />
  );
}

export default CanvasRendering;
