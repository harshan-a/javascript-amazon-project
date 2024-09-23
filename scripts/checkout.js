import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {renderCheckoutHeader} from  './checkout/checkoutHeader.js';
import {loadProducts, loadProductsFetch} from '../data/products.js';
import {cart} from '../data/cart-class.js';
// import '../data/car.js';
// import '../data/backend-practice.js';


async function loadPage() {

  try {
    /*
    // throw 'error1' cause manual error
    await loadProductsFetch();

    await cart.loadCartFetch();
    
    await new Promise((resolve, reject) => {
      // throw 'error2';
      cart.loadCart(() => {
        resolve('this will be returned');
        // reject('error3'); 
        
        // code inside the loadCart() 
        // wil be run in future, so create a manual error 
        // using reject() 
      });
    });
    */

    const [res1, res2] = await Promise.all([
      loadProductsFetch(),
      cart.loadCartFetch()
    ]);

    if(!res1 || !res2) {
      throw [res1, res2];
    }

    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();

  } catch (error) {
    console.log(error);
  };
};
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