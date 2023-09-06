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
let time = document.querySelector("#dateAndTime");
let date = new Date();
time.innerHTML = formatTime(date);

function handleResponse(response) { 
  let temperature=document.querySelector(".temperature");
  
  let humidity=document.querySelector("#humidity");
  let wind=document.querySelector("#wind");
  let description=document.querySelector("#details");
  let city=document.querySelector("#city");
  let dayNight=response.data.condition.icon;
  let iconElement=document.querySelector("#mainIcon");
  let body=document.querySelector("body");

  celsiusTemp = response.data.temperature.current;

  temperature.innerHTML= Math.round(celsiusTemp);
  humidity.innerHTML= Math.round(response.data.temperature.humidity);
  description.innerHTML=response.data.condition.description;
  wind.innerHTML= Math.round(response.data.wind.speed);
  city.innerHTML=response.data.city;
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${dayNight}.png`);
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
  
}
function activateForecast(coordinates){
  let apiKey = "cbc90ba0a21t28a990f44b7f6f3ea68o";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response){
  console.log(response);
  let forecast=document.querySelector("#fiveDayForecast");
  let forecastContent = `<div class="row">`;
  let days=["Thurs","Fri","Sat","Sun","Mon"];
  days.forEach(function(day) {
  forecastContent=forecastContent+
       `<div class="col">
          <div class="weatherForecastPreview">
            <div class="forecast-time">${day}</div>
            <canvas width="38" height="38"></canvas>
            <div class="forecast-temperature">
              <span class="forecast-temperature-max">25°</span>
              <span class="forecast-temperature-min">15°</span>
            </div>
          </div>
        </div>`;
      });
  forecastContent=forecastContent+`</div>`;
  forecast.innerHTML=forecastContent;
}

function search(event) {
  event.preventDefault();
  let cityInput=document.querySelector("#cityInput");
  activateApi(cityInput.value);}

  function activateApi(city){
  const apiKey = "cbc90ba0a21t28a990f44b7f6f3ea68o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(handleResponse);
}
function changeUnit(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
  temperature.innerHTML = Math.round(fahrenheitTemp);
}
function changeBack(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temperature");
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  temperature.innerHTML = Math.round(celsiusTemp);
}

let form=document.querySelector("#searchEngine");
form.addEventListener("submit", search);
let celsiusTemp=null;
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeUnit);
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeBack);

activateApi("Houston");
