

function modal_cerrar_controlador_almacenador(){
    var controlador_almacenador = document.getElementById("controlador_almacenador");
    controlador_almacenador.style.display = "none";
    location.reload();
}
var chats = document.getElementById("chats");
var chat = document.getElementById("Chat");
var mostrando_chats = true;
chat.onclick = function(){
    if (mostrando_chats) {
        tableros.style.display = "none";
        chats.style.display = "block";
    } else {
        chats.style.display = "none";
    }
    mostrando_chats = !mostrando_chats; 
}

var tablas = document.getElementById("tablas");
var tableros = document.getElementById("tableros");
// Mostrar el modal al hacer clic en el botón
var mostrando = true;
tablas.onclick = function(){
    if (mostrando) {
        chats.style.display = "none";
        tableros.style.display = "block";
    } else {
        tableros.style.display = "none";
    }
    mostrando = !mostrando; 
}