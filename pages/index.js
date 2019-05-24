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
            <div className="github">
                <a href="https://github.com/UltravioletVoodoo/Personal_Website" target="_blank">
                    <img src="/static/img/GitHub-Mark-32px.png"></img>
                </a>
            </div>
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

    let pieceParams = generatePieceParameters(25);

    return function draw(dimensions, context) {
        context.clearRect(0,0,dimensions.width,dimensions.height);

        drawBorder(dimensions, context);
        drawPieces(pieceParams, dimensions, context);
    }
}

function drawBorder(dimensions, context) {
    context.beginPath();
    context.fillStyle = "#282828";
    context.moveTo(0, dimensions.height);
    context.lineTo(0, dimensions.height * 0.5);
    context.lineTo(dimensions.width * 0.15, dimensions.height);
    context.moveTo(dimensions.width * 0.4, dimensions.height);
    context.lineTo(dimensions.width * 0.5, dimensions.height * 0.75);
    context.lineTo(dimensions.width * 0.6, dimensions.height);
    context.moveTo(dimensions.width * 0.85, dimensions.height);
    context.lineTo(dimensions.width, dimensions.height * 0.5);
    context.lineTo(dimensions.width, dimensions.height);
    context.fill();
    context.stroke();
    context.closePath();
}

function energyColor(energy) {
    const colors = [
        "#000000",
        "#1C0701",
        "#380E02",
        "#551503",
        "#711C04",
        "#8D2305",
        "#AA2A06",
        "#C63107",
        "#E23808",
        "#FF400A"        
    ];
    return colors[energy];
}

function loseEnergy(piece) {
    if (piece.energy > 0){
        piece.energy -= 1;
        piece.dx = piece.dx / 1.2;
        piece.dy = piece.dy / 1.2;
    }
}

function drawPieces(pieceParams, dimensions, context) {
    for (let piece of pieceParams){
        context.beginPath();
        context.fillStyle = energyColor(piece.energy);
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
        if (piece.x <= 0 || piece.x >= 1) {
            piece.dx = - piece.dx;
            loseEnergy(piece);
        }
        if (piece.y <= 0 || piece.y >= 1) {
            piece.dy = - piece.dy;
            loseEnergy(piece);
        }

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
            dy: Math.random(),
            energy: 10
        })
    }
    return result;
}

export default Index;