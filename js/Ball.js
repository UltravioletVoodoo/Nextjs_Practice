export function Ball(ctx, width, height) {
    this.radius = randomRadius();
    this.x = randomX(width);
    this.y = randomY(height);
    this.dx = randomDx();
    this.dy = randomDy();

    // Use mass for sphere not circle
    this.mass = this.radius**3;
    this.color = "#287740";
    this.draw = function() {
        ctx.beginPath();
        ctx.arc(Math.round(this.x), Math.round(this.y), this.radius, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = "#000000";
        ctx.stroke();
        ctx.closePath();
    };
    this.speed = function() {
        return Math.sqrt(this.dx**2 + this.dy**2);
    };
    this.angle = function() {
        return Math.atan2(this.dy, this.dx);
    };
    this.onGround = function() {
        return (this.y + this.radius >= height);
    }
}

function randomX(width) {
    let x = Math.floor(Math.random() * width);
    if (x < 30) {
        x = 30;
    } else if (x + 30 > width) {
        x = width - 30;
    }
    return x;
}

function randomY(height) {
    let y = Math.floor(Math.random() * height);
    if (y < 30) {
        y = 30;
    } else if (y + 30 > height) {
        y = height - 30;
    }
    return y;
}

function randomRadius() {
    return Math.ceil(Math.random() * 10 + 13);
}

function randomDx() {
    return Math.floor(Math.random() * 10 - 5);
}

function randomDy() {
    return Math.floor(Math.random() * 10 - 5);
}

export function distanceNextFrame(a, b) {
    return Math.sqrt((a.x + a.dx - b.x - b.dx)**2 + (a.y + a.dy - b.y - b.dy)**2) - a.radius - b.radius;
}

export function distance(a, b) {
    return Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2);
}