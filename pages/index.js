import Base from "../components/Base";
import { useEffect, useState } from "react";
import { useInterval } from "../js/Hooks";
import "../styles/index.css";
import "../styles/Footer.css";
import { randInRange } from "../js/Util";
import { Ball, distance, distanceNextFrame } from "../js/Ball";
import { ToggleBtn } from "../components/ToggleBtn.js";


// Globals
let objArray = [];
let paused = false;
let bumped = false;

let leftHeld = false;
let upHeld = false;
let rightHeld = false;
let downHeld = false;

let gravityOn = false;
let dragOn = false;
let clearCanv = true;

let width = 10;
let height = 10;

let ctx = undefined;




const Index = () => {
    const [dimensions, setDimensions] = useState(undefined);
    useEffect(() => init(setDimensions), []);
    return (
        <Base>
            <canvas id="splashCanvas" width={width} height={height}></canvas>
            <div id="footer" className="container">
                <div className="columns">
                    <div className="footer col-12">
                        <div className="columns">
                            <div className="col-4">
                                <ToggleBtn className="github" onClick={removeBalls} label="Clear"></ToggleBtn>
                            </div>
                            <div className="github col-4">
                                <a href="https://github.com/UltravioletVoodoo/Personal_Website" target="_blank">
                                    <img src="/static/img/GitHub-Mark-32px.png"></img>
                                </a>
                            </div>
                            <div className="col-4">
                                <ToggleBtn onClick={addGravityDrag} label="Gravity"></ToggleBtn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Base>
    );
};

function init(setDimensions) {
    function resize() {
        width = window.innerWidth;
        height = (window.innerHeight - document.getElementById("navbar").offsetHeight - document.getElementById("footer").offsetHeight);
        setDimensions({width: width, height: height});
    }
    resize();
    splashCanvas.style.backgroundColor = "#303030";
    ctx = splashCanvas.getContext('2d');

    // Listeners
    window.addEventListener("resize", resize);
    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);
    splashCanvas.addEventListener("click", addBall);
    draw();

    return () => window.removeEventListener("resize", resize);
}


function draw() {
        if(clearCanv) clearCanvas();

        if (!paused) {
            arrowControls();
            if (gravityOn) {
                applyGravity();
                applyDrag();
            }
            moveObjects();
        }

        drawObjects();
        staticCollision();
        ballCollision();
        requestAnimationFrame(draw);
}

function clearCanvas() {
    ctx.clearRect(0, 0, width, height);
}

function addBall() {
    objArray[objArray.length] = new Ball(ctx, width, height);
}

function removeBalls() {
    objArray = [];
    clearCanvas();
}

function addGravityDrag() {
    gravityOn = !gravityOn;
    dragOn = !dragOn;
}

function keyDownHandler(event) {
    switch (event.keyCode) {
        case 67: //c
            addBall();
            break;
        case 80: //p
            paused = !paused;
            break;
        case 71: //g
            addGravityDrag();
            break;
        case 65: //a
            leftHeld = true;
            break;
        case 87: //w
            upHeld = true;
            break;
        case 68: //d
            rightHeld = true;
            break;
        case 83: //s
            downHeld = true;
            break;
        case 82: //r
            removeBalls();
            break;
        case 75: //k
            clearCanv = !clearCanv;
            break;
        default:
            break;
    }
}

function keyUpHandler(event) {
    switch (event.keyCode) {
        case 65: //a
            leftHeld = false;
            break;
        case 87: //w
            upHeld = false;
            break;
        case 68: //d
            rightHeld = false;
            break;
        case 83: //s
            downHeld = false;
            break;
        default:
            break;
    }
}

function arrowControls() {
    if (leftHeld) {
        for (let obj of objArray) {
            obj.dx -= 0.3;
        }
    }
    if (upHeld) {
        for (let obj of objArray) {
            obj.dy -= 0.3;
        }
    }
    if (rightHeld) {
        for (let obj of objArray) {
            obj.dx += 0.3;
        }
    }
    if (downHeld) {
        for (let obj of objArray) {
            obj.dy += 0.3;
        }
    }
}

