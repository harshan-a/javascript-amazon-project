import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const today = dayjs();
const dayOfWeek = today.format('dddd');

// console.log(dayOfWeek);

function isWeekEnd(dayjs) {
  const date = dayjs.format('dddd');
  if(date === 'Saturday' || date === 'Sunday') {
    return date;
  };
};

// console.log(isWeekEnd('Saturday'));
// console.log(isWeekEnd('Sunday'));
// console.log(isWeekEnd(dayOfWeek));

export default isWeekEnd;