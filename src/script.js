function formatTime(date) {
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let todayDay = week[date.getDay()];
  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  {
    return `Last update: ${todayDay},${hour}:${minutes}`;
  }
}

function handleResponse(response) {
  let temperature = document.querySelector(".temperature");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#details");
  let city = document.querySelector("#city");
  let iconElement = document.querySelector("#mainIcon");
  let body = document.querySelector("body");

  celsiusTemp = response.data.temperature.current;
  dayNight = response.data.condition.icon;

  temperature.innerHTML = Math.round(celsiusTemp);
  humidity.innerHTML = Math.round(response.data.temperature.humidity);
  description.innerHTML = response.data.condition.description;
  wind.innerHTML = Math.round(response.data.wind.speed);
  city.innerHTML = response.data.city;
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${dayNight}.png`
  );
  if (
    dayNight === "clear-sky-night" ||
    dayNight === "few-clouds-night" ||
    dayNight === "scattered-clouds-night" ||
    dayNight === "broken-clouds-night" ||
    dayNight === "shower-rain-night" ||
    dayNight === "rain-night" ||
    dayNight === "thunderstorm-night" ||
    dayNight === "snow-night" ||
    dayNight === "mist-night"
  ) {
    body.classList.add("darkTheme");
  } else {
    body.classList.remove("darkTheme");
  }
  activateForecast(response.data.coordinates);
  displayPhotoCredit();
}
function formatDailyTime(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return week[day];
}

function activateForecast(coordinates) {
  let apiKey = "cbc90ba0a21t28a990f44b7f6f3ea68o";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  dailyWeather = response.data.daily;
  let forecast = document.querySelector("#fiveDayForecast");
  let forecastContent = `<div class="row">`;
  dailyWeather.forEach(function (dailyWeatherDay, index) {
    if (index < 6 && index > 0) {
      forecastContent =
        forecastContent +
        `<div class="col">
          <div class="weatherForecastPreview">
            <div class="forecast-time">${formatDailyTime(
              dailyWeatherDay.time
            )}</div>
            <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              dailyWeatherDay.condition.icon
            }.png"></img>
            <div class="forecast-temperature">
              <span class="forecast-temperature-max">${Math.round(
                dailyWeatherDay.temperature.maximum
              )}°</span>
              <span class="forecast-temperature-min">${Math.round(
                dailyWeatherDay.temperature.minimum
              )}°</span>
            </div>
          </div>
        </div>`;
    }
  });
  forecastContent = forecastContent + `</div>`;
  forecast.innerHTML = forecastContent;
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityInput");
  activateApi(cityInput.value);
}

function activateApi(city) {
  const apiKey = "cbc90ba0a21t28a990f44b7f6f3ea68o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(handleResponse);
}
function changeUnit(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let dailyTemp = document.querySelector("#fiveDayForecast");
  let forecastTemperatures = `<div class="row">`;
  dailyWeather.forEach(function (dailyWeatherDay, index) {
    if (index < 6 && index > 0) {
      forecastTemperatures =
        forecastTemperatures +
        `<div class="col">
      <div class="weatherForecastPreview">
            <div class="forecast-time">${formatDailyTime(
              dailyWeatherDay.time
            )}</div>
            <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              dailyWeatherDay.condition.icon
            }.png"></img>
          <div class="forecast-temperature">
              <span class="forecast-temperature-max">${Math.round(
                (dailyWeatherDay.temperature.maximum * 9) / 5 + 32
              )}°</span>
              <span class="forecast-temperature-min">${Math.round(
                (dailyWeatherDay.temperature.minimum * 9) / 5 + 32
              )}°</span>
          </div>
        </div>
       </div>`;
    }
  });
  forecastTemperatures = forecastTemperatures + `</div>`;
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
  temperature.innerHTML = Math.round(fahrenheitTemp);
  dailyTemp.innerHTML = forecastTemperatures;
}
function changeBack(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temperature");
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  temperature.innerHTML = Math.round(celsiusTemp);
  let forecast = document.querySelector("#fiveDayForecast");
  let forecastContent = `<div class="row">`;
  dailyWeather.forEach(function (dailyWeatherDay, index) {
    if (index < 6 && index > 0) {
      forecastContent =
        forecastContent +
        `<div class="col">
          <div class="weatherForecastPreview">
            <div class="forecast-time">${formatDailyTime(
              dailyWeatherDay.time
            )}</div>
            <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              dailyWeatherDay.condition.icon
            }.png"></img>
            <div class="forecast-temperature">
              <span class="forecast-temperature-max">${Math.round(
                dailyWeatherDay.temperature.maximum
              )}°</span>
              <span class="forecast-temperature-min">${Math.round(
                dailyWeatherDay.temperature.minimum
              )}°</span>
            </div>
          </div>
        </div>`;
    }
  });
  forecastContent = forecastContent + `</div>`;
  forecast.innerHTML = forecastContent;
}
function displayPhotoCredit() {
  let photographElement = document.querySelector("#photographer");
  if (
    dayNight === "clear-sky-night" ||
    dayNight === "few-clouds-night" ||
    dayNight === "scattered-clouds-night" ||
    dayNight === "broken-clouds-night" ||
    dayNight === "shower-rain-night" ||
    dayNight === "rain-night" ||
    dayNight === "thunderstorm-night" ||
    dayNight === "snow-night" ||
    dayNight === "mist-night"
  ) {
    photographElement.innerHTML = `<div id="photographer">Photo by <a href="https://www.pexels.com/@kaip/" target="_blank" class="photographer">Kai Pilger</a></div>`;
  } else {
    photographElement.innerHTML = `<div id="photographer">Photo by <a href="https://www.pexels.com/@ithalu/" target="_blank" class="photographer">Ithalu Dominguez</a></div>`;
  }
}

let time = document.querySelector("#dateAndTime");
let date = new Date();
time.innerHTML = formatTime(date);
let form = document.querySelector("#searchEngine");
form.addEventListener("submit", search);
let celsiusTemp = null;
let dailyWeather = null;
let dayNight = null;
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeUnit);
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeBack);

activateApi("Houston");
