# Dev Notes

### 2020-01-23

<img src="./transformations-game/screenshots/2020-01-23.PNG" 
alt="status20200115" width='50%' height="auto" />

```js
d.drawGrid({
  ctx,
  labelFillStyle: "orange",
  lineStyle: "#ddd",
  fillStyle: "rgba(0,0,0,.2)"
});


d.drawAxis({ ctx, lineStyle: "#000" });

d.drawTriangle({
  ...props.triangleCoords,
  ctx,
  lineStyle: "rgb(155,189,238)",
  fillStyle: "rgba(155, 189,238,0.8)"
});

//draw winning triangle
d.drawTriangle({
  ...mapToCanvasCoords(props.target),
  ctx,
  lineStyle: "rgb(188,198,34)",
  fillStyle: "rgba(188,198,34, 0.8)"
});
```

### 2020-01-22

<img src="./transformations-game/screenshots/2020-01-22.PNG" 
alt="status20200115" width='50%' height="auto" />

### Features

<!-- Needs comments here -->

### 2020-01-19

<img src="./transformations-game/screenshots/2020-01-19.png" 
alt="status20200115" width='50%' height="auto" />

### Features

- Customizable Transformations

### To implement next

- Front end:
  - collision detection
  - game winning/losing logic
  - drag + drop
  - visual improvements
  - transition b/t levels
  - starting page
  - background effects
- Back end
  - user sign in

### 2020-01-15

`52bd7f2`: https://github.com/jmoore-code/mindFuelProject/commit/52bd7f25aea0eead1337ccc3d4ea342d9d931383

<img src="./transformations-game/screenshots/2020-01-15.png" 
alt="status20200115" width='50%' height="auto" />

### Features

- Customizable grid-size

### To implement (by 2020-01-30)

- ~~Transformations~~
  - ~~Translation~~
  - ~~Rotation~~
  - ~~Reflection~~
