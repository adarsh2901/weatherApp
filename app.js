
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=7fb7f3f9a5b10155841a517a3d2b393f&q=";

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(query) {
  if (query.keyCode == 13) { //13 is the key code for enter that is to detect when the user presses the enter button
    getResults(searchBox.value);
  }
}

function getResults(query) {
  fetch(`${url}${query}`)
    .then((response) => {
      return response.json();
    }).then((value) => displayResult(value));
}

function displayResult(weather) {
  let city = document.querySelector(".city");
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.date');
  date.innerHTML = todayDate(now);

  let temp = document.querySelector('.temp');
  temp.innerHTML = `${Math.floor(weather.main.temp)}℃`;

  let description = document.querySelector('.weather');
  description.innerHTML = weather.weather[0].main;

  let feelsLike = document.querySelector('.hi-low');
  feelsLike.innerHTML = `${Math.floor(weather.main.temp_min)}℃/${Math.floor(weather.main.temp_max)}℃`
}

function todayDate(d) {
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}