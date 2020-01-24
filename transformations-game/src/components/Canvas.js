import React, { useEffect, useRef } from "react";
import "./Canvas.css";
import d from "./drawUtil";
import { mapToCanvasCoords } from "./moveUtil";
import "tachyons";

const Canvas = props => {
  const canvasEl = useRef(null);

  useEffect(() => {
    // check if the browser supports canvas
    if (canvasEl.current.getContext) {
      var ctx = canvasEl.current.getContext("2d");
      ctx.clearRect(0, 0, canvasEl.current.width, canvasEl.current.height);
      // draw a 10 x 10 (by default) grid
      d.drawGrid({
        ctx,
        labelFillStyle: "orange",
        lineStyle: "#ddd",
        fillStyle: "rgba(0,0,0,.2)"
      });
      d.drawAxis({ ctx, lineStyle: "#000" });
      d.drawTriangle({
        ...props.triangleCoords,
        ctx,
        lineStyle: "rgb(155,189,238)",
        fillStyle: "rgba(155, 189,238,0.8)"
      });
      // draw target triangle
      d.drawTriangle({
        ...mapToCanvasCoords(props.target),
        ctx,
        lineStyle: "rgb(188,198,34)",
        fillStyle: "rgba(188,198,34, 0.8)"
      });
    }
  }, [props.triangleCoords]);

  return (
    <canvas
      id="canvas"
      ref={canvasEl}
      width={props.width}
      height={props.width * 1}
      style={{ border: "1px solid black" }}
    >
      Please switch to browser that supports canvas API
    </canvas>
  );
};

export default Canvas;
