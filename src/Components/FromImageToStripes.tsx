import React, { useRef, useEffect } from 'react';
import { ImageSize } from "../interfaces";

interface FromImageToStripesProps {
  nbStripes: number;
  graScale: boolean;
  onChangeStripe: (base64Stripes : string[], imageSize: ImageSize) => void;
  onChangeBackground: (backgroundColor: string) => void;
}

function FromImageToStripes( { nbStripes, onChangeStripe, onChangeBackground, graScale } : FromImageToStripesProps ) {
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const refImage = useRef<HTMLImageElement>(null);
 
  useEffect(() => {
    if(refImage.current && !!refImage.current.src) {
      cutImageIntoStripes();
    }
  }, [nbStripes, graScale])

  function loadImage(event: React.ChangeEvent<HTMLInputElement>) {
    if(event && event.target && event.target.files && refImage.current) {
      refImage.current.src = URL.createObjectURL(event.target.files[0]);
      refImage.current.onload =  (event: any) => {
        cutImageIntoStripes();
      };
    }
  }

  function cutImageIntoStripes() {
    if(!refCanvas || !refCanvas.current) {
      console.error("cannot find refCanvas");
      return;
    }

    if(!refImage || !refImage.current) {
      console.error("cannot find refImage");
      return;
    }

    const stripes = [];
    const context = refCanvas.current.getContext('2d');
    if(!context) {
      console.error("Cannot find context");
      return;
    }

    const stripeWidth = refImage.current.width / nbStripes;
    refCanvas.current.width = stripeWidth;
    refCanvas.current.height = refImage.current.height;

    for(let i = 0; i < nbStripes; i++) {
      context.drawImage(
        refImage.current,
        i * stripeWidth,
        0,
        stripeWidth,
        refImage.current.height,
        0,
        0,
        refCanvas.current.width,
        refCanvas.current.height
      );

      if(graScale) {
       convertToGrayScale(context, refCanvas.current.width, refCanvas.current.height);
      }
      stripes.push(refCanvas.current.toDataURL());
    }
    onChangeStripe(stripes, {width:refImage.current.width, height: refImage.current.height});
    onChangeBackground(averageColor(context, refCanvas.current.width, refCanvas.current.height));
  }

  function rgbToHex(r : number, g: number, b: number) : string {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
  }

  function averageColor(context: CanvasRenderingContext2D, width: number, height: number) {
    const imageData = context.getImageData(0, 0, width, height);

    let red = 0;
    let green = 0;
    let blue = 0;

    const numberOfPixels = imageData.data.length/4;

    for (let i = 0; i < imageData.data.length; i += 4) {
     red += imageData.data[i];
     green += imageData.data[i + 1];
     blue += imageData.data[i + 2];

    }
    return rgbToHex(red / numberOfPixels, green / numberOfPixels, blue / numberOfPixels);
  }

  function convertToGrayScale(context: CanvasRenderingContext2D, width: number, height: number) {
    const imageData = context.getImageData(0, 0, width, height);
    for (let i = 0; i < imageData.data.length; i += 4) {
     const red = imageData.data[i];
     const green = imageData.data[i + 1];
     const blue = imageData.data[i + 2];
     // use gimp algorithm to generate prosper grayscale
     const gray = (red * 0.3 + green * 0.59 + blue * 0.11);

     imageData.data[i] = gray;
     imageData.data[i + 1] = gray;
     imageData.data[i + 2] = gray;
     imageData.data[i + 3] = 255;
    }
    context.putImageData(imageData, 0, 0);
  }


  return (
    <>
      <input
        type="file"
        accept="image/*" 
        className="file-input file-input-bordered file-input-primary w-full max-w-xs"
        onChange={loadImage}
      />
      <img className="hidden" ref={refImage} />
      <canvas
        className="hidden"
        ref={refCanvas}
      />
    </>
  );
}

export default FromImageToStripes;