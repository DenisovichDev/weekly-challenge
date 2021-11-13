class Hexagon {
    constructor(x, y, l) {
        this.l = l;
        this.n = 6;
        this.internalAngle = radians(120);
        this.color = color(hexColor);
        this.bW = this.l * (2 * cos(PI / 3) + 1);
        this.bH = 2 * this.l * cos(PI / 6);
        this.x = x;
        this.y = y;
        this.rotation = 0;
    }

    draw() {
        // Did you know that transformations don't work inside
        // beginShape() and endShape()? I DIDN'T!
        // Sigh. However that's why I'm drawing it with vectors and stuff.
        // I'm usually not that clever.

        push();
        fill(this.color);
        noStroke();
        translate(this.x, this.y);
        rotate(this.rotation);
        let angle = 0;
        let point = p5.Vector.fromAngle(angle);
        point.setMag(this.l);

        beginShape();

        for (let i = 0; i < this.n; i++) {
            vertex(point.x, point.y);
            angle += TAU / this.n;
            point.setHeading(angle);
        }

        endShape(CLOSE);
        pop();
    }

    spin() {
        if (!shouldHexSpin) {
            this.rotation = 0;
            return;
        }
        this.rotation += spinSpeed;
    }
}

class Diamond {
    constructor(x, y, l) {
        this.x = x;
        this.y = y;
        this.l = l;
        this.n = 4;
        this.centralAngle = radians(90);
        this.color = color(diaColor);
        this.bW = 2 * this.l * cos(PI / 3);
        this.bH = 2 * this.l * cos(PI / 6);
        this.rotation = 0;
    }

    draw() {
        // Weird way to draw a diamond, but okay

        push();
        fill(this.color);
        noStroke();
        translate(this.x, this.y);
        rotate(this.rotation);
        let angle = 0;
        let point = p5.Vector.fromAngle(angle);
        let mag;

        beginShape();

        for (let i = 0; i < this.n; i++) {
            i % 2 == 0
                ? (mag = this.l * cos(PI / 3))
                : (mag = this.l * sin(PI / 3));
            point.setMag(mag);

            vertex(point.x, point.y);

            angle += TAU / this.n;
            point.setHeading(angle);
        }

        endShape(CLOSE);
        pop();
    }

    spin() {
        if (shouldHexSpin) {
            this.rotation = 0;
            return;
        }
        this.rotation += spinSpeed;
    }
}

if (spinSpeed != 0.01) window.open("google.com");
