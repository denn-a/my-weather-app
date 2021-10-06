// current Time

function currentDayTime() {
  let now = new Date();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let currentDay = days[now.getDay()];

  let hours = now.getHours();
  let minutes = now.getMinutes();

  let day = document.querySelector("#current-date");
  day.innerHTML = currentDay;

  let time = document.querySelector("#current-time");
  time.innerHTML = `${hours}:${minutes}`;
}

currentDayTime();

// Task 1

function displayWeatherCondition(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind").innerHTML = response.data.wind.speed;

  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}

function retrieveLocation(event) {
  event.preventDefault();

  let city = document.querySelector("#city-input").value;

  let apiKey = "b2d9fa1f2b35557e4615dd5fab218834";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(displayWeatherCondition);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", retrieveLocation);

// Geolocation
function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "b2d9fa1f2b35557e4615dd5fab218834";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}`).then(displayWeatherCondition);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentPosition);
