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
  day1.setDate(new Date().getDate() +1);

  let day2 = new Date();
  day2.setDate(new Date().getDate() +2);


  let day3 = new Date();
  day3.setDate(new Date().getDate() +3);


  return{
    day1: day1.toLocaleString('en-us', { weekday: 'long' }),
      day2: day2.toLocaleString('en-us', { weekday: 'long' }),
        day3: day3.toLocaleString('en-us', { weekday: 'long' })
  }


}


/***/ }),

/***/ "./input/functionality/displayFollowingDays.js":
/*!*****************************************************!*\
  !*** ./input/functionality/displayFollowingDays.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./date.js */ "./input/functionality/date.js");


function displayFollowingDays(){

const day1 = document.querySelectorAll('article:nth-of-type(3) div p')[0]
const day2 = document.querySelectorAll('article:nth-of-type(3) div p')[1]
const day3 = document.querySelectorAll('article:nth-of-type(3) div p')[2]
day1.innerHTML = 'lala'
let followingDays = (0,_date_js__WEBPACK_IMPORTED_MODULE_0__.getDateFollowingDays)()
day1.innerHTML = `${followingDays.day1}: <span></span>`
day2.innerHTML = `${followingDays.day2}: <span></span>`
day3.innerHTML = `${followingDays.day3}: <span></span>`

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


let button = document.querySelector(`form button`);
button.addEventListener('click', updateEverything);

function updateEverything() {
  let searchValue = document.querySelector(`form input[type='search']`).value;
  let header = new Headers()
  header.append('mode', 'cors');
  header.append('method', 'GET');

  updateCurrentTime(searchValue, header)
  updateForecast(searchValue, header)
}




async function updateCurrentTime(searchValue, header) {

  let weatherUrl = new URL(`http://api.weatherapi.com/v1/current.json`);
  let queries = new URLSearchParams(weatherUrl.search)
  queries.append('key', '61b6b8b8c07140b38b6114538232109');
  queries.append('q', `${searchValue}`);
  queries.append('aqi', `no`);

  weatherUrl.search = queries;
  let weatherRequest = new Request(weatherUrl, header);


  let lala = await (0,_weather_js__WEBPACK_IMPORTED_MODULE_0__.getWeather)(weatherRequest)
  // console.log(lala)
}

// work on this 
async function updateForecast(searchValue, header) {
  let currentDate = new Date().toISOString()
  console.log(currentDate.toLocaleDateString('en-US', {
    weekday: 'long', //  values: 'long', 'short', 'narrow'
    year: 'numeric', //  values: 'numeric', '2-digit'
    month: 'short', //  values: 'numeric', '2-digit', 'long', 'short', 'narrow'
    day: 'numeric', //  values: 'numeric', '2-digit'
  }))

  let weatherUrl = new URL(`http://api.weatherapi.com/v1/future.json`);

  let queries = new URLSearchParams(weatherUrl.search);
  queries.append('key', '61b6b8b8c07140b38b6114538232109')
  queries.append('q', `${searchValue}`)
  queries.append('dt', `${currentDate}`)

  weatherUrl.search = queries;
  let weatherRequest = new Request(weatherUrl, header);
  let lala = await (0,_weather_js__WEBPACK_IMPORTED_MODULE_0__.getWeather)(weatherRequest)
  // console.log(lala)
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




function getWeather(weatherRequest){

fetch(weatherRequest).then(testIfitWorks).then(interactWithJson).catch((error) => console.log(error))

function testIfitWorks(response){
    console.log(response)
  if(response.ok){
   return response.json()
  }
}


function interactWithJson(jsonResponse){
// console.log(jsonResponse)
    return jsonResponse
}

}


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
/******/ 			// no module.id needed
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./input/fileImporter.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _functionality_weather_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functionality/weather.js */ "./input/functionality/weather.js");
/* harmony import */ var _functionality_search_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functionality/search.js */ "./input/functionality/search.js");
/* harmony import */ var _functionality_displayFollowingDays_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./functionality/displayFollowingDays.js */ "./input/functionality/displayFollowingDays.js");
/* harmony import */ var _functionality_date_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./functionality/date.js */ "./input/functionality/date.js");





})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1kYmU5ODEzNzg5Y2EyNzQxZjM4Mi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOzs7QUFHQTtBQUNBLHlDQUF5QyxpQkFBaUI7QUFDMUQsMkNBQTJDLGlCQUFpQjtBQUM1RCw2Q0FBNkMsaUJBQWlCO0FBQzlEOzs7QUFHQTs7Ozs7Ozs7Ozs7OztBQ3JCOEM7O0FBRTlDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDhEQUFvQjtBQUN4QyxvQkFBb0IsbUJBQW1CO0FBQ3ZDLG9CQUFvQixtQkFBbUI7QUFDdkMsb0JBQW9CLG1CQUFtQjs7QUFFdkM7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2R5Qzs7QUFFekM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7QUFLQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsWUFBWTtBQUNyQzs7QUFFQTtBQUNBOzs7QUFHQSxtQkFBbUIsdURBQVU7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0EseUJBQXlCLFlBQVk7QUFDckMsMEJBQTBCLFlBQVk7O0FBRXRDO0FBQ0E7QUFDQSxtQkFBbUIsdURBQVU7QUFDN0I7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25ETzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O1VDckJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNObUM7QUFDRDtBQUNjO0FBQ2hCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS8uL2lucHV0L2Z1bmN0aW9uYWxpdHkvZGF0ZS5qcyIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpLy4vaW5wdXQvZnVuY3Rpb25hbGl0eS9kaXNwbGF5Rm9sbG93aW5nRGF5cy5qcyIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpLy4vaW5wdXQvZnVuY3Rpb25hbGl0eS9zZWFyY2guanMiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS8uL2lucHV0L2Z1bmN0aW9uYWxpdHkvd2VhdGhlci5qcyIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS8uL2lucHV0L2ZpbGVJbXBvcnRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gZ2V0RGF0ZUZvbGxvd2luZ0RheXMoKSB7XG4gIGxldCB0b2RheSA9IG5ldyBEYXRlKCk7XG5cbiAgbGV0IGRheTEgPSBuZXcgRGF0ZSgpO1xuICBkYXkxLnNldERhdGUobmV3IERhdGUoKS5nZXREYXRlKCkgKzEpO1xuXG4gIGxldCBkYXkyID0gbmV3IERhdGUoKTtcbiAgZGF5Mi5zZXREYXRlKG5ldyBEYXRlKCkuZ2V0RGF0ZSgpICsyKTtcblxuXG4gIGxldCBkYXkzID0gbmV3IERhdGUoKTtcbiAgZGF5My5zZXREYXRlKG5ldyBEYXRlKCkuZ2V0RGF0ZSgpICszKTtcblxuXG4gIHJldHVybntcbiAgICBkYXkxOiBkYXkxLnRvTG9jYWxlU3RyaW5nKCdlbi11cycsIHsgd2Vla2RheTogJ2xvbmcnIH0pLFxuICAgICAgZGF5MjogZGF5Mi50b0xvY2FsZVN0cmluZygnZW4tdXMnLCB7IHdlZWtkYXk6ICdsb25nJyB9KSxcbiAgICAgICAgZGF5MzogZGF5My50b0xvY2FsZVN0cmluZygnZW4tdXMnLCB7IHdlZWtkYXk6ICdsb25nJyB9KVxuICB9XG5cblxufVxuIiwiaW1wb3J0IHtnZXREYXRlRm9sbG93aW5nRGF5c30gZnJvbSAnLi9kYXRlLmpzJ1xuXG5mdW5jdGlvbiBkaXNwbGF5Rm9sbG93aW5nRGF5cygpe1xuXG5jb25zdCBkYXkxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYXJ0aWNsZTpudGgtb2YtdHlwZSgzKSBkaXYgcCcpWzBdXG5jb25zdCBkYXkyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYXJ0aWNsZTpudGgtb2YtdHlwZSgzKSBkaXYgcCcpWzFdXG5jb25zdCBkYXkzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYXJ0aWNsZTpudGgtb2YtdHlwZSgzKSBkaXYgcCcpWzJdXG5kYXkxLmlubmVySFRNTCA9ICdsYWxhJ1xubGV0IGZvbGxvd2luZ0RheXMgPSBnZXREYXRlRm9sbG93aW5nRGF5cygpXG5kYXkxLmlubmVySFRNTCA9IGAke2ZvbGxvd2luZ0RheXMuZGF5MX06IDxzcGFuPjwvc3Bhbj5gXG5kYXkyLmlubmVySFRNTCA9IGAke2ZvbGxvd2luZ0RheXMuZGF5Mn06IDxzcGFuPjwvc3Bhbj5gXG5kYXkzLmlubmVySFRNTCA9IGAke2ZvbGxvd2luZ0RheXMuZGF5M306IDxzcGFuPjwvc3Bhbj5gXG5cbn1cbmRpc3BsYXlGb2xsb3dpbmdEYXlzKClcbiIsImltcG9ydCB7IGdldFdlYXRoZXIgfSBmcm9tICcuL3dlYXRoZXIuanMnXG5cbmxldCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBmb3JtIGJ1dHRvbmApO1xuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdXBkYXRlRXZlcnl0aGluZyk7XG5cbmZ1bmN0aW9uIHVwZGF0ZUV2ZXJ5dGhpbmcoKSB7XG4gIGxldCBzZWFyY2hWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGZvcm0gaW5wdXRbdHlwZT0nc2VhcmNoJ11gKS52YWx1ZTtcbiAgbGV0IGhlYWRlciA9IG5ldyBIZWFkZXJzKClcbiAgaGVhZGVyLmFwcGVuZCgnbW9kZScsICdjb3JzJyk7XG4gIGhlYWRlci5hcHBlbmQoJ21ldGhvZCcsICdHRVQnKTtcblxuICB1cGRhdGVDdXJyZW50VGltZShzZWFyY2hWYWx1ZSwgaGVhZGVyKVxuICB1cGRhdGVGb3JlY2FzdChzZWFyY2hWYWx1ZSwgaGVhZGVyKVxufVxuXG5cblxuXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVDdXJyZW50VGltZShzZWFyY2hWYWx1ZSwgaGVhZGVyKSB7XG5cbiAgbGV0IHdlYXRoZXJVcmwgPSBuZXcgVVJMKGBodHRwOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2N1cnJlbnQuanNvbmApO1xuICBsZXQgcXVlcmllcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2VhdGhlclVybC5zZWFyY2gpXG4gIHF1ZXJpZXMuYXBwZW5kKCdrZXknLCAnNjFiNmI4YjhjMDcxNDBiMzhiNjExNDUzODIzMjEwOScpO1xuICBxdWVyaWVzLmFwcGVuZCgncScsIGAke3NlYXJjaFZhbHVlfWApO1xuICBxdWVyaWVzLmFwcGVuZCgnYXFpJywgYG5vYCk7XG5cbiAgd2VhdGhlclVybC5zZWFyY2ggPSBxdWVyaWVzO1xuICBsZXQgd2VhdGhlclJlcXVlc3QgPSBuZXcgUmVxdWVzdCh3ZWF0aGVyVXJsLCBoZWFkZXIpO1xuXG5cbiAgbGV0IGxhbGEgPSBhd2FpdCBnZXRXZWF0aGVyKHdlYXRoZXJSZXF1ZXN0KVxuICAvLyBjb25zb2xlLmxvZyhsYWxhKVxufVxuXG4vLyB3b3JrIG9uIHRoaXMgXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVGb3JlY2FzdChzZWFyY2hWYWx1ZSwgaGVhZGVyKSB7XG4gIGxldCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxuICBjb25zb2xlLmxvZyhjdXJyZW50RGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJywge1xuICAgIHdlZWtkYXk6ICdsb25nJywgLy8gIHZhbHVlczogJ2xvbmcnLCAnc2hvcnQnLCAnbmFycm93J1xuICAgIHllYXI6ICdudW1lcmljJywgLy8gIHZhbHVlczogJ251bWVyaWMnLCAnMi1kaWdpdCdcbiAgICBtb250aDogJ3Nob3J0JywgLy8gIHZhbHVlczogJ251bWVyaWMnLCAnMi1kaWdpdCcsICdsb25nJywgJ3Nob3J0JywgJ25hcnJvdydcbiAgICBkYXk6ICdudW1lcmljJywgLy8gIHZhbHVlczogJ251bWVyaWMnLCAnMi1kaWdpdCdcbiAgfSkpXG5cbiAgbGV0IHdlYXRoZXJVcmwgPSBuZXcgVVJMKGBodHRwOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2Z1dHVyZS5qc29uYCk7XG5cbiAgbGV0IHF1ZXJpZXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdlYXRoZXJVcmwuc2VhcmNoKTtcbiAgcXVlcmllcy5hcHBlbmQoJ2tleScsICc2MWI2YjhiOGMwNzE0MGIzOGI2MTE0NTM4MjMyMTA5JylcbiAgcXVlcmllcy5hcHBlbmQoJ3EnLCBgJHtzZWFyY2hWYWx1ZX1gKVxuICBxdWVyaWVzLmFwcGVuZCgnZHQnLCBgJHtjdXJyZW50RGF0ZX1gKVxuXG4gIHdlYXRoZXJVcmwuc2VhcmNoID0gcXVlcmllcztcbiAgbGV0IHdlYXRoZXJSZXF1ZXN0ID0gbmV3IFJlcXVlc3Qod2VhdGhlclVybCwgaGVhZGVyKTtcbiAgbGV0IGxhbGEgPSBhd2FpdCBnZXRXZWF0aGVyKHdlYXRoZXJSZXF1ZXN0KVxuICAvLyBjb25zb2xlLmxvZyhsYWxhKVxufVxuIiwiXG5cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2VhdGhlcih3ZWF0aGVyUmVxdWVzdCl7XG5cbmZldGNoKHdlYXRoZXJSZXF1ZXN0KS50aGVuKHRlc3RJZml0V29ya3MpLnRoZW4oaW50ZXJhY3RXaXRoSnNvbikuY2F0Y2goKGVycm9yKSA9PiBjb25zb2xlLmxvZyhlcnJvcikpXG5cbmZ1bmN0aW9uIHRlc3RJZml0V29ya3MocmVzcG9uc2Upe1xuICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICBpZihyZXNwb25zZS5vayl7XG4gICByZXR1cm4gcmVzcG9uc2UuanNvbigpXG4gIH1cbn1cblxuXG5mdW5jdGlvbiBpbnRlcmFjdFdpdGhKc29uKGpzb25SZXNwb25zZSl7XG4vLyBjb25zb2xlLmxvZyhqc29uUmVzcG9uc2UpXG4gICAgcmV0dXJuIGpzb25SZXNwb25zZVxufVxuXG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9mdW5jdGlvbmFsaXR5L3dlYXRoZXIuanMnXG5pbXBvcnQgJy4vZnVuY3Rpb25hbGl0eS9zZWFyY2guanMnXG5pbXBvcnQgJy4vZnVuY3Rpb25hbGl0eS9kaXNwbGF5Rm9sbG93aW5nRGF5cy5qcydcbmltcG9ydCAnLi9mdW5jdGlvbmFsaXR5L2RhdGUuanMnXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=