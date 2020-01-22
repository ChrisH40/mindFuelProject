import React, { useState, useRef } from "react";
import "tachyons";
import { SIZE, GRID_MARGIN, DIMENSION, initTriangleShape } from "./settings";

const CustomMoveCtrl = props => {
  const ixt = useRef(null);
  const iyt = useRef(null);
  const ixro = useRef(null);
  const iyro = useRef(null);
  const cre = useRef(null);

  let [rotateDirection, setRotateDirection] = useState(null);
  let [rotateFactor, setRotateFactor] = useState("90");
  let [reflectAxis, setReflectAxis] = useState(null);

  const [translate, reflect, rotate] = props.movement;
  const handleTranslate = () => {
    if (ixt.current.value === "" || iyt.current.value === "") return;
    translate(
      props.triangleCoords,
      Number(ixt.current.value),
      Number(iyt.current.value)
    );
    ixt.current.value = 0;
    iyt.current.value = 0;
    // console.log(ixt.current.value, iyt.current.value);
  };

  const handleRotate = () => {
    if (!rotateDirection) {
      console.log(rotateDirection)
      return
    }
    else if (rotateDirection === "optionClockwise") {
      rotate(
        props.triangleCoords,
        Number(ixro.current.value),
        Number(iyro.current.value),
        Number(-rotateFactor)
      );
      ixro.current.value = 0;
      iyro.current.value = 0;
      setRotateDirection(null);
      setRotateFactor("90");
    }
    else if (rotateDirection === "optionCounterClockwise") {
      rotate(
        props.triangleCoords,
        Number(ixro.current.value),
        Number(iyro.current.value),
        Number(rotateFactor)
      );
      ixro.current.value = 0;
      iyro.current.value = 0;
      setRotateDirection(null);
      setRotateFactor("90");
      // console.log(ixro.current.value, iyro.current.value, degro.current.value);
    }
  };

  const handleReflect = () => {
    if (!reflectAxis) {
      return
    }
    else {
      reflect(
        props.triangleCoords,
        reflectAxis === "optionX" ? Number(1) : 0,
        reflectAxis === "optionY" ? Number(1) : 0,
        cre.current.value == "" ? 0 : Number(-cre.current.value)
      );
      cre.current.value = 0;
      setReflectAxis(null);
    }
  };

  return (
    <div>
      <h2 className="tc f3 pa0"> 😍 Make Some Cool Moves Here 😎</h2>
      <div className="tc custom-ops">
        <div className="translate ma2 bg-washed-red">
          <div>
            <label htmlFor="xUnitt">
              X:
              <input
                type="number"
                min={-DIMENSION / 2}
                max={DIMENSION / 2}
                id="xUnitt"
                ref={ixt}
                defaultValue="0"
              />
            </label>
            <label htmlFor="yUnitt">
              Y:
              <input
                type="number"
                id="yUnitt"
                min={-DIMENSION / 2}
                max={DIMENSION / 2}
                ref={iyt}
                defaultValue="0"
              />
            </label>
          </div>
          <button onClick={handleTranslate}>Translate</button>
        </div>
        <div className="rotate ma2 bg-washed-green">
          <div>
            <label htmlFor="degro">
              <b>90° </b>
              Clockwise
              <input type="radio" value="optionClockwise" checked={rotateDirection === "optionClockwise"} onChange={(event) => { setRotateDirection(event.target.value) }} />
              Counter Clockwise
              <input type="radio" value="optionCounterClockwise" checked={rotateDirection === "optionCounterClockwise"} onChange={(event) => { setRotateDirection(event.target.value) }} />
              Factor
              <select
                className="rotate-factor"
                onChange={(event) => { setRotateFactor(event.target.value) }}
                value={rotateFactor}
                defaultValue="90"
              >
                <option value="90">1</option>
                <option value="180">2</option>
                <option value="270">3</option>
                <option value="360">4</option>
              </select>
              Focal Point
              <label htmlFor="xUnitro">
                (X:
              <input
                  type="number"
                  min={-DIMENSION / 2}
                  max={DIMENSION / 2}
                  id="xUnitro"
                  ref={ixro}
                  defaultValue="0"
                />
                ,
            </label>
              <label htmlFor="yUnitro">
                Y:
              <input
                  type="number"
                  min={-DIMENSION / 2}
                  max={DIMENSION / 2}
                  id="yUnitro"
                  ref={iyro}
                  defaultValue="0"
                />
                )
            </label>
              {/* deg:
              <input type="number" id="degro" ref={degro} defaultValue="90" /> */}
            </label>
          </div>
          <button onClick={handleRotate}>Rotate</button>
        </div>
        <div className="reflect ma2 bg-lightest-blue">
          <div>
            <label htmlFor="are">
              X-Axis
              <input type="radio" value="optionX" checked={reflectAxis === 'optionX'} onChange={(event) => { setReflectAxis(event.target.value) }} />
            </label>
            {/* <span className="f4">or</span> */}
            <label htmlFor="bre">
              Y-Axis
              <input type="radio" value="optionY" checked={reflectAxis === 'optionY'} onChange={(event) => { setReflectAxis(event.target.value) }} />
            </label>
            <label htmlFor="cre">
              <input
                type="number"
                min={-DIMENSION / 2}
                max={DIMENSION / 2}
                id="cre"
                ref={cre}
                defaultValue="0"
              />{" "}
              + / -
            </label>
          </div>
          <button onClick={handleReflect}>Reflect</button>
        </div>
      </div>
    </div>
  );
};

export default CustomMoveCtrl;
