

function modal_cerrar_controlador_almacenador(){
    var controlador_almacenador = document.getElementById("controlador_almacenador");
    controlador_almacenador.style.display = "none";
    location.reload();
}

var tablas = document.getElementById("tablas");
var Chat = document.getElementById("Chat");
var Bloc = document.getElementById("Bloc");
var changeBackgroundBtn = document.getElementById("changeBackgroundBtn");
var modalNotificacion = document.getElementById("modalNotificacion");
var modal_abrir_controlador_almacenador = document.getElementById("modal_abrir_controlador_almacenador");

// Función para activar un botón y desactivar los otros
function activarElemento(elemento) {
    // Desactivar todos los elementos
    tablas.classList.remove("activado");
    Chat.classList.remove("activado");
    Bloc.classList.remove("activado");
    changeBackgroundBtn.classList.remove("activado");
    modalNotificacion.classList.remove("activado");
    modal_abrir_controlador_almacenador.classList.remove("activado");

    // Activar el elemento seleccionado
    elemento.classList.add("activado");
}

const tableros = document.getElementById("tableros");
// Asignar eventos a los elementos
tablas.addEventListener("click", function() {
    activarElemento(this);
    // tableros.style.display = "block";
    if (tableros.style.display === "none" || tableros.style.display === "") {
        tableros.style.display = "block";
    } else {
        tableros.style.display = "none";
        tablas.classList.remove("activado");
    }
});

Chat.addEventListener("click", function() {
    activarElemento(this);
});

Bloc.addEventListener("click", function() {
    activarElemento(this);
});

changeBackgroundBtn.addEventListener("click", function() {
    activarElemento(this);
});

modalNotificacion.addEventListener("click", function() {
    activarElemento(this);
});

modal_abrir_controlador_almacenador.addEventListener("click", function() {
    activarElemento(this);
    var controlador_almacenador = document.getElementById("controlador_almacenador");
    if (controlador_almacenador.style.display === "none" || controlador_almacenador.style.display === "") {
        controlador_almacenador.style.display = "block";
    } else {
        controlador_almacenador.style.display = "none";
    }
});
