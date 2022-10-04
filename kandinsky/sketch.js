// Weekly Creative Coce Challenge / Recode Rethink
// DenisovichDev

let boundary, circles, numCircles, lines, numLines, sqiggs, numSquiggs
let black = "#10060D"
p5.disableFriendlyErrors = true

// For Recording
let recording = false
let fCount = 121
//--------------


function setup() {
    l = 587//min(windowHeight, windowWidth)
    createCanvas(w = l, h = l)
	bgBuff = createGraphics(w, h)

    bg = color("#ECDBD1")

	bgBuff.background(bg)
	gorillaGrain(20, bgBuff)
	

	// noLoop() // For now
	imageMode(CENTER)

	stroke(black)

	// Objects
	boundary = new BoundingCircle(l * 0.45, l * 0.05)
	boundary.render()

	ray_1 = new Ray(random(PI / 8, PI / 6), "#E0B479")
	ray_2 = new Ray(-random(PI / 8, PI / 6), "#54A7A7")
	ray_1.init()
	ray_2.init()

	circles = []
	numCircles = floor(0.0766 * boundary.r)
	for (let i = 0; i < numCircles; i++) {
		let phi = random(TAU)
		let r = boundary.r * 0.8 * sqrt(random())
		let c = new Circle(r * cos(phi) + w/2, r * sin(phi) + h/2)
		circles.push(c)
	}
	lines = []
	numLines = floor(0.046 * boundary.r)
	for (let i = 0; i < numLines; i++) {
		let phi = random(TAU)
		let r = boundary.r * 0.8 * sqrt(random())
		let ln = new Line(r * cos(phi) + w/2, r * sin(phi) + h/2)
		lines.push(ln)
	}

	sqiggs = []
	numSquiggs = floor(0.026 * boundary.r)
	for (let i = 0; i < numSquiggs; i++) {
		let phi = random(TAU)
		let r = boundary.r * 0.8 * sqrt(random())
		let sl = new Sqiggly(r * cos(phi) + w/2, r * sin(phi) + h/2)
		sqiggs.push(sl)
	}

	// For Recording
	frameRate(10)
}

function draw() {
	blendMode(BLEND)
    image(bgBuff, w / 2, h / 2)
	blendMode(MULTIPLY)
   
	ray_1.draw()
	ray_2.draw()

	circles.forEach(circle => {
		circle.update()
		circle.draw()
	})

	lines.forEach(line => {
		line.draw()
	})

	sqiggs.forEach(sqiggly => {
		sqiggly.draw()
	})

	boundary.draw()

	    // Recording
    if (recording) {
        if (fCount <= 180 && frameCount % 3 == 0) {
            saveCanvas('out-' + fCount, 'png')
            fCount++
        }
    }
}

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


const pal = ["#A25469", "#E2021A", "#691E2F", "#29607F", "#44896A", "#97B68A", "#E79971", "#F9D861", "#746093", "#DF7937"]
