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
  drawGrid: (ctx, x = GRID_MARGIN, y = GRID_MARGIN) => {
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.font = `${AXIS_LABEL_SIZE} menlo`;
    ctx.setLineDash([2, 2]);
    for (let i = 0; i <= DIMENSION; i++) {
      ctx.moveTo(x, y + cellSize * i);
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
      ctx.lineTo(x + SIZE, y + cellSize * i);
    }
    ctx.moveTo(x, y);
    for (let i = 0; i <= DIMENSION; i++) {
      ctx.moveTo(x + cellSize * i, y);
      ctx.fillText(
        `${i <= DIMENSION / 2 ? -DIMENSION / 2 + i : i - DIMENSION / 2}`,
        x + cellSize * i - 10,
        y + (cellSize * DIMENSION) / 2 + 15
      );
      ctx.lineTo(x + cellSize * i, y + SIZE);
    }
    ctx.strokeStyle = "#888";
    ctx.stroke();
  },
  drawAxis: (ctx, x = GRID_MARGIN, y = GRID_MARGIN) => {
    ctx.setLineDash([0]);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x + (cellSize * DIMENSION) / 2, y);
    ctx.lineTo(x + (cellSize * DIMENSION) / 2, y + cellSize * DIMENSION);
    ctx.moveTo(x, y + (cellSize * DIMENSION) / 2);
    ctx.lineTo(x + cellSize * DIMENSION, y + (cellSize * DIMENSION) / 2);
    ctx.strokeStyle = "#000";
    ctx.stroke();
  },
  drawTriangle: ({ x1, y1, x2, y2, x3, y3, ctx }) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.stroke();
  }
};
