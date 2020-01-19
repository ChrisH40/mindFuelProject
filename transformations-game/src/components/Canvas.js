import React, { useEffect, useRef } from "react";
import "./Canvas.css";
import u from "./drawUtil";
import "tachyons";

const Canvas = props => {
  const canvasEl = useRef(null);

  useEffect(() => {
    // check if the browser supports canvas
    if (canvasEl.current.getContext) {
      var ctx = canvasEl.current.getContext("2d");
      ctx.clearRect(0, 0, canvasEl.current.width, canvasEl.current.height);
      // draw a 10 x 10 (by default) grid
      u.drawGrid(ctx);
      u.drawAxis(ctx);
      u.drawTriangle({ ...props.triangleCoords, ctx });
    }
  }, [props.triangleCoords]);

  return (
    <canvas
      id="canvas"
      ref={canvasEl}
      width={props.width}
      height={props.height}
    >
      Please switch to browser that supports canvas API
    </canvas>
  );
};

export default Canvas;
