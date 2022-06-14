class Rectangle extends Figure {
  
  constructor(x, y, width, height, fill, context) {
    super(x, y, fill, context);
    this.width = width;
    this.height = height;
  }

  draw() {
    this.context.fillStyle = this.fill;
    this.context.fillRect(this.x, this.y, this.width, this.height);

    if (this.resaltado) {
      this.context.strokeStyle = this.resaltadoestilo;
      this.context.lineWidth = 2;
      this.context.strokeRect(this.x, this.y, this.width, this.height);
    }
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  /* Devuelve si el click se hizo dentro de un rectangulo */
  isPointInside(x, y) {
    return (x >= this.x && x <= this.x + this.width) && (y >= this.y && y <= this.y + this.height);
  }

}