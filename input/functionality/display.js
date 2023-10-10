export function displayTemperatureInHtml(daysAndLocation) {
  console.log(daysAndLocation)
  let allDescriptionList = document.querySelectorAll('dd')
  for (let description of allDescriptionList) {
    displayDiffentDescriptionDependingOnDay(description, 'avghumidity', 'avghumidity', daysAndLocation)
    displayDiffentDescriptionDependingOnDay(description, 'avgtemp', `avgtemp_${window.mode}`, daysAndLocation)
    displayDiffentDescriptionDependingOnDay(description, 'mintemp', `mintemp_${window.mode}`, daysAndLocation)
    displayDiffentDescriptionDependingOnDay(description, 'maxtemp', `maxtemp_${window.mode}`, daysAndLocation)
  }
  for(let figure of document.querySelectorAll('figure')){
    let text = figure.querySelector('figcaption')
    let img = figure.querySelector('img')
    displayDiffentDescriptionDependingOnDay(text, 'conditiontext', 'conditionText', daysAndLocation)
    displayDiffentDescriptionDependingOnDay(img, 'conditionimage', 'conditionIcon', daysAndLocation, true)
  }
}

function displayDiffentDescriptionDependingOnDay(description, typeOfData, typeOfProperty, days, isAnImage = false) {
  let [day1, day2, day3] = days;

  switch (description.dataset[`${typeOfData}`]) {
    case 'day1':
      if (isAnImage) {
        description.src = `http:${day1[`${typeOfProperty}`]}`;
      }
      else {
        description.innerText = day1[`${typeOfProperty}`];
      }
      break;
    case 'day2':
      if (isAnImage) {
        description.src = `http:${day2[`${typeOfProperty}`]}`;
      }
      else {
        description.innerText = day2[`${typeOfProperty}`];
      }
      break;
    case 'day3':
      if (isAnImage) {
        description.src = `http:${day3[`${typeOfProperty}`]}`;
      }
      else {
        description.innerText = day3[`${typeOfProperty}`];
      }
      break;
  }

}




export function displayLocationAndCurrentTemperature([,,,location,temperature]){
let currentLocation = location.location

document.querySelector('article p span').innerText = currentLocation;
document.getElementById('currentTemp').innerText = temperature[`temp_${window.mode}`];
document.getElementById('tempFeeling').innerText = temperature[`feelslike_${window.mode}`];
}

