import { getDateFollowingDays } from './date.js'

function displayFollowingDays() {

  const day1 = document.querySelector('article:nth-of-type(3) div p')
  const day2 = document.querySelector('article:nth-of-type(3) div:nth-of-type(2) p')
  let followingDays = getDateFollowingDays()
  day1.innerHTML = `${followingDays.day1}: <span></span>`
  day2.innerHTML = `${followingDays.day2}: <span></span>`
}

displayFollowingDays()
