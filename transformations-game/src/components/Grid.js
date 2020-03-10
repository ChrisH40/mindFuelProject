import React, { useState } from "react";
import * as PIXI from "pixi.js";
import { PixiComponent, useTick } from '@inlet/react-pixi';

export const Grid = (props) => {

    const GridArea = PixiComponent('Rectangle', {
        create: props => new PIXI.Graphics(),
        applyProps: (grid, _, props) => {
            const { x, y, width, height, target } = props;

            const drawRect = (x, y, width, height) => {
                grid.lineStyle(2.5, 0x000000);
                grid.drawRect(x, y, width, height);
                grid.endFill();
            };

            const drawLine = (x, y, start, end, weight, color) => {
                grid.beginFill();
                grid.lineStyle(weight, color);
                grid.moveTo(x, y);
                grid.lineTo(start, end);
                grid.endFill();
            };

            const drawText = (words, fam, size, color, weight) => {
                let text = new PIXI.Text(words, { fontFamily: fam, fontSize: size, fill: color, fontWeight: weight });
                grid.addChild(text);
                return text;
            };

            const drawGridY = (x, y) => {
                for (let i = 0; i <= 20; i++) {
                    drawLine(x, (y + (40 * i)), (x + 800), (y + (40 * i)), 1, 0x808080);
                    let text = drawText((i === 10 ? "" : i < 10 ? 10 - i : -i + 10), "Arial", 16, 0x000000, "bold");
                    text.x = x + 405;
                    text.y = y + 40 * i;
                }
            };

            const drawGridX = (x, y) => {
                for (let i = 0; i <= 20; i++) {
                    drawLine(x + 40 * i, y, x + 40 * i, y + 800, 1, 0x808080);
                    let text = drawText((i <= 20 ? -10 + i : i - 10), "Arial", 16, 0x000000, 'bold');
                    text.x = x + 40 * i;
                    text.y = y + 400;
                }
            };

            drawGridY(x, y);
            drawGridX(x, y);
            drawRect(x, y, width, height);
            drawLine(x + 400, (y - 20), x + 400, y + 820, 5, 0xff0000);
            drawLine((x - 20), y + 400, x + 820, y + 400, 5, 0xff0000);
        }
    });

    return (
        <GridArea
            x={props.x}
            y={props.y}
            width={props.width}
            height={props.height}
            target={props.target}
        />
    )
};

export const Exit = (props) => {
    const [pivot, setPivot] = useState({ x: props.target.x1, y: props.target.y1 });
    const [x, setX] = useState(props.target.x1);
    const [y, setY] = useState(props.target.y1);


    let i = 0;

    useTick(delta => {
        i += delta;
    });

    const PlayerExit = PixiComponent('Polygon', {
        create: props => new PIXI.Graphics(),
        applyProps: (triangle, _, props) => {
            const { target, x, y, pivot, fill } = props;
            triangle.clear();
            triangle.beginFill();
            triangle.lineStyle(1, 0x808080);
            triangle.drawPolygon([target.x1, target.y1, target.x2, target.y2, target.x3, target.y3]);
            triangle.endFill();
            triangle.pivot.x = pivot.x;
            triangle.pivot.y = pivot.y;
            triangle.x = x;
            triangle.y = y;
        }
    });

    return (
        <PlayerExit
            target={props.target}
            x={x}
            y={y}
            pivot={pivot}
        />
    )
};