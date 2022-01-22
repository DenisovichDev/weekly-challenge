// Tried to comment as much as I could, but sorry it's not much

let l, bg
let starDim, diaDim, starCols, starRows, diaCols, diaRows
let stars = []
let dias = []
let shouldStarSpin = true
const spinSpeed = 0.01 // Try changing this
const starSpinFrames = Math.floor(Math.PI / (3 * spinSpeed))
const diaSpinFrames = Math.floor(Math.PI / spinSpeed)
let count = 0

let starColor = "#262104"
let diaColor = "#fffbe6"

// For recording
record = false
cnt = 0

function setup() {
    createCanvas(windowWidth, windowHeight)
    // pixelDensity(1);
    l = 50 //min(width, height) / 20
    starDim = {
        w: 2 * sqrt(2) * l,
        wOff: 2 * sqrt(2) * l * sin(PI / 6),
        h: 2 * sqrt(2) * l * sin((2 * PI) / 6),
    }

    diaDim = {
        w: 2 * l * cos(PI / 3),
        h: 2 * l * cos(PI / 6),
    }
    starCols = floor(width / starDim.w) + 1
    starRows = 2 * floor(height / starDim.h) + 3
    diaCols = starCols + 2
    diaRows = starRows + 2

    for (let j = -1; j < starRows; j++) {
        for (let i = -1; i < starCols; i++) {
            let wOff
            j % 2 === 0
                ? (wOff = starDim.w - sqrt(2) * l * cos(PI / 3))
                : (wOff = 0)
            let x =
                (i + 0.5) * (starDim.w + 2 * sqrt(2) * l * sin(PI / 6)) + wOff
            let y = j * starDim.h * 0.5
            stars.push(new Star(x, y, l))
        }
    }
    for (let j = -3; j < diaRows + 9; j++) {
        let type = j % 3
        let typeRow = (j - type) / 3
        // internal angle = 30 deg
        if (type === 0) {
            // The horizontal ones
            diaCols = starCols
            for (let i = -1; i < diaCols; i++) {
                let y = typeRow * starDim.h + starDim.h / 2
                let x = i * (starDim.w + starDim.wOff)
                // let y = j * diaDim.h
                dias.push(new Diamond(x, y, l, PI / 2))

                x += starDim.wOff + starDim.w / 4
                y += starDim.h / 2
                dias.push(new Diamond(x, y, l, PI / 2))
            }
        }

        if (type === 1) {
            diaCols = starCols * 2
            for (let i = -1; i < diaCols; i++) {
                let y =
                    typeRow * starDim.h +
                    sqrt(2) * l * sin(PI / 3) * cos(PI / 3)
                let x =
                    (i + 0.5) * 2 * (sqrt(2) * l * sin(PI / 3)) * sin(PI / 3)
                let angle = i % 2 ? -PI / 6 : PI / 6
                dias.push(new Diamond(x, y, l, angle))
            }
        }

        if (type === 2) {
            diaCols = starCols * 2
            for (let i = -1; i < diaCols; i++) {
                let y =
                    typeRow * starDim.h -
                    sqrt(2) * l * sin(PI / 3) * cos(PI / 3)
                let x =
                    (i + 0.5) * 2 * (sqrt(2) * l * sin(PI / 3)) * sin(PI / 3)
                let angle = i % 2 ? PI / 6 : -PI / 6
                dias.push(new Diamond(x, y, l, angle))
            }
        }
    }

    // frameRate(10);
    // noLoop()
}

function draw() {
    if (0 <= count && count <= starSpinFrames) {
        shouldStarSpin = true
    }
    if (starSpinFrames < count && count <= starSpinFrames + diaSpinFrames) {
        shouldStarSpin = false
    }

    shouldStarSpin ? (bg = color(diaColor)) : (bg = color(starColor))

    background(bg)

    if (shouldStarSpin) {
        dias.forEach((e) => {
            e.draw()
            e.spin()
        })
        stars.forEach((e) => {
            e.draw()
            e.spin()
        })
    } else {
        stars.forEach((e) => {
            e.draw()
            e.spin()
        })
        dias.forEach((e) => {
            e.draw()
            e.spin()
        })
    }
    count++
    if (count === starSpinFrames + diaSpinFrames) count = 0

    if (record && frameCount <= starSpinFrames + diaSpinFrames) {
        if (frameCount % 3 === 0) {
            saveCanvas("gif-" + cnt, "png")
            cnt++
        }
    }
}
