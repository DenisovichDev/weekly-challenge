class Cell {
    constructor(col, row) {
        // Constructor
        this.col = col
        this.row = row
        this.w = 16
        this.x = this.col * this.w
        this.y = this.row * this.w
        this.isBomb = false
        this.val = 0
        this.revealed = false
        this.flagged = false
        this.firstBomb = false
        this.wrongFlag = false
    }

    draw() {
        if (!this.revealed && !this.flagged) {
            image(imgUnrev, this.x, this.y)
            return
        }
        if (this.isBomb && !this.flagged) {
            if (this.firstBomb) {
                image(imgFBomb, this.x, this.y)
                return
            }

            image(imgBomb, this.x, this.y)
            return
        }
        if (this.flagged) {
            if (this.wrongFlag && gameLost) {
                image(imgWFlag, this.x, this.y)
                return
            }
            image(imgFlag, this.x, this.y)
            return
        }
        if (this.val) {
            image(imgVal[this.val - 1], this.x, this.y)
            return
        }
        // No Value, revealed
        image(sprites.tiles.get(1 * 16, 0, 16, 16), this.x, this.y)
    }
}
