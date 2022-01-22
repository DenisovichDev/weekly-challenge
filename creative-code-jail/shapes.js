class Star {
    constructor(x, y, l) {
        this.l = l
        this.n = 12
        this.centralAngle = radians(360 / this.n)
        this.color = color(starColor)
        this.bW = 2 * Math.sqrt(2) * this.l
        this.bH = 2 * Math.sqrt(2) * this.l * Math.sin(2 * this.centralAngle)
        this.x = x
        this.y = y
        this.initRotation = 0
        this.rotation = this.initRotation
    }

    draw() {
        // Did you know that transformations don't work inside
        // beginShape() and endShape()? I DIDN'T!
        // Sigh. However that's why I'm drawing it with vectors and stuff.
        // I'm usually not that clever.

        push()
        fill(this.color)
        stroke(this.color)
        strokeWeight(0.5)

        translate(this.x, this.y)
        rotate(this.rotation)
        let angle = 0
        let point = p5.Vector.fromAngle(angle)

        beginShape()

        for (let i = 0; i < this.n; i++) {
            i % 2 === 0
                ? point.setMag(Math.sqrt(2) * this.l)
                : point.setMag(this.l)
            vertex(point.x, point.y)
            angle += this.centralAngle
            point.setHeading(angle)
        }

        endShape(CLOSE)
        pop()
    }

    spin() {
        if (!shouldStarSpin) {
            this.rotation = 0
            return
        }
        this.rotation += spinSpeed
    }
}

class Diamond {
    constructor(x, y, l, tilt) {
        this.x = x
        this.y = y
        this.l = l
        this.n = 4
        this.centralAngle = radians(90)
        this.color = color(diaColor)
        this.bW = 2 * this.l * cos(PI / 3)
        this.bH = 2 * this.l * cos(PI / 6)
        this.initRotation = tilt
        this.rotation = this.initRotation
    }

    draw() {
        // Weird way to draw a diamond, but okay

        push()
        fill(this.color)
        // fill(255, 100, 100)
        noStroke()
        translate(this.x, this.y)
        rotate(this.rotation)
        let angle = 0
        let point = p5.Vector.fromAngle(angle)
        let mag

        beginShape()

        for (let i = 0; i < this.n; i++) {
            i % 2 == 0
                ? (mag = sqrt(2) * this.l * sin(PI / 3) - this.l)
                : (mag = sqrt(2) * this.l * sin(PI / 6))
            point.setMag(mag)

            vertex(point.x, point.y)

            angle += TAU / this.n
            point.setHeading(angle)
        }

        endShape(CLOSE)
        pop()
    }

    spin() {
        if (shouldStarSpin) {
            this.rotation = this.initRotation
            return
        }
        this.rotation += spinSpeed
    }
}
