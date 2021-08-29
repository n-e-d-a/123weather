let now = new Date();
let dateNow = now.getDate();

let weekdays = [
  "Sanday",
  "Monday",
  "Tuesday",
  "Wednsday",
  "Thursday",
  "Friday",
  "Saturday",
];
let monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let hours = now.getHours();
let minutes = now.getMinutes();

function displayWeatherCondition(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temp-num").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#wind-km").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#description-weather").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  //console.log(response.data.weather[0].main);
  //let temp2=Math.round(response.data.main.temp);
  //return(temp2);
}

function searchCity(city) {
  let apiKey = "802a9523a0d10578c154dd32831cb977";

  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="
    .concat(city, "&appid=")
    .concat(apiKey, "&units=metric");
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchLocation(position) {
  var apiKey = "802a9523a0d10578c154dd32831cb977";
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat="
    .concat(position.coords.latitude, "&lon=")
    .concat(position.coords.longitude, "&appid=")
    .concat(apiKey, "&units=metric");
  axios.get(apiUrl).then(displayWeatherCondition);
}

function changeDay(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-enter").value;
  searchCity(city);

  function currentPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  let current = document.querySelector("#current-position");
  current.addEventListener("click", currentPosition);
}
function convertToCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("#temp-num");
  celsius.innerHTML = "95°";
}
let celsiusButton = document.querySelector("#temp-celsius");
celsiusButton.addEventListener("click", convertToFahrenheit);

let weekdayNew = document.querySelector("#search-city-form");
weekdayNew.addEventListener("submit", changeDay);

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#temp-num");

  fahrenheit.innerHTML = 30;
}
let fahrenheitButton = document.querySelector("#temp-fahrenheit");
fahrenheitButton.addEventListener("click", convertToCelsius);

let eachMonthName = document.querySelector("#date-num");
let daytime = document.querySelector("#date-hour");
eachMonthName.innerHTML = `${monthName[now.getMonth()]}  ${now.getDate()}`;
daytime.innerHTML = now.toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});
let searchForm = document.querySelector("#search-city-form");
searchForm.addEventListener("submit", changeDay);

searchCity("New York");
