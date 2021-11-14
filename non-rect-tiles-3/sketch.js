// Alright, not gonna lie, I'm kind of proud of this one.

// Follow Rishi: https://twitter.com/DenisovichPy
// Follow Shynif: https://twitter.com/DevShynif
// Follow Raph: https://twitch.tv/sableRaph

let l, bg;
let squareDim, diaDim, squareCols, squareRows, diaCols, diaRows;
let squares = [];
let dias = [];
let shouldSquareSpin = true;
const spinSpeed = 0.01; // Try changing this
const squareSpinFrames = Math.floor(Math.PI / (2 * spinSpeed));
const diaSpinFrames = Math.floor(Math.PI / spinSpeed);
let count = 0;

let squareColor = "#262104";
let diaColor = "#fffbe6";

// For recording
record = false;
cnt = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    // pixelDensity(1);
    l = 50;
    squareDim = {
        w: sqrt(2) * l * cos(PI / 12),
        h: sqrt(2) * l * cos(PI / 12),
    };

    diaDim = {
        w: 2 * l * cos(PI / 3),
        h: 2 * l * cos(PI / 6),
    };
    squareCols = floor(width / squareDim.w) + 1;
    squareRows = floor(height / squareDim.h) + 1;
    diaCols = squareCols + 2;
    diaRows = squareRows + 2;

    for (let j = -1; j < squareRows; j++) {
        let dir = -1;
        if (j % 2 == 0) dir = 1;
        for (let i = -1; i < squareCols; i++) {
            let x = (i + 0.5) * squareDim.w;
            let y = (j + 0.5) * squareDim.h;
            dir *= -1;
            squares.push(new Square(x, y, l, dir));
        }
    }
    for (let j = -1; j < diaRows; j++) {
        let dir = 1;
        if (j % 2 == 0) dir = -1;
        for (let i = -1; i < diaCols; i++) {
            let x = i * squareDim.w;
            let y = j * squareDim.h;
            dir *= -1;
            dias.push(new Diamond(x, y, l, dir));
        }
    }

    // frameRate(10);
}

function draw() {
    if (0 <= count && count <= squareSpinFrames) {
        shouldSquareSpin = true;
    }
    if (squareSpinFrames < count && count <= squareSpinFrames + diaSpinFrames) {
        shouldSquareSpin = false;
    }

    shouldSquareSpin ? (bg = color(diaColor)) : (bg = color(squareColor));

    background(bg);

    if (shouldSquareSpin) {
        dias.forEach((e) => {
            e.draw();
            e.spin();
        });
        squares.forEach((e) => {
            e.draw();
            e.spin();
        });
    } else {
        squares.forEach((e) => {
            e.draw();
            e.spin();
        });
        dias.forEach((e) => {
            e.draw();
            e.spin();
        });
    }
    count++;
    if (count === squareSpinFrames + diaSpinFrames) count = 0;

    if (record && frameCount <= squareSpinFrames + diaSpinFrames) {
        if (frameCount % 3 === 0) {
            saveCanvas("gif-" + cnt, "png");
            cnt++;
        }
    }

    // noLoop();
}
