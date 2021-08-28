/*
 * Submission For Birb's Nest Weekly CC Challenge
 * Author: @DenisovichPy (Rishi)
 *
 * READ AT YOUR OWN RISK
 */

let cnv;
let treasure;
let mapImg;
let compasses;

let mapScale = 2100; //in km (defines the width of the map)
const r_earth = 6378; //in km (Don't even dare play with it)

const gmrtURL = new URL("https://www.gmrt.org:443/services/ImageServer");
let locationParams;
const geocodingURL = new URL(
    "https://revgeocode.search.hereapi.com/v1/revgeocode"
);
let geocodingParams;

let xOff;
let yOff;

let imageLoaded = false;
let blankImage = false;

let label;
const labelEl = document.querySelector(".label");
const saveBtn = document.querySelector(".save");
const newMapBtn = document.querySelector(".generate");
const codeBtn = document.querySelector(".code");
const loading = document.querySelector(".loading");

const coords = [
    [49, 10],
    [0, 52],
    //[27, 60],
    [24, 37],
    [42, 40],
    [140, 37],
    [39, 11],
    [124, 36],
    [172, -43],
    [70, 24],
    [-81, 27],
    [-83, 9],
    [104, 13],
    [87, 23],
    [47, -19],
];
let placeIndex = 0;

newMapBtn.addEventListener("click", () => {
    load();
});

codeBtn.addEventListener("click", () => {
    window.open(
        "https://github.com/Ivan-Denisovich-py/weekly-challenge/tree/main/maps"
    );
});

function preload() {
    treasure = loadFont("assets/TreasureMapDeadhand-yLA3.ttf");

    load();

    compasses = [
        loadImage("assets/comp-2.png"),
        loadImage("assets/comp-1.png"),
    ];
}

function setup() {
    cnv = createCanvas(600, 600);

    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    cnv.position(x, y);
}

function draw() {
    if (imageLoaded || blankImage) {
        generateNewMap();
    }
}

function windowResized() {
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    cnv.position(x, y);
}

function generateNewMap() {
    background(234, 214, 182);
    mapImg.resize(width + 50, height + 50);
    perlinDither(mapImg);
    if (imageNotCrap(mapImg)) {
        loading.style.visibility = "hidden";
        push();
        translate(width / 2, height / 2);
        scale(1.3);
        image(mapImg, -width / 2, -height / 2);
        pop();

        image(random(compasses), width - 130, 30, 120, 120);
        labelEl.innerHTML = label;

        imageLoaded = false;

        saveBtn.addEventListener("click", () => {
            saveCanvas(cnv, "my-map", "jpg");
        });
    }
}

function load() {
    loading.style.visibility = "visible";

    getRandomCoordinates();

    gmrtURL.search = new URLSearchParams(locationParams).toString();

    // GMRT Image Server

    fetch(gmrtURL)
        .then((resp) => resp.blob())
        .then((blob) => {
            const objectURL = URL.createObjectURL(blob);
            mapImg = loadImage(objectURL);
            imageLoaded = true;
        })
        .catch((err) => console.log(err));

    geocodingURL.search = new URLSearchParams(geocodingParams).toString();

    // Position Stack Reverse Geocoding Server

    fetch(geocodingURL)
        .then((resp) => resp.json())
        .then((jsonData) => {
            if (jsonData.items[0]) {
                label = jsonData.items[0].address.label;
                console.log(label);
            } else {
                console.log("Not a valid region 🎃");
            }
        })
        .catch((err) => console.log(err));

    placeIndex++;
    if (placeIndex >= coords.length) placeIndex = 0;
}

// Getting Random Location Bounding Box

function getRandomCoordinates() {
    const randomCoords = coords[placeIndex];
    const location = createVector(randomCoords[0], randomCoords[1]);

    // const location = createVector(random(0, 360), random(-70, 70));

    const dx = mapScale / 2;
    const dy = mapScale / 2;

    let y1 = location.y + (dy / r_earth) * (180 / PI);
    let y2 = location.y - (dy / r_earth) * (180 / PI);
    let x1 =
        location.x +
        ((dx / r_earth) * (180 / PI)) / cos((location.y * PI) / 180);
    let x2 =
        location.x -
        ((dx / r_earth) * (180 / PI)) / cos((location.y * PI) / 180);

    let minLong = min(x1, x2);
    let maxLong = max(x1, x2);
    let minLat = min(y1, y2);
    let maxLat = max(y1, y2);

    locationParams = {
        minlongitude: minLong,
        maxlongitude: maxLong,
        minlatitude: minLat,
        maxlatitude: maxLat,
        width: 1000,
        mask: "false",
        download: "false",
    };

    geocodingParams = {
        at: location.y + "," + location.x,
        limit: 5,
        apiKey: "1g5FobdATgBWTjLn_LQ_wPz2lajpHD1AjUd7MuEbB6k",
        lang: "en-US",
    };
}

// Perlin Noise Dither

function perlinDither(img) {
    img.loadPixels();
    yOff = 0;
    for (let y = 0; y < img.height; y++) {
        xOff = 0;
        for (let x = 0; x < img.width; x++) {
            let currentPixel = brightness(getColor(img, x, y));
            let threshold = floor(map(noise(xOff, yOff), 0, 1, 60, 72));

            if (currentPixel < threshold) {
                setColor(img, x, y, color(140, 119, 91));
                continue;
            }

            setColor(img, x, y, color(234, 214, 182));
            xOff++;
        }
        yOff++;
    }
    img.updatePixels();
}

/*
 * Some times the image processing produces blank images, due to
 * lag or I have missed some asynchronous behaviour and that is causing it.
 * Either way, I fixed it the bodgy way with the following function. If you what's the deal
 * you are more than welcome to fix it
 */

function imageNotCrap(img) {
    clr = getColor(img, 0, 0);
    for (let y = 0; y < img.height / 2; y++) {
        for (let x = 0; x < img.width / 2; x++) {
            if (brightness(getColor(img, x, y)) != brightness(clr)) {
                console.log("👍🏼 image");
                blankImage = false;
                return true;
            }
        }
    }
    console.log("👎🏼 image");
    blankImage = true;
    return false;
}

function index(x, y, w) {
    return (x + y * w) * 4; // 4 times because 1 pixel = 4 bytes
}

function getColor(img, x, y) {
    let idx = index(x, y, img.width);
    let pix = img.pixels;
    let red = pix[idx];
    let green = pix[idx + 1];
    let blue = pix[idx + 2];
    let alpha = pix[idx + 3];

    return color(red, green, blue, alpha);
}

function setColor(img, x, y, clr) {
    let idx = index(x, y, img.width);

    let pix = img.pixels;
    pix[idx] = red(clr);
    pix[idx + 1] = green(clr);
    pix[idx + 2] = blue(clr);
    pix[idx + 3] = alpha(clr);
}
