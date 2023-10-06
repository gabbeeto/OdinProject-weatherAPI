



export function getWeather(weatherRequest){

return fetch(weatherRequest).then(testIfitWorks).then(interactWithJson).catch((error) => console.log(error))

function testIfitWorks(response){
  if(response.ok){
   return response.json()
  }
}


function interactWithJson(jsonResponse){
    return jsonResponse.forecast.forecastday
}

}
