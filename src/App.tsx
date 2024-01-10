import React, { useState, useRef, useEffect } from 'react';
import { shuffle, sortBy } from "lodash";
import { useOnWindowResize } from "rooks";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Slider from "./Components/Slider";
import Card from "./Components/Card";
import ColorInput from "./Components/ColorInput";
import FromImageToStripes from "./Components/FromImageToStripes";
import CanvasRendering from "./Components/CanvasRendering";
import ThreeJsRendering from "./Components/ThreeJsRendering";
import { stripeDataInterface, ImageSize } from "./interfaces";

import './App.css';

function App() {
  const [nbStripes, setNbStripes] = useState<number>(12);
  const [stripes, setStripes] = useState<stripeDataInterface[]>([]);
  const [width, setWidth] = useState<number>(500);
  const [height, setHeight] = useState<number>(500);
  const [padding, setPadding] = useState<number>(4);
  const [maxPadding, setMaxPadding] = useState<number>(100);
  const [depth, setDepth] = useState<number>(0.2);
  const [grayScale, setGrayScale] = useState<boolean>(false);
  const [threeJsMode, setThreeJsMode] = useState<boolean>(true);
  const [backgroundColor, setBackgroundColor] = useState<string>("#c5c4c4");
  const [imageSize, setImageSize] = useState<ImageSize>({width: 0, height: 0});


  const resultDivRef = useRef<HTMLDivElement>(null);
  const [maxWidth, setMaxWidth] = useState<number>(1920);
  const [maxHeight, setMaxHeight] = useState<number>(1080);

  useEffect(() => {
    limitSize()
  }, [])
  
  useOnWindowResize(() => {
    limitSize();
  });

  useEffect(() => {
    computeMaxPadding();
  }, [imageSize])

  function onChangeStripe(base64Stripes: string[], imageSize: ImageSize) {
    const stripesData = base64Stripes.map(((base64Data, index) => {
      return { base64Data, index }
    }));
    setStripes(stripesData);
    setImageSize(imageSize);
  }

  function limitSize() {
    const newWidth = (resultDivRef.current as any).clientWidth;
    const newHeight = (resultDivRef.current as any).clientHeight;

    setMaxWidth(newWidth);
    setMaxHeight(newHeight);

    const newPredefinedWidth = newWidth - 50;
    setWidth(newPredefinedWidth);
    setHeight(newPredefinedWidth * 9/16);

  }

  function sortStripes() {
    const stripeData = sortBy(stripes, 'index');
    setStripes(stripeData);
  }

  function computeMaxPadding() {
    const stripeWidth = imageSize.width / nbStripes;
    const maxPadding = Math.max(Math.floor(stripeWidth - 10), 10);
    setMaxPadding(maxPadding);
    if(maxPadding < padding) {
      setPadding(maxPadding);
    }
  }

  return (
    <div className="flex flex-col gap-7 bg-base-200">
      <Header />
      <div className="flex md:flex-row flex-col gap-5 p-3 flex-grow">
        <div className="lg:basis-1/4 md:basis-5/12 basis-auto">
          <Card title="Settings">
            <FromImageToStripes
              graScale={grayScale}
              nbStripes={nbStripes}
              onChangeStripe={onChangeStripe}
            />
               <Slider
                min={1}
                max={20}
                value={nbStripes}
                onChange={(newValue) => setNbStripes(newValue)}
                label="Number of stripes"
              />
              <Slider
                min={100}
                max={maxWidth}
                value={width}
                onChange={(newValue) => setWidth(newValue)}
                label="Width"
              />
              <Slider
                min={100}
                max={maxHeight}
                value={height}
                onChange={(newValue) => setHeight(newValue)}
                label="Height"
              />
              <Slider
                min={0}
                max={maxPadding}
                value={padding}
                onChange={(newValue) => setPadding(newValue)}
                label="Spacing"
              />
              <Slider
                min={0}
                max={1}
                step={0.001}
                value={depth}
                onChange={(newValue) => setDepth(newValue)}
                label="Depth (3d only)"
                float={true}
                disabled={!threeJsMode}
              />
              <ColorInput
                label="Background Color"
                value={backgroundColor}
                onChange={(newColor) => setBackgroundColor(newColor)}
              />
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">3D</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    onChange={() => setThreeJsMode(!threeJsMode)}
                    checked={threeJsMode}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">GrayScale</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    onChange={() => setGrayScale(!grayScale)}
                    checked={grayScale}
                  />
                </label>
              </div>
              <button className="btn btn-primary" onClick={() => setStripes(shuffle(stripes))}>Shuffle</button>
              <button className="btn btn-secondary" onClick={() => sortStripes()}>Sort</button>
           </Card>
         </div>
         <div className="lg:basis-3/4 md:basis-7/12 basis-auto " ref={resultDivRef}>
           <Card title="Result">
            {
              threeJsMode ?
              <ThreeJsRendering
                padding={padding}
                width={width}
                height={height}
                stripes={stripes}
                backgroundColor={backgroundColor}
                depth={depth}
                imageSize={imageSize}
              /> :
              <CanvasRendering
                padding={padding}
                width={width}
                height={height}
                stripes={stripes}
                backgroundColor={backgroundColor}
                imageSize={imageSize}
              />
            }
            </Card>
          </div>
       </div>
      <Footer />
    </div>
  );
}

export default App;
