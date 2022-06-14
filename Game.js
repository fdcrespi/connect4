class Connect4 {

    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Board();
        this.currentPlayer = player1;
        this.winner = null;
        this.gameOver = false;
    }

    play() {
        this.board.draw();
        this.board.addEventListener("click", (event) => {
            this.playTurn(event.offsetX, event.offsetY);
        });
    }

    playTurn(x, y) {
        if (this.gameOver) {
            return;
        }
        let column = this.board.getColumn(x);
        if (column == null) {
            return;
        }
        let row = this.board.getEmptyRow(column);
        if (row == null) {
            return;
        }
        let piece = new Piece(row, column, this.currentPlayer.color);
        this.board.addPiece(piece);
        this.checkForWinner();
        this.switchPlayer();
    }

    checkForWinner() {
        let winner = this.board.checkForWinner();
        if (winner != null) {
            this.winner = winner;
            this.gameOver = true;
        }
    }

    switchPlayer() {
        if (this.currentPlayer == this.player1) {
            this.currentPlayer = this.player2;
        } else {
            this.currentPlayer = this.player1;
        }
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    getWinner() {
        return this.winner;
    }

    isGameOver() {
        return this.gameOver;
    }

    getBoard() {
        return this.board;
    }

    getPlayer1() {
        return this.player1;
    }

    getPlayer2() {
        return this.player2;
    }

    getCurrentPlayerColor() {
        return this.currentPlayer.color;
    }

    getOtherPlayerColor() {
        return this.getOtherPlayer().color;
    }

    getOtherPlayer() {
        if (this.currentPlayer == this.player1) {
            return this.player2;
        } else {
            return this.player1;
        }
    }

    getPlayer1Color() {
        return this.player1.color;
    }

    getPlayer2Color() {
        return this.player2.color;
    }

    

}