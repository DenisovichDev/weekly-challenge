// Click to clear the screen
//
// Made by Denisovich (denisovichdev.github.io/link-tree)
// For sableRaph's #WCCChallenge topic "ASCII Adventures"
//
// So to summarize, this is THE p5.js example made
// with selctable HTML text elements. There is no canvas used.
// Pretty cool, right? But wait, there's more. I have made a
// few functions for you to play with that I haven't used in
// the visuals. So if you go to draw, you'll find things
// to read and lines to uncomment. Do whatever you want with
// the functions.
//
//
// Also, I have commented the entire code for your ease.
// Matty, get a dog.


// The container element.
const cnv = document.querySelector('#container')
// The root element, where all the custom properties
// (CSS variables) are stored
const root = document.querySelector(':root')

// This was a huge problem. Monospace fonts are just
// fixed width. The height (from ascent to descent) of the
// font is greater than the width. No way to know 
// the height without a canvas or external libraries. So
// I just hardcoded the value I got from Roboto Mono
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
    
    // Sets the CSS custom properties. Basically CSS variables
    root.style.setProperty('--len', l + 'px')
    root.style.setProperty('--rows', rows)
    root.style.setProperty('--cols', cols)
    root.style.setProperty('--font-size', fontSize)
    root.style.setProperty('--bg-color', bg)

    // Creating a lot of divs. The classes of these divs
    // define the row and column number of the grid.
    // Use Dev Tools to see how it is.
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

    // Mouse coordinate adjustments (since there is no canvas)
    let mx = constrain(mouseX - (windowWidth - l) / 2, 0, l)
    let my = constrain(mouseY - (windowHeight - l) / 2, 0, l)

    let x = constrain(floor(cols * (mx / l)), 0, cols - 1)
    let y = constrain(floor(rows * (my / l)), 0, rows - 1)
    // ------------------------------------------------------

    // Uncomment to clear the screen in each frame
    // clrScr()


    // Your playground

    // x and y are now basically mouseX and mouseY now.
    // Do whatever you want with them
    

    // Uses Bresenham's midpoint ellipse drawing algorithm.
    // I can't believe I actually used something from the
    // Computer Graphics paper in a project.
    asciiCircle(x, y, 10, 'P', 'white', true, '#ED225D')

    // Puts a character in coordinate you pass on
    // putch('7', x, y, '#45f598')


    // This function actually makes a true circle, but it
    // looks like a slim ellipse since the font has greater
    // height than width. So the asciiCircle function is 
    // actually making an ellipse that looks like a circle
    // midPointCircle(x, y, 8, 'P', 'white', true, '#ED225D')
    
    // The ellipse function. No fill option for this one.
    // Does not take in account the rectangular shape of 
    // the character
    // midPointEllipse(x, y, 20, 10, 'P', 'white')
    
    // Line drawing function.
    // Currently not working very well. At all.
    // bresenham(0, floor(rows / 4), cols, floor(3 * rows / 4), '%', 'grey')
    
    // Rect function. Adjusted with the font aspect ratio
    // asciiRect(30, 20, 10, 10, 'R', '#5a6bf3', true, 'rgb(200, 200, 200')
}

function mouseClicked() {
    clrScr()
}

// Utility
function putch(character, x, y, color) {
    if (x < 0 || y < 0 || x >= cols || y >= rows) return
    let queryStr = ".char.r-" + y + ".c-" + x
    document.querySelector(queryStr).innerHTML = character
    if (color != null)
        document.querySelector(queryStr).style.color = color
}

// For clearing the screen
function clrScr() {
    // Selects all the character and sets them to ''
    let chars = document.querySelectorAll('.char')
    chars.forEach(c => {
        c.innerHTML = ''
    })
}

// Proper Circle
function asciiCircle(cx, cy, r, ch, borderCol, fill=false, fillCol=null) {
    let rx = r; let ry = round(r / fontAspectRatio)

    var dx, dy, d1, d2, x, y;
    x = 0;
    y = ry;
 
    // Initial decision parameter of region 1
    d1 = (ry * ry) - (rx * rx * ry) +
                   (0.25 * rx * rx);
    dx = 2 * ry * ry * x;
    dy = 2 * rx * rx * y;
 
    // For region 1
    while (dx < dy) {
         
        // Print points based on 4-way symmetry
        if (fill) {
            vertLine( x + cx, y + cy, -y + cy, 'P', fillCol)
            vertLine(-x + cx, y + cy, -y + cy, 'P', fillCol)
        }
        putch(ch, x + cx, y + cy, borderCol)
        putch(ch, -x + cx, y + cy, borderCol)
        putch(ch, x + cx, -y + cy, borderCol)
        putch(ch, -x + cx, -y + cy, borderCol)
 
        // Checking and updating value of
        // decision parameter based on algorithm
        if (d1 < 0) {
            x++;
            dx = dx + (2 * ry * ry);
            d1 = d1 + dx + (ry * ry);
        }
        else {
            x++;
            y--;
            dx = dx + (2 * ry * ry);
            dy = dy - (2 * rx * rx);
            d1 = d1 + dx - dy + (ry * ry);
        }
    }
 
    // Decision parameter of region 2
    d2 = ((ry * ry) * ((x + 0.5) * (x + 0.5))) +
         ((rx * rx) * ((y - 1) * (y - 1))) -
          (rx * rx * ry * ry);
 
    // Plotting points of region 2
    while (y >= 0) {
 
        // Print points based on 4-way symmetry
        putch(ch, x + cx, y + cy, borderCol)
        putch(ch, -x + cx, y + cy, borderCol)
        putch(ch, x + cx, -y + cy, borderCol)
        putch(ch, -x + cx, -y + cy, borderCol)
        if (fill) {
            x_l = cx - floor(rx / 2)
            x_r = cx + floor(rx / 2)
            horizLine( y + cy, x + cx - 1, x_r, 'P', fillCol)
            horizLine( y + cy, x_l, -x + cx + 1, 'P', fillCol)
            horizLine(-y + cy, x + cx - 1, x_r, 'P', fillCol)
            horizLine(-y + cy, x_l, -x + cx + 1, 'P', fillCol)
        }
 
        // Checking and updating parameter
        // value based on algorithm
        if (d2 > 0) {
            y--;
            dy = dy - (2 * rx * rx);
            d2 = d2 + (rx * rx) - dy;
        }
        else {
            y--;
            x++;
            dx = dx + (2 * ry * ry);
            dy = dy - (2 * rx * rx);
            d2 = d2 + dx - dy + (rx * rx);
        }
    }


}

