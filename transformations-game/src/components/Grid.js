import React, { useState } from "react";
import * as PIXI from "pixi.js";
import { PixiComponent, useTick } from '@inlet/react-pixi';

export const Grid = (props) => {

    const GridArea = PixiComponent('Rectangle', {
        create: props => new PIXI.Graphics(),
        applyProps: (grid, _, props) => {
            const { x, y, width, height, border, axis, textColor} = props;

            const drawRect = (x, y, width, height, color) => {
                grid.lineStyle(2.5, color);
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
                    let text = drawText((i === 10 ? "" : i < 10 ? 10 - i : -i + 10), "Arial", 16, textColor, "bold");
                    text.x = x + 405;
                    text.y = y + 40 * i;
                }
            };

            const drawGridX = (x, y) => {
                for (let i = 0; i <= 20; i++) {
                    drawLine(x + 40 * i, y, x + 40 * i, y + 800, 1, 0x808080);
                    let text = drawText((i <= 20 ? -10 + i : i - 10), "Arial", 16, textColor, 'bold');
                    text.x = x + 40 * i;
                    text.y = y + 400;
                }
            };
            drawGridY(x, y);
            drawGridX(x, y);
            drawRect(x, y, width, height, border);
            drawLine(x + 400, y, x + 400, y + 800, 5, axis);
            drawLine(x, y + 400, x + 800, y + 400, 5, axis);
        }
    });

    return (
        <GridArea
            x={props.x}
            y={props.y}
            width={props.width}
            height={props.height}
            target={props.target}
            border={props.border}
            axis={props.axis}
            textColor={props.textColor}
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
            const { target, x, y, pivot, line, fill } = props;
            triangle.clear();
            triangle.beginFill(fill.color, fill.opacity);
            triangle.lineStyle(line.weight, line.color);
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
            line={props.line}
            fill={props.fill}
        />
    )
};