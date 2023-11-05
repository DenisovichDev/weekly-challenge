/**
 * Made for #WCCChallenge @sableRaph
 * By @DenisovichPy (https://denisovichdev.github.io/link-tree)
 *
 * Well, well, well, look who's back
 * Sorry for not submitting for like a year or something...
 * But hey, if the prompt is Molnar then even someone with an
 * artists' block and too-much-life-stuff has to return!
 * Also, I must say this feels like a #RecodeRethink and #WCCChallenge collab.
 * Oh yeah, I'm adding all of this weeks submissions to Recode Rethink as well.
 *
 * Anyway, so this is based on an untitled Molnar piece (https://spalterdigital.com/artworks/1980/)
 * The first ever RecodeRethink piece I did back in November 8th, 2021,
 * was based on a Vera Molnar artwork, and I tried animate/rethink it in a similar way to 
 * what I did two years ago. (Here's the original one: https://openprocessing.org/sketch/1344477)
 *
 * RecodeRethink has come a long way, so have all of us in the past two years,
 * And I really do think any of this couldn't have been possible if giants like
 * Molnar hadn't started making randomized algorithmic computer-assisted artworks
 * taking random numbers from a thick book.
 *
 * I have tried to comment it as much as I can, Raph (aka Dan)
 * so that the trig mess is more understandable.
 *
 * If you let it run for a bit, it's kinda meditative?
 */


// Global variables
let lines = []
let waves = []
let randOffs = []

let divs, scl, ws;

// Constants
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
        drawWave({ x : ws + randOffs[i], y: yStep / 2 + ws + i * yStep },
                len,
                w.a1 + w.off[0],
                w.b1 + w.off[1],
                w.a2 + w.off[2],
                w.b2 + w.off[3],
                "#f24c63c8")
        // increments the sine wave parameters to keep them moving
        for (let k = 0; k < 4; k++)
          w.off[k] += w.incr[k]
	}

}

// Rather than me trying to explain this, I'll just give you
// a desmos link: https://www.desmos.com/calculator/kjdhmmrdmc
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

// The repeating smooth sine wave function
const f = (x, a, b, s) => {
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
