// Tried to comment as much as I could, but sorry it's not much
// Original Sketch: https://openprocessing.org/sketch/1352788

let l, bg;
let hexDim, diaDim, hexCols, hexRows, diaCols, diaRows;
let hexes = [];
let dias = [];
let shouldHexSpin = true;
const spinSpeed = 0.01; // Try changing this
const hexSpinFrames = Math.floor(Math.PI / (3 * spinSpeed));
const diaSpinFrames = Math.floor(Math.PI / spinSpeed);
let count = 0;

let hexColor = "#262104";
let diaColor = "#fffbe6";

function setup() {
    createCanvas(windowWidth, windowHeight);
    l = 50;
    hexDim = {
        w: l * (2 * cos(PI / 3) + 1),
        h: 2 * l * cos(PI / 6),
    };

    diaDim = {
        w: 2 * l * cos(PI / 3),
        h: 2 * l * cos(PI / 6),
    };
    hexCols = floor(width / hexDim.w) + 1;
    hexRows = floor(height / hexDim.h) + 1;
    diaCols = hexCols + 2;
    diaRows = hexRows + 2;

    for (let j = -1; j < hexRows; j++) {
        for (let i = -1; i < hexCols; i++) {
            let x = (i + 0.5) * hexDim.w;
            let y = (j + 0.5) * hexDim.h;
            hexes.push(new Hexagon(x, y, l));
        }
    }
    for (let j = -1; j < diaRows; j++) {
        for (let i = -1; i < diaCols; i++) {
            let x = i * hexDim.w;
            let y = j * diaDim.h;
            dias.push(new Diamond(x, y, l));
        }
    }
}

function draw() {
    if (0 <= count && count <= hexSpinFrames) {
        shouldHexSpin = true;
    }
    if (hexSpinFrames < count && count <= hexSpinFrames + diaSpinFrames) {
        shouldHexSpin = false;
    }

    shouldHexSpin ? (bg = color(diaColor)) : (bg = color(hexColor));

    background(bg);

    if (shouldHexSpin) {
        dias.forEach((e) => {
            e.draw();
            e.spin();
        });
        hexes.forEach((e) => {
            e.draw();
            e.spin();
        });
    } else {
        hexes.forEach((e) => {
            e.draw();
            e.spin();
        });
        dias.forEach((e) => {
            e.draw();
            e.spin();
        });
    }
    count++;
    if (count === hexSpinFrames + diaSpinFrames) count = 0;
}
