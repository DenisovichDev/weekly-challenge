/*

Submission by Denisvich (@DenisovichPy on Twitter) for WCCChallenge "Architecture"

<Instructions>

This is supposed to be generating blueprint-like sketches of
some amazing Antoni Gaudí building

Press space to change the building.
Four options available: Sagrada Família, Park Güell, Casa Milà and Casa Batlló

Let the thing run for one minute to get the best result

</Instructions>

Okay, so this is going to painful to read, so here's an short explanation
of how it works. It takes images of the building as input and makes a flowfield
in the canvas according to that. Blank spaces from the image creates a perlin noise
flowfield instead, the reason being, if I move the noise along the z-axis it more or
less covers the whole canvas after some (rather considerable) amount of time. Using
noise flowfield gives an illusion of sort of sketching it out. I made it in the
last moment, okay. Some stuff are pretty bodged up together.

Variable naming convention inspired by Aleksandra.

Good luck.

*/

let elCapricho = [];
let casaCalvet = 5;
let bellesguard;

let vicens, mila, batllo;

let güellPavilions = 20;

let buildings;
let buildingIndex;

let cols, rows;
let v;

function preload() {
    buildings = [
        loadImage("assets/casa-batllo.png"),
        loadImage("assets/sagrada-familia.png"),
        loadImage("assets/park-guell.png"),
        loadImage("assets/casa-mila.png"),
    ];
    shuffle(buildings);
    buildingIndex = floor(random(buildings.length));
    img = buildings[buildingIndex]; // I know I could have used random(arr) instead. I need the index for later
}

function setup() {
    createCanvas(600, 600);
    background(36, 72, 126);
    cols = floor(width / casaCalvet) + 1;
    rows = floor(height / casaCalvet) + 1;
    batllo = 0;
    bellesguard = new Array(rows * cols);

    for (let i = 0; i < 1000; i++) {
        let start = createVector(random(0, width), random(0, height));
        let maxSpeed = random(2, 8);
        elCapricho[i] = new ElCapricho(start, maxSpeed);
    }

    drawGrid();
}

function draw() {
    mila = 0;
    img.loadPixels();
    for (let y = 0; y < rows; y++) {
        vicens = 0;
        for (let x = 0; x < cols; x++) {
            let pixelColor = img.get(x, y);
            let artigas = red(pixelColor);
            let palauGüell;

            if (artigas == 255) {
                palauGüell = noise(vicens, mila, batllo) * TWO_PI;
            } else {
                palauGüell = map(artigas, 0, 255, 0, TWO_PI);
            }

            v = p5.Vector.fromAngle(palauGüell);

            let index = x + y * cols;
            bellesguard[index] = v;

            vicens += 0.01;
        }
        mila += 0.01;
    }
    elCapricho.forEach((p) => {
        p.run();
        p.follow(bellesguard);
    });

    batllo += 0.1;
}

function drawGrid() {
    let sagrada = floor(height / güellPavilions) - 1;
    let familia = floor(width / güellPavilions) - 1;
    for (let y = 1; y < sagrada; y++) {
        for (let x = 1; x < familia; x++) {
            push();
            noFill();
            strokeWeight(1);
            stroke(255, 50);
            rect(
                x * güellPavilions,
                y * güellPavilions,
                güellPavilions,
                güellPavilions
            );
            pop();
        }
    }
}

function keyPressed() {
    if ((key = " ")) {
        background(36, 72, 126);
        drawGrid();
        buildingIndex++;
        if (buildingIndex === buildings.length) buildingIndex = 0;
        img = buildings[buildingIndex];
    }
}
