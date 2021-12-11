let ms
let unitCell = 16
let gw, gh, cols, rows
let sprites
let tile

let grid
let gameLost = false
let translateOriginX = 20
let translateOriginY = 70

let imgUnrev, imgEmp, imgBomb, imgFBomb, imgFlag, imgWFlag
let imgVal = []

let wIcons = []

let smiley1, smiley2, smileyPic

let col = ["#C0C0C0", "#FFFFFF", "#7C7C7C"]
let font
function preload() {
    sprites = {
        tiles: loadImage("assets/tiles.png"),
        faces: loadImage("assets/faces.png"),
        scores: loadImage("assets/scores.png"),
    }
    font = loadFont("assets/msbold.ttf")
    wIcons = [
        loadImage("assets/mini.png"),
        loadImage("assets/fullscreen.png"),
        loadImage("assets/cross.png"),
    ]
}

function setup() {
    let cnv = createCanvas(296, 346)
    cnv.id("mainCanvas")

    gw = 256
    gh = 256

    cols = floor(gw / unitCell)
    rows = floor(gh / unitCell)

    textFont(font)
    textSize(12)
    textAlign(CORNER, CENTER)

    imgUnrev = sprites.tiles.get(0, 0, 16, 16)
    imgFBomb = sprites.tiles.get(6 * 16, 0, 16, 16)
    imgBomb = sprites.tiles.get(5 * 16, 0, 16, 16)
    imgFlag = sprites.tiles.get(2 * 16, 0, 16, 16)
    imgWFlag = sprites.tiles.get(7 * 16, 0, 16, 16)

    for (let i = 0; i < 8; i++) {
        imgVal.push(sprites.tiles.get(i * 16, 16, 16, 16))
    }

    smiley1 = sprites.faces.get(0, 0, 24, 24)
    smiley2 = sprites.faces.get(24, 0, 24, 24)

    grid = new Grid(rows, cols)
    grid.init()
}

function draw() {
    background(col[0])
    drawBorder()
    drawWindowIcons()
    drawSmiley()
    translate(translateOriginX, translateOriginY)
    grid.run()
}

function mousePressed() {
    if (outsideGrid(mouseX, mouseY)) return

    cellCoords = grid.detectCell()
    let c = grid.cellIdx(cellCoords.x, cellCoords.y)

    if (!gameLost) {
        if (mouseButton === LEFT) {
            if (c.isBomb) {
                c.firstBomb = true
                gameLost = true
                grid.revealWrongFlagsAndBombs()
            }

            grid.reveal(cellCoords.x, cellCoords.y)
        } else if (mouseButton === RIGHT) {
            if (c.flagged) grid.unflag(cellCoords.x, cellCoords.y)
            else grid.flag(cellCoords.x, cellCoords.y)
        }
    }
}

function keyPressed() {
    resetGame()
}

// Utils

function randi(min, max) {
    return floor(random(min, max + 1))
}

function outsideGrid(x, y) {
    let mx = x - translateOriginX
    let my = y - translateOriginY
    return mx < 0 || mx > gw || my < 0 || my > gh
}

function resetGame() {
    gameLost = false
    grid = new Grid(rows, cols)
    grid.init()
}

function drawBorder() {
    push()
    noStroke()
    fill(col[1])
    rect(10, 20, 3, translateOriginY - 20 + gh + 10)
    rect(10, 20, translateOriginX + gw, 3)
    fill(col[2])
    rect(13, translateOriginY + gh + 7, translateOriginX + gw - 3, 3)
    rect(translateOriginX + gw + 7, 23, 3, translateOriginY - 20 + gh + 7)
    beginShape()
    vertex(translateOriginX + gw + 7, 23)
    vertex(translateOriginX + gw + 10, 23)
    vertex(translateOriginX + gw + 10, 20)
    endShape(CLOSE)
    beginShape()
    vertex(13, translateOriginY + gh + 7)
    vertex(13, translateOriginY + gh + 10)
    vertex(10, translateOriginY + gh + 10)
    endShape(CLOSE)

    // Outer border
    fill(col[1])
    rect(0, 0, 3, height)
    rect(0, 0, width, 3)
    rect(width - 3, 0, 3, height)
    rect(0, height - 3, width, 3)

    // The top thing
    let grd = drawingContext.createLinearGradient(0, 0, width, 0)
    grd.addColorStop(0, "#00007F")
    grd.addColorStop(1, "#0F7EC8")
    drawingContext.fillStyle = grd
    rect(5, 5, width - 10, 15)
    pop()

    // Text
    fill(255)
    noStroke()
    text("Minesweeper", 10, 8)
}

function drawWindowIcons() {
    image(wIcons[2], width - 20, 7, 11, 11)
    image(wIcons[1], width - 33, 7, 11, 11)
    image(wIcons[0], width - 44, 7, 11, 11)
}

function drawSmiley() {
    if (mouseIsPressed) {
        if (mouseX >= 136 && mouseX < 160 && mouseY >= 36 && mouseY < 60) {
            image(smiley2, 136, 36)
            return
        }
    }
    image(smiley1, 136, 36)
}
