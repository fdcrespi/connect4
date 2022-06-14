"use strict"

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

const CANT_FIGURAS = 20;

let figures = [];
let casilleros = []; //Guarda la posicion de los casilleros donde se coloca la ficha
let ultimaFiguraClickeada = null;
let isMouseDown = false;

const filas = 6;
const columnas = 7;
let board = [];


function addFigure(color, jug) {
  addCircle(color, jug);
  drawFigure();
}

/* Borra el canvas y redibuja todo */
function drawFigure() {
  clearCanvas();
  for (let i = 0; i < figures.length; i++) {
    figures[i].draw();
  }
}

function clearCanvas() {
  //ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = "#FFF7CE";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  addTablero();
}

/* Agrega un circulo */
function addCircle(color, jug) {
  let x = Math.floor(((jug == 1) ? 50 : 650) + Math.random() * 100);
  let y = Math.floor(100 + Math.random() * 225);
  /* let radius = Math.floor(Math.random() * 50); */
  let fill = color;
  let circle = new Circle(x, y, 20, fill, ctx);
  figures.push(circle);
}


function onMouseDown(event) {
  isMouseDown = true;
  if (ultimaFiguraClickeada != null) {
    ultimaFiguraClickeada.setResaltado(false);
    ultimaFiguraClickeada = null;
  }
  let FigClickeada = buscarFiguraClickeada(event.offsetX, event.offsetY);
  if (FigClickeada != null) {
    FigClickeada.setResaltado(true);
    ultimaFiguraClickeada = FigClickeada;
  }
  drawFigure();
}

function buscarFiguraClickeada(x, y) {
  for (let i = 0; i < figures.length; i++) {
    if (figures[i].isPointInside(x, y)) {
      return figures[i];
    }
  }
  return null;
}

function onMouseUp(e) {
  isMouseDown = false;
  casilleros.forEach(elem => {
    if (elem.x > e.offsetX - 10 && elem.x < e.offsetX + 10 && elem.y > e.offsetY - 10 && elem.y < e.offsetY + 10) {
      console.log(casilleros.indexOf(elem));
    }
  });

}

function onMouseMove(event) {
  if (isMouseDown && ultimaFiguraClickeada != null) {
    ultimaFiguraClickeada.setPosition(event.offsetX, event.offsetY);
    drawFigure();
  }
}

for (let i = 0; i < CANT_FIGURAS; i++) {
  addFigure('green', 1);
  addFigure('blue', 2);
}
addTablero();
console.log(board);
 
function addTablero() {
  casilleros = [];

  for (let x = 0; x < columnas; x++) {
    ctx.beginPath();
    let posx = 250 + x * 48;
    ctx.arc(posx, 50, 21, Math.PI * 1, 0, true);
    ctx.fillStyle = "#FFF7CE";
    ctx.strokeStyle = "black";
    ctx.fill();
    ctx.stroke();
    casilleros.push({ x: posx, y: 50 });
  }

  for (let i = 0; i < filas; i++) {
    board[i] = [];
    for (let j = 0; j < columnas; j++) {
      ctx.strokeStyle = `rgb(
          0,
          ${Math.floor(255 - 42.5 * i)},
          ${Math.floor(255 - 42.5 * j)})`;
      ctx.beginPath();
      let positionx = 250 + j * 48;
      let positiony = 100 + i * 48;
      ctx.arc(positionx, positiony, 21, 0, Math.PI * 2, true);
      ctx.stroke();
      /* Inicializamos la matriz de front */
      board[i][j] = ({ x: positionx, y: positiony });
    }
  }
}


canvas.addEventListener("mousedown", onMouseDown, false);
canvas.addEventListener("mouseup", onMouseUp, false);
canvas.addEventListener("mousemove", onMouseMove, false);