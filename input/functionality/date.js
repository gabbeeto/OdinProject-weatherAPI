export function getDateFollowingDays() {
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
