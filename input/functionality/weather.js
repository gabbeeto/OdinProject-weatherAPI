



export function getWeather(weatherRequest) {

  return fetch(weatherRequest).then(testIfitWorks).then(getJSONDataAndMakeAUsefulObject).catch((error) => console.log(error))

  function testIfitWorks(response) {
    if (response.ok) {
      return response.json()
    }
  }


  function getJSONDataAndMakeAUsefulObject(jsonResponse) {
    let forecast = jsonResponse.forecast.forecastday
    let usefulObjectData = forecast.map(object => {
      let dayData = object.day
      let { avghumidity, avgtemp_c, avgtemp_f, maxtemp_c, maxtemp_f, mintemp_c, mintemp_f, condition: { text: conditionText } } = dayData
      return {
        avghumidity, avgtemp_c, avgtemp_f, maxtemp_c, maxtemp_f, mintemp_c, mintemp_f, conditionText
      }
    })

    return usefulObjectData;
  }

}
