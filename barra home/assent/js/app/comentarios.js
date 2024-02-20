var abrir_cargador_archivos = document.getElementById("abrir_cargador_archivos");
var abrir_cargar_Url = document.getElementById("abrir_cargar_Url");
var cargador_archivos = document.getElementById("cargador_archivos");
var cargar_Url = document.getElementById("cargar_Url");

abrir_cargador_archivos.onclick = function(){
    if (cargador_archivos.style.display === "none" || cargador_archivos.style.display === "") {
        cargador_archivos.style.display = "block";
        cargar_Url.style.display = "none";
    } else {
        cargador_archivos.style.display = "none";
    }
}

abrir_cargar_Url.onclick = function(){
    if (cargar_Url.style.display === "none" || cargar_Url.style.display === "") {
        cargar_Url.style.display = "block";
        cargador_archivos.style.display = "none";
    } else {
        cargar_Url.style.display = "none";
    }
}


// Sustituye aquí tus credenciales
var firebaseConfig = {
    apiKey: "AIzaSyCowkKlW7BEgdp_8GeRfQgg42OkSOrGzm8",
    authDomain: "fotos-b8a54.firebaseapp.com",
    projectId: "fotos-b8a54",
    storageBucket: "fotos-b8a54.appspot.com",
    messagingSenderId: "1037713159028",
    appId: "1:1037713159028:web:7386b0783a47e73f8b7221",
    measurementId: "G-909LJ5JLLG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function selectFile() {
    document.getElementById('fileToUpload').click();
}

document.getElementById('fileToUpload').addEventListener('change', function () {
    const fileInput = document.getElementById('fileToUpload');
    const fileNameDisplay = document.getElementById('fileName');
    if (fileInput.files.length > 0) {
        fileNameDisplay.value = fileInput.files[0].name;
    } else {
        fileNameDisplay.value = "Ningún archivo seleccionado";
    }
});



async function subirArchivo() {
    var inputFile = document.getElementById("fileToUpload");
    var archivosContainer = document.getElementById("archivosContainer");

    if (inputFile.files.length == 0) {
        alert("Por favor selecciona un archivo");
        return;
    }

    var file = inputFile.files[0];
    var username = "users";

    if (!username) {
        alert("Debes iniciar sesión para subir archivos.");
        return;
    }

    // Crear una referencia al directorio del usuario en Firebase Storage
    var storageRef = firebase.storage().ref(username + "/" + file.name);

    try {
        await storageRef.put(file);
        console.log("Carga completada...");

        var filePath = username + "/" + file.name;
        mostrarArchivo(filePath, archivosContainer, file); // Pasa 'file' como argumento
    } catch (error) {
        console.error("Error al subir el archivo:", error);
        alert("Ocurrió un error al subir el archivo. Por favor, inténtalo de nuevo.");
    }
}


async function mostrarArchivo(path, container, file) {
    var storageRef = firebase.storage().ref(path);
    var url = await storageRef.getDownloadURL();


    var cartaArchivoDiv = document.createElement("div");
    cartaArchivoDiv.classList.add("carta-archivo");

    var mediaElement;

    if (file.type.startsWith('image')) {
        mediaElement = document.createElement("img");
        mediaElement.src = url;
    } else if (file.type.startsWith('video')) {
        mediaElement = document.createElement("video");
        mediaElement.src = url;
        mediaElement.controls = true;
    } else {
        console.error("Tipo de archivo no compatible: ", file.type);
        return; // No se puede mostrar el archivo, tipo no compatible
    }



    var urlElement = document.createElement("input");
    urlElement.classList.add("urlElement");
    urlElement.value = url;
    urlElement.id = "Multimedia";
    urlElement.disabled = true;

    var deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    deleteButton.textContent = "Eliminar";
    deleteButton.onclick = function () {
        eliminarArchivo(path, container, cartaArchivoDiv);
    };

    cartaArchivoDiv.appendChild(mediaElement);
    cartaArchivoDiv.appendChild(urlElement);
    cartaArchivoDiv.appendChild(deleteButton);

    container.appendChild(cartaArchivoDiv);
}

async function eliminarArchivo(path, container, cartaArchivoDiv) {
    try {
        await firebase.storage().ref(path).delete();
        console.log("Archivo eliminado de Firebase Storage.");

        // Remover la tarjeta de archivo del contenedor
        container.removeChild(cartaArchivoDiv);
    } catch (error) {
        console.error("Error al eliminar el archivo:", error);
        alert("Ocurrió un error al eliminar el archivo. Por favor, inténtalo de nuevo.");
    }
}