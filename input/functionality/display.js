
export function displayTemperatureInHtml(days) {
  let allDescriptionList = document.querySelectorAll('dd')
  console.log(days);
  for (let description of allDescriptionList) {
    displayDiffentDescriptionDependingOnDay(description, 'avghumidity', 'avghumidity', days)
    displayDiffentDescriptionDependingOnDay(description, 'avgtemp', 'avgtemp_c', days)
    displayDiffentDescriptionDependingOnDay(description, 'mintemp', 'mintemp_c', days)
    displayDiffentDescriptionDependingOnDay(description, 'maxtemp', 'maxtemp_c', days)
  }
  for(let figure of document.querySelectorAll('figure')){
    let text = figure.querySelector('figcaption')
    let img = figure.querySelector('img')
    displayDiffentDescriptionDependingOnDay(text, 'conditiontext', 'conditionText', days)
    displayDiffentDescriptionDependingOnDay(img, 'conditionimage', 'conditionIcon', days, true)

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