function wallCollision(ball) {
    if (ball.x - ball.radius + ball.dx < 0 ||
        ball.x + ball.radius + ball.dx > width) {
        ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius + ball.dy < 0 ||
        ball.y + ball.radius + ball.dy > height) {
        ball.dy = -ball.dy;
    }
    if (ball.y + ball.radius > height) {
        ball.y = height - ball.radius;
    }
    if (ball.y - ball.radius < 0) {
        ball.y = ball.radius;
    }
    if (ball.x + ball.radius > width) {
        ball.x = width - ball.radius;
    }
    if (ball.x - ball.radius < 0) {
        ball.x = ball.radius;
    }
}

function ballCollision() {
    for (let obj1 in objArray) {
        for (let obj2 in objArray) {
            if (obj1 !== obj2 && distanceNextFrame(objArray[obj1], objArray[obj2]) <= 0) {
                let theta1 = objArray[obj1].angle();
                let theta2 = objArray[obj2].angle();
                let phi = Math.atan2(objArray[obj2].y - objArray[obj1].y, objArray[obj2].x - objArray[obj1].x);
                let m1 = objArray[obj1].mass;
                let m2 = objArray[obj2].mass;
                let v1 = objArray[obj1].speed();
                let v2 = objArray[obj2].speed();

                let dx1F = (v1 * Math.cos(theta1 - phi) * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi)) / (m1+m2) * Math.cos(phi) + v1*Math.sin(theta1-phi) * Math.cos(phi+Math.PI/2);
                let dy1F = (v1 * Math.cos(theta1 - phi) * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi)) / (m1+m2) * Math.sin(phi) + v1*Math.sin(theta1-phi) * Math.sin(phi+Math.PI/2);
                let dx2F = (v2 * Math.cos(theta2 - phi) * (m2-m1) + 2*m1*v1*Math.cos(theta1 - phi)) / (m1+m2) * Math.cos(phi) + v2*Math.sin(theta2-phi) * Math.cos(phi+Math.PI/2);
                let dy2F = (v2 * Math.cos(theta2 - phi) * (m2-m1) + 2*m1*v1*Math.cos(theta1 - phi)) / (m1+m2) * Math.sin(phi) + v2*Math.sin(theta2-phi) * Math.sin(phi+Math.PI/2);

                objArray[obj1].dx = dx1F;                
                objArray[obj1].dy = dy1F;                
                objArray[obj2].dx = dx2F;                
                objArray[obj2].dy = dy2F;
            }            
        }
        wallCollision(objArray[obj1]);
    }
}

function staticCollision() {
    for (let obj1 in objArray) {
        for (let obj2 in objArray) {
            if (obj1 !== obj2 && distance(objArray[obj1], objArray[obj2]) < objArray[obj1].radius + objArray[obj2].radius) {
                let theta = Math.atan2((objArray[obj1].y - objArray[obj2].y), (objArray[obj1].x - objArray[obj2].x));
                let overlap = objArray[obj1].radius + objArray[obj2].radius - distance (objArray[obj1], objArray[obj2]);
                let smallerObject = objArray[obj1].radius < objArray[obj2].radius ? obj1 : obj2
                objArray[smallerObject].x -= overlap * Math.cos(theta);
                objArray[smallerObject].y -= overlap * Math.sin(theta);
            }
        }
    }
}

function applyGravity() {
    for (let obj of objArray) {
        if (obj.onGround() == false) {
            obj.dy += 0.29;
        }   
    }
}

function applyDrag() {
    for (let obj of objArray) {
        obj.dx *= 0.99;
        obj.dy *= 0.99;
    }
}

function moveObjects() {
    for (let obj of objArray) {
        obj.x += obj.dx;
        obj.y += obj.dy;
    }    
}

function drawObjects() {
    for (let obj of objArray) {
        obj.draw();
    }
}


export default Index;