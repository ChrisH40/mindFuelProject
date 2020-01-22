import {
    mapToCanvasCoordsFromPixel,
    mapToCanvasCoords,
    mapToGameCoordsInPixel,
    mapToGameCoords,
    distance,
    // translateHelper,
    reorgCoords,
} from "./moveUtil.js";

import moveFunctions from "./moveUtil.js";

test('test mapToCanvasCoordsFromPixel', () => {
    expect(mapToCanvasCoordsFromPixel({ "x": 0, "y": 0 })).toEqual({ "x": 420, "y": 420 });
    expect(mapToCanvasCoordsFromPixel({ "x": 10, "y": 10 })).toEqual({ "x": 430, "y": 410 });
    expect(mapToCanvasCoordsFromPixel({ "x": -20, "y": -20 })).toEqual({ "x": 400, "y": 440 });
});

test('test mapToCanvasCoords', () => {
    expect(mapToCanvasCoords({ "x": 0, "y": 0 })).toEqual({ "x": 420, "y": 420 });
    expect(mapToCanvasCoords({ "x": 4, "y": 2 })).toEqual({ "x": 580, "y": 340 });
    expect(mapToCanvasCoords({ "x": -4, "y": -2 })).toEqual({ "x": 260, "y": 500 });
});

test('test mapToGameCoords', () => {
    expect(mapToGameCoords({ "x": 0, "y": 0 })).toEqual({ "x": -10.5, "y": 10.5 });
    expect(mapToGameCoords({ "x": 420, "y": 420 })).toEqual({ "x": 0, "y": 0 });
});

test('test mapToGameCoordsInPixel', () => {
    expect(mapToGameCoordsInPixel({ "x": 0, "y": 0 })).toEqual({ "x": -420, "y": 420 });
    expect(mapToGameCoordsInPixel({ "x": 10, "y": 10 })).toEqual({ "x": -410, "y": 410 });
    expect(mapToGameCoordsInPixel({ "x": -20, "y": -20 })).toEqual({ "x": -440, "y": 440 });
});

test('test distance', () => {
    expect(distance(0, 0, 1, 1)).toEqual(1.41);
    expect(distance(0, 0, 2, 2)).toEqual(2.83);
});

test('test reorgCoords', () => {
    expect(reorgCoords({ "x1": 0, "y1": 0 })).toEqual({"1": {"x": 0, "y": 0}});
    expect(reorgCoords({ "x1": 1, "y1": 1, "x2": 2, "y2": 2 })).toEqual({"1": {"x": 1, "y": 1}, "2": {"x": 2, "y": 2}});
});

test('test rotate', () => {
    let testRotation = moveFunctions.rotate({x1: 800, y1: 640, x2: 800, y2: 760, x3: 640, y3: 760}, 0, 0, 90)
    expect(testRotation["x3"]).toEqual(760);
    expect(testRotation["y2"]).toEqual(40);
    let testRotation2 = moveFunctions.rotate({x1: 800, y1: 640, x2: 800, y2: 760, x3: 640, y3: 760}, 0, 0, -90)
    expect(testRotation2["x3"]).toEqual(80);
    expect(testRotation2["y2"]).toEqual(800);
});

test('test translate', () => {
    expect(moveFunctions.translate({ x1: 420, y1: 420}, 1, 2)).toEqual({"x1": 460, "y1": 340});
    expect(moveFunctions.translate({ x1: 20, y1: 20}, 10, -10)).toEqual({"x1": 420, "y1": 420});
});

test('test reflect', () => {
    expect(moveFunctions.reflect({x1: 800, y1: 640, x2: 800, y2: 760, x3: 640, y3: 760}, 0, 1, 0)).toEqual({"x1": 800, "x2": 800, "x3": 640, "y1": 200, "y2": 80, "y3": 80});
    expect(moveFunctions.reflect({x1: 800, y1: 640, x2: 800, y2: 760, x3: 640, y3: 760}, 1, 0, 0)).toEqual({"x1": 40, "x2": 40, "x3": 200, "y1": 640, "y2": 760, "y3": 760});
    expect(moveFunctions.reflect({x1: 800, y1: 640, x2: 800, y2: 760, x3: 640, y3: 760}, 1, 0, 1)).toEqual({"x1": -40, "x2": -40, "x3": 120, "y1": 640, "y2": 760, "y3": 760});
});
