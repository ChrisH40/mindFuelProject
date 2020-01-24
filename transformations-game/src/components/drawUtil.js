import { SIZE, GRID_MARGIN, DIMENSION, AXIS_LABEL_SIZE } from "./settings";
const cellSize = Math.floor(SIZE / DIMENSION);
export default {
  getCanvasXYOffset: canvas => {
    return {
      x: Math.floor(canvas.getBoundingClientRect().x),
      y: Math.floor(canvas.getBoundingClientRect().y)
    };
  },
  drawDot: (x = GRID_MARGIN, y = GRID_MARGIN, ctx) => {
    ctx.fillStyle = "orange";
    ctx.fillRect(x, y, 10, 10);
  },
  drawGrid: ({
    ctx,
    x = GRID_MARGIN,
    y = GRID_MARGIN,
    fillStyle = "rgba(255,255,255,1)",
    lineStyle = "black",
    labelFillStyle = "black"
  }) => {
    ctx.fillStyle = fillStyle;
    ctx.fillRect(x, y, SIZE, SIZE);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.font = `${AXIS_LABEL_SIZE} menlo`;
    ctx.setLineDash([2, 2]);
    for (let i = 0; i <= DIMENSION; i++) {
      ctx.moveTo(x, y + cellSize * i);
      ctx.lineTo(x + SIZE, y + cellSize * i);
      ctx.fillStyle = labelFillStyle;
      ctx.fillText(
        `${
          i == DIMENSION / 2
            ? ""
            : i < DIMENSION / 2
            ? DIMENSION / 2 - i
            : -i + DIMENSION / 2
        }`,
        x + (cellSize * DIMENSION) / 2 + 5,
        y + cellSize * i + 5
      );
    }
    ctx.moveTo(x, y);
    for (let i = 0; i <= DIMENSION; i++) {
      ctx.moveTo(x + cellSize * i, y);
      ctx.strokeStyle = lineStyle;
      ctx.lineTo(x + cellSize * i, y + SIZE);
      ctx.fillText(
        `${i <= DIMENSION / 2 ? -DIMENSION / 2 + i : i - DIMENSION / 2}`,
        x + cellSize * i - 12,
        y + (cellSize * DIMENSION) / 2 + 17
      );
    }
    ctx.stroke();
  },
  drawAxis: ({
    ctx,
    x = GRID_MARGIN,
    y = GRID_MARGIN,
    lineStyle = "black"
  }) => {
    ctx.setLineDash([0]);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x + (cellSize * DIMENSION) / 2, y);
    ctx.lineTo(x + (cellSize * DIMENSION) / 2, y + cellSize * DIMENSION);
    ctx.moveTo(x, y + (cellSize * DIMENSION) / 2);
    ctx.lineTo(x + cellSize * DIMENSION, y + (cellSize * DIMENSION) / 2);
    ctx.strokeStyle = lineStyle;
    ctx.stroke();
  },
  drawTriangle: ({ x1, y1, x2, y2, x3, y3, ctx, lineStyle, fillStyle }) => {
    ctx.beginPath();
    ctx.strokeStyle = lineStyle;
    ctx.fillStyle = fillStyle;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
};
