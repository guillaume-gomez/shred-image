import React, { useState } from 'react';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import FromImageToStripes from "./Components/FromImageToStripes";
import CanvasRendering from "./Components/CanvasRendering";

import './App.css';


function App() {
  const [nbStripes, setNbStripes] = useState<number>(12);
  const [stripes, setStripes] = useState<string[]>([]);
  
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
      <FromImageToStripes
        nbStripes={nbStripes}
        onChangeStripe={onChangeStripe}
      />
      <CanvasRendering
        width={500}
        height={500}
        nbStripes={nbStripes}
        stripes={stripes}
      />
      <Footer />
    </div>
  );
}

export default App;
