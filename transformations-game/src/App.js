import React from "react";
import LevelOne from "./components/LevelOne";

const App = () => {

  return (
    <div className="App">
      <div className="Canvas">
        <LevelOne />
      </div>
      <div className="Right-Container">
        <div className="Top-Container">
          Top Menu
        </div>
        <div className="Bottom-Container">
          Bottom Menu
        </div>
      </div>
    </div>
  )
};

export default App