class Figure {
  
  constructor(x, y, fill, context) {
    this.x = x;
    this.y = y;
    this.fill = fill;
    this.resaltado = false;
    this.resaltadoestilo = "cyan";
    this.context = context;
  }

  setFill(fill) {
    this.fill = fill;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  getPosition() {
    return {
      x: this.x,
      y: this.y
    };
  }

  getPosX() {
    return this.x;
  }

  getPosY() {
    return this.y;
  }

  getFill() {
    return this.fill;
  }

  draw() {
    /* this.context.fillStyle = this.fill; */
    this.context.drawImage(this.fill, this.x-20, this.y-20);
    
  }

  setResaltado(resaltado) {
    this.resaltado = resaltado;
  }

  /** me dice si el mouse esta dentro de la figura */
  isPointInside(x, y) {};

}