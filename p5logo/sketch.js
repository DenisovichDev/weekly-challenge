let totalFrames = 600;
let counter = 0;
let record = true;

let xOff, yOff, zOff;
let inc = 0.1;
let scale = 10;
let cols, rows;
let v;
let c;
let particles = [];
let flowfield;
let colorVector;
let colorArray;

let logo;

function setup() {
    background(0);

    createCanvas(600, 600);
    zOff = 0;
    logo = loadImage("logo.png");
    cols = floor(width / scale) + 1;
    rows = floor(height / scale) + 1;
    flowfield = new Array(rows * cols);
    colorVector = new Array(rows * cols);
    colorArray = new Array(rows * cols);

    for (let i = 0; i < 10000; i++) {
        let start = createVector(random(width), random(height));
        particles[i] = new Particle(start, random(2, 8));
    }
}

function draw() {
    background(0);

    yOff = 0;
    for (let y = 0; y < rows; y++) {
        xOff = 0;
        for (let x = 0; x < cols; x++) {
            let noiseScale = random(1, 2);
            let angle = noise(xOff, yOff, zOff) * TWO_PI * noiseScale;

            v = p5.Vector.fromAngle(angle);
            let index = x + y * cols;
            let imagePixelColor = logo.get(x, y); //pixels[index];
            flowfield[index] = v;
            colorVector[index] = c;
            colorArray[index] = imagePixelColor;

            xOff += inc;
        }
        yOff += inc;
    }
    zOff += 0.01;

    particles.forEach((p) => {
        p.setColorByImage(colorArray);
        p.run();
        p.follow(flowfield);
    });
}
