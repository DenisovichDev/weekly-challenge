/*
#WCCChallenge Topic: "Bookcover"
Added Diversifiers: "String => Image" (required) and "Cloud access"

String => Image 
The Kawano inspired Mondrian is unique based on the
current viewcount of sableRaph's twitch channel.

But Rishi, how the heck is it string to image?
Well, Because Raph's viewership is a part of his story.
And this is a book about his story, I guess? I don't know man.
I'm just making all this up. I'm late for the submission already.

Also,
Raph, if it's not a major security problem, try changing your
channel description.
Maybe something will change?

Edit: The title is Raph's channel description, and I'm happy
to inform that it evolved from 'Honk!' to 'Quack!'

Also I drew that birb! Are you proud?

This was a lazy submission, cheers everybody.

*/

let unitGrid = 10;
let cols, rows;
let palette = ["#130F0E", "#023AAE", "#DB0010", "#FEF263", "#DAD0C4"]; // I know you like it

// That's your user id in the querry string
let url = "https://api.twitch.tv/helix/users?id=94513165";

let seed, robotos, birb, title;

function preload() {
    // GET request
    fetch(url, {
        method: "GET",
        headers: {
            Authorization: nothingToSee,
            "Client-Id": shhhhh,
        },
    })
        .then((resp) => resp.json())
        .then((info) => {
            seed = info.data[0].view_count;
            title = info.data[0].description;
            console.log("Raph's current viewcoint is", seed, "🦢");
        })
        .catch((err) => console.log(err));

    robotos = loadFont("./font/RobotoSlab-Medium.ttf");
    birb = loadImage("./assets/birb_drop.png");
}

function setup() {
    createCanvas(460, 600);

    bg = color("#DAD0C4");
    background(bg);

    cols = width / unitGrid;
    rows = height / unitGrid;

    textFont(robotos);
    textSize(50);
    textAlign(CENTER, CENTER);
}

function draw() {
    if (seed === undefined) return;
    randomSeed(seed); // I don't understand asynchronous JS, gimme a break

    background(bg);

    let c = randomColor();

    // The Kawano background

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (random(1) < 0.2) c = randomColor();
            drawUnitRect(x, y, c);
        }
    }

    // Gorilla Grain (Thanks Ahmad <3)
    gorillaGrain(30);

    titleShape();
    borders();

    noLoop();
}

function titleShape() {
    push();
    noStroke();
    rectMode(CENTER);
    rect(width / 2, 100, 400, 150, 30);
    noFill();
    stroke(0);
    drawingContext.setLineDash([5, 20]); // Vanilla Canvas is awesome
    strokeWeight(5);
    rect(width / 2, 100, 370, 120, 20);
    pop();
    text(title, width / 2, 100 - 10);
    image(birb, 300, 150, 100, 100);
}

function drawUnitRect(x, y, color) {
    push();
    fill(color);
    noStroke();
    rect(x * unitGrid, y * unitGrid, unitGrid, unitGrid);
    pop();
}

function randomColor() {
    return random(shuffle(palette));
}

function gorillaGrain(gA) {
    loadPixels();
    let d = pixelDensity();
    let halfImage = 4 * (width * d) * (height * d);
    for (let i = 0; i < halfImage; i += 4) {
        grainAmount = map(random(), 0, 1, -gA, gA);
        pixels[i] = pixels[i] + gA / 2;
        pixels[i + 1] = pixels[i + 1] + grainAmount;
        pixels[i + 2] = pixels[i + 2] + grainAmount;
        pixels[i + 3] = pixels[i + 3] + grainAmount;
    }
    updatePixels();
}

function borders() {
    push();
    stroke(0);
    strokeWeight(3);
    line(0, 0, width, 0);
    line(width, 0, width, height);
    line(width, height, 0, height);
    line(0, height, 0, 0);
    pop();
}

// End

// Stop scrolling

// Please

// Okay you are just wasting your time.

// Okay if you are streaming, please stop scrolling.

const nothingToSee = "Bearer 8x4i07ekwogr4e6dx70hgl4j68mkmo";
const shhhhh = "ggwwz40efahafrfhfhe8owro12i8b9";
