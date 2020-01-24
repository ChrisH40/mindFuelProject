// Grid size
export const SIZE = 800;
// Grid to border margin
export const GRID_MARGIN = SIZE * 0.025;
// Units for x, y axis
export const DIMENSION = 20;
export const UNIT = Math.floor(SIZE / DIMENSION);
// Shape of object (not limited to triangle), points coords in counter-clock wise order
// (iX, iY) is the first point of the object, defaut setting: a 3-4-5 triangle
export const initTriangleShape = (iX, iY) => {
  return {
    x1: iX,
    y1: iY,
    x2: iX,
    y2: iY + UNIT * 3,
    x3: iX + UNIT * 4,
    y3: iY + UNIT * 3
  };
};

export const AXIS_LABEL_SIZE = "1.1em";