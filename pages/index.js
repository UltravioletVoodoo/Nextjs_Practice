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

    let pieceParams = generatePieceParameters(2);

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

function drawPieces(pieceParams, dimensions, context) {
    for (let piece of pieceParams){
        context.beginPath();
        context.fillStyle = "#287740";
        context.arc(
            piece.x * dimensions.width,
            piece.y * dimensions.height,
            ((dimensions.width**2 + dimensions.height**2)**(0.5)) * (piece.radius),
            0,
            Math.PI*2,
            true
        );
        context.closePath();
        context.fill();

        physicsLogic(piece, dimensions);
    }
    collisionLogic(dimensions, pieceParams);
}

function physicsLogic(piece, dimensions, pieceParams) {
    boundaryLogic(piece, dimensions);
    gravityLogic(piece);
    moveMentLogic(piece);
    collisionLogic(piece, dimensions, pieceParams);
}

function collisionLogic(dimensions, pieces) {
    if (pieces[0]) {
        let w = dimensions.width;
        let h = dimensions.height;
        let r = ((dimensions.width**2 + dimensions.height**2)**(0.5)) * (pieces[0].radius);
    
        for (let p1 of pieces) {
            for (let p2 of pieces) {
                if (p1.id != p2.id){
                    // If the 2 circles are colliding
                    if ((((p1.x*w - p2.x*w)**2 + (p1.y*h - p2.y*h)**2)**(0.5)) < 2*r) {
                        handleCollision(p1, p2)
                    }
                }
            }
        }
    }
}

function handleCollision(p1, p2) {
    // momentum is ALWAYS conserved
    // assume a unit mass (1)
    console.log("piece collision");
}

function moveMentLogic(piece) {
    piece.x += piece.dx / 100;
    piece.y += piece.dy / 100;
}

function gravityLogic(piece) {
    let gravity = 0.1;
    piece.dy += gravity;
}

function boundaryLogic(piece, dimensions) {
    let rad = ((dimensions.width**2 + dimensions.height**2)**(0.5)) * (piece.radius);
    if (piece.x * dimensions.width - rad <= 0 || piece.x * dimensions.width + rad >= dimensions.width) piece.dx = - piece.dx;
    if (piece.y * dimensions.height - rad <= 0 || piece.y * dimensions.height + rad >= dimensions.height) piece.dy = - piece.dy;

    if (piece.x * dimensions.width - rad < 0) piece.x = 0 + rad / dimensions.width;
    if (piece.x * dimensions.width + rad > dimensions.width) piece.x = 1 - rad / dimensions.width;
    if (piece.y * dimensions.height - rad < 0) piece.y = 0 + rad / dimensions.height;
    if (piece.y * dimensions.height + rad > dimensions.height) piece.y = 1 - rad / dimensions.height;
}

function generatePieceParameters(n) {
    let result = [];
    let idCount = 0;
    for (let x = 0; x < n; x++){
        result.push({
            id: idCount,
            x: Math.random(),
            y: Math.random(),
            dx: Math.random(),
            dy: Math.random(),
            radius: 0.02
        })
        idCount += 1;
    }
    return result;
}

export default Index;