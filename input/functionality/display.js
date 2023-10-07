
export function displayTemperatureInHtml(days) {
  let allDescriptionList = document.querySelectorAll('dd')
  console.log(days);
  for (let description of allDescriptionList) {
    displayDiffentDescriptionDependingOnDay(description, 'avghumidity', 'avghumidity', days)
    displayDiffentDescriptionDependingOnDay(description, 'avgtemp', 'avgtemp_c', days)
    displayDiffentDescriptionDependingOnDay(description, 'mintemp', 'mintemp_c', days)
    displayDiffentDescriptionDependingOnDay(description, 'maxtemp', 'maxtemp_c', days)
  }
}

function displayDiffentDescriptionDependingOnDay(description, typeOfData, typeOfProperty,days){
let [day1,day2,day3] = days;

switch (description.dataset[`${typeOfData}`]) {
    case 'day1':
      description.innerText = day1[`${typeOfProperty}`];
      break;
    case 'day2':
      description.innerText = day2[`${typeOfProperty}`];
      break;
    case 'day3':
      description.innerText = day3[`${typeOfProperty}`];
      break;
}

}




