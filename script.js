const searchInput = document.querySelector('.search-input');
const searchBtn = document.getElementById('searchBtn');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const weatherDesc = document.getElementById('weatherDesc');
const weatherIcon = document.querySelector('.weather-icon');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const pressure = document.getElementById('pressure');

const API_KEY = "77079691a77d8b017b7c92ede5dcc237";

async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );

        const data = await response.json();

        if (data.cod !== 200) {
            alert("City not found!");
            return;
        }

        const tempC = (data.main.temp - 273.15).toFixed(1);

        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `${tempC}°C`;
        weatherDesc.textContent = data.weather[0].description;

        humidity.textContent = data.main.humidity + "%";
        windSpeed.textContent = data.wind.speed + " km/h";
        pressure.textContent = data.main.pressure + " mb";

        if (data.weather[0].main === "Snow") {
            weatherIcon.textContent = "❄️";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.textContent = "🌧️";
        } else if (data.weather[0].main === "Clouds") {
            weatherIcon.textContent = "☁️";
        } else {
            weatherIcon.textContent = "☀️";
        }

    } catch (error) {
        console.log(error);
    }
    
}

searchBtn.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city !== "") {
        getWeather(city);
    }
});