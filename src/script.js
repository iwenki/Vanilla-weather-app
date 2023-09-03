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
  celsiusTemp = response.data.temperature.current;
  let humidity=document.querySelector("#humidity");
  let wind=document.querySelector("#wind");
  let description=document.querySelector("#details");
  let city=document.querySelector("#city");
  temperature.innerHTML= Math.round(celsiusTemp);
  humidity.innerHTML= Math.round(response.data.temperature.humidity);
  description.innerHTML=response.data.condition.description;
  wind.innerHTML= Math.round(response.data.wind.speed);
  city.innerHTML=response.data.city;
  let iconElement=document.querySelector("#mainIcon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
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