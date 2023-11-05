let r, buff, ws
let lines = []
let waves = []
let randOffs = []

let divs, scl;

const PHI = 1.618033
const rows = 3
const lineLen = 12

function setup() {
	l = max(min(windowWidth, windowHeight), 600)
	createCanvas(w = l, h = l)
    bgBuffer = createGraphics(w, h)

    bg = color("#eae7e8")

    divs = round(0.038 * l)

	ws = w / 6 //white space
    for (let i = 0; i < rows; i++) {
        randOffs.push(random(-15, 15));
    }

    
    // Wave parameter object data structure
    for (let i = 0; i < rows; i++) {
        const waveObj = {
            a1 : random(TAU),
            b1 : random(TAU),
            a2 : random(TAU),
            b2 : random(TAU),
            incr: [random(0.0003, 0.003), random(0.0003, 0.003), random(0.0003, 0.003), random(0.0003, 0.003)],
            off: [0, 0, 0, 0]
        }
        waves.push(waveObj)
    }
   scl = 0.019 * l

    // Background buffer related
    bgBuffer.background(bg)
    gorillaGrain(13, bgBuffer)
}

function draw() {
	image(bgBuffer, 0, 0) // Draw the background
	

	let len = l - 2 * ws
	let yStep = len / rows
	for (let i = 0; i < rows; i++) {
        // Experiment
        let w = waves[i]
        drawWave({ x : ws + randOffs[i], y: yStep / 2 + ws + i * yStep }, len, w.a1 + w.off[0], w.b1 + w.off[1], w.a2 + w.off[2], w.b2 + w.off[3], "#f24c63c8")
        
        for (let k = 0; k < 4; k++)
          w.off[k] += w.incr[k]
	}

}


function drawWave(v1, len, a1, b1, a2, b2, col) {
    push()
    let unit = len / divs
    translate(v1.x, v1.y)
    let x = unit / 2
    
    stroke(col)
    strokeWeight(15)
    strokeCap(SQUARE);
    
    for (let i = 0; i < divs; i++) {
        let y1 = f(x, a1, b1, lineLen / 2) * scl
        let y2 = f(x, a2, b2, - lineLen / 2) * scl

        line(x, y1, x, y2)
        x += unit
    }
    pop()
}

let f = (x, a, b, s) => {
    return s + 2 * sin(20 * sin(PHI * x + b) + a)
}

// Utility
function gorillaGrain(gA, buffer) {
    buffer.loadPixels();
    let d = pixelDensity();
    let halfImage = 4 * (w * d) * (h * d);
    for (let i = 0; i < halfImage; i += 4) {
      grainAmount = map(random(), 0, 1, -gA, gA);
      buffer.pixels[i] = buffer.pixels[i] + gA / 2;
      buffer.pixels[i + 1] = buffer.pixels[i + 1] + grainAmount;
      buffer.pixels[i + 2] = buffer.pixels[i + 2] + grainAmount;
      buffer.pixels[i + 3] = buffer.pixels[i + 3] + grainAmount;
    }
    buffer.updatePixels();
}

function randi(low, high) {
  return floor(random(low, high + 1))
}
