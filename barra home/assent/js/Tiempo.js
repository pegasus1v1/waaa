var climas = document.getElementById("climas");
var tiempo_sistema = document.getElementById("tiempo_sistema");

climas.onclick = function(){
    climas.style.display = "none";
    var tiempo = document.getElementById("tiempo");
    tiempo.style.display = "flex";
    setTimeout(() => {
        tiempo.style.display = "none";
        climas.style.display = "block";
    }, 5000);
}
const api = {
    key: '9e122cd782b2d0333f5fe4e7fa192062',
    url: `https://api.openweathermap.org/data/2.5/weather`
}

const city = document.getElementById('city');
const date = document.getElementById('date');
const tempImg = document.getElementById('temp-img');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');

async function searchByCoordinates(lat, lon) {
    try {
        const response = await fetch(`${api.url}?lat=${lat}&lon=${lon}&appid=${api.key}&lang=es`);
        const data = await response.json();
        city.innerHTML = `${data.name}, ${data.sys.country}`;
        date.innerHTML = (new Date()).toLocaleDateString();
        tiempo_sistema.value = `${data.name}, ${data.sys.country}`;
        temp.innerHTML = `${toCelsius(data.main.temp)}°C`;
        weather.innerHTML = `${data.weather[0].description}`;
        updateImages(data);
    } catch (err) {
        console.error(err);
    }
}

function updateImages(data) {
    const tempValue = toCelsius(data.main.temp);
    let iconClass = 'fa-cloud-sun';
    if (tempValue > 26) {
        iconClass = 'fa-sun';
    } else if (tempValue < 20) {
        iconClass = 'fa-snowflake';
    }
    tempImg.className = `fas ${iconClass} fa-3x`;
}

function toCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}

window.addEventListener('load', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            searchByCoordinates(lat, lon);
        });

        setInterval(() => {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                searchByCoordinates(lat, lon);
            });
        }, 3000);
    } else {
        alert("La geolocalización no está disponible en este navegador.");
    }
});
