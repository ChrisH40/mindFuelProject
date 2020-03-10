import React, { useState } from "react";
import * as PIXI from "pixi.js";
import { PixiComponent, useTick } from '@inlet/react-pixi';

export const Player = (props) => {
    const [pivot, setPivot] = useState({ x: props.start.x1, y: props.start.y1 });
    const [x, setX] = useState(props.start.x1);
    const [y, setY] = useState(props.start.y1);
    const [angle, setAngle] = useState(0);
    let [storedAngle, setStoredAngle] = useState(0);
    const [storedScaleX, setStoredScaleX] = useState(1);
    const [storedScaleY, setStoredScaleY] = useState(1);

    const angleCalc = (ang) => {
        if (ang >= 360) {
            return (ang - 360);
        }
        else if (ang <= -360) {
            return ang + 360;
        }
        else return ang;
    };

    const pivotCalc = (ang, xReflect, yReflect) => {
        const moveCombos = [
            [0, 0, 1, 1, { x: (props.rotationFocal["x"] + props.start.x1) - props.current.x1, y: (props.rotationFocal["y"] + props.start.y1) - props.current.y1 }],
            [90, -270, 1, 1, { x: (props.rotationFocal["x"] + props.start.x1) - props.current.y1, y: (-props.rotationFocal["y"] + props.start.y1) + props.current.x1 }],
            [180, -180, 1, 1, { x: (-props.rotationFocal["x"] + props.start.x1) + props.current.x1, y: (-props.rotationFocal["y"] + props.start.y1) + props.current.y1 }],
            [270, -90, 1, 1, { x: (-props.rotationFocal["x"] + props.start.x1) + props.current.y1, y: (props.rotationFocal["y"] + props.start.y1) - props.current.x1 }],
            [0, 0, -1, 1, { x: (-props.rotationFocal["x"] + props.start.x1) + props.current.x1, y: (props.rotationFocal["y"] + props.start.y1) - props.current.y1 }],
            [90, -270, -1, 1, { x: (-props.rotationFocal["x"] + props.start.x1) + props.current.y1, y: (-props.rotationFocal["y"] + props.start.y1) + props.current.x1 }],
            [180, -180, -1, 1, { x: (props.rotationFocal["x"] + props.start.x1) - props.current.x1, y: (-props.rotationFocal["y"] + props.start.y1) + props.current.y1 }],
            [270, -90, -1, 1, { x: (props.rotationFocal["x"] + props.start.x1) - props.current.y1, y: (props.rotationFocal["y"] + props.start.y1) - props.current.x1 }],
            [0, 0, 1, -1, { x: (props.rotationFocal["x"] + props.start.x1) - props.current.x1, y: (-props.rotationFocal["y"] + props.start.y1) + props.current.y1 }],
            [90, -270, 1, -1, { x: (props.rotationFocal["x"] + props.start.x1) - props.current.y1, y: (props.rotationFocal["y"] + props.start.y1) - props.current.x1 }],
            [180, -180, 1, -1, { x: (-props.rotationFocal["x"] + props.start.x1) + props.current.x1, y: (props.rotationFocal["y"] + props.start.y1) - props.current.y1 }],
            [270, -90, 1, -1, { x: (-props.rotationFocal["x"] + props.start.x1) + props.current.y1, y: (-props.rotationFocal["y"] + props.start.y1) + props.current.x1 }],
            [0, 0, -1, -1, { x: (-props.rotationFocal["x"] + props.start.x1)+ props.current.x1, y: (-props.rotationFocal["y"] + props.start.y1) + props.current.y1 }],
            [90, -270, -1, -1, { x: (-props.rotationFocal["x"] + props.start.x1) + props.current.y1, y: (props.rotationFocal["y"] + props.start.y1) - props.current.x1 }],
            [180, -180, -1, -1, { x: (props.rotationFocal["x"] + props.start.x1) - props.current.x1, y: (props.rotationFocal["y"] + props.start.y1) - props.current.y1 }],
            [270, -90, -1, -1, { x: (props.rotationFocal["x"] + props.start.x1)- props.current.y1, y: (-props.rotationFocal["y"] + props.start.y1) + props.current.x1 }],
        ];
        for (let x = 0; x < moveCombos.length; x++) {
            if ((ang === moveCombos[x][0] || ang === moveCombos[x][1]) && xReflect === moveCombos[x][2] && yReflect === moveCombos[x][3]) {
                return moveCombos[x][4];
            }
        } return;
    };

    useTick(delta => {

        let i = 0;
        i += delta;

        // *** ANIMATIONS ***  
        // Translate X-Axis (moves first)
        if (props.moveX === true) {
            // Move Right
            if (x < props.destination.x1) {
                setX(Math.round(x + i * 8));
            }
            // Move Left
            else if (x > props.destination.x1) {
                setX(Math.round(x - i * 8));
            }
            // Resolve X-Movement / Check for moveY condition
            else {
                setX(props.destination.x1);
                props.setMoveX(false);
                if (props.moveY === false) {
                    props.setCurrent(props.destination);
                }
            }
        }

        // Translate Y-Axis (moves second)
        if (props.moveY === true && props.moveX === false) {
            // Move Up
            if (y < props.destination.y1) {
                setY(Math.round(y + i * 8));
            }
            // Move Down
            else if (y > props.destination.y1) {
                setY(Math.round(y - i * 8));
            }
            // Resolve Y-Movement
            else {
                setY(props.destination.y1);
                props.setMoveY(false);
                props.setCurrent(props.destination);
            }
        };

        // Rotate (0, 0) origin
        // Clockwise
        if (props.rotation !== 0) {
            if (angle < storedAngle + props.rotation) {
                setPivot(pivotCalc(storedAngle, storedScaleX, storedScaleY));
                setX(props.rotationFocal["x"]);
                setY(props.rotationFocal["y"]);
                setAngle(Number((angle + i * 2).toFixed(1)));
            }
            // Counter-Clockwise
            else if (angle > storedAngle + props.rotation) {
                setPivot(pivotCalc(storedAngle, storedScaleX, storedScaleY));
                setX(props.rotationFocal["x"]);
                setY(props.rotationFocal["y"]);
                setAngle(Number((angle - i * 2).toFixed(1)));
            }
            // Resolve Rotation
            else {
                setPivot({ x: props.start.x1, y: props.start.y1 });
                setAngle(angleCalc(storedAngle + props.rotation));
                setStoredAngle(angleCalc(storedAngle + props.rotation));
                setX(props.destination.x1);
                setY(props.destination.y1);
                props.setRotation(0);
                props.setCurrent(props.destination);
            }
        };

        // Reflection X
        if (props.reflectionX === true) {
            if (storedAngle === 90 || storedAngle === 270 || storedAngle === -90 || storedAngle === -270) {
                setX(props.destination.x1);
                setY(props.destination.y1);
                setStoredScaleY((storedScaleY === 1 ? -1 : 1));
                props.setReflectionX(false);
                props.setCurrent(props.destination);
            }
            else {
                setX(props.destination.x1);
                setY(props.destination.y1);
                setStoredScaleX((storedScaleX === 1 ? -1 : 1));
                props.setReflectionX(false);
                props.setCurrent(props.destination);
            }
        };

        // Reflection Y
        if (props.reflectionY === true) {
            if (storedAngle === 90 || storedAngle === 270 || storedAngle === -90 || storedAngle === -270) {
                setX(props.destination.x1);
                setY(props.destination.y1);
                setStoredScaleX((storedScaleX === 1 ? -1 : 1));
                props.setReflectionY(false);
                props.setCurrent(props.destination);
            }
            else {
                setX(props.destination.x1);
                setY(props.destination.y1);
                setStoredScaleY((storedScaleY === 1 ? -1 : 1));
                props.setReflectionY(false);
                props.setCurrent(props.destination);
            }

        };

        // Final Movement Resolution For All Moves, Win-Lose Check
        if (props.current === props.destination && props.moving === true) {
            props.setMoving(false);
            props.winLoseCheck(props.current, props.target);
        };
    });

    const Triangle = PixiComponent('Polygon', {
        create: props => new PIXI.Graphics(),
        applyProps: (triangle, _, props) => {
            const { start, x, y, angle, pivot, scaleX, scaleY, lose, win, fill } = props;
            triangle.clear();
            triangle.beginFill(0xffFF00);
            triangle.lineStyle(5, 0xff0000, 1);
            triangle.drawPolygon([start.x1, start.y1, start.x2, start.y2, start.x3, start.y3]);
            triangle.endFill();
            triangle.pivot.x = pivot.x;
            triangle.pivot.y = pivot.y;
            triangle.angle = angle;
            triangle.scale.x = scaleX;
            triangle.scale.y = scaleY;
            triangle.x = x;
            triangle.y = y;
        }
    });

    return (
        <Triangle
            start={props.start}
            x={x}
            y={y}
            angle={angle}
            pivot={pivot}
            scaleX={storedScaleX}
            scaleY={storedScaleY}
            lose={props.lose}
            win={props.win}
        />
    );
};