// Midpoint Circle Drawing Algorithm (https://en.wikipedia.org/wiki/Midpoint_circle_algorithm)
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

// For ellipse. This algorithm is based on
// Midpoint Circle as well.
function midPointEllipse(cx, cy, rx, ry, ch, borderCol) {
    var dx, dy, d1, d2, x, y;
    x = 0;
    y = ry;
 
    // Initial decision parameter of region 1
    d1 = (ry * ry) - (rx * rx * ry) +
                   (0.25 * rx * rx);
    dx = 2 * ry * ry * x;
    dy = 2 * rx * rx * y;
 
    // For region 1
    while (dx < dy) {
         
        // Print points based on 4-way symmetry
        putch(ch, x + cx, y + cy, borderCol)
        putch(ch, -x + cx, y + cy, borderCol)
        putch(ch, x + cx, -y + cy, borderCol)
        putch(ch, -x + cx, -y + cy, borderCol)
 
        // Checking and updating value of
        // decision parameter based on algorithm
        if (d1 < 0)
        {
            x++;
            dx = dx + (2 * ry * ry);
            d1 = d1 + dx + (ry * ry);
        }
        else
        {
            x++;
            y--;
            dx = dx + (2 * ry * ry);
            dy = dy - (2 * rx * rx);
            d1 = d1 + dx - dy + (ry * ry);
        }
    }
 
    // Decision parameter of region 2
    d2 = ((ry * ry) * ((x + 0.5) * (x + 0.5))) +
         ((rx * rx) * ((y - 1) * (y - 1))) -
          (rx * rx * ry * ry);
 
    // Plotting points of region 2
    while (y >= 0) {
 
        // Print points based on 4-way symmetry
        putch(ch, x + cx, y + cy, borderCol)
        putch(ch, -x + cx, y + cy, borderCol)
        putch(ch, x + cx, -y + cy, borderCol)
        putch(ch, -x + cx, -y + cy, borderCol)
 
        // Checking and updating parameter
        // value based on algorithm
        if (d2 > 0) {
            y--;
            dy = dy - (2 * rx * rx);
            d2 = d2 + (rx * rx) - dy;
        }
        else {
            y--;
            x++;
            dx = dx + (2 * ry * ry);
            dy = dy - (2 * rx * rx);
            d2 = d2 + dx - dy + (rx * rx);
        }
    }
}

// Horizontal line. That's it.
function horizLine(y, x1, x2, character, color) {
    let xmin = min(x1, x2)
    let xmax = max(x1, x2)

    for (let x = xmin; x <= xmax; x++) {
        putch(character, x, y, color)
    }
}

// Vertical line. Yep.
function vertLine(x, y1, y2, character, color) {
    let ymin = min(y1, y2)
    let ymax = max(y1, y2)

    for (let y = ymin; y <= ymax; y++) {
        putch(character, x, y, color)
    }
}

// Okay this is the deal.
// Bresenham's Line Drawing algorithm.
// Doesn't work very well at the moment
function bresenham(x1, y1, x2, y2, character, color) {
    let dx = x2 - x1
    let dy = y2 - y1
    let x = x1
    let y = y1
    let p = 2 * dy - dx  

    while (x < x2) {  
        if (p >= 0) {  
            putch(character, x, y, color)
            y++
            p = p + 2 * dy - 2 * dx
        } else {
            putch(character, x, y, color)
            p = p + 2 * dy
        }
        x++
    }
}

function asciiRect(x, y, l1, l2, character, borderCol, fill=false, fillCol=null) {
    // correction for font dimensions
    l2 = floor(l2 / fontAspectRatio)
    horizLine(y, x, x + l1, character, borderCol)
    horizLine(y + l2, x, x + l1, character, borderCol)
    vertLine(x, y, y + l2, character, borderCol)
    vertLine(x + l1, y, y + l2, character, borderCol)


    if (fill) {
        if (fillCol === null) fillCol = borderCol
        for (let y_ = y + 1; y_ < y + l2; y_++) {
            horizLine(y_, x + 1, x + l1 - 1, character, fillCol)
        }
    }
}
