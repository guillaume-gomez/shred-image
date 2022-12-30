import React, { useState, useMemo } from 'react';
import { shuffle, sortBy } from "lodash";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Slider from "./Components/Slider";
import Card from "./Components/Card";
import FromImageToStripes from "./Components/FromImageToStripes";
import CanvasRendering from "./Components/CanvasRendering";
import ThreeJsRendering from "./Components/ThreeJsRendering";

import './App.css';

interface stripeDataInterface {
  base64Data: string;
  index: number;
}

function App() {
  const [nbStripes, setNbStripes] = useState<number>(12);
  const [stripes, setStripes] = useState<stripeDataInterface[]>([]);
  const [width, setWidth] = useState<number>(500);
  const [height, setHeight] = useState<number>(500);
  const [padding, setPadding] = useState<number>(4);
  const [depth, setDepth] = useState<number>(0.2);
  const [grayScale, setGrayScale] = useState<boolean>(false);
  const [threeJsMode, setThreeJsMode] = useState<boolean>(false);
  const base64Stripes = useMemo(() => stripes.map(stripe => stripe.base64Data), [stripes]);

  function onChangeStripe(base64Stripes: string[]) {
    const stripesData = base64Stripes.map(((base64Data, index) => {
      return { base64Data, index }
    }));
    setStripes(stripesData);
  }

  function sortStripes() {
    const stripeData = sortBy(stripes, 'index');
    setStripes(stripeData);
  }

  return (
    <div className="flex flex-col gap-7 bg-base-200">
      <Header />
      <div className="p-5 flex md:flex-row flex-col gap-5">
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
              max={1920}
              value={width}
              onChange={(newValue) => setWidth(newValue)}
              label="Width"
            />
            <Slider
              min={100}
              max={1080}
              value={height}
              onChange={(newValue) => setHeight(newValue)}
              label="Height"
            />
            <Slider
              min={0}
              max={100}
              value={padding}
              onChange={(newValue) => setPadding(newValue)}
              label="Spacing"
            />
            <Slider
              min={0}
              max={2}
              step={0.01}
              value={depth}
              onChange={(newValue) => setDepth(newValue)}
              label="Depth (3d only)"
              float={true}
              disabled={!threeJsMode}
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
         <div className="flex-grow">
           <Card title="Result">
            {
              threeJsMode ?
              <ThreeJsRendering
                padding={padding}
                width={width}
                height={height}
                stripes={base64Stripes}
                depth={depth}
              /> :
              <CanvasRendering
                padding={padding}
                width={width}
                height={height}
                stripes={base64Stripes}
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
