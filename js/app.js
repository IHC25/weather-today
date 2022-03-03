const searchCity = () => {
  const cityInput = document.getElementById("city-input");
  const city = cityInput.value;
  const API_KEY = `729d542f1859a358bcef1b15418facf9`;
  //   clear input field
  cityInput.value = "";
  //   Loading latitude and longitude
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => findLatAndLon(data[0]));

  const findLatAndLon = (data) => {
    const latitude = Math.round(data.lat);
    const longitude = Math.round(data.lon);
    loadTemperature(latitude, longitude, API_KEY);
  };

  const loadTemperature = (lat, lon, api) => {
    const url2 = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api}`;
    fetch(url2)
      .then((res) => res.json())
      .then((temp) => displayTemperature(temp));
  };

  const displayTemperature = (temp) => {
    const cityName = document.getElementById("city-name");
    const temperature = document.getElementById("temperature");
    const weather = document.getElementById("weather");
    cityName.innerText = city.toUpperCase();
    temperature.innerText = temp.main.temp;
    weather.innerText = temp.weather[0].main;
  };
};

// search button handling
document
  .getElementById("search-button")
  .addEventListener("click", () => searchCity());
