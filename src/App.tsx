import React, { useState } from 'react';
import { shuffle } from "lodash";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import FromImageToStripes from "./Components/FromImageToStripes";
import CanvasRendering from "./Components/CanvasRendering";
import ThreeJsRendering from "./Components/ThreeJsRendering";

import './App.css';


function App() {
  const [nbStripes, setNbStripes] = useState<number>(12);
  const [stripes, setStripes] = useState<string[]>([]);
  const [width, setWidth] = useState<number>(500);
  const [height, setHeight] = useState<number>(500);
  const [grayScale, setGrayScale] = useState<boolean>(false);
  const [threeJsMode, setThreeJsMode] = useState<boolean>(false);

  function onChangeStripe(base64Stripes: string[]) {
    setStripes(base64Stripes);
  }

  return (
    <div className="App">
      <Header />
      <input 
        type="range"
        min="1"
        max="20"
        value={nbStripes}
        onChange={(e) => setNbStripes(parseInt(e.target.value))}
        className="range range-primary"
      />
      <input 
        type="range"
        min="100"
        max="1920"
        value={width}
        onChange={(e) => setWidth(parseInt(e.target.value))}
        className="range range-primary"
      />
      <input 
        type="range"
        min="100"
        max="1080"
        value={height}
        onChange={(e) => setHeight(parseInt(e.target.value))}
        className="range range-primary"
      />
      <button className="btn btn-primary" onClick={() => setStripes(shuffle(stripes))}>Shuffle</button>
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
      <FromImageToStripes
        graScale={grayScale}
        nbStripes={nbStripes}
        onChangeStripe={onChangeStripe}
      />
      {
        threeJsMode ?
        <ThreeJsRendering
          width={width}
          height={height}
          stripes={stripes}
        /> :
        <CanvasRendering
          width={width}
          height={height}
          stripes={stripes}
        />
      }
      <Footer />
    </div>
  );
}

export default App;
