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

/***/ "./input/functionality/displayFollowingDays.js":
/*!*****************************************************!*\
  !*** ./input/functionality/displayFollowingDays.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./date.js */ "./input/functionality/date.js");


function displayFollowingDays() {

  const day1 = document.querySelectorAll('article:nth-of-type(3) div p')[0]
  const day2 = document.querySelectorAll('article:nth-of-type(3) div p')[1]
  day1.innerHTML = 'lala'
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


const key =  '61b6b8b8c07140b38b6114538232109';

let button = document.querySelector(`form button`);
button.addEventListener('click', updateForecast);


async function updateForecast() {

  let searchValue = document.querySelector(`form input[type='search']`).value;
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
  let forecastData = await (0,_weather_js__WEBPACK_IMPORTED_MODULE_0__.getWeather)(weatherRequest)
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

return fetch(weatherRequest).then(testIfitWorks).then(interactWithJson).catch((error) => console.log(error))

function testIfitWorks(response){
  if(response.ok){
   return response.json()
  }
}


function interactWithJson(jsonResponse){
    return jsonResponse.forecast.forecastday
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi03MGYzYzM2Y2M3NDBiNjIzNGFhMy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7OztBQUtBO0FBQ0EseUNBQXlDLGlCQUFpQjtBQUMxRCx5Q0FBeUMsaUJBQWlCO0FBQzFEOzs7QUFHQTs7Ozs7Ozs7Ozs7OztBQ2xCZ0Q7O0FBRWhEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiw4REFBb0I7QUFDMUMsc0JBQXNCLG1CQUFtQjtBQUN6QyxzQkFBc0IsbUJBQW1COztBQUV6QztBQUNBOzs7Ozs7Ozs7Ozs7O0FDWnlDOztBQUV6Qzs7QUFFQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBLHlCQUF5QixZQUFZO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCLHVEQUFVO0FBQ3JDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEJPOztBQUVQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztVQ25CQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTm1DO0FBQ0Q7QUFDYztBQUNoQiIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvLi9pbnB1dC9mdW5jdGlvbmFsaXR5L2RhdGUuanMiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS8uL2lucHV0L2Z1bmN0aW9uYWxpdHkvZGlzcGxheUZvbGxvd2luZ0RheXMuanMiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS8uL2lucHV0L2Z1bmN0aW9uYWxpdHkvc2VhcmNoLmpzIiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvLi9pbnB1dC9mdW5jdGlvbmFsaXR5L3dlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvLi9pbnB1dC9maWxlSW1wb3J0ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGdldERhdGVGb2xsb3dpbmdEYXlzKCkge1xuICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuXG4gIGxldCBkYXkxID0gbmV3IERhdGUoKTtcbiAgZGF5MS5zZXREYXRlKG5ldyBEYXRlKCkuZ2V0RGF0ZSgpICsgMSk7XG5cbiAgbGV0IGRheTIgPSBuZXcgRGF0ZSgpO1xuICBkYXkyLnNldERhdGUobmV3IERhdGUoKS5nZXREYXRlKCkgKyAyKTtcblxuXG5cblxuICByZXR1cm4ge1xuICAgIGRheTE6IGRheTEudG9Mb2NhbGVTdHJpbmcoJ2VuLXVzJywgeyB3ZWVrZGF5OiAnbG9uZycgfSksXG4gICAgZGF5MjogZGF5Mi50b0xvY2FsZVN0cmluZygnZW4tdXMnLCB7IHdlZWtkYXk6ICdsb25nJyB9KSxcbiAgfVxuXG5cbn1cbiIsImltcG9ydCB7IGdldERhdGVGb2xsb3dpbmdEYXlzIH0gZnJvbSAnLi9kYXRlLmpzJ1xuXG5mdW5jdGlvbiBkaXNwbGF5Rm9sbG93aW5nRGF5cygpIHtcblxuICBjb25zdCBkYXkxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYXJ0aWNsZTpudGgtb2YtdHlwZSgzKSBkaXYgcCcpWzBdXG4gIGNvbnN0IGRheTIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhcnRpY2xlOm50aC1vZi10eXBlKDMpIGRpdiBwJylbMV1cbiAgZGF5MS5pbm5lckhUTUwgPSAnbGFsYSdcbiAgbGV0IGZvbGxvd2luZ0RheXMgPSBnZXREYXRlRm9sbG93aW5nRGF5cygpXG4gIGRheTEuaW5uZXJIVE1MID0gYCR7Zm9sbG93aW5nRGF5cy5kYXkxfTogPHNwYW4+PC9zcGFuPmBcbiAgZGF5Mi5pbm5lckhUTUwgPSBgJHtmb2xsb3dpbmdEYXlzLmRheTJ9OiA8c3Bhbj48L3NwYW4+YFxuXG59XG5kaXNwbGF5Rm9sbG93aW5nRGF5cygpXG4iLCJpbXBvcnQgeyBnZXRXZWF0aGVyIH0gZnJvbSAnLi93ZWF0aGVyLmpzJ1xuXG5jb25zdCBrZXkgPSAgJzYxYjZiOGI4YzA3MTQwYjM4YjYxMTQ1MzgyMzIxMDknO1xuXG5sZXQgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgZm9ybSBidXR0b25gKTtcbmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHVwZGF0ZUZvcmVjYXN0KTtcblxuXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVGb3JlY2FzdCgpIHtcblxuICBsZXQgc2VhcmNoVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBmb3JtIGlucHV0W3R5cGU9J3NlYXJjaCddYCkudmFsdWU7XG4gIGxldCBoZWFkZXIgPSBuZXcgSGVhZGVycygpXG4gIGhlYWRlci5hcHBlbmQoJ21vZGUnLCAnY29ycycpO1xuICBoZWFkZXIuYXBwZW5kKCdtZXRob2QnLCAnR0VUJyk7XG5cblxuICBsZXQgd2VhdGhlclVybCA9IG5ldyBVUkwoYGh0dHA6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbmApO1xuXG4gIGxldCBxdWVyaWVzID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3ZWF0aGVyVXJsLnNlYXJjaCk7XG4gIHF1ZXJpZXMuYXBwZW5kKCdrZXknLCBrZXkpXG4gIHF1ZXJpZXMuYXBwZW5kKCdxJywgYCR7c2VhcmNoVmFsdWV9YClcbiAgcXVlcmllcy5hcHBlbmQoJ2RheXMnLCBgM2ApXG4gIHF1ZXJpZXMuYXBwZW5kKCdhcWknLCBgbm9gKVxuICBxdWVyaWVzLmFwcGVuZCgnYWxlcnRzJywgYG5vYClcbiAgd2VhdGhlclVybC5zZWFyY2ggPSBxdWVyaWVzO1xuXG4gIGxldCB3ZWF0aGVyUmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHdlYXRoZXJVcmwsIGhlYWRlcik7XG4gIGxldCBmb3JlY2FzdERhdGEgPSBhd2FpdCBnZXRXZWF0aGVyKHdlYXRoZXJSZXF1ZXN0KVxufVxuIiwiXG5cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2VhdGhlcih3ZWF0aGVyUmVxdWVzdCl7XG5cbnJldHVybiBmZXRjaCh3ZWF0aGVyUmVxdWVzdCkudGhlbih0ZXN0SWZpdFdvcmtzKS50aGVuKGludGVyYWN0V2l0aEpzb24pLmNhdGNoKChlcnJvcikgPT4gY29uc29sZS5sb2coZXJyb3IpKVxuXG5mdW5jdGlvbiB0ZXN0SWZpdFdvcmtzKHJlc3BvbnNlKXtcbiAgaWYocmVzcG9uc2Uub2spe1xuICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxuICB9XG59XG5cblxuZnVuY3Rpb24gaW50ZXJhY3RXaXRoSnNvbihqc29uUmVzcG9uc2Upe1xuICAgIHJldHVybiBqc29uUmVzcG9uc2UuZm9yZWNhc3QuZm9yZWNhc3RkYXlcbn1cblxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vZnVuY3Rpb25hbGl0eS93ZWF0aGVyLmpzJ1xuaW1wb3J0ICcuL2Z1bmN0aW9uYWxpdHkvc2VhcmNoLmpzJ1xuaW1wb3J0ICcuL2Z1bmN0aW9uYWxpdHkvZGlzcGxheUZvbGxvd2luZ0RheXMuanMnXG5pbXBvcnQgJy4vZnVuY3Rpb25hbGl0eS9kYXRlLmpzJ1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9