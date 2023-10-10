import { getWeather } from './weather.js';
import { displayTemperatureInHtml, displayLocationAndCurrentTemperature } from './display.js';

const key = '61b6b8b8c07140b38b6114538232109';

let button = document.querySelector(`form button`);
button.addEventListener('click', updateForecast);

document.querySelector(`form input[type='search']`).value = 'london';

export async function updateForecast() {
  let searchInput = document.querySelector(`form input[type='search']`)
  let searchValue = searchInput.value;

  const header = {
    method: 'GET',
    mode: 'cors',
    referrerPolicy: 'no-referrer'
  }


  let weatherUrl = new URL(`https://api.weatherapi.com/v1/forecast.json`);

  let queries = new URLSearchParams(weatherUrl.search);
  queries.append('key', key)
  queries.append('q', `${searchValue}`)
  queries.append('days', `3`)
  queries.append('aqi', `no`)
  queries.append('alerts', `no`)
  weatherUrl.search = queries;

  let weatherRequest = new Request(weatherUrl, header);
  console.log(weatherRequest)
  window.forecastData = await getWeather(weatherRequest)
  displayTemperatureInHtml(forecastData)
  displayLocationAndCurrentTemperature(forecastData)
  searchInput.value = '';
}
