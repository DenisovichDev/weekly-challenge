class ElCapricho {
    constructor(start, maxspeed) {
        this.maxSpeed = maxspeed;
        this.pos = start;
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.colour = color(255, 15);
        this.isVisible = false;
        this.prevPos = this.pos.copy();
    }

    run() {
        this.update();
        this.edges();
        if (this.isVisible) {
            this.show();
        }
    }
    update() {
        this.pos.add(this.vel);
        this.vel.limit(this.maxSpeed);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }
    applyForce(force) {
        this.acc.add(force);
    }
    show() {
        stroke(this.colour);
        strokeWeight(3);
        this.updatePrevPoint();
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    }
    edges() {
        if (this.pos.x > width) {
            this.pos.x = 0;
            this.updatePrevPoint();
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
            this.updatePrevPoint();
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
            this.updatePrevPoint();
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
            this.updatePrevPoint();
        }
    }
    follow(vectors) {
        let x = floor(this.pos.x / casaCalvet);
        let y = floor(this.pos.y / casaCalvet);
        let index = x + y * cols;
        let force = vectors[index];
        this.applyForce(force);

        if (!force.heading()) {
            this.isVisible = true;
        } else {
            this.isVisible = false;
        }
    }
    setColorByImage(arr) {
        let x = floor(this.pos.x / casaCalvet);
        let y = floor(this.pos.y / casaCalvet);
        let index = x + y * cols;
        this.colour = arr[index];
    }
    updatePrevPoint() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }
}
