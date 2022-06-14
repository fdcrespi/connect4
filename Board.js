class Board {
    constructor() {
        this.grid = [];
        for (let i = 0; i < 6; i++) {
            this.grid.push([]);
            for (let j = 0; j < 7; j++) {
                this.grid[i].push(0);
            }
        }
    }

    draw() {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                if (this.grid[i][j] != 0) {
                    this.grid[i][j].draw();
                }
            }
        }
    }

    addPiece(piece) {
        this.grid[piece.row][piece.column] = piece;
    }

    getColumn(x) {
        for (let i = 0; i < 7; i++) {
            if (x > casilleros[i].x - 21 && x < casilleros[i].x + 21) {
                return i;
            }
        }
        return 0;
    }

    getEmptyRow(column) {
        for (let i = 5; i >= 0; i--) {
            if (this.grid[i][column] == 0) {
                return i;
            }
        }
        return 0;
    }

    checkForWinner() {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                if (this.grid[i][j] != 0) {
                    if (this.grid[i][j].color == "red") {
                        if (this.checkForWinnerHelper(i, j, "red")) {
                            return "red";
                        }
                    } else if (this.grid[i][j].color == "blue") {
                        if (this.checkForWinnerHelper(i, j, "blue")) {
                            return "blue";
                        }
                    }
                }
            }
        }
        return 0;
    }

    checkForWinnerHelper(row, column, color) {
        if (row < 0 || row > 5 || column < 0 || column > 6) {
            return false;
        }
        if (this.grid[row][column].color == color) {
            return true;
        }
        return this.checkForWinnerHelper(row + 1, column, color);
    }

    addEventListener(event, callback) {
        canvas.addEventListener(event, callback);
    }

    getGrid() {
        return this.grid;
    }

    getPiece(row, column) {
        return this.grid[row][column];
    }

    getEmptyRow(column) {
        for (let i = 5; i >= 0; i--) {
            if (this.grid[i][column] == 0) {
                return i;
            }
        }
        return 0;
    }

    getColumn(x) {
        for (let i = 0; i < 7; i++) {
            if (x > casilleros[i].x - 21 && x < casilleros[i].x + 21) {
                return i;
            }
        }
        return 0;
    }

    getEmptyRow(column) {
        for (let i = 5; i >= 0; i--) {
            if (this.grid[i][column] == 0) {
                return i;
            }
        }
        return 0;
    }

      
}