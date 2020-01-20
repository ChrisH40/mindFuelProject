import React, { useState, useRef } from "react";
import "tachyons";
import { SIZE, GRID_MARGIN, DIMENSION, initTriangleShape } from "./settings";

const CustomMoveCtrl = props => {
  const ixt = useRef(null);
  const iyt = useRef(null);
  const ixro = useRef(null);
  const iyro = useRef(null);
  const degro = useRef(null);
  const are = useRef(null);
  const bre = useRef(null);
  const cre = useRef(null);

  const [translate, reflect, rotate] = props.movement;
  const handleTranslate = () => {
    if (ixt.current.value === "" || iyt.current.value === "") return;
    translate(
      props.triangleCoords,
      Number(ixt.current.value),
      Number(iyt.current.value)
    );
    // console.log(ixt.current.value, iyt.current.value);
  };

  const handleRotate = () => {
    rotate(
      props.triangleCoords,
      Number(ixro.current.value),
      Number(iyro.current.value),
      Number(degro.current.value) == 0 ? 90 : Number(degro.current.value)
    );
    // console.log(ixro.current.value, iyro.current.value, degro.current.value);
  };

  const handleReflect = () => {
    reflect(
      props.triangleCoords,
      are.current.value == "" ? 0 : Number(are.current.value),
      bre.current.value == "" ? 1 : Number(bre.current.value),
      cre.current.value == "" ? 0 : Number(cre.current.value)
    );
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
              />
            </label>
          </div>
          <button onClick={handleTranslate}>Translate</button>
        </div>
        <div className="rotate ma2 bg-washed-green">
          <div>
            <label htmlFor="xUnitro">
              (X:
              <input
                type="number"
                min={-DIMENSION / 2}
                max={DIMENSION / 2}
                id="xUnitro"
                ref={ixro}
                placeholder="0"
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
                placeholder="0"
              />
              )
            </label>
            <label htmlFor="degro">
              deg:
              <input type="number" id="degro" ref={degro} placeholder="90" />
            </label>
          </div>
          <button onClick={handleRotate}>Rotate</button>
        </div>
        <div className="reflect ma2 bg-lightest-blue">
          <div>
            <label htmlFor="are">
              <input
                type="number"
                min={-DIMENSION / 2}
                max={DIMENSION / 2}
                id="are"
                ref={are}
                placeholder="0"
              />
              x +
            </label>
            {/* <span className="f4">or</span> */}
            <label htmlFor="bre">
              <input
                type="number"
                min={-DIMENSION / 2}
                max={DIMENSION / 2}
                id="bre"
                ref={bre}
                placeholder="1"
              />
              y +
            </label>
            <label htmlFor="cre">
              <input
                type="number"
                min={-DIMENSION / 2}
                max={DIMENSION / 2}
                id="cre"
                ref={cre}
                placeholder="0"
              />{" "}
              = 0
            </label>
          </div>
          <button onClick={handleReflect}>Reflect</button>
        </div>
      </div>
    </div>
  );
};

export default CustomMoveCtrl;
