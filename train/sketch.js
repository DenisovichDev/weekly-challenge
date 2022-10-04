/*
 * Made by Denisovich/Rishi/Richard/Macbeth/Mitchell
 * (https://twitter.com/DenisovichPy)
 * Made for:
 *      @sableRaph (twitch.tv/codingtrainchoochoo)
 *      @sheeffmaahn (twitch.tv/sableraph)
 *
 * Here's the thing, Raph, you mocked me for using SVG last
 * week. I don't know why I thought I should defend my pride
 * or whatever, and decided to model the train natively in p5.js.
 * It would have been easier if I had used CSS!!
 *
 * Anyway, sniff, there are 418 this dots in train.js. That's
 * gonna make Dan happy.
 *
 * Also to Dan, It's hard not to fanboy, but thanks for everything
 *
 * The sky is inspired by a work by Clay, I'll link it later
 *
 */

// Recording ----
// let record = false
// let count = 0
// let counter = 0
// -----

const mondrian = ["#0a0a0a", "#f7f3f2", "#0077e1", "#f5d216", "#fc3503"] // color pals

let train, speeed, skyColor
let stopping = false
let starting = false
let highestSpeed = 0.5

function setup() {
    l = min(windowHeight, windowWidth)
    createCanvas((w = l), (h = l))

    speeed = highestSpeed
    skyColor = random(sc)

    train = new Train()
    mountainOff_1 = mountainOff_2 = mountainOff_3 = groundOff = 0
    bushOff_1 = bushOff_2 = 0

    // frameRate(10)
}

function draw() {
    background(250)
    drawSky()

    mountain(
        4000 + mountainOff_1 * 0.4,
        0.01,
        h * 0.1,
        h * 0.3,
        addAlpha("#efefef", 50)
    )

    mountain(
        2000 + mountainOff_2 * 0.6,
        0.01,
        h * 0.2,
        h * 0.4,
        addAlpha("#e7e7e7", 100)
    )
    mountain(
        3000 + mountainOff_3 * 0.7,
        0.008,
        h * 0.25,
        h * 0.5,
        addAlpha("#5A5A5A", 255)
    )
    mountain(
        7000 + groundOff,
        0.002,
        h * 0.5,
        h * 0.7,
        addAlpha("#31270F", 255)
    )

    train.draw()
    train.update()

    bush(40000 + bushOff_1, 0.01, h * 0.75, h * 0.95, "#08200C")
    bush(50000 + bushOff_1, 0.01, h * 0.9, h * 1.05, "#041111")

    // this is clever
    mountainOff_1 += speeed * 0.01
    mountainOff_2 += speeed * 0.01
    mountainOff_3 += speeed * 0.008
    groundOff += speeed * 0.001
    bushOff_1 += speeed * 0.01
    bushOff_2 += speeed * 0.01

    if (stopping) {
        train.speed -= 0.0008
        if (train.speed <= 0) {
            train.speed = 0
            stopping = false
            speeed = 0
        }
    }
    if (starting) {
        train.speed += 0.0008
        if (train.speed >= highestSpeed) {
            train.speed = highestSpeed
            starting = false
            speeed = highestSpeed
        }
    }

    //     if (counter < 1600 && record) {
    //         if (frameCount % 2 === 0) {
    //             saveCanvas("out-" + count, "png")
    //             count++
    //         }
    //         counter++
    //     }
}

function bush(noiseOffset, noiseScale, min, max, color) {
    push()
    fill(color)
    noStroke()
    // stroke(color)
    beginShape()
    vertex(0, h)
    for (let i = 0; i <= w; i++) {
        let x = i
        let n = noise(noiseOffset + i * noiseScale)
        let y = map(n, 0, 1, min, max)
        vertex(x, y)

        circle(
            x,
            y,
            map(noise(3000 + noiseOffset + i * noiseScale), 0, 1, 20, 50)
        )
    }
    vertex(w, h)
    endShape(CLOSE)
    pop()
}

function mountain(noiseOffset, noiseScale, min, max, color) {
    push()
    fill(color)
    noStroke()
    // stroke(color)
    beginShape()
    vertex(0, h)
    for (let i = 0; i <= w; i++) {
        let x = i
        let y = map(noise(noiseOffset + i * noiseScale), 0, 1, min, max)
        vertex(x, y)
    }
    vertex(w, h)
    endShape(CLOSE)
    pop()
}

function drawSky() {
    push()
    let grd = drawingContext.createLinearGradient(0, 0, 0, h * 0.5)
    grd.addColorStop(0, skyColor[0])
    grd.addColorStop(0.5, skyColor[1])
    grd.addColorStop(1, skyColor[2])
    drawingContext.fillStyle = grd
    rect(0, 0, w, h)
    pop()
}

function stoppingAction() {
    train.engineRunning = false
    stopping = true
}

function startingAction() {
    train.engineRunning = true
    starting = true
}

// Utility Functions

function addAlpha(color, alpha) {
    return color + alpha.toString(16).toUpperCase()
}

function keyPressed() {
    // train.addSmoke(5)

    if (keyCode == 32) {
        if (train.engineRunning && !starting) stoppingAction()
        if (!train.engineRunning && !stopping) startingAction()
    }

    // recording
    // if (keyCode == 81) {
    //     record = true
    //     frameRate(10)
    // }
}
