import Base from "../components/Base";
import { useEffect, useState } from "react";
import { useInterval } from "../js/Hooks";
import "../styles/index.css";
import { randInRange } from "../js/Util";


const Index = () => {
    const [dimensions, setDimensions] = useState({width: 10, height: 10});
    const [context, setContext] = useState(undefined);
    const draw = getDrawFunction();
    useEffect(() => init(setDimensions, setContext), []);
    useInterval(() => draw(dimensions, context), 10);
    console.log(dimensions);
    return (
        <Base>
            <canvas id="splashCanvas" width={dimensions.width} height={dimensions.height}></canvas>
        </Base>
    );
};

function init(setDimensions, setContext) {
    function resize() {
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight - document.getElementById("navbar").offsetHeight
        });
    }
    resize();
    setContext(splashCanvas.getContext('2d'));
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
}

function getDrawFunction() {

    let pieceParams = generatePieceParameters(50);

    return function draw(dimensions, context) {
        context.clearRect(0,0,dimensions.width,dimensions.height);
        drawPieces(pieceParams, dimensions, context);
    }
}

function drawPieces(pieceParams, dimensions, context) {
    for (let piece of pieceParams){
        context.beginPath();
        context.fillStyle = "#287740";
        context.arc(
            piece.x * dimensions.width,
            piece.y * dimensions.height,
            20,
            0,
            Math.PI*2,
            true
        );
        context.closePath();
        context.fill();

        // Boundary logic
        if (piece.x <= 0 || piece.x >= 1) piece.dx = - piece.dx;
        if (piece.y <= 0 || piece.y >= 1) piece.dy = - piece.dy;

        piece.x += piece.dx / 100;
        piece.y += piece.dy / 100;

        if (piece.x < 0) piece.x = 0;
        if (piece.x > 1) piece.x = 1;
        if (piece.y < 0) piece.y = 0;
        if (piece.y > 1) piece.y = 1;

    }
}

function generatePieceParameters(n) {
    let result = [];
    for (let x = 0; x < n; x++){
        result.push({
            x: Math.random(),
            y: Math.random(),
            dx: Math.random(),
            dy: Math.random()
        })
    }
    return result;
}

export default Index;