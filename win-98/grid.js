class Grid {
    constructor(rows, cols) {
        this.rows = rows
        this.cols = cols
        this.cells = []
        this.bombs = []
        this.showWrongFlags = false
        this.numOfBombs = 30
        for (let j = 0; j < this.rows; j++) {
            for (let i = 0; i < this.cols; i++) {
                this.cells.push(new Cell(i, j))
            }
        }

        // Temp
        for (let i = 0; i < this.numOfBombs; i++) {
            let bombCell = random(this.cells)
            bombCell.isBomb = true
            this.bombs.push(bombCell)
        }
    }

    init() {
        this.checkWhatKind()
    }

    run() {
        for (let j = 0; j < this.rows; j++) {
            for (let i = 0; i < this.cols; i++) {
                // Draw
                let c = this.cells[i + j * this.cols]
                c.draw()
                // if (c.flood) this.
            }
        }
    }

    checkWhatKind() {
        // Counts the neighboring bombs and puts the value as this.value to show the numbers
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                let currentCell = this.cells[i + j * this.cols]
                if (currentCell.isBomb) continue

                let count = 0

                for (let yOff = -1; yOff < 2; yOff++) {
                    let neighY = currentCell.row + yOff
                    if (neighY < 0 || neighY >= this.rows) continue

                    for (let xOff = -1; xOff < 2; xOff++) {
                        if (xOff == 0 && yOff == 0) continue

                        let neighX = currentCell.col + xOff
                        if (neighX < 0 || neighX >= this.cols) continue

                        let neighCell = this.cells[neighX + neighY * this.cols]

                        if (neighCell.isBomb) count++
                    }
                }
                currentCell.val = count
            }
        }
    }

    floodfill(i, j) {
        // A very cool kind of recursive function. An empty cell will reveal the cells next to it
        // Which will in turn will do the similar, resulting a floodfill sort of algorithm
        let currentCell = this.cellIdx(i, j)

        for (let yOff = -1; yOff < 2; yOff++) {
            let neighY = currentCell.row + yOff
            if (neighY < 0 || neighY >= this.rows) continue

            for (let xOff = -1; xOff < 2; xOff++) {
                if (xOff == 0 && yOff == 0) continue

                let neighX = currentCell.col + xOff
                if (neighX < 0 || neighX >= this.cols) continue

                let neighCell = this.cellIdx(neighX, neighY)

                if (
                    !neighCell.isBomb &&
                    !neighCell.revealed &&
                    !neighCell.flagged
                )
                    this.reveal(neighX, neighY)
            }
        }
    }

    detectCell() {
        let mx = mouseX - translateOriginX
        let my = mouseY - translateOriginY

        let x = floor(mx / this.cols)
        let y = floor(my / this.rows)

        return { x, y }
    }

    reveal(i, j) {
        let currentCell = this.cellIdx(i, j)
        if (!currentCell.flagged) {
            currentCell.revealed = true
            if (!currentCell.val && !currentCell.isBomb) {
                this.floodfill(i, j)
            }
        }
    }

    cellIdx(i, j) {
        return this.cells[i + j * this.cols]
    }

    flag(i, j) {
        if (!this.cellIdx(i, j).revealed) {
            this.cellIdx(i, j).flagged = true
        }
    }
    unflag(i, j) {
        if (!this.revealed) {
            this.cellIdx(i, j).flagged = false
        }
    }
    revealWrongFlagsAndBombs() {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                let c = this.cellIdx(i, j)
                if (c.isBomb) this.reveal(i, j)
                if (!c.isBomb && c.flagged) c.wrongFlag = true
            }
        }
    }
}
