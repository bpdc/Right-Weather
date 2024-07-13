// Variáveis e seleção de elementos
const apikey = "18dbadcfed01a8422f316cc4c6e2f28b";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const rainElement = document.querySelector("#rain-probability");

const weatherContainer = document.querySelector("#weather-data");

// Funções
const getWeatherData = async (city) => {
    const apiweatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`;
    const res = await fetch(apiweatherURL);
    const data = await res.json();
    return data;
};

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed} km/h`;

    weatherContainer.classList.remove("hide");
    
    weatherIconElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
};

// Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;
    showWeatherData(city);
});

cityInput.addEventListener("keyup" , (e) =>{
    if(e.code === "Enter"){
        const city = e.target.value
        showWeatherData(city);
    }
})