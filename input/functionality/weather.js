



export function getWeather(weatherRequest){

return fetch(weatherRequest).then(testIfitWorks).then(interactWithJson).catch((error) => console.log(error))

function testIfitWorks(response){
    // console.log(response)
  if(response.ok){
   return response.json()
  }
}


function interactWithJson(jsonResponse){
// console.log(jsonResponse)
    return jsonResponse
}

}
