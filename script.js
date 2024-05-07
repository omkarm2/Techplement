// Define variables
const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const locationNotFound = document.querySelector('.location-not-found');
const weatherBody = document.querySelector('.weather-body');
const apiKey = "65a23f815e393e736692d662908163ed";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

// Function to fetch weather data
async function fetchWeather(city) {
    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}

// Function to update UI with weather data
function updateWeatherUI(weatherData) {
    if (!weatherData || weatherData.cod === "404") {
        locationNotFound.style.display = "flex";
        weatherBody.style.display = "none";
        console.log("error");
        return;
    }
    console.log("run");
    locationNotFound.style.display = "none";
    weatherBody.style.display = "flex";
    temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
    description.innerHTML = `${weatherData.weather[0].description}`;
    humidity.innerHTML = `${weatherData.main.humidity}%`;
    windSpeed.innerHTML = `${weatherData.wind.speed}Km/H`;

    switch (weatherData.weather[0].main) {
        case 'Clouds':
            weatherImg.src = "/images/suncloudy.png";
            break;
        case 'Clear':
            weatherImg.src = "/images/sunclear.png";
            break;
        case 'Rain':
            weatherImg.src = "/images/rainn.png";
            break;
        case 'Mist':
            weatherImg.src = "/images/mistt.png";
            break;
        case 'Snow':
            weatherImg.src = "/images/snoww.png";
            break;
    }

    console.log(weatherData);
}

// Event listener for search button
searchBtn.addEventListener('click', async () => {
    const city = inputBox.value.trim();
    if (city) {
        const weatherData = await fetchWeather(city);
        updateWeatherUI(weatherData);
    }
});
