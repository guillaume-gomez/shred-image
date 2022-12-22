import React from 'react';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import FromImageToStripes from "./Components/FromImageToStripes";

import './App.css';


function App() {
  return (
    <div className="App">
      <Header />
      <FromImageToStripes />
      <Footer />
    </div>
  );
}

export default App;
