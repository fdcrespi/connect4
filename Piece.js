class Piece {
    constructor(row, column, color) {
        this.row = row;
        this.column = column;
        this.color = color;
    }

    draw() {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.column * this.casillero.width, this.row * this.casillero.height, this.casillero.width, this.casillero.height);
    }

    setPosition(row, column) {
        this.row = row;
        this.column = column;
    }

    getPosition() {
        return {
            row: this.row,
            column: this.column
        };
    }

    getRow() {
        return this.row;
    }

    getColumn() {
        return this.column;
    }

    getColor() {
        return this.color;
    } 

    setColor(color) {
        this.color = color;
    }

    isPointInside(x, y) {
        return (x >= this.column * this.casillero.width && x <= this.column * this.casillero.width + this.casillero.width) && (y >= this.row * this.casillero.height && y <= this.row * this.casillero.height + this.casillero.height);
    }

    setResaltado(resaltado) {
        this.resaltado = resaltado;
    }

    getResaltado() {
        return this.resaltado;
    }

    setResaltadoEstilo(resaltadoestilo) {
        this.resaltadoestilo = resaltadoestilo;
    }

    getResaltadoEstilo() {
        return this.resaltadoestilo;
    }

    setCasillero(casillero) {
        this.casillero = casillero;
    }

    getCasillero() {
        return this.casillero;
    }

    setContext(context) {
        this.context = context;
    }

    getContext() {
        return this.context;
    }

    setX(x) {
        this.x = x;
    }

    getX() {
        return this.x;
    }

    setY(y) {
        this.y = y;
    }

    getY() {
        return this.y;
    }
}