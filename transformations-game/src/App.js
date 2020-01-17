import React from "react";
import Canvas from "./components/Canvas";

const App = () => {
  return (
    <div /*onClick={e => console.log("x: ", e.clientX, "y: ", e.clientY)}*/>
      <Canvas />
    </div>
  );
};

export default App