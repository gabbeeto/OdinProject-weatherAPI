/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./input/functionality/date.js":
/*!*************************************!*\
  !*** ./input/functionality/date.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDateFollowingDays: () => (/* binding */ getDateFollowingDays)
/* harmony export */ });
function getDateFollowingDays() {
  let today = new Date();

  let day1 = new Date();
  day1.setDate(new Date().getDate() + 1);

  let day2 = new Date();
  day2.setDate(new Date().getDate() + 2);




  return {
    day1: day1.toLocaleString('en-us', { weekday: 'long' }),
    day2: day2.toLocaleString('en-us', { weekday: 'long' }),
  }


}


/***/ }),

/***/ "./input/functionality/display.js":
/*!****************************************!*\
  !*** ./input/functionality/display.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displayLocationAndCurrentTemperature: () => (/* binding */ displayLocationAndCurrentTemperature),
/* harmony export */   displayTemperatureInHtml: () => (/* binding */ displayTemperatureInHtml)
/* harmony export */ });
function displayTemperatureInHtml(daysAndLocation) {
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




function displayLocationAndCurrentTemperature([,,,location,temperature]){
let currentLocation = location.location

document.querySelector('article p span').innerText = currentLocation;
document.getElementById('currentTemp').innerText = temperature[`temp_${window.mode}`];
document.getElementById('tempFeeling').innerText = temperature[`feelslike_${window.mode}`];
}



/***/ }),

/***/ "./input/functionality/displayFollowingDays.js":
/*!*****************************************************!*\
  !*** ./input/functionality/displayFollowingDays.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./date.js */ "./input/functionality/date.js");


function displayFollowingDays() {

  const day1 = document.querySelector('article:nth-of-type(3) div p')
  const day2 = document.querySelector('article:nth-of-type(3) div:nth-of-type(2) p')
  let followingDays = (0,_date_js__WEBPACK_IMPORTED_MODULE_0__.getDateFollowingDays)()
  day1.innerHTML = `${followingDays.day1}: <span></span>`
  day2.innerHTML = `${followingDays.day2}: <span></span>`
}

displayFollowingDays()


/***/ }),

/***/ "./input/functionality/getLocation.js":
/*!********************************************!*\
  !*** ./input/functionality/getLocation.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _search_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./search.js */ "./input/functionality/search.js");


const url = new URL(`https://geolocation-db.com/json/`)
const options = {
method: 'GET',
mode: 'cors',
referrerPolicy: 'no-referrer'
}

let request =  new Request(url,options)

getUserDataToDisplayWeather()

async function getUserDataToDisplayWeather() {
  let country = await fetch(request)
    
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
  (0,_search_js__WEBPACK_IMPORTED_MODULE_0__.updateForecast)()
}


/***/ }),

/***/ "./input/functionality/search.js":
/*!***************************************!*\
  !*** ./input/functionality/search.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateForecast: () => (/* binding */ updateForecast)
/* harmony export */ });
/* harmony import */ var _weather_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weather.js */ "./input/functionality/weather.js");
/* harmony import */ var _display_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display.js */ "./input/functionality/display.js");



const key = '61b6b8b8c07140b38b6114538232109';

let button = document.querySelector(`form button`);
button.addEventListener('click', updateForecast);

document.querySelector(`form input[type='search']`).value = 'london';

async function updateForecast() {
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
  window.forecastData = await (0,_weather_js__WEBPACK_IMPORTED_MODULE_0__.getWeather)(weatherRequest)
  ;(0,_display_js__WEBPACK_IMPORTED_MODULE_1__.displayTemperatureInHtml)(forecastData)
  ;(0,_display_js__WEBPACK_IMPORTED_MODULE_1__.displayLocationAndCurrentTemperature)(forecastData)
  searchInput.value = '';
}


/***/ }),

/***/ "./input/functionality/switchToFahreinheit.js":
/*!****************************************************!*\
  !*** ./input/functionality/switchToFahreinheit.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _display_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display.js */ "./input/functionality/display.js");


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
  (0,_display_js__WEBPACK_IMPORTED_MODULE_0__.displayTemperatureInHtml)(forecastData);
  (0,_display_js__WEBPACK_IMPORTED_MODULE_0__.displayLocationAndCurrentTemperature)(forecastData)
}


/***/ }),

/***/ "./input/functionality/weather.js":
/*!****************************************!*\
  !*** ./input/functionality/weather.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getWeather: () => (/* binding */ getWeather)
/* harmony export */ });




