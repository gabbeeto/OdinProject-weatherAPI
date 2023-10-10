import { displayTemperatureInHtml,displayLocationAndCurrentTemperature } from './display.js';

let switchButton = document.querySelector('article:nth-of-type(2) button');
switchButton.addEventListener('click', switchToFahreinheit)

function switchToFahreinheit() {
  if (window.mode == 'c') {
    window.mode = 'f';
    switchButton.innerText = 'Switch To Celsius';
  }
  else {
    window.mode = 'c';
    switchButton.innerText = 'Switch To Fahreinheit';
  }
  displayTemperatureInHtml(forecastData);
  displayLocationAndCurrentTemperature(forecastData)
}
