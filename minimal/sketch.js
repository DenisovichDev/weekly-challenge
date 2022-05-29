/*
Made for @sableraph's #WCCChallenge topic: um... yeah... about that. It's "minimalism the comeback, the awakening, the revenge Volume II Part 1 Return of the theme"
Is it offscreen? I wish it is.

Follow the stream on twitch.tv/sableraph :)

Submission by @denisovich (https://twitter.com/DenisovichPy)
*/

function setup() {
    createCanvas((w = 600), (h = 600))
    noLoop()
    blendMode(MULTIPLY)
}

function draw() {
    background(230)
    translate(w / 2, h / 2)
    let d = 80
    let r = 100
    shynifInspiredCircle(
        d * cos((-2 * PI) / 3),
        d * sin((-2 * PI) / 3),
        r,
        "#00ffff",
        PI / 2,
        random(20, 50)
    )
    shynifInspiredCircle(
        d * cos(0),
        d * sin(0),
        r,
        "#ff00ff",
        PI / 3,
        random(20, 50)
    )
    shynifInspiredCircle(
        d * cos((2 * PI) / 3),
        d * sin((2 * PI) / 3),
        r,
        "#ffff00",
        PI / 6,
        random(20, 50)
    )
}

// Circles visually inspired by Shynif's submission
function shynifInspiredCircle(x, y, r, c, phi, divs) {
    stroke(c)
    let step = (2 * r) / (divs + 1)
    for (let i = 1; i <= divs + 1; i++) {
        let theta = acos(1 - i * (step / r))
        yazidStyleLine(
            x - r * cos(phi + theta),
            y - r * sin(phi + theta),
            x - r * cos(phi - theta),
            y - r * sin(phi - theta)
        )
    }
}

// Inspired by the works of Yazid
function yazidStyleLine(x1, y1, x2, y2) {
    let theta = atan2(y2 - y1, x2 - x1)
    let d = dist(x1, y1, x2, y2)
    let step = width / random(1000, 2000)
    let weight = 1
    let off = random(0.2, 0.5)
    for (let i = 0; i < d; i += step) {
        let diam = random(width / 2000, width / 900) * weight
        noFill()
        circle(
            x1 + i * cos(theta) + random(-off, off),
            y1 + i * sin(theta) + random(-off, off),
            diam
        )
    }
}
