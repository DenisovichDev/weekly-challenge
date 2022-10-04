class Train {
    constructor() {
        this.x = 0
        this.h = width / 5
        this.w = 3.5 * this.h
        this.ground = height * 0.5 + this.h
        this.wagon = {
            x: this.x,
            y: this.ground - this.h,
            w: this.w * 0.45,
            h: this.h,
        }
        this.engine = {
            x: this.x + this.w * 0.55,
            y: this.ground - this.h,
            w: this.w * 0.45,
            h: this.h,
        }
        this.platform = this.ground - this.h * 0.25
        this.platformHeight = this.engine.y + this.h * 0.95 - this.platform
        this.wheelRotation = 0
        this.largeWheel = { r: this.h * 0.2, rt: 0 }
        this.smallWheel = { r: this.h * 0.13, rt: 0 }
        this.wheelSurface = this.platform + 2 * this.platformHeight
        this.pipe = {
            x: this.engine.x + this.engine.w * 0.75 + this.h * 0.065,
            y: this.engine.y + this.h * 0.25 - this.h * 0.4,
            l: this.h * 0.13,
        }

        this.speed = speeed // px/s?
        this.smoke = []
        this.tracks = []

        for (let i = 0; i < 32; i++) {
            this.tracks.push({
                x: i * (w / 29) - w / 29,
                y: this.wheelSurface + this.h * 0.04,
            })
        }

        this.engineRunning = true
    }

    draw() {
        // smoke
        this.drawSmoke()
        // The whole body
        this.drawTrainBody()
        // Wagon Wheels
        this.drawThemWheels()
        // track
        this.drawRail()
    }

    update() {
        // if (this.engineRunning) this.speed = speed
        this.x += this.speed - speeed
        this.wagon.x = this.x
        this.engine.x = this.x + this.w * 0.55
        this.pipe.x = this.engine.x + this.engine.w * 0.75 + this.h * 0.065
        this.wheelUpdate()
        this.trackUpdate()
        // smoke
        if (random() < 0.02 && this.engineRunning) this.addSmoke(random(4, 8))

        // if (!this.engineRunning && this.x > -this.w * 0.7) {
        //     this.x -= this.speed
        //     this.wagon.x = this.x
        //     this.engine.x = this.x + this.w * 0.55
        // }
    }

    drawTrainBody() {
        push()

        // Joiner thingie
        fill("#6B6B6B")
        noStroke()

        rect(
            this.wagon.x + this.wagon.w + this.h * 0.05,
            this.platform + this.platformHeight * 0.25,
            this.h * 0.04,
            this.platformHeight * 0.5
        )
        rect(
            this.engine.x - this.h * 0.05 - this.h * 0.04,
            this.platform + this.platformHeight * 0.25,
            this.h * 0.04,
            this.platformHeight * 0.5
        )
        let grd = drawingContext.createLinearGradient(
            0,
            this.platform + this.platformHeight * 0.5,
            0,
            this.platform + this.platformHeight * 0.75
        )
        grd.addColorStop(0, "#6F7171")
        grd.addColorStop(1, "#000000")
        drawingContext.fillStyle = grd
        // rect(5, 5, width - 10, 15)
        // fill("#000")
        rect(
            this.wagon.x + this.wagon.w + this.h * 0.09,
            this.platform + this.platformHeight * 0.5,
            this.h * 0.06,
            this.platformHeight * 0.25
        )
        rect(
            this.engine.x - this.h * 0.09 - this.h * 0.06,
            this.platform + this.platformHeight * 0.5,
            this.h * 0.06,
            this.platformHeight * 0.25
        )
        fill("#6F7171")
        rect(
            this.wagon.x + this.wagon.w + this.h * 0.14,
            this.platform + this.platformHeight * 0.37,
            this.h * 0.025,
            this.platformHeight * 0.5,
            this.h * 0.02
        )
        rect(
            this.engine.x - this.h * 0.15 - this.h * 0.025,
            this.platform + this.platformHeight * 0.37,
            this.h * 0.025,
            this.platformHeight * 0.5,
            this.h * 0.02
        )
        // Engine ------------------------------

        // hood
        noFill()
        stroke("#B7252C")
        strokeWeight(3)
        rect(
            this.engine.x + this.h * 0.05,
            this.engine.y + this.h * 0.1,
            this.engine.w * 0.25,
            this.h / 2,
            this.h * 0.05
        )
        rect(
            this.engine.x + this.h * 0.05,
            this.engine.y + this.h * 0.1,
            this.engine.w * 0.25,
            this.h / 2
        )
        rect(
            this.engine.x + this.h * 0.05 + this.engine.w * 0.25,
            this.engine.y + this.h * 0.1,
            this.engine.w * 0.15,
            this.h / 2,
            this.h * 0.05
        )
        rect(
            this.engine.x + this.h * 0.05 + this.engine.w * 0.25,
            this.engine.y + this.h * 0.1,
            this.engine.w * 0.15,
            this.h / 2
        )
        stroke(0)
        strokeWeight(3)
        line(
            this.engine.x + this.h * 0.05,
            this.engine.y + this.h * 0.1,
            this.engine.x + this.h * 0.05,
            this.engine.y + this.h * 0.5
        )
        noStroke()
        fill(0)
        rect(
            this.engine.x,
            this.engine.y,
            this.engine.w * 0.5,
            this.h * 0.1,
            this.h * 0.05
        )
        fill("#6F7171")
        rect(
            this.engine.x,
            this.engine.y + this.h * 0.05,
            this.engine.w * 0.5,
            this.h * 0.05
        )
        // pipes and stuff
        noStroke()
        fill("#9B1824")
        circle(
            this.engine.x + this.engine.w / 2 + this.engine.w * 0.125,
            this.engine.y + this.h * 0.25 - this.h * 0.04,
            this.h * 0.15
        )
        // steam pipe
        fill("#333333")
        rect(
            this.engine.x + this.engine.w / 2 + this.engine.w * 0.25,
            this.engine.y + this.h * 0.25 - this.h * 0.4,
            this.h * 0.13,
            this.h * 0.4
        )
        // pointy tip thingie
        noStroke()
        fill("#333")

        arc(
            this.engine.x + this.engine.w * 0.75,
            this.engine.y + this.h * 0.45,
            this.h * 0.755,
            this.h * 0.755,
            -PI * 0.18,
            PI * 0.18
        )
        // body
        fill("#B7252C")
        stroke("#B7252C")
        strokeWeight(1)
        rect(
            this.engine.x + this.engine.w * 0.5,
            this.engine.y + this.h * 0.25,
            this.engine.w * 0.45,
            this.engine.h * 0.4
        )
        rect(
            this.engine.x,
            this.platform - this.h * 0.4,
            this.engine.w * 0.5,
            this.h * 0.4
        )
        // platform
        fill(0)
        noStroke()
        rect(
            this.engine.x - this.h * 0.05,
            this.platform,
            this.engine.w + this.h * 0.05,
            this.platformHeight
        )
        // platform platform
        strokeWeight(2)
        stroke("#6F7171")
        line(
            this.engine.x,
            this.platform,
            this.engine.x + this.engine.w * 0.95,
            this.platform
        )
        // railings
        this.railings(
            this.engine.x + this.engine.w * 0.5,
            this.engine.y + this.h * 0.6,
            this.engine.w * 0.45,
            this.h * 0.2,
            15
        )
        // cow catcher
        fill(0)
        beginShape()
        noStroke()
        vertex(this.engine.x + this.engine.w * 0.95, this.platform)
        vertex(
            this.engine.x + this.engine.w * 1.1,
            this.engine.y + this.h * 1.05
        )
        vertex(
            this.engine.x + this.engine.w * 0.95,
            this.engine.y + this.h * 1.05
        )
        endShape(CLOSE)
        // detail ---
        // door
        fill("#9B1824")
        rect(
            this.engine.x + this.h * 0.09,
            this.platform - this.h * 0.4,
            this.engine.w * 0.2,
            this.h * 0.35,
            this.h * 0.05
        )
        // stuff
        stroke("#9B1824")
        line(
            this.engine.x + this.engine.w * 0.5,
            this.engine.y + this.h * 0.5,
            this.engine.x + this.engine.w * 0.95,
            this.engine.y + this.h * 0.5
        )
        line(
            this.engine.x + this.engine.w * 0.5,
            this.engine.y + this.h * 0.4,
            this.engine.x + this.engine.w * 0.85,
            this.engine.y + this.h * 0.4
        )
        line(
            this.engine.x + this.engine.w * 0.85,
            this.engine.y + this.h * 0.4,
            this.engine.x + this.engine.w * 0.95,
            this.engine.y + this.h * 0.25
        )
        // pipe detail
        fill("#B7252C")
        noStroke()
        rect(
            this.engine.x + this.engine.w / 2 + this.engine.w * 0.25,
            this.engine.y + this.h * 0.25 - this.h * 0.37,
            this.h * 0.13,
            this.h * 0.03
        )
        // ladder
        stroke("#B7252C")
        strokeWeight(1)
        noFill()

        rect(
            this.engine.x + this.h * 0.16,
            this.platform + this.h * 0.05,
            this.engine.w * 0.08,
            this.h * 0.06
        )
        rect(
            this.engine.x + this.h * 0.16,
            this.platform + this.h * 0.11,
            this.engine.w * 0.08,
            this.h * 0.06
        )
        line(
            this.engine.x + this.h * 0.16,
            this.platform,
            this.engine.x + this.h * 0.16,
            this.engine.y + this.h * 0.95
        )
        line(
            this.engine.x + this.h * 0.16 + this.engine.w * 0.08,
            this.platform,
            this.engine.x + this.h * 0.16 + this.engine.w * 0.08,
            this.engine.y + this.h * 0.95
        )

        // ------------------------------------

        // Wagon ------------------------------

        // Body
        fill("#B7252C")
        rect(
            this.wagon.x,
            this.wagon.y + this.h * 0.1,
            this.wagon.w,
            this.platform - this.wagon.y - this.h * 0.1
        )
        // Platform
        fill(0)
        stroke(0)
        rect(
            this.wagon.x,
            this.platform,
            this.wagon.w + this.h * 0.05,
            this.wagon.y + this.h * 0.95 - this.platform
        )
        // top
        fill(0)
        noStroke()
        rect(
            this.wagon.x,
            this.wagon.y,
            this.wagon.w + this.h * 0.05,
            this.h * 0.1,
            this.h * 0.05
        )
        rect(this.wagon.x, this.wagon.y, this.wagon.w * 0.5, this.h * 0.1)
        fill("#6F7171")
        rect(
            this.wagon.x,
            this.wagon.y + this.h * 0.05,
            this.wagon.w + this.h * 0.05,
            this.h * 0.05
        )
        // windows
        stroke("#9B1824")
        strokeWeight(2)
        fill("#A3D8F7")
        let offset = this.h * 0.05
        let fw = (this.wagon.w - offset) / 5
        for (let i = 0; i < 5; i++) {
            rect(
                offset + this.wagon.x + fw * i,
                this.wagon.y + this.h * 0.15,
                fw - 2 * offset,
                this.h * 0.34,
                this.h * 0.05
            )
        }
        // railings
        this.railings(
            this.wagon.x,
            this.wagon.y + this.h * 0.6,
            this.wagon.w + this.h * 0.05,
            this.h * 0.2,
            35
        )

        pop()
    }

    drawThemWheels() {
        this.wheel(
            this.wagon.x + this.h * 0.1,
            this.wheelSurface - this.largeWheel.r,
            this.largeWheel.r,
            this.largeWheel.rt
        )
        this.wheel(
            this.wagon.x + this.wagon.w / 2,
            this.wheelSurface - this.largeWheel.r,
            this.largeWheel.r,
            this.largeWheel.rt
        )
        this.wheel(
            this.wagon.x + this.wagon.w - this.h * 0.1,
            this.wheelSurface - this.largeWheel.r,
            this.largeWheel.r,
            this.largeWheel.rt
        )
        // Engine Wheels
        this.wheel(
            this.engine.x + this.h * 0.45,
            this.wheelSurface - this.largeWheel.r,
            this.largeWheel.r,
            this.largeWheel.rt
        )
        this.wheel(
            this.engine.x + this.h * 0.9,
            this.wheelSurface - this.largeWheel.r,
            this.largeWheel.r,
            this.largeWheel.rt
        )
        this.wheel(
            this.engine.x + this.engine.w * 0.85,
            this.wheelSurface - this.smallWheel.r,
            this.smallWheel.r,
            this.smallWheel.rt
        )
    }

    drawSmoke() {
        if (this.smoke.length === 0) return
        for (let i = this.smoke.length - 1; i >= 0; i--) {
            let s = this.smoke[i]
            s.y -= s.ySpeed
            s.x -= speeed + s.xSpeed
            if (s.d <= s.maxD) s.d += random(0.1)
            noStroke()
            fill(255, s.alpha)
            circle(s.x, s.y, s.d)
            // if (s.alpha <= 0) this.smoke.splice(i, 1)
            if (s.x <= -s.d / 2) this.smoke.splice(i, 1)
            s.ySpeed = s.ySpeed <= 0 ? 0 : s.ySpeed - 0.2
        }
    }

    addSmoke(n) {
        for (let i = 0; i < n; i++) {
            this.smoke.push({
                x: this.pipe.x + random([-1, 1]) * random(this.pipe.l / 2),
                y: this.pipe.y + random(this.h * 0.05),
                d: random(5),
                alpha: 255,
                ySpeed: random(3, 4),
                xSpeed: random(0.05, 0.2),
                maxD: random(10, 25),
            })
        }
    }

    drawRail() {
        noStroke()
        fill(21)
        rect(0, this.wheelSurface, w, this.h * 0.04)

        for (let t of this.tracks) {
            push()
            rectMode(CENTER)
            fill("#916D44")
            rect(t.x, t.y, this.h * 0.1, this.h * 0.04, this.h * 0.05)
            pop()
        }
    }

    wheel(x, y, r, theta) {
        push()
        translate(x, y)
        rotate(theta)
        for (let i = 0; i < TAU; i += TAU / 12) {
            stroke("#B7252C")
            strokeWeight(1.5)
            line(0, 0, r * cos(i), r * sin(i))
        }
        noFill()
        strokeWeight(2)
        stroke("#F7F7F7")
        circle(0, 0, 2 * r * 0.88)
        stroke("#B7252C")
        circle(0, 0, 2 * r * 0.93)
        stroke("#333")
        circle(0, 0, 2 * r)
        noStroke()
        fill("#F7F7F7")
        circle(0, 0, 2 * r * 0.2)
        fill("#333")
        circle(0, 0, 2 * r * 0.15)
        fill("#B7252C")
        circle(0, 0, 2 * r * 0.1)
        pop()
    }

    railings(x, y, w_, h_, div) {
        let uw = w_ / div
        push()
        stroke(0)
        strokeWeight(1)
        noFill()
        translate(x, y)
        for (let i = 0; i < div; i++) {
            rect(i * uw, 0, uw, h_)
        }
        pop()
    }

    wheelUpdate() {
        // s = r * theta
        this.largeWheel.rt += this.speed / this.largeWheel.r
        this.smallWheel.rt += this.speed / this.smallWheel.r
        if (this.largeWheel.rt >= TAU) this.largeWheel.rt -= TAU
        if (this.smallWheel.rt >= TAU) this.smallWheel.rt -= TAU
    }

    trackUpdate() {
        for (let t of this.tracks) {
            t.x -= speeed
            if (t.x <= -this.h * 0.05) t.x += w + this.w * 0.05
        }
    }
}
