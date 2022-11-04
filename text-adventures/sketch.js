// Click to clear the screen

const cnv = document.querySelector('#container')
const root = document.querySelector(':root')

const fontAspectRatio = 1.665943022666196

let rows, cols

const fontSize = 16 // in pixel
const grid = { w: fontSize / fontAspectRatio, h: fontSize }

const bg = '#0a0a0a'

function setup() {
    noCanvas()
 
    l = min(windowWidth, windowHeight)

    rows = floor(l / grid.h)
    cols = floor(l / grid.w)
    
    root.style.setProperty('--len', l + 'px')
    root.style.setProperty('--rows', rows)
    root.style.setProperty('--cols', cols)
    root.style.setProperty('--font-size', fontSize)
    root.style.setProperty('--bg-color', bg)

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            let element = document.createElement('div')
            element.innerHTML = ''
            element.classList.add('char')
            element.classList.add('r-' + j)
            element.classList.add('c-' + i)
            cnv.appendChild(element)
        }
    }

    // noLoop()
}

function draw() {
    // console.log(frameRate())

    // clrScr()

    let mx = constrain(mouseX - (windowWidth - l) / 2, 0, l)
    let my = constrain(mouseY - (windowHeight - l) / 2, 0, l)

    let x = constrain(floor(cols * (mx / l)), 0, cols - 1)
    let y = constrain(floor(rows * (my / l)), 0, rows - 1)

    // putch('P', x, y)

    midPointCircle(x, y, 8, 'P', 'white', true, '#ED225D')
}

function mouseClicked() {
    clrScr()
}

// Utility
function clrScr() {
    let chars = document.querySelectorAll('.char')
    chars.forEach(c => {
        c.innerHTML = ''
    })
}

// Circle
function midPointCircle(cx, cy, r, ch, borderCol, fill=false, fillCol) {
    let x = r, y = 0;
    // Printing the initial point
    // on the axes after translation
    putch(ch, x + cx, y + cy, borderCol)
    // When radius is zero only a single
    // point will be printed
    if (r > 0) {
        putch(ch, -x + cx, -y + cy, borderCol)
        putch(ch, y + cx, x + cy, borderCol)
        putch(ch, -y + cx, -x + cy, borderCol)
        if (fill)
            horizLine(y + cy, -x + cx + 1, x + cx - 1, ch, fillCol)
            vertLine(y + cx, x + cy - 1, -x + cy + 1, ch, fillCol)
    }
    // Initialising the value of P
    var P = 1 - r;
    while (x > y) {
        y++;
        // Mid-point is inside or on the perimeter
        if (P <= 0)
            P = P + 2 * y + 1;
        // Mid-point is outside the perimeter
        else {
            x--;
            P = P + 2 * y - 2 * x + 1;
        }
        // All the perimeter points have already
        // been printed
        if (x < y)
            break;

        // Printing the generated point and its
        // reflection in the other octants after
        // translation
        putch(ch, x + cx, y + cy, borderCol)
        putch(ch, -x + cx, y + cy, borderCol)
        putch(ch, x + cx, -y + cy, borderCol)
        putch(ch, -x + cx, -y + cy, borderCol)

        if (fill) {
            horizLine(-y + cy, -x + cx + 1, x + cx - 1, ch, fillCol)
            horizLine(y + cy, -x + cx + 1, x + cx - 1, ch, fillCol)
        }

        // If the generated point is on the
        // line x = y then the perimeter points
        // have already been printed
        if (x != y) {
            putch(ch, y + cx, x + cy, borderCol)
            putch(ch, -y + cx, x + cy, borderCol)
            putch(ch, y + cx, -x + cy, borderCol)
            putch(ch, -y + cx, -x + cy, borderCol)
            if (fill) {
                y_u = cy - floor(2 * r / 3)
                y_l = cy + floor(2 * r / 3)
                vertLine( y + cx, -x + cy + 1, y_u, ch, fillCol)
                vertLine( y + cx, y_l, x + cy - 1, ch, fillCol)
                vertLine(-y + cx, -x + cy + 1, y_u, ch, fillCol)
                vertLine(-y + cx, y_l, x + cy - 1, ch, fillCol)
            }
        }
    }
}

function horizLine(y, x1, x2, character, color) {
    let xmin = min(x1, x2)
    let xmax = max(x1, x2)

    for (let x = xmin; x <= xmax; x++) {
        putch(character, x, y, color)
    }
}

function vertLine(x, y1, y2, character, color) {
    let ymin = min(y1, y2)
    let ymax = max(y1, y2)

    for (let y = ymin; y <= ymax; y++) {
        putch(character, x, y, color)
    }
}

function putch(character, x, y, color) {
    if (x < 0 || y < 0 || x >= cols || y >= rows) return
    let queryStr = ".char.r-" + y + ".c-" + x
    document.querySelector(queryStr).innerHTML = character
    if (color != null)
        document.querySelector(queryStr).style.color = color
}
