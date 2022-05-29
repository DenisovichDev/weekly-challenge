/*
Made for sableRaph (twitch.tv/codingtrainchoochoo)

by Denisovich/Rishi/Richie/Mitchie/Sheeeeeeefmahn
*/

// Based on a window I remember from my college church
// There is also a window in a hall in my uni that's kinda like this one
// Did the original window had fleu de lis? No, it was a protestant church.
// I just couldn't think of any other fancy looking symbols

let unitGrid, rows, cols
let fleurdelis, f_w, f_h
let clusterNum, clusterCols

function preload() {
    fleurdelis = loadImage("fleur.svg")
}

function setup() {
    l = min(windowHeight, windowWidth)
    createCanvas((w = l), (h = l))

    unitGrid = width / 4
    rows = floor(h / unitGrid) + 1
    cols = floor(w / unitGrid) + 1
    f_w = f_h = unitGrid / 2
    clusterNum = floor(random(l / 100, l / 80))
    clusterCols = [color(247, 186, 0, 3), color(255, 89, 48, 3)]

    noLoop()
}

function draw() {
    background("#CCCCC4")

    glassTint(color(255, 0, 0, 3), 300)
    glassTint(color(247, 243, 7, 3), 500)

    for (let i = 0; i < clusterNum; i++) {
        colorCluster(random(w), random(h), random(clusterCols), 100)
    }

    blackThingie()
    fleurDraw()
    sideBar()
    for (let i = 0; i < floor(random(l / 40, l / 30)); i++) {
        colorCluster(random(w), random(h), color(255, 255, 255, 2), 100)
    }
    LEGRANULATEUR(20)
}

function fleurDraw() {
    // Listen I KNOW that I could have done this
    // in just one nested loop. But you do realize
    // that I am writing this while you are making the
    // AAron joke, right?
    for (let j = 0; j < rows / 2 + 2; j++) {
        for (let i = 0; i < cols / 2 + 2; i++) {
            let x = i * unitGrid - unitGrid / 2
            let y = j * unitGrid
            centerImage(fleurdelis, x, y, f_w, f_h)
        }
    }
    for (let j = 0; j < rows / 2 + 2; j++) {
        for (let i = 0; i < cols / 2 + 2; i++) {
            let x = i * unitGrid
            let y = j * unitGrid - unitGrid / 2
            centerImage(fleurdelis, x, y, f_w, f_h)
        }
    }
}

// good function
function centerImage(img, x, y, w_, h_) {
    image(img, x - w_ / 2, y - h_ / 2, w_, h_)
}

function sideBar() {
    push()
    noStroke()
    fill(0)
    rect(0, 0, unitGrid / 2, l)
    rect(w - unitGrid / 2, 0, unitGrid / 2, l)

    for (let i = 0; i < rows; i++) {
        rectMode(CENTER)
        fill("#1c509e")
        if (i % 2 == 0) fill("#ffe03d")
        rect(
            unitGrid / 4,
            i * unitGrid,
            unitGrid / 2 - unitGrid / 5,
            unitGrid - unitGrid / 6,
            unitGrid / 25
        )
        rect(
            w - unitGrid / 4,
            i * unitGrid,
            unitGrid / 2 - unitGrid / 5,
            unitGrid - unitGrid / 6,
            unitGrid / 25
        )
    }
    pop()
}

function blackThingie() {
    for (let j = 0; j < 2 * rows; j++) {
        stroke(0)
        strokeWeight(l / 38)
        line(j * unitGrid, 0, 0, j * unitGrid)
        line((rows - j) * unitGrid, 0, h, h - (rows - j) * unitGrid)
    }
}

function colorCluster(x, y, col, iter) {
    for (let i = 0; i < iter; i++) {
        let x_ = x + random([-1, 1]) * random(l / 10)
        let y_ = y + random([-1, 1]) * random(l / 10)
        push()
        noStroke()
        fill(col)
        circle(x_, y_, random(l / 10, l / 5))
        pop()
    }
}

function glassTint(col, iter) {
    for (let i = 0; i < iter; i++) {
        let x = random(w)
        let y = random(h)
        push()
        noStroke()
        fill(col)
        circle(x, y, random(l / 10, l / 5))
        pop()
    }
}

function LEGRANULATEUR(gA) {
    loadPixels()
    let d = pixelDensity()
    let halfImage = 4 * (w * d) * (h * d)
    for (let i = 0; i < halfImage; i += 4) {
        grainAmount = map(random(), 0, 1, -gA, gA)
        pixels[i] = pixels[i] + gA / 2
        pixels[i + 1] = pixels[i + 1] + grainAmount
        pixels[i + 2] = pixels[i + 2] + grainAmount
        pixels[i + 3] = pixels[i + 3] + grainAmount
    }
    updatePixels()
}
