import React, { useRef, RefObject } from 'react';
import { format as formatFns } from "date-fns";

interface SaveButtonProps {
  canvas: RefObject<HTMLCanvasElement>;
}

function SaveButton({canvas}: SaveButtonProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null);

  function saveImage() {
    if(canvas.current && anchorRef.current) {
      const format = "jpeg";
      const dataURL = canvas.current.toDataURL(`image/${format}`);
      const dateString = formatFns(new Date(), "dd-MM-yyyy-hh-mm");
      (anchorRef.current as any).download = `${dateString}-image-shreder.${format}`;
      anchorRef.current.href = dataURL.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    }
  }

    return (
    <a
      ref={anchorRef}
      className={"btn btn-primary"}
      onClick={ () => saveImage()}
    >
        Save 📸
    </a>
    )
}

export default SaveButton;