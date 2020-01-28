import { SIZE, UNIT, GRID_MARGIN } from "./settings";

// Object.size = obj => {
//   let size = 0,
//     key;
//   for (key in obj) {
//     if (obj.hasOwnProperty(key)) size++;
//   }
//   return size;
// };

// const round = Math.round;
const PI = Math.PI;

export const mapToCanvasCoordsFromPixel = gameCoordsInPixel => {
  const mapped = {};
  for (let [key, value] of Object.entries(gameCoordsInPixel)) {
    if (key.includes("x")) mapped[key] = SIZE / 2 + value + GRID_MARGIN;
    else mapped[key] = SIZE / 2 - value + GRID_MARGIN;
  }
  return mapped;
};

export const mapToCanvasCoords = gameCoords => {
  const mapped = {};
  for (let [key, value] of Object.entries(gameCoords)) {
    if (key.includes("x")) mapped[key] = value * UNIT + SIZE / 2 + GRID_MARGIN;
    else mapped[key] = SIZE / 2 - value * UNIT + GRID_MARGIN;
  }
  return mapped;
};

export const mapToGameCoords = canvasCoords => {
  const mapped = {};
  for (let [key, value] of Object.entries(canvasCoords)) {
    if (key.includes("x"))
      mapped[key] = (value - SIZE / 2 - GRID_MARGIN) / UNIT;
    else mapped[key] = (SIZE / 2 + GRID_MARGIN - value) / UNIT;
  }
  return mapped;
};

export const mapToGameCoordsInPixel = canvasCoords => {
  const mapped = {};
  for (let [key, value] of Object.entries(canvasCoords)) {
    if (key.includes("x")) mapped[key] = value - SIZE / 2 - GRID_MARGIN;
    else mapped[key] = SIZE / 2 + GRID_MARGIN - value;
  }
  return mapped;
};

export const distance = (x1, y1, x2, y2) => {
  return Number(
    Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)).toFixed(2)
  );
};

// export const translateHelper = (canvasCoords, xu, yu) => {
//   const translated = {};
//   for (let [key, value] of Object.entries(canvasCoords)) {
//     if (key.includes("x")) {
//       translated[key] = value + xu * UNIT;
//     } else {
//       translated[key] = value + yu * UNIT;
//     }
//   }
//   return translated;
// };

// change shape from { x1:.., y1:.., x2:.., y2:..} to {1:{x:..,y..}, 2:{x:..,y:..}}
export const reorgCoords = coords => {
  const reorgedCoords = {};
  for (let [key, value] of Object.entries(coords)) {
    const coordPair = {};
    coordPair[`${key.slice(0, 1)}`] = value;
    reorgedCoords[`${key.slice(key.length - 1)}`] = Object.assign(
      {
        ...reorgedCoords[`${key.slice(key.length - 1)}`]
      },
      coordPair
    );
  }
  return reorgedCoords;
};

export default {
  rotate: (coords, xr, yr, deg) => {
    // all in game coords
    // x1' = (x1 - xr)cos(deg) - (y1 - yr)sin(deg) + xr
    // y1' = (x1 - xr)sin(deg) + (y1 - yr)cos(deg) + yr
    const rotated = {};
    let sinDeg = Math.sin((deg / 180) * PI);
    let cosDeg = Math.cos((deg / 180) * PI);
    coords = reorgCoords(mapToGameCoords(coords));
    for (let [idx, pt] of Object.entries(coords)) {
      rotated[`x${idx}`] = (pt.x - xr) * cosDeg - (pt.y - yr) * sinDeg + xr;
      rotated[`y${idx}`] = (pt.x - xr) * sinDeg + (pt.y - yr) * cosDeg + yr;
    }
    return mapToCanvasCoords(rotated);
  },

  translate: (coords, xu, yu) => {
    coords = mapToGameCoordsInPixel(coords);
    const translated = {};
    for (let [key, value] of Object.entries(coords)) {
      if (key.includes("x")) {
        translated[key] = value + xu * UNIT;
      } else {
        translated[key] = value + yu * UNIT;
      }
    }
    return mapToCanvasCoordsFromPixel(translated);
  },

  reflect: (coords, a, b, c) => {
    const reflected = {};
    coords = reorgCoords(mapToGameCoords(coords));
    for (let [idx, pt] of Object.entries(coords)) {
      reflected[`x${idx}`] =
        ((b * b - a * a) * pt.x - 2 * a * b * pt.y - 2 * a * c) /
        (a * a + b * b);
      reflected[`y${idx}`] =
        ((a * a - b * b) * pt.y - 2 * a * b * pt.x - 2 * b * c) /
        (a * a + b * b);
    }
    return mapToCanvasCoords(reflected);
  }
};
