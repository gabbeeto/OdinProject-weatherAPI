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
/* harmony export */   displayLocation: () => (/* binding */ displayLocation),
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




function displayLocation([,,,location]){
let currentLocation = location.location
document.querySelector('article p span').innerText = currentLocation;
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


const url = new URL(`http://geolocation-db.com/json/`)
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
  let header = new Headers()
  header.append('mode', 'cors');
  header.append('method', 'GET');


  let weatherUrl = new URL(`http://api.weatherapi.com/v1/forecast.json`);

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
  ;(0,_display_js__WEBPACK_IMPORTED_MODULE_1__.displayLocation)(forecastData)
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
      let { avghumidity, avgtemp_c, avgtemp_f, maxtemp_c, maxtemp_f, mintemp_c, mintemp_f, condition: { text: conditionText,icon:conditionIcon } } = dayData
      return {
        avghumidity, avgtemp_c, avgtemp_f, maxtemp_c, maxtemp_f, mintemp_c, mintemp_f, conditionText,conditionIcon
      }
    })

    return [...usefulObjectData,{"location":`${jsonResponse.location.name} - ${jsonResponse.location.country}`}];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUN1QztBQUNVO0FBQ2Q7QUFDQztBQUNIO0FBQ2U7OztBQUdwQiIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvLi9pbnB1dC9mdW5jdGlvbmFsaXR5L2RhdGUuanMiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS8uL2lucHV0L2Z1bmN0aW9uYWxpdHkvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpLy4vaW5wdXQvZnVuY3Rpb25hbGl0eS9kaXNwbGF5Rm9sbG93aW5nRGF5cy5qcyIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpLy4vaW5wdXQvZnVuY3Rpb25hbGl0eS9nZXRMb2NhdGlvbi5qcyIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpLy4vaW5wdXQvZnVuY3Rpb25hbGl0eS9zZWFyY2guanMiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS8uL2lucHV0L2Z1bmN0aW9uYWxpdHkvc3dpdGNoVG9GYWhyZWluaGVpdC5qcyIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpLy4vaW5wdXQvZnVuY3Rpb25hbGl0eS93ZWF0aGVyLmpzIiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvLi9pbnB1dC9zdHlsaW5nL21haW4uY3NzIiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpLy4vaW5wdXQvc3R5bGluZy9tYWluLmNzcz85ZGMzIiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS8uL2lucHV0L2ZpbGVJbXBvcnRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gZ2V0RGF0ZUZvbGxvd2luZ0RheXMoKSB7XG4gIGxldCB0b2RheSA9IG5ldyBEYXRlKCk7XG5cbiAgbGV0IGRheTEgPSBuZXcgRGF0ZSgpO1xuICBkYXkxLnNldERhdGUobmV3IERhdGUoKS5nZXREYXRlKCkgKyAxKTtcblxuICBsZXQgZGF5MiA9IG5ldyBEYXRlKCk7XG4gIGRheTIuc2V0RGF0ZShuZXcgRGF0ZSgpLmdldERhdGUoKSArIDIpO1xuXG5cblxuXG4gIHJldHVybiB7XG4gICAgZGF5MTogZGF5MS50b0xvY2FsZVN0cmluZygnZW4tdXMnLCB7IHdlZWtkYXk6ICdsb25nJyB9KSxcbiAgICBkYXkyOiBkYXkyLnRvTG9jYWxlU3RyaW5nKCdlbi11cycsIHsgd2Vla2RheTogJ2xvbmcnIH0pLFxuICB9XG5cblxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlUZW1wZXJhdHVyZUluSHRtbChkYXlzQW5kTG9jYXRpb24pIHtcbiAgY29uc29sZS5sb2coZGF5c0FuZExvY2F0aW9uKVxuICBsZXQgYWxsRGVzY3JpcHRpb25MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZGQnKVxuICBmb3IgKGxldCBkZXNjcmlwdGlvbiBvZiBhbGxEZXNjcmlwdGlvbkxpc3QpIHtcbiAgICBkaXNwbGF5RGlmZmVudERlc2NyaXB0aW9uRGVwZW5kaW5nT25EYXkoZGVzY3JpcHRpb24sICdhdmdodW1pZGl0eScsICdhdmdodW1pZGl0eScsIGRheXNBbmRMb2NhdGlvbilcbiAgICBkaXNwbGF5RGlmZmVudERlc2NyaXB0aW9uRGVwZW5kaW5nT25EYXkoZGVzY3JpcHRpb24sICdhdmd0ZW1wJywgYGF2Z3RlbXBfJHt3aW5kb3cubW9kZX1gLCBkYXlzQW5kTG9jYXRpb24pXG4gICAgZGlzcGxheURpZmZlbnREZXNjcmlwdGlvbkRlcGVuZGluZ09uRGF5KGRlc2NyaXB0aW9uLCAnbWludGVtcCcsIGBtaW50ZW1wXyR7d2luZG93Lm1vZGV9YCwgZGF5c0FuZExvY2F0aW9uKVxuICAgIGRpc3BsYXlEaWZmZW50RGVzY3JpcHRpb25EZXBlbmRpbmdPbkRheShkZXNjcmlwdGlvbiwgJ21heHRlbXAnLCBgbWF4dGVtcF8ke3dpbmRvdy5tb2RlfWAsIGRheXNBbmRMb2NhdGlvbilcbiAgfVxuICBmb3IobGV0IGZpZ3VyZSBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdmaWd1cmUnKSl7XG4gICAgbGV0IHRleHQgPSBmaWd1cmUucXVlcnlTZWxlY3RvcignZmlnY2FwdGlvbicpXG4gICAgbGV0IGltZyA9IGZpZ3VyZS5xdWVyeVNlbGVjdG9yKCdpbWcnKVxuICAgIGRpc3BsYXlEaWZmZW50RGVzY3JpcHRpb25EZXBlbmRpbmdPbkRheSh0ZXh0LCAnY29uZGl0aW9udGV4dCcsICdjb25kaXRpb25UZXh0JywgZGF5c0FuZExvY2F0aW9uKVxuICAgIGRpc3BsYXlEaWZmZW50RGVzY3JpcHRpb25EZXBlbmRpbmdPbkRheShpbWcsICdjb25kaXRpb25pbWFnZScsICdjb25kaXRpb25JY29uJywgZGF5c0FuZExvY2F0aW9uLCB0cnVlKVxuICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlEaWZmZW50RGVzY3JpcHRpb25EZXBlbmRpbmdPbkRheShkZXNjcmlwdGlvbiwgdHlwZU9mRGF0YSwgdHlwZU9mUHJvcGVydHksIGRheXMsIGlzQW5JbWFnZSA9IGZhbHNlKSB7XG4gIGxldCBbZGF5MSwgZGF5MiwgZGF5M10gPSBkYXlzO1xuXG4gIHN3aXRjaCAoZGVzY3JpcHRpb24uZGF0YXNldFtgJHt0eXBlT2ZEYXRhfWBdKSB7XG4gICAgY2FzZSAnZGF5MSc6XG4gICAgICBpZiAoaXNBbkltYWdlKSB7XG4gICAgICAgIGRlc2NyaXB0aW9uLnNyYyA9IGBodHRwOiR7ZGF5MVtgJHt0eXBlT2ZQcm9wZXJ0eX1gXX1gO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGRlc2NyaXB0aW9uLmlubmVyVGV4dCA9IGRheTFbYCR7dHlwZU9mUHJvcGVydHl9YF07XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdkYXkyJzpcbiAgICAgIGlmIChpc0FuSW1hZ2UpIHtcbiAgICAgICAgZGVzY3JpcHRpb24uc3JjID0gYGh0dHA6JHtkYXkyW2Ake3R5cGVPZlByb3BlcnR5fWBdfWA7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZGVzY3JpcHRpb24uaW5uZXJUZXh0ID0gZGF5MltgJHt0eXBlT2ZQcm9wZXJ0eX1gXTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2RheTMnOlxuICAgICAgaWYgKGlzQW5JbWFnZSkge1xuICAgICAgICBkZXNjcmlwdGlvbi5zcmMgPSBgaHR0cDoke2RheTNbYCR7dHlwZU9mUHJvcGVydHl9YF19YDtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBkZXNjcmlwdGlvbi5pbm5lclRleHQgPSBkYXkzW2Ake3R5cGVPZlByb3BlcnR5fWBdO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gIH1cblxufVxuXG5cblxuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheUxvY2F0aW9uKFssLCxsb2NhdGlvbl0pe1xubGV0IGN1cnJlbnRMb2NhdGlvbiA9IGxvY2F0aW9uLmxvY2F0aW9uXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhcnRpY2xlIHAgc3BhbicpLmlubmVyVGV4dCA9IGN1cnJlbnRMb2NhdGlvbjtcbn1cblxuIiwiaW1wb3J0IHsgZ2V0RGF0ZUZvbGxvd2luZ0RheXMgfSBmcm9tICcuL2RhdGUuanMnXG5cbmZ1bmN0aW9uIGRpc3BsYXlGb2xsb3dpbmdEYXlzKCkge1xuXG4gIGNvbnN0IGRheTEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhcnRpY2xlOm50aC1vZi10eXBlKDMpIGRpdiBwJylcbiAgY29uc3QgZGF5MiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FydGljbGU6bnRoLW9mLXR5cGUoMykgZGl2Om50aC1vZi10eXBlKDIpIHAnKVxuICBsZXQgZm9sbG93aW5nRGF5cyA9IGdldERhdGVGb2xsb3dpbmdEYXlzKClcbiAgZGF5MS5pbm5lckhUTUwgPSBgJHtmb2xsb3dpbmdEYXlzLmRheTF9OiA8c3Bhbj48L3NwYW4+YFxuICBkYXkyLmlubmVySFRNTCA9IGAke2ZvbGxvd2luZ0RheXMuZGF5Mn06IDxzcGFuPjwvc3Bhbj5gXG59XG5cbmRpc3BsYXlGb2xsb3dpbmdEYXlzKClcbiIsImltcG9ydCB7IHVwZGF0ZUZvcmVjYXN0IH0gZnJvbSBcIi4vc2VhcmNoLmpzXCJcblxuY29uc3QgdXJsID0gbmV3IFVSTChgaHR0cDovL2dlb2xvY2F0aW9uLWRiLmNvbS9qc29uL2ApXG5jb25zdCBvcHRpb25zID0geyBtZXRob2Q6ICdHRVQnLCBtb2RlOiAnY29ycycgfVxuXG5nZXRVc2VyRGF0YVRvRGlzcGxheVdlYXRoZXIoKVxuXG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyRGF0YVRvRGlzcGxheVdlYXRoZXIoKSB7XG4gIGxldCBjb3VudHJ5ID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKVxuICAgIC50aGVuKGNoZWNrSWZSZXNwb25zZUlzVmFsaWRBbmRSZXR1cm5Kc29uKVxuICAgIC50aGVuKHJldHVybkxvY2F0aW9uKVxuICAgIC5jYXRjaChhc3NpbmdMb25kb25Bc0NvdW50cnlBbmRTaG93RXJyb3IpXG5cbiAgYWRkVmFsdWVUb1RoZVNlYXJjaElucHV0QW5kVXBkYXRlRm9yZWNhc3QoY291bnRyeSlcbn1cblxuXG5mdW5jdGlvbiBjaGVja0lmUmVzcG9uc2VJc1ZhbGlkQW5kUmV0dXJuSnNvbihyZXNwb25zZSkge1xuICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXG4gIH1cbiAgZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBkaWRuJ3QgZ2V0IHJlc3BvbnNlYClcbiAgfVxufVxuXG5mdW5jdGlvbiByZXR1cm5Mb2NhdGlvbih7IGNvdW50cnlfbmFtZTogY291bnRyeSwgc3RhdGUgfSkge1xuICByZXR1cm4gYCR7c3RhdGV9IC0gJHtjb3VudHJ5fWA7XG59XG5cbmZ1bmN0aW9uIGFzc2luZ0xvbmRvbkFzQ291bnRyeUFuZFNob3dFcnJvcigpIHtcbiAgcmV0dXJuICdMb25kb24gLSBVbml0ZWQgS2luZ2RvbSdcbn1cblxuZnVuY3Rpb24gYWRkVmFsdWVUb1RoZVNlYXJjaElucHV0QW5kVXBkYXRlRm9yZWNhc3QoY2l0eSkge1xuICBsZXQgc2VhcmNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvY2F0aW9uU2VhcmNoJylcbiAgc2VhcmNoLnZhbHVlID0gY2l0eTtcbiAgdXBkYXRlRm9yZWNhc3QoKVxufVxuIiwiaW1wb3J0IHsgZ2V0V2VhdGhlciB9IGZyb20gJy4vd2VhdGhlci5qcyc7XG5pbXBvcnQgeyBkaXNwbGF5VGVtcGVyYXR1cmVJbkh0bWwsIGRpc3BsYXlMb2NhdGlvbiB9IGZyb20gJy4vZGlzcGxheS5qcyc7XG5cbmNvbnN0IGtleSA9ICc2MWI2YjhiOGMwNzE0MGIzOGI2MTE0NTM4MjMyMTA5JztcblxubGV0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGZvcm0gYnV0dG9uYCk7XG5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1cGRhdGVGb3JlY2FzdCk7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGZvcm0gaW5wdXRbdHlwZT0nc2VhcmNoJ11gKS52YWx1ZSA9ICdsb25kb24nO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlRm9yZWNhc3QoKSB7XG4gIGxldCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGZvcm0gaW5wdXRbdHlwZT0nc2VhcmNoJ11gKVxuICBsZXQgc2VhcmNoVmFsdWUgPSBzZWFyY2hJbnB1dC52YWx1ZTtcbiAgbGV0IGhlYWRlciA9IG5ldyBIZWFkZXJzKClcbiAgaGVhZGVyLmFwcGVuZCgnbW9kZScsICdjb3JzJyk7XG4gIGhlYWRlci5hcHBlbmQoJ21ldGhvZCcsICdHRVQnKTtcblxuXG4gIGxldCB3ZWF0aGVyVXJsID0gbmV3IFVSTChgaHR0cDovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uYCk7XG5cbiAgbGV0IHF1ZXJpZXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdlYXRoZXJVcmwuc2VhcmNoKTtcbiAgcXVlcmllcy5hcHBlbmQoJ2tleScsIGtleSlcbiAgcXVlcmllcy5hcHBlbmQoJ3EnLCBgJHtzZWFyY2hWYWx1ZX1gKVxuICBxdWVyaWVzLmFwcGVuZCgnZGF5cycsIGAzYClcbiAgcXVlcmllcy5hcHBlbmQoJ2FxaScsIGBub2ApXG4gIHF1ZXJpZXMuYXBwZW5kKCdhbGVydHMnLCBgbm9gKVxuICB3ZWF0aGVyVXJsLnNlYXJjaCA9IHF1ZXJpZXM7XG5cbiAgbGV0IHdlYXRoZXJSZXF1ZXN0ID0gbmV3IFJlcXVlc3Qod2VhdGhlclVybCwgaGVhZGVyKTtcbiAgY29uc29sZS5sb2cod2VhdGhlclJlcXVlc3QpXG4gIHdpbmRvdy5mb3JlY2FzdERhdGEgPSBhd2FpdCBnZXRXZWF0aGVyKHdlYXRoZXJSZXF1ZXN0KVxuICBkaXNwbGF5VGVtcGVyYXR1cmVJbkh0bWwoZm9yZWNhc3REYXRhKVxuICBkaXNwbGF5TG9jYXRpb24oZm9yZWNhc3REYXRhKVxuICBzZWFyY2hJbnB1dC52YWx1ZSA9ICcnO1xufVxuIiwiaW1wb3J0IHsgZGlzcGxheVRlbXBlcmF0dXJlSW5IdG1sIH0gZnJvbSAnLi9kaXNwbGF5LmpzJztcblxubGV0IHN3aXRjaEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FydGljbGU6bnRoLW9mLXR5cGUoMikgYnV0dG9uJyk7XG5zd2l0Y2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzd2l0Y2hUb0ZhaHJlaW5oZWl0KVxuXG5mdW5jdGlvbiBzd2l0Y2hUb0ZhaHJlaW5oZWl0KCkge1xuICBpZiAod2luZG93Lm1vZGUgPT0gJ2MnKSB7XG4gICAgd2luZG93Lm1vZGUgPSAnZic7XG4gICAgc3dpdGNoQnV0dG9uLmlubmVyVGV4dCA9ICdTd2l0Y2ggVG8gQ2Vsc2l1cyc7XG4gIH1cbiAgZWxzZSB7XG4gICAgd2luZG93Lm1vZGUgPSAnYyc7XG4gICAgc3dpdGNoQnV0dG9uLmlubmVyVGV4dCA9ICdTd2l0Y2ggVG8gRmFocmVpbmhlaXQnO1xuICB9XG4gIGRpc3BsYXlUZW1wZXJhdHVyZUluSHRtbChmb3JlY2FzdERhdGEpO1xufVxuIiwiXG5cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2VhdGhlcih3ZWF0aGVyUmVxdWVzdCkge1xuXG4gIHJldHVybiBmZXRjaCh3ZWF0aGVyUmVxdWVzdCkudGhlbih0ZXN0SWZpdFdvcmtzKS50aGVuKGdldEpTT05EYXRhQW5kTWFrZUFVc2VmdWxPYmplY3QpLmNhdGNoKChlcnJvcikgPT4gY29uc29sZS5sb2coZXJyb3IpKVxuXG4gIGZ1bmN0aW9uIHRlc3RJZml0V29ya3MocmVzcG9uc2UpIHtcbiAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgIHJldHVybiByZXNwb25zZS5qc29uKClcbiAgICB9XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGdldEpTT05EYXRhQW5kTWFrZUFVc2VmdWxPYmplY3QoanNvblJlc3BvbnNlKSB7XG4gICAgbGV0IGZvcmVjYXN0ID0ganNvblJlc3BvbnNlLmZvcmVjYXN0LmZvcmVjYXN0ZGF5XG4gICAgbGV0IHVzZWZ1bE9iamVjdERhdGEgPSBmb3JlY2FzdC5tYXAob2JqZWN0ID0+IHtcbiAgICAgIGxldCBkYXlEYXRhID0gb2JqZWN0LmRheVxuICAgICAgbGV0IHsgYXZnaHVtaWRpdHksIGF2Z3RlbXBfYywgYXZndGVtcF9mLCBtYXh0ZW1wX2MsIG1heHRlbXBfZiwgbWludGVtcF9jLCBtaW50ZW1wX2YsIGNvbmRpdGlvbjogeyB0ZXh0OiBjb25kaXRpb25UZXh0LGljb246Y29uZGl0aW9uSWNvbiB9IH0gPSBkYXlEYXRhXG4gICAgICByZXR1cm4ge1xuICAgICAgICBhdmdodW1pZGl0eSwgYXZndGVtcF9jLCBhdmd0ZW1wX2YsIG1heHRlbXBfYywgbWF4dGVtcF9mLCBtaW50ZW1wX2MsIG1pbnRlbXBfZiwgY29uZGl0aW9uVGV4dCxjb25kaXRpb25JY29uXG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiBbLi4udXNlZnVsT2JqZWN0RGF0YSx7XCJsb2NhdGlvblwiOmAke2pzb25SZXNwb25zZS5sb2NhdGlvbi5uYW1lfSAtICR7anNvblJlc3BvbnNlLmxvY2F0aW9uLmNvdW50cnl9YH1dO1xuICB9XG5cbn1cbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAqe1xucGFkZGluZzogMDtcbm1hcmdpbjogMDtcbmJveC1zaXppbmc6Ym9yZGVyLWJveDtcbn1cblxuOnJvb3R7XG4tLWJsYWNrOiBibGFjaztcbi0td2hpdGU6IHdoaXRlO1xufVxuXG5hcnRpY2xlOm50aC1vZi10eXBlKDMpLGZvcm17XG5kaXNwbGF5OmZsZXg7XG59XG5cblxuaGVhZGVye1xucGFkZGluZzoycHg7XG5ib3JkZXItYm90dG9tOjJweCBzb2xpZCB2YXIoLS1ibGFjayk7XG59XG5mb3Jte1xuXG50ZXh0LWFsaWduOmNlbnRlcjtcbmp1c3RpZnktY29udGVudDpjZW50ZXI7XG5hbGlnbi1pdGVtczpjZW50ZXI7XG5nYXA6MXZ3O1xufVxuXG5mb3JtID4gKntcbmRpc3BsYXk6YmxvY2tcbn1cblxuYXJ0aWNsZTpudGgtb2YtdHlwZSgzKSBkaXYgPiBwOmZpcnN0LW9mLXR5cGV7XG5mb250LXdlaWdodDogYm9sZDtcbmZvbnQtc2l6ZTogMS41cmVtO1xuXG5cbn1cblxuXG5ib2R5e1xuY29sb3I6IHZhcigtLWJsYWNrKTtcbmJhY2tncm91bmQtY29sb3I6I0Y3REZERjtcbnRleHQtYWxpZ246Y2VudGVyO1xufVxuXG5tYWlue1xucGFkZGluZzoycHg7XG5cbn1cblxuYXJ0aWNsZXtcbmJhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KCNGRkI2QzEsI0ZGNzc4Qik7XG5iYWNrZ3JvdW5kLWNvbG9yOiAjRkZCNkMxO1xuXG5kaXNwbGF5OiBmbGV4O1xuZmxleC1kaXJlY3Rpb246Y29sdW1uO1xuanVzdGlmeS1jb250ZW50OmNlbnRlcjtcbmFsaWduLWl0ZW1zOmNlbnRlcjtcbnBhZGRpbmc6NXB4O1xuYm9yZGVyLXJhZGl1czoxMHB4O1xubWFyZ2luOjJweDtcbn1cblxuYXJ0aWNsZTpudGgtb2YtdHlwZSgzKSBkaXZ7XG5kaXNwbGF5OmZsZXg7XG5qdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xuYWxpZ24taXRlbXM6Y2VudGVyO1xuZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblxuXG59XG5cbmRse1xuZGlzcGxheTpmbGV4O1xuZmxleC1kaXJlY3Rpb246Y29sdW1uO1xuanVzdGlmeS1jb250ZW50OmNlbnRlcjtcbmFsaWduLWl0ZW1zOmNlbnRlcjtcbnRleHQtYWxpZ246Y2VudGVyO1xud2lkdGg6NzV2dztcbmJvcmRlci1yYWRpdXM6NnB4O1xuYmFja2dyb3VuZC1jb2xvcjojRkQ4ODg4O1xufVxuXG5hcnRpY2xlOm50aC1vZi10eXBlKDMpe1xuZmxleC1kaXJlY3Rpb246Y29sdW1uO1xuanVzdGlmeS1pdGVtczpjZW50ZXI7XG5qdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xuZ2FwOjRweFxufVxuIFxuYnV0dG9ue1xuYm9yZGVyOjJweCBzb2xpZCB2YXIoLS1ibGFjayk7XG5jb2xvcjogdmFyKC0tYmxhY2spO1xuYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td2hpdGUpO1xucGFkZGluZzozcHg7XG5ib3JkZXItcmFkaXVzOjRweDtcbn1cblxuYnV0dG9uOmhvdmVye1xuYm9yZGVyOjJweCBzb2xpZCB2YXIoLS13aGl0ZSk7XG5jb2xvcjogdmFyKC0td2hpdGUpO1xuYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmxhY2spO1xuY3Vyc29yOiBwb2ludGVyO1xufVxuXG5AbWVkaWEobWluLXdpZHRoOjUwMHB4KXtcblxuYXJ0aWNsZTpudGgtb2YtdHlwZSgzKXtcbmZsZXgtZGlyZWN0aW9uOnJvdztcbmp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuYWxpZ24taXRlbXM6Y2VudGVyO1xufVxuXG5kbHtcbndpZHRoOjcwJTtcbiAgfVxuXG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL2lucHV0L3N0eWxpbmcvbWFpbi5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7QUFDQSxVQUFVO0FBQ1YsU0FBUztBQUNULHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBLGNBQWM7QUFDZCxjQUFjO0FBQ2Q7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7OztBQUdBO0FBQ0EsV0FBVztBQUNYLG9DQUFvQztBQUNwQztBQUNBOztBQUVBLGlCQUFpQjtBQUNqQixzQkFBc0I7QUFDdEIsa0JBQWtCO0FBQ2xCLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUI7QUFDakIsaUJBQWlCOzs7QUFHakI7OztBQUdBO0FBQ0EsbUJBQW1CO0FBQ25CLHdCQUF3QjtBQUN4QixpQkFBaUI7QUFDakI7O0FBRUE7QUFDQSxXQUFXOztBQUVYOztBQUVBO0FBQ0EsaURBQWlEO0FBQ2pELHlCQUF5Qjs7QUFFekIsYUFBYTtBQUNiLHFCQUFxQjtBQUNyQixzQkFBc0I7QUFDdEIsa0JBQWtCO0FBQ2xCLFdBQVc7QUFDWCxrQkFBa0I7QUFDbEIsVUFBVTtBQUNWOztBQUVBO0FBQ0EsWUFBWTtBQUNaLHNCQUFzQjtBQUN0QixrQkFBa0I7QUFDbEIsc0JBQXNCOzs7QUFHdEI7O0FBRUE7QUFDQSxZQUFZO0FBQ1oscUJBQXFCO0FBQ3JCLHNCQUFzQjtBQUN0QixrQkFBa0I7QUFDbEIsaUJBQWlCO0FBQ2pCLFVBQVU7QUFDVixpQkFBaUI7QUFDakIsd0JBQXdCO0FBQ3hCOztBQUVBO0FBQ0EscUJBQXFCO0FBQ3JCLG9CQUFvQjtBQUNwQixzQkFBc0I7QUFDdEI7QUFDQTs7QUFFQTtBQUNBLDZCQUE2QjtBQUM3QixtQkFBbUI7QUFDbkIsOEJBQThCO0FBQzlCLFdBQVc7QUFDWCxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQSw2QkFBNkI7QUFDN0IsbUJBQW1CO0FBQ25CLDhCQUE4QjtBQUM5QixlQUFlO0FBQ2Y7O0FBRUE7O0FBRUE7QUFDQSxrQkFBa0I7QUFDbEIsNkJBQTZCO0FBQzdCLGtCQUFrQjtBQUNsQjs7QUFFQTtBQUNBLFNBQVM7RUFDUDs7QUFFRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqe1xcbnBhZGRpbmc6IDA7XFxubWFyZ2luOiAwO1xcbmJveC1zaXppbmc6Ym9yZGVyLWJveDtcXG59XFxuXFxuOnJvb3R7XFxuLS1ibGFjazogYmxhY2s7XFxuLS13aGl0ZTogd2hpdGU7XFxufVxcblxcbmFydGljbGU6bnRoLW9mLXR5cGUoMyksZm9ybXtcXG5kaXNwbGF5OmZsZXg7XFxufVxcblxcblxcbmhlYWRlcntcXG5wYWRkaW5nOjJweDtcXG5ib3JkZXItYm90dG9tOjJweCBzb2xpZCB2YXIoLS1ibGFjayk7XFxufVxcbmZvcm17XFxuXFxudGV4dC1hbGlnbjpjZW50ZXI7XFxuanVzdGlmeS1jb250ZW50OmNlbnRlcjtcXG5hbGlnbi1pdGVtczpjZW50ZXI7XFxuZ2FwOjF2dztcXG59XFxuXFxuZm9ybSA+ICp7XFxuZGlzcGxheTpibG9ja1xcbn1cXG5cXG5hcnRpY2xlOm50aC1vZi10eXBlKDMpIGRpdiA+IHA6Zmlyc3Qtb2YtdHlwZXtcXG5mb250LXdlaWdodDogYm9sZDtcXG5mb250LXNpemU6IDEuNXJlbTtcXG5cXG5cXG59XFxuXFxuXFxuYm9keXtcXG5jb2xvcjogdmFyKC0tYmxhY2spO1xcbmJhY2tncm91bmQtY29sb3I6I0Y3REZERjtcXG50ZXh0LWFsaWduOmNlbnRlcjtcXG59XFxuXFxubWFpbntcXG5wYWRkaW5nOjJweDtcXG5cXG59XFxuXFxuYXJ0aWNsZXtcXG5iYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCgjRkZCNkMxLCNGRjc3OEIpO1xcbmJhY2tncm91bmQtY29sb3I6ICNGRkI2QzE7XFxuXFxuZGlzcGxheTogZmxleDtcXG5mbGV4LWRpcmVjdGlvbjpjb2x1bW47XFxuanVzdGlmeS1jb250ZW50OmNlbnRlcjtcXG5hbGlnbi1pdGVtczpjZW50ZXI7XFxucGFkZGluZzo1cHg7XFxuYm9yZGVyLXJhZGl1czoxMHB4O1xcbm1hcmdpbjoycHg7XFxufVxcblxcbmFydGljbGU6bnRoLW9mLXR5cGUoMykgZGl2e1xcbmRpc3BsYXk6ZmxleDtcXG5qdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xcbmFsaWduLWl0ZW1zOmNlbnRlcjtcXG5mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcblxcblxcbn1cXG5cXG5kbHtcXG5kaXNwbGF5OmZsZXg7XFxuZmxleC1kaXJlY3Rpb246Y29sdW1uO1xcbmp1c3RpZnktY29udGVudDpjZW50ZXI7XFxuYWxpZ24taXRlbXM6Y2VudGVyO1xcbnRleHQtYWxpZ246Y2VudGVyO1xcbndpZHRoOjc1dnc7XFxuYm9yZGVyLXJhZGl1czo2cHg7XFxuYmFja2dyb3VuZC1jb2xvcjojRkQ4ODg4O1xcbn1cXG5cXG5hcnRpY2xlOm50aC1vZi10eXBlKDMpe1xcbmZsZXgtZGlyZWN0aW9uOmNvbHVtbjtcXG5qdXN0aWZ5LWl0ZW1zOmNlbnRlcjtcXG5qdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xcbmdhcDo0cHhcXG59XFxuIFxcbmJ1dHRvbntcXG5ib3JkZXI6MnB4IHNvbGlkIHZhcigtLWJsYWNrKTtcXG5jb2xvcjogdmFyKC0tYmxhY2spO1xcbmJhY2tncm91bmQtY29sb3I6IHZhcigtLXdoaXRlKTtcXG5wYWRkaW5nOjNweDtcXG5ib3JkZXItcmFkaXVzOjRweDtcXG59XFxuXFxuYnV0dG9uOmhvdmVye1xcbmJvcmRlcjoycHggc29saWQgdmFyKC0td2hpdGUpO1xcbmNvbG9yOiB2YXIoLS13aGl0ZSk7XFxuYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmxhY2spO1xcbmN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuQG1lZGlhKG1pbi13aWR0aDo1MDBweCl7XFxuXFxuYXJ0aWNsZTpudGgtb2YtdHlwZSgzKXtcXG5mbGV4LWRpcmVjdGlvbjpyb3c7XFxuanVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuYWxpZ24taXRlbXM6Y2VudGVyO1xcbn1cXG5cXG5kbHtcXG53aWR0aDo3MCU7XFxuICB9XFxuXFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21haW4uY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tYWluLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7Iiwid2luZG93Lm1vZGUgPSAnYyc7XG5pbXBvcnQgJy4vZnVuY3Rpb25hbGl0eS9nZXRMb2NhdGlvbi5qcydcbmltcG9ydCAnLi9mdW5jdGlvbmFsaXR5L2Rpc3BsYXlGb2xsb3dpbmdEYXlzLmpzJztcbmltcG9ydCAnLi9mdW5jdGlvbmFsaXR5L3NlYXJjaC5qcyc7XG5pbXBvcnQgJy4vZnVuY3Rpb25hbGl0eS93ZWF0aGVyLmpzJztcbmltcG9ydCAnLi9mdW5jdGlvbmFsaXR5L2RhdGUuanMnO1xuaW1wb3J0ICcuL2Z1bmN0aW9uYWxpdHkvc3dpdGNoVG9GYWhyZWluaGVpdC5qcyc7XG5cblxuaW1wb3J0ICcuL3N0eWxpbmcvbWFpbi5jc3MnO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9