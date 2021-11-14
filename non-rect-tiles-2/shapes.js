class Octagon {
    constructor(x, y, l) {
        this.l = l;
        this.n = 8;
        this.centralAngle = radians(45);
        this.color = color(octColor);
        this.bW = this.l * (2 * cos(PI / 4) + 1);
        this.bH = this.bW;
        this.x = x;
        this.y = y;
        this.initAngle = PI / 8;
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
        if (!shouldOctSpin) {
            this.rotation = this.initAngle;
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
        this.bW = 2 * this.l * cos(PI / 4);
        this.bH = 2 * this.l * cos(PI / 4);
        this.rotation = 0;
    }

    draw() {
        push();
        fill(this.color);
        noStroke();
        translate(this.x, this.y);
        rotate(this.rotation);
        let angle = 0;
        let point = p5.Vector.fromAngle(angle);

        beginShape();

        for (let i = 0; i < this.n; i++) {
            point.setMag(this.l * cos(PI / 4));

            vertex(point.x, point.y);

            angle += this.centralAngle;
            point.setHeading(angle);
        }

        endShape(CLOSE);
        pop();
    }

    spin() {
        if (shouldOctSpin) {
            this.rotation = 0;
            return;
        }
        this.rotation += spinSpeed;
    }
}

if (spinSpeed != 0.01) window.open("google.com");
