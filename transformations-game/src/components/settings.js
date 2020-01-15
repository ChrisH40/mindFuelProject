// Grid size
export const SIZE = 600;
// Margin between canvas border and grid
export const GRID_MARGIN = SIZE * 0.025;
// Units for x, y axis
export const DIMENSION = 20;
const unit = Math.floor(SIZE / DIMENSION);
// Shape of object (not limited to triangle), points coords in counter-clock wise order
// (iX, iY) is the first point of the object, defaut setting: a 3-4-5 triangle
export const triangle_shape = (iX, iY) => {
  return {
    x1: iX,
    y1: iY,
    x2: iX,
    y2: iY + unit * 3,
    x3: iX + unit * 4,
    y3: iY + unit * 3
  };
};

export const AXIS_LABEL_SIZE = "0.6em";
