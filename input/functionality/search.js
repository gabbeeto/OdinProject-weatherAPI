import { getWeather } from './weather.js'

let button = document.querySelector(`form button`);
button.addEventListener('click', updateEverything);

function updateEverything() {
  let searchValue = document.querySelector(`form input[type='search']`).value;
  let header = new Headers()
  header.append('mode', 'cors');
  header.append('method', 'GET');

  updateCurrentTime(searchValue, header)
  updateForecast(searchValue, header)
}




async function updateCurrentTime(searchValue, header) {

  let weatherUrl = new URL(`http://api.weatherapi.com/v1/current.json`);
  let queries = new URLSearchParams(weatherUrl.search)
  queries.append('key', '61b6b8b8c07140b38b6114538232109');
  queries.append('q', `${searchValue}`);
  queries.append('aqi', `no`);

  weatherUrl.search = queries;
  let weatherRequest = new Request(weatherUrl, header);


  let lala = await getWeather(weatherRequest)
  // console.log(lala)
}

// work on this 
async function updateForecast(searchValue, header) {
  let currentDate = new Date().toISOString()
  console.log(currentDate.toLocaleDateString('en-US', {
    weekday: 'long', //  values: 'long', 'short', 'narrow'
    year: 'numeric', //  values: 'numeric', '2-digit'
    month: 'short', //  values: 'numeric', '2-digit', 'long', 'short', 'narrow'
    day: 'numeric', //  values: 'numeric', '2-digit'
  }))

  let weatherUrl = new URL(`http://api.weatherapi.com/v1/future.json`);

  let queries = new URLSearchParams(weatherUrl.search);
  queries.append('key', '61b6b8b8c07140b38b6114538232109')
  queries.append('q', `${searchValue}`)
  queries.append('dt', `${currentDate}`)

  weatherUrl.search = queries;
  let weatherRequest = new Request(weatherUrl, header);
  let lala = await getWeather(weatherRequest)
  // console.log(lala)
}
