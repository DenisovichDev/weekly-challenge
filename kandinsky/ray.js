class Ray {
	constructor(angle, col) {
		this.angle = angle
		this.color = color(20, 45, 70)
		this.verteces = []
		this.cx = w / 2 + random([-1, 1]) * random(w * 0.15)
		this.cy = h / 2 + random([-1, 1]) * random(w * 0.15)
		this.color = col
	}

	init() {
		let x1 = this.cx
		let y1 = -random(100, 200)
		let x2 = x1, y2 = h * 1.5 + random(100, 200)
		let r = dist(x1, y1, x2, y2) 
        let theta = atan2(y2 - y1, x2 - x1)
        let tangentAngle = theta + random([-1, 1]) * random(radians(5), radians(7)) // Change the angle
        let d1x= x1 + r * cos(tangentAngle)
        let d1y = y1 + r * sin(tangentAngle)
        let d2x= x1 + r * cos(PI - tangentAngle)
        let d2y = y1 + r * sin(PI - tangentAngle)
		
		this.verteces = [
			{ x: x1, y : y1 },
			{ x: d1x, y : d1y },
			{ x: d2x, y : d2y },
		]
	}

	draw() {
		// Just a huge triangle
		push()
		noStroke()
		fill(this.color)
		translate(this.cx, this.cy)
		rotate(this.angle)
		translate(-this.cx, -this.cy)
		beginShape()
		for (let i = 0; i < 3; i++) {
			vertex(this.verteces[i].x, this.verteces[i].y)
		}
		endShape(CLOSE)
		pop()
	}
}
