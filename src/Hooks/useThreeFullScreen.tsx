import react, { useState, useRef, RefObject, useEffect } from "react";
import { useFullscreen } from "rooks";

interface useThreeFullScreenProps {
 canvasRef: RefObject<HTMLCanvasElement>
}

function useThreeFullScreen({ canvasRef } : useThreeFullScreenProps) {
    const [windowedWidth, setWindowedWidth] = useState<number>(0);
    const [windowedHeight, setWindowedHeight] = useState<number>(0);
    const { toggleFullscreen, isFullscreenEnabled } = useFullscreen({ target: canvasRef });

    useEffect(() => {
        if(canvasRef.current) {
          const { width, height} = canvasRef.current;
          setWindowedWidth(width);
          setWindowedHeight(height);
        }
    }, [canvasRef]);

    function toggle() {
      if(!canvasRef.current) {
        return;
      }

      if(isFullscreenEnabled){
        canvasRef.current.width =  windowedWidth;
        canvasRef.current.height = windowedHeight;
      } else {
        canvasRef.current.width =  window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
      toggleFullscreen();

    }

    return { toggle };
}

export default useThreeFullScreen;