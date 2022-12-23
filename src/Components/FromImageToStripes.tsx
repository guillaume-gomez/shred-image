import React, { useRef, useState, useEffect } from 'react';
import { shuffle } from "lodash";

interface FromImageToStripesProps {
  nbStripes: number;
  onChangeStripe: (base64Stripes : string[]) => void;
}

function FromImageToStripes( { nbStripes, onChangeStripe } : FromImageToStripesProps ) {
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const refImage = useRef<HTMLImageElement>(null);
 
  useEffect(() => {
    if(refImage.current && refImage.current.src) {
      cutImageIntoStripes();
    }
  }, [nbStripes])

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
      stripes.push(refCanvas.current.toDataURL());
    }
    onChangeStripe(shuffle(stripes));
  }

  return (
    <>
      <input
        type="file"
        accept="image/*" 
        className="file-input file-input-bordered file-input-primary w-full max-w-xs"
        onChange={loadImage}
      />
      <img ref={refImage} />
      <canvas
        className="hidden"
        ref={refCanvas}
      />
    </>
  );
}

export default FromImageToStripes;