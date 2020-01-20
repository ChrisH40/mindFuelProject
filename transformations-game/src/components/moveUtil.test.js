import {
    mapToCanvasCoordsFromPixel,
    mapToCanvasCoords,
    mapToGameCoordsInPixel,
    mapToGameCoords,
} from "./moveUtil.js";

test('test mapToCanvasCoordsFromPixel', () => {
    expect(mapToCanvasCoords({ "x": 0, "y": 0 })).toEqual({ "x": 420, "y": 420 });
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