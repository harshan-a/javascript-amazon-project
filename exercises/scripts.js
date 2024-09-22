/*
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
*/


/*
const url = 'https://supersimplebackend.dev/greeting';
function ex_18a() {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', (res) => {
    console.log(xhr.response);
  });

  xhr.addEventListener('error', (error) => {
    renderError(error.type);
  });

  xhr.open('GET', url);
  xhr.send();
}
ex_18a();


function ex_18b() {
  fetch(url).then((res) => {
    if(!res.ok) {
      throw res;
    }
    return res.text();

  }).then((data) => {
    console.log(data);

  }).catch((err) => {
    renderError(err);
  });
}
ex_18b();


async function ex_18c() {
  try{
    const response = await fetch(url);
    if(!response.ok) {
      throw response;
    }
    const text = await response.text();
    console.log(text);

  } catch (err) {
    renderError(err);
  };
};
ex_18c();


async function ex_18d() {
  try{
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Harshan'
      })
    });
    if(!res.ok) {
      throw res;
    };
    const text = await res.text();
    console.log(text);

  } catch (err) {
    renderError(err);
  };
};
ex_18d();


async function ex_18ef() {
  try{
    const res = await fetch('https://amazon.com');
    const data = await res.json();
    console.log(data);
    
  } catch (err) {
    renderError('CORS error. Your request was blocked by the backend.');
  }
}
ex_18ef();


async function ex_18g() {
  try{
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(!res.ok) {
      throw res;
    };
    const text = await res.text();
    console.log(res);
    console.log(text);

  } catch (err) {
    renderError(err);
  };
};
ex_18g();




async function renderError(err) {
  if(err.status >= 400) {
    const errObj = await err.json();
    console.log(errObj);
  } else {
    console.log(err);
  }
}
*/

navigator.geolocation.getCurrentPosition(showPosition, showError);

const elem = document.querySelector('.class1');


function showPosition(pos) {
  const {
    accuracy, 
    altitude, 
    altitudeAccuracy, 
    heading, 
    latitude, 
    longitude, 
    speed} = pos.coords;

    elem.innerHTML = accuracy + '<br />';
    elem.innerHTML += altitude + '<br />';
    elem.innerHTML += latitude + '<br />';
    elem.innerHTML += longitude + '<br />';
    elem.innerHTML += speed + '<br />';

    
}
function showError(err) {
  console.log(err);
}