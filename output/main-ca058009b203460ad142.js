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

/***/ "./input/functionality/search.js":
/*!***************************************!*\
  !*** ./input/functionality/search.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _weather_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weather.js */ "./input/functionality/weather.js");
/* harmony import */ var _display_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display.js */ "./input/functionality/display.js");



const key = '61b6b8b8c07140b38b6114538232109';

let button = document.querySelector(`form button`);
button.addEventListener('click', updateForecast);

document.querySelector(`form input[type='search']`).value = 'london';
updateForecast()

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

body{
color: var(--black);
background-color:var(--white);
text-align:center;
}

article{
border: 2px solid var(--black);
padding:5px;
}

`, "",{"version":3,"sources":["webpack://./input/styling/main.css"],"names":[],"mappings":"AAAA;AACA,UAAU;AACV,SAAS;AACT,qBAAqB;AACrB;;AAEA;AACA,cAAc;AACd,cAAc;AACd;;AAEA;AACA,mBAAmB;AACnB,6BAA6B;AAC7B,iBAAiB;AACjB;;AAEA;AACA,8BAA8B;AAC9B,WAAW;AACX","sourcesContent":["*{\npadding: 0;\nmargin: 0;\nbox-sizing:border-box;\n}\n\n:root{\n--black: black;\n--white: white;\n}\n\nbody{\ncolor: var(--black);\nbackground-color:var(--white);\ntext-align:center;\n}\n\narticle{\nborder: 2px solid var(--black);\npadding:5px;\n}\n\n"],"sourceRoot":""}]);
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
/* harmony import */ var _functionality_displayFollowingDays_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functionality/displayFollowingDays.js */ "./input/functionality/displayFollowingDays.js");
/* harmony import */ var _functionality_search_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functionality/search.js */ "./input/functionality/search.js");
/* harmony import */ var _functionality_weather_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./functionality/weather.js */ "./input/functionality/weather.js");
/* harmony import */ var _functionality_date_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./functionality/date.js */ "./input/functionality/date.js");
/* harmony import */ var _functionality_switchToFahreinheit_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./functionality/switchToFahreinheit.js */ "./input/functionality/switchToFahreinheit.js");
/* harmony import */ var _styling_main_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./styling/main.css */ "./input/styling/main.css");
window.mode = 'c';










})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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eURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUNiQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7QUFFaUQ7QUFDZDtBQUNDO0FBQ0g7QUFDZTs7O0FBR3BCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS8uL2lucHV0L2Z1bmN0aW9uYWxpdHkvZGF0ZS5qcyIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpLy4vaW5wdXQvZnVuY3Rpb25hbGl0eS9kaXNwbGF5LmpzIiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvLi9pbnB1dC9mdW5jdGlvbmFsaXR5L2Rpc3BsYXlGb2xsb3dpbmdEYXlzLmpzIiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvLi9pbnB1dC9mdW5jdGlvbmFsaXR5L3NlYXJjaC5qcyIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpLy4vaW5wdXQvZnVuY3Rpb25hbGl0eS9zd2l0Y2hUb0ZhaHJlaW5oZWl0LmpzIiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvLi9pbnB1dC9mdW5jdGlvbmFsaXR5L3dlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS8uL2lucHV0L3N0eWxpbmcvbWFpbi5jc3MiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvLi9pbnB1dC9zdHlsaW5nL21haW4uY3NzPzlkYzMiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpLy4vaW5wdXQvZmlsZUltcG9ydGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBnZXREYXRlRm9sbG93aW5nRGF5cygpIHtcbiAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKTtcblxuICBsZXQgZGF5MSA9IG5ldyBEYXRlKCk7XG4gIGRheTEuc2V0RGF0ZShuZXcgRGF0ZSgpLmdldERhdGUoKSArIDEpO1xuXG4gIGxldCBkYXkyID0gbmV3IERhdGUoKTtcbiAgZGF5Mi5zZXREYXRlKG5ldyBEYXRlKCkuZ2V0RGF0ZSgpICsgMik7XG5cblxuXG5cbiAgcmV0dXJuIHtcbiAgICBkYXkxOiBkYXkxLnRvTG9jYWxlU3RyaW5nKCdlbi11cycsIHsgd2Vla2RheTogJ2xvbmcnIH0pLFxuICAgIGRheTI6IGRheTIudG9Mb2NhbGVTdHJpbmcoJ2VuLXVzJywgeyB3ZWVrZGF5OiAnbG9uZycgfSksXG4gIH1cblxuXG59XG4iLCJleHBvcnQgZnVuY3Rpb24gZGlzcGxheVRlbXBlcmF0dXJlSW5IdG1sKGRheXNBbmRMb2NhdGlvbikge1xuICBjb25zb2xlLmxvZyhkYXlzQW5kTG9jYXRpb24pXG4gIGxldCBhbGxEZXNjcmlwdGlvbkxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdkZCcpXG4gIGZvciAobGV0IGRlc2NyaXB0aW9uIG9mIGFsbERlc2NyaXB0aW9uTGlzdCkge1xuICAgIGRpc3BsYXlEaWZmZW50RGVzY3JpcHRpb25EZXBlbmRpbmdPbkRheShkZXNjcmlwdGlvbiwgJ2F2Z2h1bWlkaXR5JywgJ2F2Z2h1bWlkaXR5JywgZGF5c0FuZExvY2F0aW9uKVxuICAgIGRpc3BsYXlEaWZmZW50RGVzY3JpcHRpb25EZXBlbmRpbmdPbkRheShkZXNjcmlwdGlvbiwgJ2F2Z3RlbXAnLCBgYXZndGVtcF8ke3dpbmRvdy5tb2RlfWAsIGRheXNBbmRMb2NhdGlvbilcbiAgICBkaXNwbGF5RGlmZmVudERlc2NyaXB0aW9uRGVwZW5kaW5nT25EYXkoZGVzY3JpcHRpb24sICdtaW50ZW1wJywgYG1pbnRlbXBfJHt3aW5kb3cubW9kZX1gLCBkYXlzQW5kTG9jYXRpb24pXG4gICAgZGlzcGxheURpZmZlbnREZXNjcmlwdGlvbkRlcGVuZGluZ09uRGF5KGRlc2NyaXB0aW9uLCAnbWF4dGVtcCcsIGBtYXh0ZW1wXyR7d2luZG93Lm1vZGV9YCwgZGF5c0FuZExvY2F0aW9uKVxuICB9XG4gIGZvcihsZXQgZmlndXJlIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2ZpZ3VyZScpKXtcbiAgICBsZXQgdGV4dCA9IGZpZ3VyZS5xdWVyeVNlbGVjdG9yKCdmaWdjYXB0aW9uJylcbiAgICBsZXQgaW1nID0gZmlndXJlLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpXG4gICAgZGlzcGxheURpZmZlbnREZXNjcmlwdGlvbkRlcGVuZGluZ09uRGF5KHRleHQsICdjb25kaXRpb250ZXh0JywgJ2NvbmRpdGlvblRleHQnLCBkYXlzQW5kTG9jYXRpb24pXG4gICAgZGlzcGxheURpZmZlbnREZXNjcmlwdGlvbkRlcGVuZGluZ09uRGF5KGltZywgJ2NvbmRpdGlvbmltYWdlJywgJ2NvbmRpdGlvbkljb24nLCBkYXlzQW5kTG9jYXRpb24sIHRydWUpXG4gIH1cbn1cblxuZnVuY3Rpb24gZGlzcGxheURpZmZlbnREZXNjcmlwdGlvbkRlcGVuZGluZ09uRGF5KGRlc2NyaXB0aW9uLCB0eXBlT2ZEYXRhLCB0eXBlT2ZQcm9wZXJ0eSwgZGF5cywgaXNBbkltYWdlID0gZmFsc2UpIHtcbiAgbGV0IFtkYXkxLCBkYXkyLCBkYXkzXSA9IGRheXM7XG5cbiAgc3dpdGNoIChkZXNjcmlwdGlvbi5kYXRhc2V0W2Ake3R5cGVPZkRhdGF9YF0pIHtcbiAgICBjYXNlICdkYXkxJzpcbiAgICAgIGlmIChpc0FuSW1hZ2UpIHtcbiAgICAgICAgZGVzY3JpcHRpb24uc3JjID0gYGh0dHA6JHtkYXkxW2Ake3R5cGVPZlByb3BlcnR5fWBdfWA7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZGVzY3JpcHRpb24uaW5uZXJUZXh0ID0gZGF5MVtgJHt0eXBlT2ZQcm9wZXJ0eX1gXTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2RheTInOlxuICAgICAgaWYgKGlzQW5JbWFnZSkge1xuICAgICAgICBkZXNjcmlwdGlvbi5zcmMgPSBgaHR0cDoke2RheTJbYCR7dHlwZU9mUHJvcGVydHl9YF19YDtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBkZXNjcmlwdGlvbi5pbm5lclRleHQgPSBkYXkyW2Ake3R5cGVPZlByb3BlcnR5fWBdO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZGF5Myc6XG4gICAgICBpZiAoaXNBbkltYWdlKSB7XG4gICAgICAgIGRlc2NyaXB0aW9uLnNyYyA9IGBodHRwOiR7ZGF5M1tgJHt0eXBlT2ZQcm9wZXJ0eX1gXX1gO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGRlc2NyaXB0aW9uLmlubmVyVGV4dCA9IGRheTNbYCR7dHlwZU9mUHJvcGVydHl9YF07XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxuXG59XG5cblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5TG9jYXRpb24oWywsLGxvY2F0aW9uXSl7XG5sZXQgY3VycmVudExvY2F0aW9uID0gbG9jYXRpb24ubG9jYXRpb25cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FydGljbGUgcCBzcGFuJykuaW5uZXJUZXh0ID0gY3VycmVudExvY2F0aW9uO1xufVxuXG4iLCJpbXBvcnQgeyBnZXREYXRlRm9sbG93aW5nRGF5cyB9IGZyb20gJy4vZGF0ZS5qcydcblxuZnVuY3Rpb24gZGlzcGxheUZvbGxvd2luZ0RheXMoKSB7XG5cbiAgY29uc3QgZGF5MSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FydGljbGU6bnRoLW9mLXR5cGUoMykgZGl2IHAnKVxuICBjb25zdCBkYXkyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXJ0aWNsZTpudGgtb2YtdHlwZSgzKSBkaXY6bnRoLW9mLXR5cGUoMikgcCcpXG4gIGxldCBmb2xsb3dpbmdEYXlzID0gZ2V0RGF0ZUZvbGxvd2luZ0RheXMoKVxuICBkYXkxLmlubmVySFRNTCA9IGAke2ZvbGxvd2luZ0RheXMuZGF5MX06IDxzcGFuPjwvc3Bhbj5gXG4gIGRheTIuaW5uZXJIVE1MID0gYCR7Zm9sbG93aW5nRGF5cy5kYXkyfTogPHNwYW4+PC9zcGFuPmBcbn1cblxuZGlzcGxheUZvbGxvd2luZ0RheXMoKVxuIiwiaW1wb3J0IHsgZ2V0V2VhdGhlciB9IGZyb20gJy4vd2VhdGhlci5qcyc7XG5pbXBvcnQgeyBkaXNwbGF5VGVtcGVyYXR1cmVJbkh0bWwsIGRpc3BsYXlMb2NhdGlvbiB9IGZyb20gJy4vZGlzcGxheS5qcyc7XG5cbmNvbnN0IGtleSA9ICc2MWI2YjhiOGMwNzE0MGIzOGI2MTE0NTM4MjMyMTA5JztcblxubGV0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGZvcm0gYnV0dG9uYCk7XG5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1cGRhdGVGb3JlY2FzdCk7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGZvcm0gaW5wdXRbdHlwZT0nc2VhcmNoJ11gKS52YWx1ZSA9ICdsb25kb24nO1xudXBkYXRlRm9yZWNhc3QoKVxuXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVGb3JlY2FzdCgpIHtcbiAgbGV0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgZm9ybSBpbnB1dFt0eXBlPSdzZWFyY2gnXWApXG4gIGxldCBzZWFyY2hWYWx1ZSA9IHNlYXJjaElucHV0LnZhbHVlO1xuICBsZXQgaGVhZGVyID0gbmV3IEhlYWRlcnMoKVxuICBoZWFkZXIuYXBwZW5kKCdtb2RlJywgJ2NvcnMnKTtcbiAgaGVhZGVyLmFwcGVuZCgnbWV0aG9kJywgJ0dFVCcpO1xuXG5cbiAgbGV0IHdlYXRoZXJVcmwgPSBuZXcgVVJMKGBodHRwOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb25gKTtcblxuICBsZXQgcXVlcmllcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2VhdGhlclVybC5zZWFyY2gpO1xuICBxdWVyaWVzLmFwcGVuZCgna2V5Jywga2V5KVxuICBxdWVyaWVzLmFwcGVuZCgncScsIGAke3NlYXJjaFZhbHVlfWApXG4gIHF1ZXJpZXMuYXBwZW5kKCdkYXlzJywgYDNgKVxuICBxdWVyaWVzLmFwcGVuZCgnYXFpJywgYG5vYClcbiAgcXVlcmllcy5hcHBlbmQoJ2FsZXJ0cycsIGBub2ApXG4gIHdlYXRoZXJVcmwuc2VhcmNoID0gcXVlcmllcztcblxuICBsZXQgd2VhdGhlclJlcXVlc3QgPSBuZXcgUmVxdWVzdCh3ZWF0aGVyVXJsLCBoZWFkZXIpO1xuICB3aW5kb3cuZm9yZWNhc3REYXRhID0gYXdhaXQgZ2V0V2VhdGhlcih3ZWF0aGVyUmVxdWVzdClcbiAgZGlzcGxheVRlbXBlcmF0dXJlSW5IdG1sKGZvcmVjYXN0RGF0YSlcbiAgZGlzcGxheUxvY2F0aW9uKGZvcmVjYXN0RGF0YSlcbiAgc2VhcmNoSW5wdXQudmFsdWUgPSAnJztcbn1cbiIsImltcG9ydCB7IGRpc3BsYXlUZW1wZXJhdHVyZUluSHRtbCB9IGZyb20gJy4vZGlzcGxheS5qcyc7XG5cbmxldCBzd2l0Y2hCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhcnRpY2xlOm50aC1vZi10eXBlKDIpIGJ1dHRvbicpO1xuc3dpdGNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3dpdGNoVG9GYWhyZWluaGVpdClcblxuZnVuY3Rpb24gc3dpdGNoVG9GYWhyZWluaGVpdCgpIHtcbiAgaWYgKHdpbmRvdy5tb2RlID09ICdjJykge1xuICAgIHdpbmRvdy5tb2RlID0gJ2YnO1xuICAgIHN3aXRjaEJ1dHRvbi5pbm5lclRleHQgPSAnU3dpdGNoIFRvIENlbHNpdXMnO1xuICB9XG4gIGVsc2Uge1xuICAgIHdpbmRvdy5tb2RlID0gJ2MnO1xuICAgIHN3aXRjaEJ1dHRvbi5pbm5lclRleHQgPSAnU3dpdGNoIFRvIEZhaHJlaW5oZWl0JztcbiAgfVxuICBkaXNwbGF5VGVtcGVyYXR1cmVJbkh0bWwoZm9yZWNhc3REYXRhKTtcbn1cbiIsIlxuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdlYXRoZXIod2VhdGhlclJlcXVlc3QpIHtcblxuICByZXR1cm4gZmV0Y2god2VhdGhlclJlcXVlc3QpLnRoZW4odGVzdElmaXRXb3JrcykudGhlbihnZXRKU09ORGF0YUFuZE1ha2VBVXNlZnVsT2JqZWN0KS5jYXRjaCgoZXJyb3IpID0+IGNvbnNvbGUubG9nKGVycm9yKSlcblxuICBmdW5jdGlvbiB0ZXN0SWZpdFdvcmtzKHJlc3BvbnNlKSB7XG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiBnZXRKU09ORGF0YUFuZE1ha2VBVXNlZnVsT2JqZWN0KGpzb25SZXNwb25zZSkge1xuICAgIGxldCBmb3JlY2FzdCA9IGpzb25SZXNwb25zZS5mb3JlY2FzdC5mb3JlY2FzdGRheVxuICAgIGxldCB1c2VmdWxPYmplY3REYXRhID0gZm9yZWNhc3QubWFwKG9iamVjdCA9PiB7XG4gICAgICBsZXQgZGF5RGF0YSA9IG9iamVjdC5kYXlcbiAgICAgIGxldCB7IGF2Z2h1bWlkaXR5LCBhdmd0ZW1wX2MsIGF2Z3RlbXBfZiwgbWF4dGVtcF9jLCBtYXh0ZW1wX2YsIG1pbnRlbXBfYywgbWludGVtcF9mLCBjb25kaXRpb246IHsgdGV4dDogY29uZGl0aW9uVGV4dCxpY29uOmNvbmRpdGlvbkljb24gfSB9ID0gZGF5RGF0YVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYXZnaHVtaWRpdHksIGF2Z3RlbXBfYywgYXZndGVtcF9mLCBtYXh0ZW1wX2MsIG1heHRlbXBfZiwgbWludGVtcF9jLCBtaW50ZW1wX2YsIGNvbmRpdGlvblRleHQsY29uZGl0aW9uSWNvblxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gWy4uLnVzZWZ1bE9iamVjdERhdGEse1wibG9jYXRpb25cIjpgJHtqc29uUmVzcG9uc2UubG9jYXRpb24ubmFtZX0gLSAke2pzb25SZXNwb25zZS5sb2NhdGlvbi5jb3VudHJ5fWB9XTtcbiAgfVxuXG59XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgKntcbnBhZGRpbmc6IDA7XG5tYXJnaW46IDA7XG5ib3gtc2l6aW5nOmJvcmRlci1ib3g7XG59XG5cbjpyb290e1xuLS1ibGFjazogYmxhY2s7XG4tLXdoaXRlOiB3aGl0ZTtcbn1cblxuYm9keXtcbmNvbG9yOiB2YXIoLS1ibGFjayk7XG5iYWNrZ3JvdW5kLWNvbG9yOnZhcigtLXdoaXRlKTtcbnRleHQtYWxpZ246Y2VudGVyO1xufVxuXG5hcnRpY2xle1xuYm9yZGVyOiAycHggc29saWQgdmFyKC0tYmxhY2spO1xucGFkZGluZzo1cHg7XG59XG5cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vaW5wdXQvc3R5bGluZy9tYWluLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtBQUNBLFVBQVU7QUFDVixTQUFTO0FBQ1QscUJBQXFCO0FBQ3JCOztBQUVBO0FBQ0EsY0FBYztBQUNkLGNBQWM7QUFDZDs7QUFFQTtBQUNBLG1CQUFtQjtBQUNuQiw2QkFBNkI7QUFDN0IsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0EsOEJBQThCO0FBQzlCLFdBQVc7QUFDWFwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqe1xcbnBhZGRpbmc6IDA7XFxubWFyZ2luOiAwO1xcbmJveC1zaXppbmc6Ym9yZGVyLWJveDtcXG59XFxuXFxuOnJvb3R7XFxuLS1ibGFjazogYmxhY2s7XFxuLS13aGl0ZTogd2hpdGU7XFxufVxcblxcbmJvZHl7XFxuY29sb3I6IHZhcigtLWJsYWNrKTtcXG5iYWNrZ3JvdW5kLWNvbG9yOnZhcigtLXdoaXRlKTtcXG50ZXh0LWFsaWduOmNlbnRlcjtcXG59XFxuXFxuYXJ0aWNsZXtcXG5ib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1ibGFjayk7XFxucGFkZGluZzo1cHg7XFxufVxcblxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21haW4uY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tYWluLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7Iiwid2luZG93Lm1vZGUgPSAnYyc7XG5cbmltcG9ydCAnLi9mdW5jdGlvbmFsaXR5L2Rpc3BsYXlGb2xsb3dpbmdEYXlzLmpzJztcbmltcG9ydCAnLi9mdW5jdGlvbmFsaXR5L3NlYXJjaC5qcyc7XG5pbXBvcnQgJy4vZnVuY3Rpb25hbGl0eS93ZWF0aGVyLmpzJztcbmltcG9ydCAnLi9mdW5jdGlvbmFsaXR5L2RhdGUuanMnO1xuaW1wb3J0ICcuL2Z1bmN0aW9uYWxpdHkvc3dpdGNoVG9GYWhyZWluaGVpdC5qcyc7XG5cblxuaW1wb3J0ICcuL3N0eWxpbmcvbWFpbi5jc3MnO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9