class Particle {
    constructor(start, maxspeed) {
        this.maxSpeed = maxspeed;
        this.pos = start;
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.colour;
    }

    run() {
        this.update();
        this.edges();
        this.show();
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
        stroke(this.colour, 90);
        strokeWeight(3);
        point(this.pos.x, this.pos.y);
    }
    edges() {
        if (this.pos.x > width) {
            this.pos.x = 0;
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
        }
    }
    follow(vectors) {
        let x = floor(this.pos.x / scale);
        let y = floor(this.pos.y / scale);
        let index = x + y * cols;
        let force = vectors[index];
        this.applyForce(force);
    }
    setColorByImage(arr) {
        let x = floor(this.pos.x / scale);
        let y = floor(this.pos.y / scale);
        let index = x + y * cols;
        this.colour = arr[index];
    }
}
