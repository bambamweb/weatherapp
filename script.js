// Get the elements from HTML
const getWeatherButton = document.getElementById("get-weather");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");

// Weather API (example: OpenWeatherMap)
const apiKey = '8ff55214ba03fe1e2bc0a770267d7114'; 

// Function to fetch weather data
async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      displayWeather(data);
    } else {
      weatherInfo.innerHTML = `<p>City not found!</p>`;
    }
  } catch (error) {
    weatherInfo.innerHTML = `<p>Error fetching data!</p>`;
  }
}

// Function to display weather data
function displayWeather(data) {
  const { name, main, weather } = data;
  const temperature = main.temp;
  const description = weather[0].description;

  weatherInfo.innerHTML = `
    <h2>${name}</h2>
    <p>Temperature: ${temperature}°C</p>
    <p>Description: ${description}</p>
  `;
}

// Event listener for the "Get Weather" button
getWeatherButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    weatherInfo.innerHTML = `<p>Please enter a city!</p>`;
  }
});
