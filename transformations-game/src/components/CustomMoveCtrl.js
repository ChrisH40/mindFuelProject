import React from "react";
import "tachyons";

const CustomMoveCtrl = props => {
  const [translate, reflect, rotate] = props.movement;

  //-----------------------block code starts--------------------------------------------------
  let onDragOver = (ev) => {
    ev.preventDefault();
    ev.target.style.cursor = "grabbing"
  };

  let onDragStart = (ev, name) => {
    ev.dataTransfer.setData("id", name);
  };

  let onDrop = (ev, category) => {
    let name = ev.dataTransfer.getData("id");
    let selectedMove = props.moves.filter(move => {
      if (move.name === name) {
        move.category = category
        if (move.category === "staged" && move.moveType === "reflect") {
          reflect(
            props.triangleCoords,
            move.reflectX,
            move.reflectY,
            move.cre
          )
        }
        if (move.category === "staged" && move.moveType === "translate") {
          translate(
            props.triangleCoords,
            move.ixt,
            move.iyt
          )
        }
        if (move.category === "staged" && move.moveType === "rotate") {
          rotate(
            props.triangleCoords,
            move.ixro,
            move.iyro,
            move.rotateFactor
          )
        }
      }
    })
    let updatedMoves = [...props.moves]; //copy old array data

    for (let item of updatedMoves) {
      if (item.name === selectedMove.name) {
        item = selectedMove
      }
    }
    props.setMoves(updatedMoves)
  };

  let displayMoves = {
    preStage: [],
    staged: []
  };
  props.moves.forEach(t => {
    displayMoves[t.category].push(
      <div
        key={t.name}
        onDragStart={t.category === "staged" ? null : e => onDragStart(e, t.name)}
        draggable
        className={"draggable " + t.style}
      >
        {t.name}
      </div>
    );
  });

  //-----------------------block code ends--------------------------------------------------

  return (
    <div>
      <div className="top-container">
        <h2 className="tc f3 pa0"> 😍 Make Some Cool Moves Here 😎</h2>
        {//original controller goes here
        }
        <span className="move-header">Pre-Staged Moves</span>
        <div
          className="preStage"
          onDragOver={e => onDragOver(e)}
          onDrop={e => {
            onDrop(e, "preStage");
          }}
        >
          {displayMoves.preStage}
        </div>
      </div>
      <div className="bottom-container">
        <span className="move-header">Staged Moves</span>
        <div
          className="droppable"
          onDragOver={e => onDragOver(e)}
          onDrop={e =>
            onDrop(e, "staged")}
        >
          {displayMoves.staged}
        </div>
      </div>
    </div>
  );
};

export default CustomMoveCtrl;

//------------------------old handlers for advanced menu---------------------------------------
  // const ixt = useRef(null);
  // const iyt = useRef(null);
  // const ixro = useRef(null);
  // const iyro = useRef(null);
  // const cre = useRef(null);

  // let [rotateDirection, setRotateDirection] = useState(null);
  // let [rotateFactor, setRotateFactor] = useState("90");
  // let [reflectAxis, setReflectAxis] = useState(null);

  // const handleTranslate = () => {
  //   if (ixt.current.value === "" || iyt.current.value === "") return;
  //   translate(
  //     props.triangleCoords,
  //     Number(ixt.current.value),
  //     Number(iyt.current.value)
  //   );
  //   ixt.current.value = 0;
  //   iyt.current.value = 0;
  //   // console.log(ixt.current.value, iyt.current.value);
  // };

  // const handleRotate = () => {
  //   if (!rotateDirection) {
  //     console.log(rotateDirection)
  //     return
  //   }
  //   else if (rotateDirection === "optionClockwise") {
  //     rotate(
  //       props.triangleCoords,
  //       Number(ixro.current.value),
  //       Number(iyro.current.value),
  //       Number(-rotateFactor)
  //     );
  //     ixro.current.value = 0;
  //     iyro.current.value = 0;
  //     setRotateDirection(null);
  //     setRotateFactor("90");
  //   }
  //   else if (rotateDirection === "optionCounterClockwise") {
  //     rotate(
  //       props.triangleCoords,
  //       Number(ixro.current.value),
  //       Number(iyro.current.value),
  //       Number(rotateFactor)
  //     );
  //     ixro.current.value = 0;
  //     iyro.current.value = 0;
  //     setRotateDirection(null);
  //     setRotateFactor("90");
  //     // console.log(ixro.current.value, iyro.current.value, degro.current.value);
  //   }
  // };

  // const handleReflect = () => {
  //   if (!reflectAxis) {
  //     return
  //   }
  //   else {
  //     reflect(
  //       props.triangleCoords,
  //       reflectAxis === "optionX" ? Number(1) : 0,
  //       reflectAxis === "optionY" ? Number(1) : 0,
  //       cre.current.value == "" ? 0 : Number(-cre.current.value)
  //     );
  //     cre.current.value = 0;
  //     setReflectAxis(null);
  //   }
  // };




