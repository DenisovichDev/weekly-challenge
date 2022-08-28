class Sqiggly {

	constructor(x, y) {
		this.x = x
		this.y = y

		this.x0 = x; this.y0 = this.y - random(5, 20)
		this.x1 = x; this.y1 = this.y + random(5, 20)
		this.a = random(0.5, 1.5)
		this.b = random(0.5, 1.5)
		this.phi = random([-1, 1]) * random(PI / 2)
		this.d = dist(this.x0, this.y0, this.x1, this.y1)
		this.scale = random(1, 1.5)
		this.angle = random(PI / 2)
		this.weight = random([1, 2, 3])
	}

	draw() {
		push()
		translate(this.x, this.y)
		rotate(this.angle)
		scale(this.scale)
		translate(-this.x, -this.y)
		strokeWeight(this.weight)
		stroke(black)
		beginShape()
		for (let i = 0; i < this.d; i += 1) {
			let x = this.x0 + i
			let y = this.y0 + this.a * sin(this.phi + this.b * x)
			vertex(x, y)
		}
		endShape()
		pop()
	}

}
