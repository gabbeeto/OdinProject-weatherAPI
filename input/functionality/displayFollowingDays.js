import { getDateFollowingDays } from './date.js'

function displayFollowingDays() {

  const day1 = document.querySelectorAll('article:nth-of-type(3) div p')[0]
  const day2 = document.querySelectorAll('article:nth-of-type(3) div p')[1]
  const day3 = document.querySelectorAll('article:nth-of-type(3) div p')[2]
  day1.innerHTML = 'lala'
  let followingDays = getDateFollowingDays()
  day1.innerHTML = `${followingDays.day1}: <span></span>`
  day2.innerHTML = `${followingDays.day2}: <span></span>`
  day3.innerHTML = `${followingDays.day3}: <span></span>`

}
displayFollowingDays()
