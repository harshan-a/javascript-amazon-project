const orders = JSON.parse(localStorage.getItem('order')) || [];

export function loadOrder(cart) {
  const promise = fetch('https://supersimplebackend.dev/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cart: cart
    })

  }).then((response) => {
    console.log('load order');
    return response;

  }).catch((error) => {
    console.log(error + '. Try again Later.');
  });

  return promise;
};


export function addOrder(order) {
  orders.unshift(order);
  saveToLocalStorage();
  console.log(orders);
};


function saveToLocalStorage() {
  localStorage.setItem('order', JSON.stringify(orders));
}

