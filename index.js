function formatDate(timestamp) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let date = new Date(timestamp);
  let days = weekdays[date.getDay()];
  return `${days} `;
}

function formatTime(timeNow) {
  let date = new Date(timeNow);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  console.log(date);
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${hours}:${minutes}`;
}

function currentMounth(monthDay) {
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
  let date = new Date(monthDay);
  let month = monthName[date.getMonth()];
  let currentDay = date.getDate();
  return `${month} ${currentDay}`;
}

function displayTempreture(response) {
  let tempretureElement = document.querySelector("#temp-num");
  let cityElement = document.querySelector("#city-name");
  let descriptionElement = document.querySelector("#description-weather");
  let dateElement = document.querySelector("#date-day");
  let timeElement = document.querySelector("#date-hour");
  let monthElement = document.querySelector("#date-num");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;
  //fahrenheitTemp=(celsiusTemp * 9) / 5 + 32;

  descriptionElement.innerHTML = response.data.weather[0].description;
  tempretureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  document.querySelector("#wind-km").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  timeElement.innerHTML = formatTime(response.data.dt * 1000);
  monthElement.innerHTML = currentMounth(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function search(city) {
  let apiKey = "802a9523a0d10578c154dd32831cb977";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTempreture);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-city-form").value;
  search(cityInputElement);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  // celsiusLink.classList.remove("active");
  // fahrenheitLink.classList.add("active");
  let fahrenheitTemp2 = (celsiusTemp * 9) / 5 + 32;
  let temperetureElement = document.querySelector("#temp-num");
  temperetureElement.innerHTML = Math.round(fahrenheitTemp2);

  document.getElementById("f").style.color = "white";
  document.getElementById("c").style.color = "#0D6EFD";
}
function displayCelsiusTemp(event) {
  event.preventDefault();
  // celsiusLink.classList.add("active");
  // fahrenheitLink.classList.remove("active");
  let temperetureElement = document.querySelector("#temp-num");
  temperetureElement.innerHTML = Math.round(celsiusTemp);
  document.getElementById("f").style.color = "#0D6EFD";
  document.getElementById("c").style.color = "white";
}

let celsiusTemp = null;
//let fahrenheitTemp=null;

let searchForm = document.querySelector("#search-city-searchIcon");
searchForm.addEventListener("input", handleSubmit);

let fahrenheitLink = document.querySelector("#temp-fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);
//.addEventListener('keypress', function (e) {
/*  if (e.key === 'Enter') {
    // code for enter
  }
});*/

let celsiusLink = document.querySelector("#temp-celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("Paris");