function getWeather(weatherRequest) {

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
      let { avghumidity, avgtemp_c, avgtemp_f, maxtemp_c, maxtemp_f, mintemp_c, mintemp_f, condition: { text: conditionText, icon: conditionIcon } } = dayData
      return {
        avghumidity, avgtemp_c, avgtemp_f, maxtemp_c, maxtemp_f, mintemp_c, mintemp_f, conditionText, conditionIcon
      }
    })
    let { temp_c, temp_f, feelslike_c, feelslike_f } = jsonResponse.current
    return [...usefulObjectData, { "location": `${jsonResponse.location.name} - ${jsonResponse.location.country}` }, { temp_c, temp_f, feelslike_c, feelslike_f }];
  }

}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./input/styling/main.css":
/*!**********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./input/styling/main.css ***!
  \**********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `*{
padding: 0;
margin: 0;
box-sizing:border-box;
}

:root{
--black: black;
--white: white;
}

article:nth-of-type(3),form{
display:flex;
}


header{
padding:2px;
border-bottom:2px solid var(--black);
}
form{

text-align:center;
justify-content:center;
align-items:center;
gap:1vw;
}

form > *{
display:block
}

article:nth-of-type(3) div > p:first-of-type{
font-weight: bold;
font-size: 1.5rem;


}


body{
color: var(--black);
background-color:#F7DFDF;
text-align:center;
}

main{
padding:2px;

}

article{
background-image:linear-gradient(#FFB6C1,#FF778B);
background-color: #FFB6C1;

display: flex;
flex-direction:column;
justify-content:center;
align-items:center;
padding:5px;
border-radius:10px;
margin:2px;
}

article:nth-of-type(3) div{
display:flex;
justify-content:center;
align-items:center;
flex-direction: column;


}

dl{
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
text-align:center;
width:75vw;
border-radius:6px;
background-color:#FD8888;
}

article:nth-of-type(3){
flex-direction:column;
justify-items:center;
justify-content:center;
gap:4px
}
 
button{
border:2px solid var(--black);
color: var(--black);
background-color: var(--white);
padding:3px;
border-radius:4px;
}

button:hover{
border:2px solid var(--white);
color: var(--white);
background-color: var(--black);
cursor: pointer;
}

@media(min-width:500px){

article:nth-of-type(3){
flex-direction:row;
justify-content: space-around;
align-items:center;
}

dl{
width:70%;
  }

}
`, "",{"version":3,"sources":["webpack://./input/styling/main.css"],"names":[],"mappings":"AAAA;AACA,UAAU;AACV,SAAS;AACT,qBAAqB;AACrB;;AAEA;AACA,cAAc;AACd,cAAc;AACd;;AAEA;AACA,YAAY;AACZ;;;AAGA;AACA,WAAW;AACX,oCAAoC;AACpC;AACA;;AAEA,iBAAiB;AACjB,sBAAsB;AACtB,kBAAkB;AAClB,OAAO;AACP;;AAEA;AACA;AACA;;AAEA;AACA,iBAAiB;AACjB,iBAAiB;;;AAGjB;;;AAGA;AACA,mBAAmB;AACnB,wBAAwB;AACxB,iBAAiB;AACjB;;AAEA;AACA,WAAW;;AAEX;;AAEA;AACA,iDAAiD;AACjD,yBAAyB;;AAEzB,aAAa;AACb,qBAAqB;AACrB,sBAAsB;AACtB,kBAAkB;AAClB,WAAW;AACX,kBAAkB;AAClB,UAAU;AACV;;AAEA;AACA,YAAY;AACZ,sBAAsB;AACtB,kBAAkB;AAClB,sBAAsB;;;AAGtB;;AAEA;AACA,YAAY;AACZ,qBAAqB;AACrB,sBAAsB;AACtB,kBAAkB;AAClB,iBAAiB;AACjB,UAAU;AACV,iBAAiB;AACjB,wBAAwB;AACxB;;AAEA;AACA,qBAAqB;AACrB,oBAAoB;AACpB,sBAAsB;AACtB;AACA;;AAEA;AACA,6BAA6B;AAC7B,mBAAmB;AACnB,8BAA8B;AAC9B,WAAW;AACX,iBAAiB;AACjB;;AAEA;AACA,6BAA6B;AAC7B,mBAAmB;AACnB,8BAA8B;AAC9B,eAAe;AACf;;AAEA;;AAEA;AACA,kBAAkB;AAClB,6BAA6B;AAC7B,kBAAkB;AAClB;;AAEA;AACA,SAAS;EACP;;AAEF","sourcesContent":["*{\npadding: 0;\nmargin: 0;\nbox-sizing:border-box;\n}\n\n:root{\n--black: black;\n--white: white;\n}\n\narticle:nth-of-type(3),form{\ndisplay:flex;\n}\n\n\nheader{\npadding:2px;\nborder-bottom:2px solid var(--black);\n}\nform{\n\ntext-align:center;\njustify-content:center;\nalign-items:center;\ngap:1vw;\n}\n\nform > *{\ndisplay:block\n}\n\narticle:nth-of-type(3) div > p:first-of-type{\nfont-weight: bold;\nfont-size: 1.5rem;\n\n\n}\n\n\nbody{\ncolor: var(--black);\nbackground-color:#F7DFDF;\ntext-align:center;\n}\n\nmain{\npadding:2px;\n\n}\n\narticle{\nbackground-image:linear-gradient(#FFB6C1,#FF778B);\nbackground-color: #FFB6C1;\n\ndisplay: flex;\nflex-direction:column;\njustify-content:center;\nalign-items:center;\npadding:5px;\nborder-radius:10px;\nmargin:2px;\n}\n\narticle:nth-of-type(3) div{\ndisplay:flex;\njustify-content:center;\nalign-items:center;\nflex-direction: column;\n\n\n}\n\ndl{\ndisplay:flex;\nflex-direction:column;\njustify-content:center;\nalign-items:center;\ntext-align:center;\nwidth:75vw;\nborder-radius:6px;\nbackground-color:#FD8888;\n}\n\narticle:nth-of-type(3){\nflex-direction:column;\njustify-items:center;\njustify-content:center;\ngap:4px\n}\n \nbutton{\nborder:2px solid var(--black);\ncolor: var(--black);\nbackground-color: var(--white);\npadding:3px;\nborder-radius:4px;\n}\n\nbutton:hover{\nborder:2px solid var(--white);\ncolor: var(--white);\nbackground-color: var(--black);\ncursor: pointer;\n}\n\n@media(min-width:500px){\n\narticle:nth-of-type(3){\nflex-direction:row;\njustify-content: space-around;\nalign-items:center;\n}\n\ndl{\nwidth:70%;\n  }\n\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./input/styling/main.css":
/*!********************************!*\
  !*** ./input/styling/main.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js!./input/styling/main.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./input/fileImporter.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _functionality_getLocation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functionality/getLocation.js */ "./input/functionality/getLocation.js");
