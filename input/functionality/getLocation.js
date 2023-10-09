import { updateForecast } from "./search.js"

const url = new URL(`https://geolocation-db.com/json/`)
const options = { method: 'GET', mode: 'cors' }

getUserDataToDisplayWeather()

async function getUserDataToDisplayWeather() {
  let country = await fetch(url, options)
    .then(checkIfResponseIsValidAndReturnJson)
    .then(returnLocation)
    .catch(assingLondonAsCountryAndShowError)

  addValueToTheSearchInputAndUpdateForecast(country)
}


function checkIfResponseIsValidAndReturnJson(response) {
  if (response.ok) {
    return response.json()
  }
  else {
    throw new Error(`didn't get response`)
  }
}

function returnLocation({ country_name: country, state }) {
  return `${state} - ${country}`;
}

function assingLondonAsCountryAndShowError() {
  return 'London - United Kingdom'
}

function addValueToTheSearchInputAndUpdateForecast(city) {
  let search = document.getElementById('locationSearch')
  search.value = city;
  updateForecast()
}
