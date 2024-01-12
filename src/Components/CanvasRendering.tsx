import React, { useEffect, useRef, useCallback } from 'react';
import { stripeDataInterface, ImageSize } from "../interfaces";

interface CanvasRenderingProps {
  stripes: stripeDataInterface[];
  padding: number;
  width: number;
  height: number;
  backgroundColor: string;
  imageSize: ImageSize;
}

function CanvasRendering({ stripes, padding, width, height, backgroundColor, imageSize } : CanvasRenderingProps) {
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const render = useCallback((context : CanvasRenderingContext2D, stripes: stripeDataInterface[]) => {
    const totalPadding = stripes.length * padding;
    const stripeWidth = (width - totalPadding) / stripes.length;
    context.clearRect(0,0, width, height);

    stripes.forEach((stripe, index) => {
      let image = new Image();
      image.src = stripe.base64Data;
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
  }, [imageSize, width, height, padding]);

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
  }, [stripes, render]);

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
  }, [padding, stripes, render])

  return (
    <canvas
      ref={refCanvas}
    />
  );
}

export default CanvasRendering;
