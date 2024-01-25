import React, { useEffect,  useRef, useCallback } from 'react';
import { stripeDataInterface, ImageSize } from "../interfaces";
import SaveButton from "./SaveButton";

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
    
    const [computedWidth, computedHeight] = computeWidthAndHeightRatio();

    const totalPadding = stripes.length * padding;
    const stripeWidth = (computedWidth - totalPadding) / stripes.length;
    context.clearRect(0,0, computedWidth, computedHeight);

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
          computedHeight
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
    const [computedWidth, computedHeight] = computeWidthAndHeightRatio();
    refCanvas.current.width = computedWidth;
    refCanvas.current.height = computedHeight;
  }, [width, height, imageSize])

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
  }, [padding, stripes, render]);

  function computeWidthAndHeightRatio() : [number, number] {
    const computedWidth = Math.min(width, imageSize.width);
    const computedHeight = Math.min(height, imageSize.height);
    const ratioHeight = computedHeight/computedWidth;
    const heightWidthRadio = computedWidth * ratioHeight;
    return [computedWidth, heightWidthRadio];
  }

  return (
    <div className="flex flex-col gap-3">
      <canvas
        ref={refCanvas}
      />
      <div>
        <SaveButton canvas={refCanvas} />
      </div>
    </div>
  );
}

export default CanvasRendering;
