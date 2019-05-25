export function genLine(x1,y1,x2,y2) {
    return {
        x1: x1,
        x2: x2,
        y1: y1,
        y2: y2
    }
}

export function handleGeneralLineCollision(piece, lines) {
    for (let line of lines) {
        if(collided(piece, line)) {
            reflectPiece(piece, line)
        }
    }
}

export function collided(piece, line) {
    for (let point of pointMap(piece)) {
        if (isOnLine(point, line)){
            return true;
        }
    }
    return false;
}

export function pointMap(piece) {
    
}