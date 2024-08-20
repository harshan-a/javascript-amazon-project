import {formatCurrency} from '../scripts/utils/money.js';

console.log('test suite: formatCurrency');

console.log('convert cents into dollars');

if(formatCurrency(1095) === '10.95') {
  console.log('Passed');
} else {
  console.log('Failed');
};

console.log('works with 0');

if(formatCurrency(0) === '0.00') {
  console.log('Passed');
} else {
  console.log('Failed');
};

console.log('round up to the nearest cent');

if(formatCurrency(2000.5) === '20.01') {
  console.log('Passed');
} else {
  console.log('Failed');
};

console.log('round down to the nearest cent');

if(formatCurrency(2000.4) === '20.00') {
  console.log('Passed');
} else {
  console.log('Failed');
};