class Line {

	constructor(x, y) {
		this.x = x
		this.y = y
		this.theta = random([1, -1]) * random(PI / 2)
		let d
		do {
			this.x0 = random(h * 0.8) * cos(this.theta) + this.x
			this.y0 = random(h * 0.8) * sin(this.theta) + this.y

			d = dist(this.x0, this.y0, w / 2, h / 2)	
		} while (d > boundary.r * 0.8)
		do {
			this.x1 = - random(h * 0.8) * cos(this.theta) + this.x
			this.y1 = - random(h * 0.8) * sin(this.theta) + this.y

			d = dist(this.x1, this.y1, w / 2, h / 2)	
		} while (d > boundary.r * 0.8)

		this.weight = random([1, 2, 2, 3])
	}

	draw() {
		push()
		strokeWeight(this.weight)
		stroke(black)
		line(this.x0, this.y0, this.x1, this.y1)
		pop()
	}


}