/* harmony import */ var _functionality_displayFollowingDays_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functionality/displayFollowingDays.js */ "./input/functionality/displayFollowingDays.js");
/* harmony import */ var _functionality_search_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./functionality/search.js */ "./input/functionality/search.js");
/* harmony import */ var _functionality_weather_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./functionality/weather.js */ "./input/functionality/weather.js");
/* harmony import */ var _functionality_date_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./functionality/date.js */ "./input/functionality/date.js");
/* harmony import */ var _functionality_switchToFahreinheit_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./functionality/switchToFahreinheit.js */ "./input/functionality/switchToFahreinheit.js");
/* harmony import */ var _styling_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./styling/main.css */ "./input/styling/main.css");
window.mode = 'c';










})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDYkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ3VDO0FBQ1U7QUFDZDtBQUNDO0FBQ0g7QUFDZTs7O0FBR3BCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS8uL2lucHV0L2Z1bmN0aW9uYWxpdHkvZGF0ZS5qcyIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpLy4vaW5wdXQvZnVuY3Rpb25hbGl0eS9kaXNwbGF5LmpzIiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvLi9pbnB1dC9mdW5jdGlvbmFsaXR5L2Rpc3BsYXlGb2xsb3dpbmdEYXlzLmpzIiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvLi9pbnB1dC9mdW5jdGlvbmFsaXR5L2dldExvY2F0aW9uLmpzIiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvLi9pbnB1dC9mdW5jdGlvbmFsaXR5L3NlYXJjaC5qcyIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpLy4vaW5wdXQvZnVuY3Rpb25hbGl0eS9zd2l0Y2hUb0ZhaHJlaW5oZWl0LmpzIiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvLi9pbnB1dC9mdW5jdGlvbmFsaXR5L3dlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS8uL2lucHV0L3N0eWxpbmcvbWFpbi5jc3MiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvLi9pbnB1dC9zdHlsaW5nL21haW4uY3NzPzlkYzMiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpLy4vaW5wdXQvZmlsZUltcG9ydGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBnZXREYXRlRm9sbG93aW5nRGF5cygpIHtcbiAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKTtcblxuICBsZXQgZGF5MSA9IG5ldyBEYXRlKCk7XG4gIGRheTEuc2V0RGF0ZShuZXcgRGF0ZSgpLmdldERhdGUoKSArIDEpO1xuXG4gIGxldCBkYXkyID0gbmV3IERhdGUoKTtcbiAgZGF5Mi5zZXREYXRlKG5ldyBEYXRlKCkuZ2V0RGF0ZSgpICsgMik7XG5cblxuXG5cbiAgcmV0dXJuIHtcbiAgICBkYXkxOiBkYXkxLnRvTG9jYWxlU3RyaW5nKCdlbi11cycsIHsgd2Vla2RheTogJ2xvbmcnIH0pLFxuICAgIGRheTI6IGRheTIudG9Mb2NhbGVTdHJpbmcoJ2VuLXVzJywgeyB3ZWVrZGF5OiAnbG9uZycgfSksXG4gIH1cblxuXG59XG4iLCJleHBvcnQgZnVuY3Rpb24gZGlzcGxheVRlbXBlcmF0dXJlSW5IdG1sKGRheXNBbmRMb2NhdGlvbikge1xuICBjb25zb2xlLmxvZyhkYXlzQW5kTG9jYXRpb24pXG4gIGxldCBhbGxEZXNjcmlwdGlvbkxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdkZCcpXG4gIGZvciAobGV0IGRlc2NyaXB0aW9uIG9mIGFsbERlc2NyaXB0aW9uTGlzdCkge1xuICAgIGRpc3BsYXlEaWZmZW50RGVzY3JpcHRpb25EZXBlbmRpbmdPbkRheShkZXNjcmlwdGlvbiwgJ2F2Z2h1bWlkaXR5JywgJ2F2Z2h1bWlkaXR5JywgZGF5c0FuZExvY2F0aW9uKVxuICAgIGRpc3BsYXlEaWZmZW50RGVzY3JpcHRpb25EZXBlbmRpbmdPbkRheShkZXNjcmlwdGlvbiwgJ2F2Z3RlbXAnLCBgYXZndGVtcF8ke3dpbmRvdy5tb2RlfWAsIGRheXNBbmRMb2NhdGlvbilcbiAgICBkaXNwbGF5RGlmZmVudERlc2NyaXB0aW9uRGVwZW5kaW5nT25EYXkoZGVzY3JpcHRpb24sICdtaW50ZW1wJywgYG1pbnRlbXBfJHt3aW5kb3cubW9kZX1gLCBkYXlzQW5kTG9jYXRpb24pXG4gICAgZGlzcGxheURpZmZlbnREZXNjcmlwdGlvbkRlcGVuZGluZ09uRGF5KGRlc2NyaXB0aW9uLCAnbWF4dGVtcCcsIGBtYXh0ZW1wXyR7d2luZG93Lm1vZGV9YCwgZGF5c0FuZExvY2F0aW9uKVxuICB9XG4gIGZvcihsZXQgZmlndXJlIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2ZpZ3VyZScpKXtcbiAgICBsZXQgdGV4dCA9IGZpZ3VyZS5xdWVyeVNlbGVjdG9yKCdmaWdjYXB0aW9uJylcbiAgICBsZXQgaW1nID0gZmlndXJlLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpXG4gICAgZGlzcGxheURpZmZlbnREZXNjcmlwdGlvbkRlcGVuZGluZ09uRGF5KHRleHQsICdjb25kaXRpb250ZXh0JywgJ2NvbmRpdGlvblRleHQnLCBkYXlzQW5kTG9jYXRpb24pXG4gICAgZGlzcGxheURpZmZlbnREZXNjcmlwdGlvbkRlcGVuZGluZ09uRGF5KGltZywgJ2NvbmRpdGlvbmltYWdlJywgJ2NvbmRpdGlvbkljb24nLCBkYXlzQW5kTG9jYXRpb24sIHRydWUpXG4gIH1cbn1cblxuZnVuY3Rpb24gZGlzcGxheURpZmZlbnREZXNjcmlwdGlvbkRlcGVuZGluZ09uRGF5KGRlc2NyaXB0aW9uLCB0eXBlT2ZEYXRhLCB0eXBlT2ZQcm9wZXJ0eSwgZGF5cywgaXNBbkltYWdlID0gZmFsc2UpIHtcbiAgbGV0IFtkYXkxLCBkYXkyLCBkYXkzXSA9IGRheXM7XG5cbiAgc3dpdGNoIChkZXNjcmlwdGlvbi5kYXRhc2V0W2Ake3R5cGVPZkRhdGF9YF0pIHtcbiAgICBjYXNlICdkYXkxJzpcbiAgICAgIGlmIChpc0FuSW1hZ2UpIHtcbiAgICAgICAgZGVzY3JpcHRpb24uc3JjID0gYGh0dHA6JHtkYXkxW2Ake3R5cGVPZlByb3BlcnR5fWBdfWA7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZGVzY3JpcHRpb24uaW5uZXJUZXh0ID0gZGF5MVtgJHt0eXBlT2ZQcm9wZXJ0eX1gXTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2RheTInOlxuICAgICAgaWYgKGlzQW5JbWFnZSkge1xuICAgICAgICBkZXNjcmlwdGlvbi5zcmMgPSBgaHR0cDoke2RheTJbYCR7dHlwZU9mUHJvcGVydHl9YF19YDtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBkZXNjcmlwdGlvbi5pbm5lclRleHQgPSBkYXkyW2Ake3R5cGVPZlByb3BlcnR5fWBdO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZGF5Myc6XG4gICAgICBpZiAoaXNBbkltYWdlKSB7XG4gICAgICAgIGRlc2NyaXB0aW9uLnNyYyA9IGBodHRwOiR7ZGF5M1tgJHt0eXBlT2ZQcm9wZXJ0eX1gXX1gO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGRlc2NyaXB0aW9uLmlubmVyVGV4dCA9IGRheTNbYCR7dHlwZU9mUHJvcGVydHl9YF07XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxuXG59XG5cblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5TG9jYXRpb25BbmRDdXJyZW50VGVtcGVyYXR1cmUoWywsLGxvY2F0aW9uLHRlbXBlcmF0dXJlXSl7XG5sZXQgY3VycmVudExvY2F0aW9uID0gbG9jYXRpb24ubG9jYXRpb25cblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXJ0aWNsZSBwIHNwYW4nKS5pbm5lclRleHQgPSBjdXJyZW50TG9jYXRpb247XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VycmVudFRlbXAnKS5pbm5lclRleHQgPSB0ZW1wZXJhdHVyZVtgdGVtcF8ke3dpbmRvdy5tb2RlfWBdO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RlbXBGZWVsaW5nJykuaW5uZXJUZXh0ID0gdGVtcGVyYXR1cmVbYGZlZWxzbGlrZV8ke3dpbmRvdy5tb2RlfWBdO1xufVxuXG4iLCJpbXBvcnQgeyBnZXREYXRlRm9sbG93aW5nRGF5cyB9IGZyb20gJy4vZGF0ZS5qcydcblxuZnVuY3Rpb24gZGlzcGxheUZvbGxvd2luZ0RheXMoKSB7XG5cbiAgY29uc3QgZGF5MSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FydGljbGU6bnRoLW9mLXR5cGUoMykgZGl2IHAnKVxuICBjb25zdCBkYXkyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXJ0aWNsZTpudGgtb2YtdHlwZSgzKSBkaXY6bnRoLW9mLXR5cGUoMikgcCcpXG4gIGxldCBmb2xsb3dpbmdEYXlzID0gZ2V0RGF0ZUZvbGxvd2luZ0RheXMoKVxuICBkYXkxLmlubmVySFRNTCA9IGAke2ZvbGxvd2luZ0RheXMuZGF5MX06IDxzcGFuPjwvc3Bhbj5gXG4gIGRheTIuaW5uZXJIVE1MID0gYCR7Zm9sbG93aW5nRGF5cy5kYXkyfTogPHNwYW4+PC9zcGFuPmBcbn1cblxuZGlzcGxheUZvbGxvd2luZ0RheXMoKVxuIiwiaW1wb3J0IHsgdXBkYXRlRm9yZWNhc3QgfSBmcm9tIFwiLi9zZWFyY2guanNcIlxuXG5jb25zdCB1cmwgPSBuZXcgVVJMKGBodHRwczovL2dlb2xvY2F0aW9uLWRiLmNvbS9qc29uL2ApXG5jb25zdCBvcHRpb25zID0ge1xubWV0aG9kOiAnR0VUJyxcbm1vZGU6ICdjb3JzJyxcbnJlZmVycmVyUG9saWN5OiAnbm8tcmVmZXJyZXInXG59XG5cbmxldCByZXF1ZXN0ID0gIG5ldyBSZXF1ZXN0KHVybCxvcHRpb25zKVxuXG5nZXRVc2VyRGF0YVRvRGlzcGxheVdlYXRoZXIoKVxuXG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyRGF0YVRvRGlzcGxheVdlYXRoZXIoKSB7XG4gIGxldCBjb3VudHJ5ID0gYXdhaXQgZmV0Y2gocmVxdWVzdClcbiAgICBcbiAgICAudGhlbihjaGVja0lmUmVzcG9uc2VJc1ZhbGlkQW5kUmV0dXJuSnNvbilcbiAgICAudGhlbihyZXR1cm5Mb2NhdGlvbilcbiAgICAuY2F0Y2goYXNzaW5nTG9uZG9uQXNDb3VudHJ5QW5kU2hvd0Vycm9yKVxuXG4gIGFkZFZhbHVlVG9UaGVTZWFyY2hJbnB1dEFuZFVwZGF0ZUZvcmVjYXN0KGNvdW50cnkpXG59XG5cblxuZnVuY3Rpb24gY2hlY2tJZlJlc3BvbnNlSXNWYWxpZEFuZFJldHVybkpzb24ocmVzcG9uc2UpIHtcbiAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxuICB9XG4gIGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihgZGlkbid0IGdldCByZXNwb25zZWApXG4gIH1cbn1cblxuZnVuY3Rpb24gcmV0dXJuTG9jYXRpb24oeyBjb3VudHJ5X25hbWU6IGNvdW50cnksIHN0YXRlIH0pIHtcbiAgcmV0dXJuIGAke3N0YXRlfSAtICR7Y291bnRyeX1gO1xufVxuXG5mdW5jdGlvbiBhc3NpbmdMb25kb25Bc0NvdW50cnlBbmRTaG93RXJyb3IoKSB7XG4gIHJldHVybiAnTG9uZG9uIC0gVW5pdGVkIEtpbmdkb20nXG59XG5cbmZ1bmN0aW9uIGFkZFZhbHVlVG9UaGVTZWFyY2hJbnB1dEFuZFVwZGF0ZUZvcmVjYXN0KGNpdHkpIHtcbiAgbGV0IHNlYXJjaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2NhdGlvblNlYXJjaCcpXG4gIHNlYXJjaC52YWx1ZSA9IGNpdHk7XG4gIHVwZGF0ZUZvcmVjYXN0KClcbn1cbiIsImltcG9ydCB7IGdldFdlYXRoZXIgfSBmcm9tICcuL3dlYXRoZXIuanMnO1xuaW1wb3J0IHsgZGlzcGxheVRlbXBlcmF0dXJlSW5IdG1sLCBkaXNwbGF5TG9jYXRpb25BbmRDdXJyZW50VGVtcGVyYXR1cmUgfSBmcm9tICcuL2Rpc3BsYXkuanMnO1xuXG5jb25zdCBrZXkgPSAnNjFiNmI4YjhjMDcxNDBiMzhiNjExNDUzODIzMjEwOSc7XG5cbmxldCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBmb3JtIGJ1dHRvbmApO1xuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdXBkYXRlRm9yZWNhc3QpO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBmb3JtIGlucHV0W3R5cGU9J3NlYXJjaCddYCkudmFsdWUgPSAnbG9uZG9uJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUZvcmVjYXN0KCkge1xuICBsZXQgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBmb3JtIGlucHV0W3R5cGU9J3NlYXJjaCddYClcbiAgbGV0IHNlYXJjaFZhbHVlID0gc2VhcmNoSW5wdXQudmFsdWU7XG5cbiAgY29uc3QgaGVhZGVyID0ge1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgbW9kZTogJ2NvcnMnLFxuICAgIHJlZmVycmVyUG9saWN5OiAnbm8tcmVmZXJyZXInXG4gIH1cblxuXG4gIGxldCB3ZWF0aGVyVXJsID0gbmV3IFVSTChgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbmApO1xuXG4gIGxldCBxdWVyaWVzID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3ZWF0aGVyVXJsLnNlYXJjaCk7XG4gIHF1ZXJpZXMuYXBwZW5kKCdrZXknLCBrZXkpXG4gIHF1ZXJpZXMuYXBwZW5kKCdxJywgYCR7c2VhcmNoVmFsdWV9YClcbiAgcXVlcmllcy5hcHBlbmQoJ2RheXMnLCBgM2ApXG4gIHF1ZXJpZXMuYXBwZW5kKCdhcWknLCBgbm9gKVxuICBxdWVyaWVzLmFwcGVuZCgnYWxlcnRzJywgYG5vYClcbiAgd2VhdGhlclVybC5zZWFyY2ggPSBxdWVyaWVzO1xuXG4gIGxldCB3ZWF0aGVyUmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHdlYXRoZXJVcmwsIGhlYWRlcik7XG4gIGNvbnNvbGUubG9nKHdlYXRoZXJSZXF1ZXN0KVxuICB3aW5kb3cuZm9yZWNhc3REYXRhID0gYXdhaXQgZ2V0V2VhdGhlcih3ZWF0aGVyUmVxdWVzdClcbiAgZGlzcGxheVRlbXBlcmF0dXJlSW5IdG1sKGZvcmVjYXN0RGF0YSlcbiAgZGlzcGxheUxvY2F0aW9uQW5kQ3VycmVudFRlbXBlcmF0dXJlKGZvcmVjYXN0RGF0YSlcbiAgc2VhcmNoSW5wdXQudmFsdWUgPSAnJztcbn1cbiIsImltcG9ydCB7IGRpc3BsYXlUZW1wZXJhdHVyZUluSHRtbCxkaXNwbGF5TG9jYXRpb25BbmRDdXJyZW50VGVtcGVyYXR1cmUgfSBmcm9tICcuL2Rpc3BsYXkuanMnO1xuXG5sZXQgc3dpdGNoQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXJ0aWNsZTpudGgtb2YtdHlwZSgyKSBidXR0b24nKTtcbnN3aXRjaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN3aXRjaFRvRmFocmVpbmhlaXQpXG5cbmZ1bmN0aW9uIHN3aXRjaFRvRmFocmVpbmhlaXQoKSB7XG4gIGlmICh3aW5kb3cubW9kZSA9PSAnYycpIHtcbiAgICB3aW5kb3cubW9kZSA9ICdmJztcbiAgICBzd2l0Y2hCdXR0b24uaW5uZXJUZXh0ID0gJ1N3aXRjaCBUbyBDZWxzaXVzJztcbiAgfVxuICBlbHNlIHtcbiAgICB3aW5kb3cubW9kZSA9ICdjJztcbiAgICBzd2l0Y2hCdXR0b24uaW5uZXJUZXh0ID0gJ1N3aXRjaCBUbyBGYWhyZWluaGVpdCc7XG4gIH1cbiAgZGlzcGxheVRlbXBlcmF0dXJlSW5IdG1sKGZvcmVjYXN0RGF0YSk7XG4gIGRpc3BsYXlMb2NhdGlvbkFuZEN1cnJlbnRUZW1wZXJhdHVyZShmb3JlY2FzdERhdGEpXG59XG4iLCJcblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXZWF0aGVyKHdlYXRoZXJSZXF1ZXN0KSB7XG5cbiAgcmV0dXJuIGZldGNoKHdlYXRoZXJSZXF1ZXN0KS50aGVuKHRlc3RJZml0V29ya3MpLnRoZW4oZ2V0SlNPTkRhdGFBbmRNYWtlQVVzZWZ1bE9iamVjdCkuY2F0Y2goKGVycm9yKSA9PiBjb25zb2xlLmxvZyhlcnJvcikpXG5cbiAgZnVuY3Rpb24gdGVzdElmaXRXb3JrcyhyZXNwb25zZSkge1xuICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxuICAgIH1cbiAgfVxuXG5cbiAgZnVuY3Rpb24gZ2V0SlNPTkRhdGFBbmRNYWtlQVVzZWZ1bE9iamVjdChqc29uUmVzcG9uc2UpIHtcbiAgICBsZXQgZm9yZWNhc3QgPSBqc29uUmVzcG9uc2UuZm9yZWNhc3QuZm9yZWNhc3RkYXlcbiAgICBsZXQgdXNlZnVsT2JqZWN0RGF0YSA9IGZvcmVjYXN0Lm1hcChvYmplY3QgPT4ge1xuICAgICAgbGV0IGRheURhdGEgPSBvYmplY3QuZGF5XG4gICAgICBsZXQgeyBhdmdodW1pZGl0eSwgYXZndGVtcF9jLCBhdmd0ZW1wX2YsIG1heHRlbXBfYywgbWF4dGVtcF9mLCBtaW50ZW1wX2MsIG1pbnRlbXBfZiwgY29uZGl0aW9uOiB7IHRleHQ6IGNvbmRpdGlvblRleHQsIGljb246IGNvbmRpdGlvbkljb24gfSB9ID0gZGF5RGF0YVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYXZnaHVtaWRpdHksIGF2Z3RlbXBfYywgYXZndGVtcF9mLCBtYXh0ZW1wX2MsIG1heHRlbXBfZiwgbWludGVtcF9jLCBtaW50ZW1wX2YsIGNvbmRpdGlvblRleHQsIGNvbmRpdGlvbkljb25cbiAgICAgIH1cbiAgICB9KVxuICAgIGxldCB7IHRlbXBfYywgdGVtcF9mLCBmZWVsc2xpa2VfYywgZmVlbHNsaWtlX2YgfSA9IGpzb25SZXNwb25zZS5jdXJyZW50XG4gICAgcmV0dXJuIFsuLi51c2VmdWxPYmplY3REYXRhLCB7IFwibG9jYXRpb25cIjogYCR7anNvblJlc3BvbnNlLmxvY2F0aW9uLm5hbWV9IC0gJHtqc29uUmVzcG9uc2UubG9jYXRpb24uY291bnRyeX1gIH0sIHsgdGVtcF9jLCB0ZW1wX2YsIGZlZWxzbGlrZV9jLCBmZWVsc2xpa2VfZiB9XTtcbiAgfVxuXG59XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgKntcbnBhZGRpbmc6IDA7XG5tYXJnaW46IDA7XG5ib3gtc2l6aW5nOmJvcmRlci1ib3g7XG59XG5cbjpyb290e1xuLS1ibGFjazogYmxhY2s7XG4tLXdoaXRlOiB3aGl0ZTtcbn1cblxuYXJ0aWNsZTpudGgtb2YtdHlwZSgzKSxmb3Jte1xuZGlzcGxheTpmbGV4O1xufVxuXG5cbmhlYWRlcntcbnBhZGRpbmc6MnB4O1xuYm9yZGVyLWJvdHRvbToycHggc29saWQgdmFyKC0tYmxhY2spO1xufVxuZm9ybXtcblxudGV4dC1hbGlnbjpjZW50ZXI7XG5qdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xuYWxpZ24taXRlbXM6Y2VudGVyO1xuZ2FwOjF2dztcbn1cblxuZm9ybSA+ICp7XG5kaXNwbGF5OmJsb2NrXG59XG5cbmFydGljbGU6bnRoLW9mLXR5cGUoMykgZGl2ID4gcDpmaXJzdC1vZi10eXBle1xuZm9udC13ZWlnaHQ6IGJvbGQ7XG5mb250LXNpemU6IDEuNXJlbTtcblxuXG59XG5cblxuYm9keXtcbmNvbG9yOiB2YXIoLS1ibGFjayk7XG5iYWNrZ3JvdW5kLWNvbG9yOiNGN0RGREY7XG50ZXh0LWFsaWduOmNlbnRlcjtcbn1cblxubWFpbntcbnBhZGRpbmc6MnB4O1xuXG59XG5cbmFydGljbGV7XG5iYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCgjRkZCNkMxLCNGRjc3OEIpO1xuYmFja2dyb3VuZC1jb2xvcjogI0ZGQjZDMTtcblxuZGlzcGxheTogZmxleDtcbmZsZXgtZGlyZWN0aW9uOmNvbHVtbjtcbmp1c3RpZnktY29udGVudDpjZW50ZXI7XG5hbGlnbi1pdGVtczpjZW50ZXI7XG5wYWRkaW5nOjVweDtcbmJvcmRlci1yYWRpdXM6MTBweDtcbm1hcmdpbjoycHg7XG59XG5cbmFydGljbGU6bnRoLW9mLXR5cGUoMykgZGl2e1xuZGlzcGxheTpmbGV4O1xuanVzdGlmeS1jb250ZW50OmNlbnRlcjtcbmFsaWduLWl0ZW1zOmNlbnRlcjtcbmZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cblxufVxuXG5kbHtcbmRpc3BsYXk6ZmxleDtcbmZsZXgtZGlyZWN0aW9uOmNvbHVtbjtcbmp1c3RpZnktY29udGVudDpjZW50ZXI7XG5hbGlnbi1pdGVtczpjZW50ZXI7XG50ZXh0LWFsaWduOmNlbnRlcjtcbndpZHRoOjc1dnc7XG5ib3JkZXItcmFkaXVzOjZweDtcbmJhY2tncm91bmQtY29sb3I6I0ZEODg4ODtcbn1cblxuYXJ0aWNsZTpudGgtb2YtdHlwZSgzKXtcbmZsZXgtZGlyZWN0aW9uOmNvbHVtbjtcbmp1c3RpZnktaXRlbXM6Y2VudGVyO1xuanVzdGlmeS1jb250ZW50OmNlbnRlcjtcbmdhcDo0cHhcbn1cbiBcbmJ1dHRvbntcbmJvcmRlcjoycHggc29saWQgdmFyKC0tYmxhY2spO1xuY29sb3I6IHZhcigtLWJsYWNrKTtcbmJhY2tncm91bmQtY29sb3I6IHZhcigtLXdoaXRlKTtcbnBhZGRpbmc6M3B4O1xuYm9yZGVyLXJhZGl1czo0cHg7XG59XG5cbmJ1dHRvbjpob3ZlcntcbmJvcmRlcjoycHggc29saWQgdmFyKC0td2hpdGUpO1xuY29sb3I6IHZhcigtLXdoaXRlKTtcbmJhY2tncm91bmQtY29sb3I6IHZhcigtLWJsYWNrKTtcbmN1cnNvcjogcG9pbnRlcjtcbn1cblxuQG1lZGlhKG1pbi13aWR0aDo1MDBweCl7XG5cbmFydGljbGU6bnRoLW9mLXR5cGUoMyl7XG5mbGV4LWRpcmVjdGlvbjpyb3c7XG5qdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbmFsaWduLWl0ZW1zOmNlbnRlcjtcbn1cblxuZGx7XG53aWR0aDo3MCU7XG4gIH1cblxufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9pbnB1dC9zdHlsaW5nL21haW4uY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0FBQ0EsVUFBVTtBQUNWLFNBQVM7QUFDVCxxQkFBcUI7QUFDckI7O0FBRUE7QUFDQSxjQUFjO0FBQ2QsY0FBYztBQUNkOztBQUVBO0FBQ0EsWUFBWTtBQUNaOzs7QUFHQTtBQUNBLFdBQVc7QUFDWCxvQ0FBb0M7QUFDcEM7QUFDQTs7QUFFQSxpQkFBaUI7QUFDakIsc0JBQXNCO0FBQ3RCLGtCQUFrQjtBQUNsQixPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCO0FBQ2pCLGlCQUFpQjs7O0FBR2pCOzs7QUFHQTtBQUNBLG1CQUFtQjtBQUNuQix3QkFBd0I7QUFDeEIsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0EsV0FBVzs7QUFFWDs7QUFFQTtBQUNBLGlEQUFpRDtBQUNqRCx5QkFBeUI7O0FBRXpCLGFBQWE7QUFDYixxQkFBcUI7QUFDckIsc0JBQXNCO0FBQ3RCLGtCQUFrQjtBQUNsQixXQUFXO0FBQ1gsa0JBQWtCO0FBQ2xCLFVBQVU7QUFDVjs7QUFFQTtBQUNBLFlBQVk7QUFDWixzQkFBc0I7QUFDdEIsa0JBQWtCO0FBQ2xCLHNCQUFzQjs7O0FBR3RCOztBQUVBO0FBQ0EsWUFBWTtBQUNaLHFCQUFxQjtBQUNyQixzQkFBc0I7QUFDdEIsa0JBQWtCO0FBQ2xCLGlCQUFpQjtBQUNqQixVQUFVO0FBQ1YsaUJBQWlCO0FBQ2pCLHdCQUF3QjtBQUN4Qjs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQixvQkFBb0I7QUFDcEIsc0JBQXNCO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkI7QUFDN0IsbUJBQW1CO0FBQ25CLDhCQUE4QjtBQUM5QixXQUFXO0FBQ1gsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0EsNkJBQTZCO0FBQzdCLG1CQUFtQjtBQUNuQiw4QkFBOEI7QUFDOUIsZUFBZTtBQUNmOztBQUVBOztBQUVBO0FBQ0Esa0JBQWtCO0FBQ2xCLDZCQUE2QjtBQUM3QixrQkFBa0I7QUFDbEI7O0FBRUE7QUFDQSxTQUFTO0VBQ1A7O0FBRUZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKntcXG5wYWRkaW5nOiAwO1xcbm1hcmdpbjogMDtcXG5ib3gtc2l6aW5nOmJvcmRlci1ib3g7XFxufVxcblxcbjpyb290e1xcbi0tYmxhY2s6IGJsYWNrO1xcbi0td2hpdGU6IHdoaXRlO1xcbn1cXG5cXG5hcnRpY2xlOm50aC1vZi10eXBlKDMpLGZvcm17XFxuZGlzcGxheTpmbGV4O1xcbn1cXG5cXG5cXG5oZWFkZXJ7XFxucGFkZGluZzoycHg7XFxuYm9yZGVyLWJvdHRvbToycHggc29saWQgdmFyKC0tYmxhY2spO1xcbn1cXG5mb3Jte1xcblxcbnRleHQtYWxpZ246Y2VudGVyO1xcbmp1c3RpZnktY29udGVudDpjZW50ZXI7XFxuYWxpZ24taXRlbXM6Y2VudGVyO1xcbmdhcDoxdnc7XFxufVxcblxcbmZvcm0gPiAqe1xcbmRpc3BsYXk6YmxvY2tcXG59XFxuXFxuYXJ0aWNsZTpudGgtb2YtdHlwZSgzKSBkaXYgPiBwOmZpcnN0LW9mLXR5cGV7XFxuZm9udC13ZWlnaHQ6IGJvbGQ7XFxuZm9udC1zaXplOiAxLjVyZW07XFxuXFxuXFxufVxcblxcblxcbmJvZHl7XFxuY29sb3I6IHZhcigtLWJsYWNrKTtcXG5iYWNrZ3JvdW5kLWNvbG9yOiNGN0RGREY7XFxudGV4dC1hbGlnbjpjZW50ZXI7XFxufVxcblxcbm1haW57XFxucGFkZGluZzoycHg7XFxuXFxufVxcblxcbmFydGljbGV7XFxuYmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQoI0ZGQjZDMSwjRkY3NzhCKTtcXG5iYWNrZ3JvdW5kLWNvbG9yOiAjRkZCNkMxO1xcblxcbmRpc3BsYXk6IGZsZXg7XFxuZmxleC1kaXJlY3Rpb246Y29sdW1uO1xcbmp1c3RpZnktY29udGVudDpjZW50ZXI7XFxuYWxpZ24taXRlbXM6Y2VudGVyO1xcbnBhZGRpbmc6NXB4O1xcbmJvcmRlci1yYWRpdXM6MTBweDtcXG5tYXJnaW46MnB4O1xcbn1cXG5cXG5hcnRpY2xlOm50aC1vZi10eXBlKDMpIGRpdntcXG5kaXNwbGF5OmZsZXg7XFxuanVzdGlmeS1jb250ZW50OmNlbnRlcjtcXG5hbGlnbi1pdGVtczpjZW50ZXI7XFxuZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG5cXG5cXG59XFxuXFxuZGx7XFxuZGlzcGxheTpmbGV4O1xcbmZsZXgtZGlyZWN0aW9uOmNvbHVtbjtcXG5qdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xcbmFsaWduLWl0ZW1zOmNlbnRlcjtcXG50ZXh0LWFsaWduOmNlbnRlcjtcXG53aWR0aDo3NXZ3O1xcbmJvcmRlci1yYWRpdXM6NnB4O1xcbmJhY2tncm91bmQtY29sb3I6I0ZEODg4ODtcXG59XFxuXFxuYXJ0aWNsZTpudGgtb2YtdHlwZSgzKXtcXG5mbGV4LWRpcmVjdGlvbjpjb2x1bW47XFxuanVzdGlmeS1pdGVtczpjZW50ZXI7XFxuanVzdGlmeS1jb250ZW50OmNlbnRlcjtcXG5nYXA6NHB4XFxufVxcbiBcXG5idXR0b257XFxuYm9yZGVyOjJweCBzb2xpZCB2YXIoLS1ibGFjayk7XFxuY29sb3I6IHZhcigtLWJsYWNrKTtcXG5iYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS13aGl0ZSk7XFxucGFkZGluZzozcHg7XFxuYm9yZGVyLXJhZGl1czo0cHg7XFxufVxcblxcbmJ1dHRvbjpob3ZlcntcXG5ib3JkZXI6MnB4IHNvbGlkIHZhcigtLXdoaXRlKTtcXG5jb2xvcjogdmFyKC0td2hpdGUpO1xcbmJhY2tncm91bmQtY29sb3I6IHZhcigtLWJsYWNrKTtcXG5jdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbkBtZWRpYShtaW4td2lkdGg6NTAwcHgpe1xcblxcbmFydGljbGU6bnRoLW9mLXR5cGUoMyl7XFxuZmxleC1kaXJlY3Rpb246cm93O1xcbmp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbmFsaWduLWl0ZW1zOmNlbnRlcjtcXG59XFxuXFxuZGx7XFxud2lkdGg6NzAlO1xcbiAgfVxcblxcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tYWluLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWFpbi5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIndpbmRvdy5tb2RlID0gJ2MnO1xuaW1wb3J0ICcuL2Z1bmN0aW9uYWxpdHkvZ2V0TG9jYXRpb24uanMnXG5pbXBvcnQgJy4vZnVuY3Rpb25hbGl0eS9kaXNwbGF5Rm9sbG93aW5nRGF5cy5qcyc7XG5pbXBvcnQgJy4vZnVuY3Rpb25hbGl0eS9zZWFyY2guanMnO1xuaW1wb3J0ICcuL2Z1bmN0aW9uYWxpdHkvd2VhdGhlci5qcyc7XG5pbXBvcnQgJy4vZnVuY3Rpb25hbGl0eS9kYXRlLmpzJztcbmltcG9ydCAnLi9mdW5jdGlvbmFsaXR5L3N3aXRjaFRvRmFocmVpbmhlaXQuanMnO1xuXG5cbmltcG9ydCAnLi9zdHlsaW5nL21haW4uY3NzJztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==