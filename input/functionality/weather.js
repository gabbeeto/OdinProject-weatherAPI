


let button = document.querySelector(`form button`);
button.addEventListener('click', updateItems);

function updateItems(){

let search = document.querySelector(`form input[type='search']`).value;

let weatherUrl = new URL(`http://api.weatherapi.com/v1/current.json?key=61b6b8b8c07140b38b6114538232109`);
weatherUrl.search = `?key=61b6b8b8c07140b38b6114538232109&q=${search}&aqi=no `

let header = new Headers({mode:'cors', method:'GET'})

let weatherRequest = new Request(weatherUrl, header);
fetch(weatherRequest).then(testIfitWorks).then(interactWithJson)

function testIfitWorks(response){
  if(response.ok){
   return response.json()
  }
}

function interactWithJson(jsonResponse){
console.log(jsonResponse)

}


}
