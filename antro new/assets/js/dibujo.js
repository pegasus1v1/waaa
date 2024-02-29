const mainCanvas = document.getElementById("main-canvas");
const context = mainCanvas.getContext("2d");
const tipo_herramienta = document.getElementById("tipo_herramienta");
const borrar = document.getElementById("borrar");
const color_lapiz_plumon_pincel = document.getElementById("color_lapiz_plumon_pincel");
const color_Background = document.getElementById("color_Background");
const activar_color_Background = document.getElementById("activar_color_Background");
const bac1 = document.getElementById("bac1");


bac1.onclick = function(){
  mainCanvas.style.background = "url("+"https://st2.depositphotos.com/5891300/8703/v/950/depositphotos_87038084-stock-illustration-coloring-book-farm-cartoon-educational.jpg "+") center fixed no-repeat";
  mainCanvas.style.backgroundSize = "cover";
}


activar_color_Background.onclick = function(){
  mainCanvas.style.background = color_Background.value;
}



let initialX;
let initialY;
let correccionX = 0;
let correccionY = 0;

let posicion = mainCanvas.getBoundingClientRect();
correccionX = posicion.x;
correccionY = posicion.y;

const dibujar = (cursorX, cursorY) => {
  context.beginPath();
  context.moveTo(initialX, initialY);
  context.lineWidth = tipo_herramienta.value;
  context.strokeStyle = color_lapiz_plumon_pincel.value;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineTo(cursorX, cursorY);
  context.stroke();

  initialX = cursorX;
  initialY = cursorY;
};

const borrarCanvas = () => {
  mainCanvas.style.background = "#fff";
  context.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
};

const mouseDown = (evt) => {
  evt.preventDefault();
  if (evt.changedTouches === undefined) {
    initialX = evt.offsetX;
    initialY = evt.offsetY;
  } else {
    initialX = evt.changedTouches[0].pageX - correccionX;
    initialY = evt.changedTouches[0].pageY - correccionY;
  }
  dibujar(initialX, initialY);
  mainCanvas.addEventListener("mousemove", mouseMoving);
  mainCanvas.addEventListener("touchmove", mouseMoving);
};

const mouseMoving = (evt) => {
  evt.preventDefault();
  if (evt.changedTouches === undefined) {
    dibujar(evt.offsetX, evt.offsetY);
  } else {
    dibujar(evt.changedTouches[0].pageX - correccionX, evt.changedTouches[0].pageY - correccionY);
  }
};

const mouseUp = () => {
  mainCanvas.removeEventListener("mousemove", mouseMoving);
  mainCanvas.removeEventListener("touchmove", mouseMoving);
};

mainCanvas.addEventListener("mousedown", mouseDown);
mainCanvas.addEventListener("mouseup", mouseUp);

borrar.addEventListener("click", borrarCanvas);

//pantallas tactiles
mainCanvas.addEventListener("touchstart", mouseDown);
mainCanvas.addEventListener("touchend", mouseUp);