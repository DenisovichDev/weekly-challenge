class Buffer {
    constructor(idx, pos) {
        this.gobj = createGraphics(ulen, ulen);
        this.idx = idx;
        this.pos = pos;
        if (this.pos == null) {
            this.pos = this.randomPosOutsideFrame();
            this.outer = true;
        }
        this.isMoving = false;
        this.goalPos = { x: 0, y: 0 };
        this.lerpFraction = 0.01
    }
    
    updateBuffer() {
        if (this.isMoving) {
            this.movingSequence();
        }

    }

    drawBuffer() {
        image(this.gobj, this.pos.x, this.pos.y);
    }

    move(goalPos) {
        this.goalPos.x = goalPos.x;
        this.goalPos.y = goalPos.y;
        this.isMoving = true;
    }

    movingSequence() {
        if (dist(this.pos.x, this.pos.y, this.goalPos.x, this.goalPos.y) < 1) {
            this.pos.x = this.goalPos.x;
            this.pos.y = this.goalPos.y;
            this.isMoving = false;
            return;
        }
        if (!this.outer && (this.pos.x > w || this.pos.y > h || this.pos.x < -ulen || this.pos.y <-ulen)) {
            this.pos.x = this.goalPos.x;
            this.pos.y = this.goalPos.y;
            this.isMoving = false;
            return;
        }

        this.pos.x = lerp(this.pos.x, this.goalPos.x, this.lerpFraction);
        this.pos.y = lerp(this.pos.y, this.goalPos.y, this.lerpFraction);
    }

    randomPosOutsideFrame() {
        let respos = { x: 0, y: 0 }
        let outerbound = w;
        let region = random([1, 2, 3, 4, 6, 7, 8, 9]);
        if ([1, 4, 7].includes(region)) {
            respos.x = random(-outerbound, -w/4);
        }
        else if ([2, 8].includes(region)) {
            respos.x = random(-w / 4, w * 5 / 4);
        }
        else if ([3, 6, 9].includes(region)) {
            respos.x = random(w * 5 / 4, outerbound);
        }

        if ([1, 2, 3].includes(region)) {
            respos.y = random(-outerbound, -h/4);
        }
        else if ([4, 6].includes(region)) {
            respos.y = random(-h / 4, h * 5 / 4);;
        }
        else if ([7, 8, 9].includes(region)) {
            respos.y = random(h * 5 / 4, outerbound);
        }

        return respos;
    }
}
