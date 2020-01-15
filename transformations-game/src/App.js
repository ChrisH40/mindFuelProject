import React, { useState } from 'react';
import Grid from './components/Grid.js';
import './App.css';

const App = () => {
  let [moveDesc, setMoveDesc] = useState("");
  let [moveType, setMoveType] = useState("Select");

  const handleSubmit = (event) => {
    console.log(moveDesc, moveType);
    setMoveDesc(moveDesc = "");
    setMoveType(moveType = "Select");
    event.preventDefault();
  };

  return (
    <div className="App">
      <div className="Left-Menu-container">
        LEFT MENU
        <br />
        Move Description:
        <form onSubmit={(event) => handleSubmit(event)}>
          {/* May require more move inputs for the demo */}
          <input
            className="Moves-Input"
            type="text"
            placeholder="move desc."
            name="moveDesc"
            value={moveDesc}
            onChange={(event) => setMoveDesc(event.target.value)} />
          <br />
          Move Type:
        <select
            className="Moves-Dropdown"
            name="themeValue"
            value={moveType}
            onChange={(event) => setMoveType(event.target.value)}
          >
            <option value="Select">-- Select Move --</option>
            <option value="Translation">Translation</option>
            <option value="Rotation">Rotation</option>
            <option value="Reflection">Reflection</option>
          </select>
          <br />
          <input
            className="Moves-Submit"
            type="submit"
            value="Submit Move"
          />
        </form>
      </div>
      <div className="Right-Grid-container">
        < Grid />
      </div>
    </div>
  );
}

export default App;
