import React, { useEffect } from 'react';

const Grid = () => {
    const canvasReference = React.useRef(null);

    useEffect(() => {
        console.log("component mounted");
        renderGrid();
    });

    const handleOnClick = (event) => {
        const canvas = canvasReference.current;
        const ctx = canvas.getContext('2d'); 
        
        // Test Click to Add New Points To Grid
            // This ratio is based on the current width of the Left Menu (160) and the ctx.translate(800, 400) from renderGrid().
        ctx.fillRect((event.clientX - 960), (event.clientY - 425), 5, 5);
    }

    const renderGrid = () => {
        const canvas = canvasReference.current;
        const ctx = canvas.getContext('2d'); 

        // Centers Grid
        ctx.translate(800, 425);
        
        // Lines
            // Likely can use a loop to fill in remainder of grid lines.
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(-400,0);
        ctx.lineTo(400,0);
        ctx.stroke();
        ctx.moveTo(0,-400);
        ctx.lineTo(0, 400);
        ctx.stroke();     
        
        ctx.font = "bold 20px Arial";
        ctx.fillText("x",400, -10);
        ctx.fillText("-y",10, 400);
        
        ctx.fillText("-x",-400, -10);
        ctx.fillText("y",10, -400);  
        
        // Add Additional Points/Lines to Grid (after it's rendered)
        // const drawCartesianPoint = (ctx, x, y) => {
        //     ctx.fillRect(x, -(y), 4, 4); 
        // }
        
        // const drawCartesianText = (ctx, x, y, text) => {
        //     ctx.fillText(text, x, -(y));  
        // }
    };

    return (
        <div className="Grid-container">
            <canvas
                className="Grid-Canvas"
                ref={canvasReference}
                // Need to adjust width and height to eliminate scroll.
                width = {window.innerWidth}
                height = {window.innerHeight}
                // Likely will be removed for final product, just used as a test for now.
                onClick={handleOnClick} />
        </div>
    )
};

export default Grid;