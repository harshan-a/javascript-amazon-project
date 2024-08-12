import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import isSatSun from '../scripts/utils/isWeekend.js';

const today = dayjs();

const after5Days = today.add(5, 'Days');
console.log(formatDate(after5Days));

const after1Month = today.add(1, 'Month');
console.log(formatDate(after1Month));

const before1Month = today.subtract(1, 'Month');
console.log(formatDate(before1Month));

function formatDate(date) {
  const formatDate = date.format('M D');
  return formatDate;
};

console.log(isSatSun('Saturday'));
console.log(isSatSun('Sunday'));