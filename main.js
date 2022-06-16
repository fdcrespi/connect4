"use strict"

let canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */   //agrego linea para que interprete y ayude cuando uses .ctx
let ctx = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

const CANTIDADFICHAS = 3;
const filas = 6;
const columnas = 7;
const CANT_FIGURAS = filas * columnas / 2 + 1;

let figures = [];
let casilleros = []; //Guarda la posicion de los casilleros donde se coloca la ficha
let ultimaFiguraClickeada = null;
let isMouseDown = false;

let board = [];


function addFigure(color, jug) {
  addCircle(color, jug);
  drawFigure();
}

/* Borra el canvas y redibuja todo */
function drawFigure() {
  clearCanvas();
  for (let i = figures.length - 1; i > 0; i--) {
    figures[i].draw();
  }
}

function drawTab(){
   /* dibujo base tablero */
   ctx.beginPath();
   ctx.fillStyle = "#1E69B1";
   ctx.fillRect(220, 75, 350, 290);
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
  let circle = new Circle(x, y, 20, fill, ctx, jug);
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
  let isColocado = false;
  casilleros.forEach(elem => {
    if (elem.x > e.offsetX - 10 && elem.x < e.offsetX + 10 && elem.y > e.offsetY - 10 && elem.y < e.offsetY + 10) {
      let columna = casilleros.indexOf(elem);
      for (let index = filas - 1; index >= 0; index--) {
        let casilla = board[index][columna]; 
        if (casilla.value == 0) {
          isColocado = true;
          board[index][columna].value = ultimaFiguraClickeada.jugador;
          ultimaFiguraClickeada.setPosition(board[index][columna].x, board[index][columna].y);
          ultimaFiguraClickeada.setIsClickable(false);
          ultimaFiguraClickeada.setResaltado(false);
          ultimaFiguraClickeada.setIsPut(true);
          deshabilitarFichas(ultimaFiguraClickeada.jugador);
          if (comprobarGanador(board, index, columna, filas, columnas)) {
            console.log('Ganador: ' + ultimaFiguraClickeada.jugador);
            deshabilitarTodasLasFichas();
          }
          drawFigure();
          break;
        }
      }
    }
  });
  if (ultimaFiguraClickeada != null && !isColocado){
    ultimaFiguraClickeada.setPosition(ultimaFiguraClickeada.getPositionOriginal().x, ultimaFiguraClickeada.getPositionOriginal().y);
    drawFigure();
  }
}

function onMouseMove(event) {
  if (isMouseDown && ultimaFiguraClickeada != null) {
    ultimaFiguraClickeada.setPosition(event.offsetX, event.offsetY);
    drawFigure();
  }
}

function play (){
  for (let i = 0; i < filas; i++) {
    board[i] = [];
    for (let j = 0; j < columnas; j++) {
      board[i][j] = ({ x: 0, y: 0, value: 0 });
    }
  }
  for (let i = 0; i < CANT_FIGURAS; i++) {
    let img1 = new Image(40,40);
        img1.src = "img/img12.png";
    let img2 = new Image(40,40);
        img2.src = "img/img11.png";
    img1.onload = () => {
      addFigure(/* 'green' */ img1 , 1);
    }
    img2.onload = () => {
      addFigure(/* 'blue' */  img2 , 2);  
    }
  }
  deshabilitarFichas(2);
  addTablero();
}

function deshabilitarFichas(jug) {
  figures.forEach(ficha => {
    if (ficha.jugador == jug && !ficha.isPut) {
      ficha.setIsClickable(false);
    } else if (!ficha.isPut) {
      ficha.setIsClickable(true);
    }
  });
}

function deshabilitarTodasLasFichas(){
  figures.forEach(ficha => {
      ficha.setIsClickable(false);
  });
}

play();


function addTablero() {
  casilleros = [];   
 
  drawTab(); 

  for (let x = 0; x < columnas; x++) {
    ctx.beginPath();
    let posx = 250 + x * 48;
    ctx.arc(posx, 50, 21, Math.PI * 1, 0, true);
    /* ctx.fillStyle = "#FFF7CE"; */
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    /* ctx.fill(); */
    ctx.stroke();
    casilleros.push({ x: posx, y: 50 });
  }
  
  for (let i = 0; i < filas; i++) {
    /* board[i] = []; */
    for (let j = 0; j < columnas; j++) {
      /* ctx.strokeStyle = `rgb(
        0,
        ${Math.floor(255 - 42.5 * i)},
        ${Math.floor(255 - 42.5 * j)})`; */
        ctx.fillStyle = "white";
        ctx.beginPath();
        let positionx = 250 + j * 48;
        let positiony = 100 + i * 48;
        ctx.arc(positionx, positiony, 21, 0, Math.PI * 2, true);
        ctx.fill(); //agrego fondo blanco
        /* ctx.stroke(); */
        /* Inicializamos la matriz de front */
        /* board[i][j] = ({ x: positionx, y: positiony }); */
        board[i][j].x = positionx;
        board[i][j].y = positiony;
      }
    }    
}

