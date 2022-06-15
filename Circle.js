class Circle extends Figure {

  constructor(x, y, radius, fill, context, jug) {
    super(x, y, fill, context);
    this.radius = radius;
    this.isClickeable = true;
    this.posXoriginal = x;
    this.posYoriginal = y;
    this.jugador = jug;
    this.isPut = false;
  }

  draw() {
    super.draw();
    this.context.beginPath();
    this.context.strokeStyle = 'black';
    this.context.lineWidth = 2;
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.context.stroke();
    this.context.fill();

    if (this.resaltado) {
      this.context.strokeStyle = this.resaltadoestilo;
      this.context.lineWidth = 2;
      this.context.stroke();
    }
  }

  getPositionOriginal() {
    return {
      x: this.posXoriginal,
      y: this.posYoriginal
    }
  }

  setRadius(radius) {
    this.radius = radius;
  }

  getRadius() {
    return this.radius;
  }

  setIsClickable(isClickeable) {
    this.isClickeable = isClickeable;
  }

  isPut(){
    return this.isPut;
  }

  setIsPut(isPut){
    this.isPut = isPut;
  }

  isPointInside(x, y) {
    let _x = this.x - x;
    let _y = this.y - y;
    return Math.sqrt(_x * _x + _y * _y) <= this.radius && this.isClickeable;
  }
}