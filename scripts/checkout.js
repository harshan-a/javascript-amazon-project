import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {renderCheckoutHeader} from  './checkout/checkoutHeader.js';
import {loadProducts, loadProductsFetch} from '../data/products.js';
import {cart} from '../data/cart-class.js';
// import '../data/car.js';
// import '../data/backend-practice.js';


async function loadPage() {
  await loadProductsFetch();

  await new Promise((resolve) => {
    cart.loadCart(() => {
      resolve('hi2');
    });
  });

  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
}
loadPage();

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    cart.loadCart(() => {
      resolve('hi2');
    });
  })
  
]).then((value) => {
  // console.log(value);
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});
*/

/*
new Promise ((resolve) => {
 loadProducts(() => {
  resolve('hii');
 });

}).then((value) => {
  console.log(value);
  return new Promise((resolve) => {
    cart.loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});
*/


/*
loadProducts(() => {
  cart.loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
  });
});
*/