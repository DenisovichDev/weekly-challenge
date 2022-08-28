class Circle {

	constructor(x, y) {
		this.cx = x
		this.cy = y
		this.x = this.cx
		this.y = this.cy
		this.hasBorder = random() < 0.5 ? true : false
		this.d = dist(w / 2, h / 2, x, y)
		this.randOff = random(10000)
		this.noiseMax = 2
		this.perlinOff = 0.01 // has to be an absolute value
		this.polarAngle = 0
		this.polarPhase = random(TAU)
		this.noiseScale = random(20, 70)

		let rLowerLim = map(this.d, 0, boundary.r * 0.8, 70, 10)
		let rUpperLim = map(this.d, 0, boundary.r * 0.8, 250, 25)
		this.r = random(rLowerLim, rUpperLim) / 2
		
		if (this.hasBorder)
			this.borderWeight = random([1, 2, 2, 3, 3, 3, 4, 4, 6, 7])
		if (random() < 0.4 && this.hasBorder && this.borderWeight <= 3) {
			this.hasCenterPoint = true
			this.centerWeight = random(this.r * 0.25, this.r * 0.4)
		}
		this.color = random(pal)
			
	}

	draw() {
		push()
		// noFill()
		fill(this.color)
		stroke(black)
		strokeWeight(this.borderWeight)
		this.squigglyCircle(this.x, this.y, this.r)
		if (this.hasCenterPoint) {
			fill(black)
			this.squigglyCircle(this.x, this.y, this.centerWeight)
		}
		pop()
	}

	squigglyCircle(x_, y_, rad) {
		beginShape()
		let polarOff = this.randOff + 3000
		for (let theta = 0; theta < TAU; theta += 0.01) {
			let xoff = map(polarOff + cos(theta), -1, 1, 0, this.noiseMax)
			let yoff = map(polarOff + sin(theta), -1, 1, 0, this.noiseMax)
			let radius = rad + noise(1000 + xoff, 1000 + yoff) * rad * 0.1
			let x = radius * cos(theta) + x_
			let y = radius * sin(theta) + y_
			vertex(x, y)
			xoff += 0.01
		}
		endShape()

	}

	update() {
		let polarOff = this.randOff + 3000
		let xoff = this.randOff + map(polarOff + cos(this.polarPhase + this.polarAngle), -1, 1, 0, 2)
		let yoff = this.randOff + map(polarOff + sin(this.polarPhase + this.polarAngle), -1, 1, 0, 2)

		this.x = this.cx + noise(xoff, yoff) * this.noiseScale
		this.y = this.cy + noise(3000 + xoff, 3000 + yoff) * this.noiseScale

		this.polarAngle += this.perlinOff
		if (this.polarAngle >= TAU) this.polarAngle -= TAU
	}
}
