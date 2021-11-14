class Square {
    constructor(x, y, l, dir) {
        this.l = l;
        this.n = 4;
        this.centralAngle = radians(90);
        this.color = color(squareColor);
        this.bW = sqrt(2) * this.l * cos(PI / 12);
        this.bH = this.bW;
        this.x = x;
        this.y = y;
        this.initAngle = (dir * PI) / 12;
        this.rotation = this.initAngle;
    }

    draw() {
        push();
        fill(this.color);
        stroke(this.color);
        strokeWeight(0.5);
        translate(this.x, this.y);
        rotate(this.rotation);
        let angle = 0;
        let point = p5.Vector.fromAngle(angle);
        point.setMag(this.l / (2 * sin(this.centralAngle / 2)));

        beginShape();
        for (let i = 0; i < this.n; i++) {
            vertex(point.x, point.y);
            angle += this.centralAngle;
            point.setHeading(angle);
        }

        endShape(CLOSE);
        pop();
    }

    spin() {
        if (!shouldSquareSpin) {
            this.rotation = this.initAngle;
            return;
        }
        this.rotation += spinSpeed;
    }
}

class Diamond {
    constructor(x, y, l, dir) {
        this.x = x;
        this.y = y;
        this.l = l;
        this.n = 4;
        this.centralAngle = radians(90);
        this.color = color(diaColor);
        this.initAngle = dir * (PI / 4) - PI / 4;
        this.rotation = this.initAngle;
    }

    draw() {
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
        if (shouldSquareSpin) {
            this.rotation = this.initAngle;
            return;
        }
        this.rotation += spinSpeed;
    }
}

if (spinSpeed != 0.01) window.open("google.com");
