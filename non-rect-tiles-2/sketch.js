// Tried to comment as much as I could, but sorry it's not much

let l, bg;
let octDim, diaDim, octCols, octRows, diaCols, diaRows;
let octs = [];
let dias = [];
let shouldOctSpin = true;
const spinSpeed = 0.01; // Try changing this
const octSpinFrames = Math.floor(Math.PI / (4 * spinSpeed));
const diaSpinFrames = Math.floor(Math.PI / (2 * spinSpeed));
let count = 0;

let octColor = "#262104";
let diaColor = "#fffbe6";

// For recording
record = false;
cnt = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    // pixelDensity(1);
    l = 50;
    octDim = {
        w: l * (2 * cos(PI / 4) + 1),
        h: l * (2 * cos(PI / 4) + 1),
    };

    diaDim = {
        w: 2 * l * cos(PI / 3),
        h: 2 * l * cos(PI / 6),
    };
    octCols = floor(width / octDim.w) + 1;
    octRows = floor(height / octDim.h) + 1;
    diaCols = octCols + 2;
    diaRows = octRows + 2;

    for (let j = -1; j < octRows; j++) {
        for (let i = -1; i < octCols; i++) {
            let x = (i + 0.5) * octDim.w;
            let y = (j + 0.5) * octDim.h;
            octs.push(new Octagon(x, y, l));
        }
    }
    for (let j = -1; j < diaRows; j++) {
        for (let i = -1; i < diaCols; i++) {
            let x = i * octDim.w;
            let y = j * octDim.h;
            dias.push(new Diamond(x, y, l));
        }
    }

    // frameRate(10);
}

function draw() {
    if (0 <= count && count <= octSpinFrames) {
        shouldOctSpin = true;
    }
    if (octSpinFrames < count && count <= octSpinFrames + diaSpinFrames) {
        shouldOctSpin = false;
    }

    shouldOctSpin ? (bg = color(diaColor)) : (bg = color(octColor));

    background(bg);

    if (shouldOctSpin) {
        dias.forEach((e) => {
            e.draw();
            e.spin();
        });
        octs.forEach((e) => {
            e.draw();
            e.spin();
        });
    } else {
        octs.forEach((e) => {
            e.draw();
            e.spin();
        });
        dias.forEach((e) => {
            e.draw();
            e.spin();
        });
    }
    count++;
    if (count === octSpinFrames + diaSpinFrames) count = 0;

    if (record && frameCount <= octSpinFrames + diaSpinFrames) {
        if (frameCount % 3 === 0) {
            saveCanvas("gif-" + cnt, "png");
            cnt++;
        }
    }

    // noLoop();
}