canvas.addEventListener("mousedown", onMouseDown, false);
canvas.addEventListener("mouseup", onMouseUp, false);
canvas.addEventListener("mousemove", onMouseMove, false);

/* Verificar ganador */

function comprobarGanador(board, fila, col, filas, columnas) {
  //Mirar en todas las direcciones a partir de donde cayo la ficha para comprobar si gano
  if (verificarHorizontal(board, fila, col, columnas) || verificarAbajo(board, fila, col, filas) || verificarDiagonalIzquierda(board, fila, col, filas, columnas) || verificarDiagonalDerecha(board, fila, col, filas, columnas)){
    return true;
  }
  return false;
}

function verificarHorizontal(board, fila, col, columnas) {
  let cantFichasIguales = 0;
  while ((col < columnas-1) && (board[fila][col].value == board[fila][col+1].value)){ // verifica cuantas fichas iguales tiene a la derecha
    col++;
    cantFichasIguales++;
  }
  col -= cantFichasIguales; //se para en la columna donde cayo la ficha en un principio. (evita recorrer de nuevo)
  cantFichasIguales++; 
  while ((col > 0) && (cantFichasIguales < CANTIDADFICHAS)) { // verifica cuantas fichas iguales tiene a la izquierda
    if (board[fila][col].value != board[fila][col-1].value) {
      return false;
    } else {
      ++cantFichasIguales;
      col--;
    }
  }
  if (cantFichasIguales == CANTIDADFICHAS) {
    return true;
  } else return false;
}

function verificarAbajo (board, fila, col, filas){
  let cantFichasIguales = 1;
  while ((fila < filas-1) && (cantFichasIguales < CANTIDADFICHAS)) {
    if (board[fila][col].value != board[fila+1][col].value) {//mira todas las fichas en la fila de abajo de la ficha ingresada
      return false;
    } else {
      cantFichasIguales++;
      fila++;
    }
  }
  if (cantFichasIguales == CANTIDADFICHAS) {
    return true;
  } else return false;
}

function verificarDiagonalDerecha(board, fila, col, filas, columnas){
  let cantFichasIguales = 0;
  while ((fila < filas-1) && (col < columnas-1) && (board[fila][col].value == board[fila+1][col+1].value)){//verifica abajo a la derecha si es igual y no se pase de la matriz
    fila++;
    col++;
    cantFichasIguales++;
  }
  fila -= cantFichasIguales; //se para en la fila que cayo en ppio
  col -= cantFichasIguales; //se para en la columna que vayo en ppio
  cantFichasIguales++;
  while ((fila > 0) && (col > 0) && (cantFichasIguales < CANTIDADFICHAS)){ //verifica arriba a la izquierda de la ficha
    if (board[fila][col].value != board[fila-1][col-1].value) {
      return false;
    } else {
      cantFichasIguales++;
      fila--;
      col--;
    }
  }
  if (cantFichasIguales == CANTIDADFICHAS) {
    return true;
  } else return false;
}

function verificarDiagonalIzquierda(board, fila, col, filas, columnas){
  let cantFichasIguales = 0;
  while ((fila < filas-1) && (col > 0) && (board[fila][col].value==board[fila+1][col-1].value)){ //verifica abajo a la izquierda
    fila++;
    col--;
    cantFichasIguales++;
  }
  fila -= cantFichasIguales;
  col += cantFichasIguales;
  cantFichasIguales++;
  while ((fila > 0) && (col < columnas-1) && (cantFichasIguales < CANTIDADFICHAS)){ //verifica arriba a la derecha
    if (board[fila][col].value != board[fila-1][col+1].value) {
      return false;
    } else {
      cantFichasIguales++;
      fila--;
      col++;
    }
  }
  if (cantFichasIguales == CANTIDADFICHAS) {
    return true;
  } else return false;
}