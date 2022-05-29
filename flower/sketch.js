/*
"Bezier Flowers" by @DenisovichPy (follow me on Twitter)
Submission for #WCCChallenge by @sableRaph (follow him? You probably do.)
Watch the livestream on twitch.tv/sableRaph
Join the Discord: https://discord.gg/S8c7qcjw2b (I hope this is not the evil link)

For Raph on stream:
You are looking great today!
Also here's a sketch with a simplified view of a single petal:
https://editor.p5js.org/Ivan-Denisovich-py/sketches/jGb-HlMMt
Have a nice day man. 
*/

// Globals

let a1, a2, p1, p2;
let xAmplifier, yAmplifire_1, yAmplifire_2;
let xOff_1, xOff_2;
let t1, t2;
let petalLength, numberOfPetals;

let palettes;
let scheme;

function setup() {
    createCanvas(600, 600);
    background(0);

    petalLength = height / 2 - floor(random(100));
    numberOfPetals = floor(random(4, 10));

    scheme = random(shuffle(palettes)); // I heard you dislike color palettes. Why?

    a1 = createVector(0, 0); // First anchor point
    a2 = createVector(0, petalLength); // Second anchor point
    p1 = createVector(); // first control point
    p2 = createVector(); // second control point

    // Some randomisation
    xAmplifier = floor(random(50, 150));
    t1 = 0.005;
    t2 = random(0.0005, 0.002);

    let randomOffset = floor(random(50, 300));

    xOff_1 = randomOffset;
    xOff_2 = -randomOffset;

    yAmplifire_1 = floor(random(50, 200));
    yAmplifire_2 = floor(random(50, 200));
}

function draw() {
    translate(width / 2, height / 2);

    // Movement Functions of each control points.
    // Spent hours in this stupid thing to make each randomised output to look like petals.
    // Screw you, long form generative art
    p1.x = xOff_1 + abs(1.5 * xAmplifier * sin(t1 * millis()));
    p1.y = petalLength / 2 + yAmplifire_1 * sin(t2 * millis());
    p2.x = xOff_2 - abs(1.5 * xAmplifier * sin(t1 * millis() + TWO_PI / 3));
    p2.y = petalLength / 2 + yAmplifire_2 * sin(t2 * millis() + TWO_PI / 3);

    // Drawing each petal
    for (let i = 0; i < numberOfPetals; i++) {
        rotate(TWO_PI / numberOfPetals);
        noFill();
        stroke(scheme[i] + "05");
        strokeWeight(2);
        bezier(a1.x, a1.y, p1.x, p1.y, p2.x, p2.y, a2.x, a2.y);
    }
}

// Color Palattes

palettes = [
    [
        "#ffadad",
        "#ffd6a5",
        "#fdffb6",
        "#caffbf",
        "#9bf6ff",
        "#a0c4ff",
        "#bdb2ff",
        "#bdb2ff",
        "#fffffc",
    ],
    [
        "#d9ed92",
        "#b5e48c",
        "#99d98c",
        "#76c893",
        "#52b69a",
        "#34a0a4",
        "#168aad",
        "#1a759f",
        "#1e6091",
    ],
    [
        "#f94144",
        "#f3722c",
        "#f8961e",
        "#f9844a",
        "#f9c74f",
        "#90be6d",
        "#43aa8b",
        "#4d908e",
        "#577590",
    ],
    [
        "#eeef20",
        "#dddf00",
        "#d4d700",
        "#bfd200",
        "#aacc00",
        "#80b918",
        "#55a630",
        "#2b9348",
        "#007f5f",
    ],
    [
        "#33658a",
        "#86bbd8",
        "#2f4858",
        "#f6ae2d",
        "#f26419",
        "#2afc98",
        "#09e85e",
        "#16c172",
        "#ffc1cf",
    ],
];