// const moveCombos = [
//     [0, 0, 1, 1, { x: (420 + props.start.x1) - props.current.x1, y: (420 + props.start.y1) - props.current.y1 }],
//     [90, -270, 1, 1, { x: (420 + props.start.x1) - props.current.y1, y: (-420 + props.start.y1) + props.current.x1 }],
//     [180, -180, 1, 1, { x: (-420 + props.start.x1) + props.current.x1, y: (-420 + props.start.y1) + props.current.y1 }],
//     [270, -90, 1, 1, { x: (-420 + props.start.x1) + props.current.y1, y: (420 + props.start.y1) - props.current.x1 }],
//     [0, 0, -1, 1, { x: (-420 + props.start.x1) + props.current.x1, y: (420 + props.start.y1) - props.current.y1 }],
//     [90, -270, -1, 1, { x: (-420 + props.start.x1) + props.current.y1, y: (-420 + props.start.y1) + props.current.x1 }],
//     [180, -180, -1, 1, { x: (420 + props.start.x1) - props.current.x1, y: (-420 + props.start.y1) + props.current.y1 }],
//     [270, -90, -1, 1, { x: (420 + props.start.x1) - props.current.y1, y: (420 + props.start.y1) - props.current.x1 }],
//     [0, 0, 1, -1, { x: (420 + props.start.x1) - props.current.x1, y: (-420 + props.start.y1) + props.current.y1 }],
//     [90, -270, 1, -1, { x: (420 + props.start.x1) - props.current.y1, y: (420 + props.start.y1) - props.current.x1 }],
//     [180, -180, 1, -1, { x: (-420 + props.start.x1) + props.current.x1, y: (420 + props.start.y1) - props.current.y1 }],
//     [270, -90, 1, -1, { x: (-420 + props.start.x1) + props.current.y1, y: (-420 + props.start.y1) + props.current.x1 }],
//     [0, 0, -1, -1, { x: (-420 + props.start.x1)+ props.current.x1, y: (-420 + props.start.y1) + props.current.y1 }],
//     [90, -270, -1, -1, { x: (-420 + props.start.x1) + props.current.y1, y: (420 + props.start.y1) - props.current.x1 }],
//     [180, -180, -1, -1, { x: (420 + props.start.x1) - props.current.x1, y: (420 + props.start.y1) - props.current.y1 }],
//     [270, -90, -1, -1, { x: (420 + props.start.x1)- props.current.y1, y: (-420 + props.start.y1) + props.current.x1 }],
// ];