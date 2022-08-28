class BoundingCircle {

	constructor(r, weight) {
		this.r = r
		this.w = weight 
		this.pos = { x : w / 2, y : h / 2 }
		this.noiseMax = 1
		this.context = createGraphics(2 * r + w * 0.1, 2 * r + h * 0.1) 
	}

	render() {
		this.context.fill(black)

		this.context.beginShape()
		let polarOff = 3000
		for (let theta = 0; theta < TAU; theta += 0.01) {
			let xoff = map(polarOff + cos(theta), -1, 1, 0, this.noiseMax)
			let yoff = map(polarOff + sin(theta), -1, 1, 0, this.noiseMax)
			let radius = this.r + noise(1000 + xoff, 1000 + yoff) * this.r * 0.1
			let x = radius * cos(theta) + this.context.width / 2
			let y = radius * sin(theta) + this.context.height / 2
			this.context.vertex(x, y)
			xoff += 0.01
		}
		this.context.endShape()

		this.context.erase()
		polarOff = 5000
		this.context.beginShape()
		for (let theta = 0; theta < TAU; theta += 0.01) {
			let xoff = map(polarOff + cos(theta), -1, 1, 0, this.noiseMax)
			let yoff = map(polarOff + sin(theta), -1, 1, 0, this.noiseMax)
			let radius = this.r - this.w + noise(1000 + xoff, 1000 + yoff) * this.r * 0.1
			let x = radius * cos(theta) + this.context.width / 2
			let y = radius * sin(theta) + this.context.height / 2
			this.context.vertex(x, y)
			xoff += 0.01
		}
		this.context.endShape()
		this.context.noErase()
	}
	
	draw() {
		image(this.context, this.pos.x, this.pos.y)
	}
}