//--------------------------old return code for advanced menu-------------------------------

      // {/* <div className="tc custom-ops"> */}
      // <div className="translate-container bg-washed-red">
      //   {/* <div className="translate ma2 bg-washed-red"> */}
      //   <text className="menu-header">Translate</text><br />
      //   <label htmlFor="xUnitt">
      //     X:
      //     <input
      //       className="menu-item"
      //       type="number"
      //       min={-DIMENSION / 2}
      //       max={DIMENSION / 2}
      //       id="xUnitt"
      //       ref={ixt}
      //       defaultValue="0"
      //     />
      //   </label>
      //   <label htmlFor="yUnitt">
      //     Y:
      //     <input
      //       className="menu-item"
      //       type="number"
      //       id="yUnitt"
      //       min={-DIMENSION / 2}
      //       max={DIMENSION / 2}
      //       ref={iyt}
      //       defaultValue="0"
      //     />
      //   </label>
      //   <br />
      //   <button className="menu-button" onClick={handleTranslate}>Translate</button>
      //   {/* </div> */}
      // </div>
      // <div className="rotate-container bg-washed-green">
      //   {/* <div className="rotate ma2 bg-washed-green"> */}
      //   <text className="menu-header">Rotate 90°</text><br />
      //   <label htmlFor="degro">
      //     Clockwise
      //         <input
      //       className="menu-item"
      //       type="radio"
      //       value="optionClockwise"
      //       checked={rotateDirection === "optionClockwise"}
      //       onChange={(event) => { setRotateDirection(event.target.value) }} />
      //     Counter Clockwise
      //         <input
      //       className="menu-item"
      //       type="radio"
      //       value="optionCounterClockwise"
      //       checked={rotateDirection === "optionCounterClockwise"}
      //       onChange={(event) => { setRotateDirection(event.target.value) }} />
      //     Factor
      //         <select
      //       className="menu-item"
      //       onChange={(event) => { setRotateFactor(event.target.value) }}
      //       value={rotateFactor}
      //       defaultValue="90">
      //       <option value="90">1</option>
      //       <option value="180">2</option>
      //       <option value="270">3</option>
      //       <option value="360">4</option>
      //     </select>
      //     <br />
      //     Focal Point&nbsp;
      //         <label htmlFor="xUnitro">
      //       X:
      //         <input
      //         className="menu-item"
      //         type="number"
      //         min={-DIMENSION / 2}
      //         max={DIMENSION / 2}
      //         id="xUnitro"
      //         ref={ixro}
      //         defaultValue="0"
      //       />
      //     </label>
      //     <label htmlFor="yUnitro">
      //       Y:
      //         <input
      //         className="menu-item"
      //         type="number"
      //         min={-DIMENSION / 2}
      //         max={DIMENSION / 2}
      //         id="yUnitro"
      //         ref={iyro}
      //         defaultValue="0"
      //       />
      //     </label>
      //     {/* deg:
      //         <input type="number" id="degro" ref={degro} defaultValue="90" /> */}
      //   </label>
      //   {/* </div> */}
      //   <br />
      //   <button className="menu-button" onClick={handleRotate}>Rotate</button>
      // </div>
      // <div className="reflect-container bg-lightest-blue">
      //   {/* <div className="reflect ma2 bg-lightest-blue"> */}
      //   <text className="menu-header">Reflect</text><br />
      //   <label htmlFor="are">
      //     X-Axis
      //         <input
      //       className="menu-item"
      //       type="radio"
      //       value="optionX"
      //       checked={reflectAxis === 'optionX'}
      //       onChange={(event) => { setReflectAxis(event.target.value) }} />
      //   </label>
      //   {/* <span className="f4">or</span> */}
      //   <label htmlFor="bre">
      //     Y-Axis
      //         <input
      //       className="menu-item"
      //       type="radio"
      //       value="optionY"
      //       checked={reflectAxis === 'optionY'}
      //       onChange={(event) => { setReflectAxis(event.target.value) }} />
      //   </label>
      //   <label htmlFor="cre">
      //     <input
      //       className="menu-item"
      //       type="number"
      //       min={-DIMENSION / 2}
      //       max={DIMENSION / 2}
      //       id="cre"
      //       ref={cre}
      //       defaultValue="0"
      //     />
      //     + / -
      //       </label>
      //   <br />
      //   <button className="menu-button" onClick={handleReflect}>Reflect</button>
      //   {/* </div> */}
      // </div>
      // {/* </div> */}