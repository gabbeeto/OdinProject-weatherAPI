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


function displayFollowingDays() {

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


const key =  '61b6b8b8c07140b38b6114538232109';

let button = document.querySelector(`form button`);
button.addEventListener('click', updateForecast);


// work on this 
async function updateForecast() {

  let searchValue = document.querySelector(`form input[type='search']`).value;
  let header = new Headers()
  header.append('mode', 'cors');
  header.append('method', 'GET');


  let currentDateWithYYYMMDDFormat = new Date().toISOString().split('T')[0];

  let weatherUrl = new URL(`http://api.weatherapi.com/v1/forecast.json`);

  let queries = new URLSearchParams(weatherUrl.search);
  queries.append('key', key)
  queries.append('q', `${searchValue}`)
  queries.append('days', `3`)
  queries.append('aqi', `no`)
  queries.append('dt', `${currentDateWithYYYMMDDFormat}`)
  weatherUrl.search = queries;

  let weatherRequest = new Request(weatherUrl, header);
  let lala = await (0,_weather_js__WEBPACK_IMPORTED_MODULE_0__.getWeather)(weatherRequest)
  console.log(lala)
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
    // console.log(response)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1jODI4NjJhYzY4MTJmOGU1MzNkNC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOzs7QUFHQTtBQUNBLHlDQUF5QyxpQkFBaUI7QUFDMUQsMkNBQTJDLGlCQUFpQjtBQUM1RCw2Q0FBNkMsaUJBQWlCO0FBQzlEOzs7QUFHQTs7Ozs7Ozs7Ozs7OztBQ3JCZ0Q7O0FBRWhEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDhEQUFvQjtBQUMxQyxzQkFBc0IsbUJBQW1CO0FBQ3pDLHNCQUFzQixtQkFBbUI7QUFDekMsc0JBQXNCLG1CQUFtQjs7QUFFekM7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2R5Qzs7QUFFekM7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHlCQUF5QixZQUFZO0FBQ3JDO0FBQ0E7QUFDQSwwQkFBMEIsNkJBQTZCO0FBQ3ZEOztBQUVBO0FBQ0EsbUJBQW1CLHVEQUFVO0FBQzdCO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Qk87O0FBRVA7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztVQ3JCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTm1DO0FBQ0Q7QUFDYztBQUNoQiIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvLi9pbnB1dC9mdW5jdGlvbmFsaXR5L2RhdGUuanMiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS8uL2lucHV0L2Z1bmN0aW9uYWxpdHkvZGlzcGxheUZvbGxvd2luZ0RheXMuanMiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS8uL2lucHV0L2Z1bmN0aW9uYWxpdHkvc2VhcmNoLmpzIiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvLi9pbnB1dC9mdW5jdGlvbmFsaXR5L3dlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGlucHJvamVjdC13ZWF0aGVyYXBpL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2RpbnByb2plY3Qtd2VhdGhlcmFwaS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW5wcm9qZWN0LXdlYXRoZXJhcGkvLi9pbnB1dC9maWxlSW1wb3J0ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGdldERhdGVGb2xsb3dpbmdEYXlzKCkge1xuICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuXG4gIGxldCBkYXkxID0gbmV3IERhdGUoKTtcbiAgZGF5MS5zZXREYXRlKG5ldyBEYXRlKCkuZ2V0RGF0ZSgpICsxKTtcblxuICBsZXQgZGF5MiA9IG5ldyBEYXRlKCk7XG4gIGRheTIuc2V0RGF0ZShuZXcgRGF0ZSgpLmdldERhdGUoKSArMik7XG5cblxuICBsZXQgZGF5MyA9IG5ldyBEYXRlKCk7XG4gIGRheTMuc2V0RGF0ZShuZXcgRGF0ZSgpLmdldERhdGUoKSArMyk7XG5cblxuICByZXR1cm57XG4gICAgZGF5MTogZGF5MS50b0xvY2FsZVN0cmluZygnZW4tdXMnLCB7IHdlZWtkYXk6ICdsb25nJyB9KSxcbiAgICAgIGRheTI6IGRheTIudG9Mb2NhbGVTdHJpbmcoJ2VuLXVzJywgeyB3ZWVrZGF5OiAnbG9uZycgfSksXG4gICAgICAgIGRheTM6IGRheTMudG9Mb2NhbGVTdHJpbmcoJ2VuLXVzJywgeyB3ZWVrZGF5OiAnbG9uZycgfSlcbiAgfVxuXG5cbn1cbiIsImltcG9ydCB7IGdldERhdGVGb2xsb3dpbmdEYXlzIH0gZnJvbSAnLi9kYXRlLmpzJ1xuXG5mdW5jdGlvbiBkaXNwbGF5Rm9sbG93aW5nRGF5cygpIHtcblxuICBjb25zdCBkYXkxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYXJ0aWNsZTpudGgtb2YtdHlwZSgzKSBkaXYgcCcpWzBdXG4gIGNvbnN0IGRheTIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhcnRpY2xlOm50aC1vZi10eXBlKDMpIGRpdiBwJylbMV1cbiAgY29uc3QgZGF5MyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2FydGljbGU6bnRoLW9mLXR5cGUoMykgZGl2IHAnKVsyXVxuICBkYXkxLmlubmVySFRNTCA9ICdsYWxhJ1xuICBsZXQgZm9sbG93aW5nRGF5cyA9IGdldERhdGVGb2xsb3dpbmdEYXlzKClcbiAgZGF5MS5pbm5lckhUTUwgPSBgJHtmb2xsb3dpbmdEYXlzLmRheTF9OiA8c3Bhbj48L3NwYW4+YFxuICBkYXkyLmlubmVySFRNTCA9IGAke2ZvbGxvd2luZ0RheXMuZGF5Mn06IDxzcGFuPjwvc3Bhbj5gXG4gIGRheTMuaW5uZXJIVE1MID0gYCR7Zm9sbG93aW5nRGF5cy5kYXkzfTogPHNwYW4+PC9zcGFuPmBcblxufVxuZGlzcGxheUZvbGxvd2luZ0RheXMoKVxuIiwiaW1wb3J0IHsgZ2V0V2VhdGhlciB9IGZyb20gJy4vd2VhdGhlci5qcydcblxuY29uc3Qga2V5ID0gICc2MWI2YjhiOGMwNzE0MGIzOGI2MTE0NTM4MjMyMTA5JztcblxubGV0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGZvcm0gYnV0dG9uYCk7XG5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1cGRhdGVGb3JlY2FzdCk7XG5cblxuLy8gd29yayBvbiB0aGlzIFxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlRm9yZWNhc3QoKSB7XG5cbiAgbGV0IHNlYXJjaFZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgZm9ybSBpbnB1dFt0eXBlPSdzZWFyY2gnXWApLnZhbHVlO1xuICBsZXQgaGVhZGVyID0gbmV3IEhlYWRlcnMoKVxuICBoZWFkZXIuYXBwZW5kKCdtb2RlJywgJ2NvcnMnKTtcbiAgaGVhZGVyLmFwcGVuZCgnbWV0aG9kJywgJ0dFVCcpO1xuXG5cbiAgbGV0IGN1cnJlbnREYXRlV2l0aFlZWU1NRERGb3JtYXQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXTtcblxuICBsZXQgd2VhdGhlclVybCA9IG5ldyBVUkwoYGh0dHA6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbmApO1xuXG4gIGxldCBxdWVyaWVzID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3ZWF0aGVyVXJsLnNlYXJjaCk7XG4gIHF1ZXJpZXMuYXBwZW5kKCdrZXknLCBrZXkpXG4gIHF1ZXJpZXMuYXBwZW5kKCdxJywgYCR7c2VhcmNoVmFsdWV9YClcbiAgcXVlcmllcy5hcHBlbmQoJ2RheXMnLCBgM2ApXG4gIHF1ZXJpZXMuYXBwZW5kKCdhcWknLCBgbm9gKVxuICBxdWVyaWVzLmFwcGVuZCgnZHQnLCBgJHtjdXJyZW50RGF0ZVdpdGhZWVlNTURERm9ybWF0fWApXG4gIHdlYXRoZXJVcmwuc2VhcmNoID0gcXVlcmllcztcblxuICBsZXQgd2VhdGhlclJlcXVlc3QgPSBuZXcgUmVxdWVzdCh3ZWF0aGVyVXJsLCBoZWFkZXIpO1xuICBsZXQgbGFsYSA9IGF3YWl0IGdldFdlYXRoZXIod2VhdGhlclJlcXVlc3QpXG4gIGNvbnNvbGUubG9nKGxhbGEpXG59XG4iLCJcblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXZWF0aGVyKHdlYXRoZXJSZXF1ZXN0KXtcblxucmV0dXJuIGZldGNoKHdlYXRoZXJSZXF1ZXN0KS50aGVuKHRlc3RJZml0V29ya3MpLnRoZW4oaW50ZXJhY3RXaXRoSnNvbikuY2F0Y2goKGVycm9yKSA9PiBjb25zb2xlLmxvZyhlcnJvcikpXG5cbmZ1bmN0aW9uIHRlc3RJZml0V29ya3MocmVzcG9uc2Upe1xuICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICBpZihyZXNwb25zZS5vayl7XG4gICByZXR1cm4gcmVzcG9uc2UuanNvbigpXG4gIH1cbn1cblxuXG5mdW5jdGlvbiBpbnRlcmFjdFdpdGhKc29uKGpzb25SZXNwb25zZSl7XG4vLyBjb25zb2xlLmxvZyhqc29uUmVzcG9uc2UpXG4gICAgcmV0dXJuIGpzb25SZXNwb25zZVxufVxuXG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9mdW5jdGlvbmFsaXR5L3dlYXRoZXIuanMnXG5pbXBvcnQgJy4vZnVuY3Rpb25hbGl0eS9zZWFyY2guanMnXG5pbXBvcnQgJy4vZnVuY3Rpb25hbGl0eS9kaXNwbGF5Rm9sbG93aW5nRGF5cy5qcydcbmltcG9ydCAnLi9mdW5jdGlvbmFsaXR5L2RhdGUuanMnXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=