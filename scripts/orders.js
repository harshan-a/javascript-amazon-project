import orderObj from '../data/ordersData.js';
import {loadProductsFetch, getProduct} from '../data/products.js';
import {cart} from '../data/cart-class.js';


async function loadPage() {
  try{
    await loadProductsFetch();

    renderHTML();

  } catch (err) {
    document.querySelector('.js-orders-grid').innerHTML = err;
    console.log(err)
    console.log('Unexpected error. Try again Later.');
  }
  
}
loadPage();

function renderHTML() {
  let orderHTML = noOrdersHTML() || '';

  orderObj.orders.forEach((order) => {
    orderHTML += `
      <div class="order-container">
            
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${order.getDateString(order.orderTime)}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>${order.getTotalPrice()}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${productsHTML(order)}
        </div>
      </div>
    `;

  });

  function productsHTML(order) {
    let productHTML = '';

    order.products.forEach((product) => {
      const matchingProduct = getProduct(product.productId);

      productHTML += `
        <div class="product-image-container">
          <img src= ${matchingProduct.image}>
        </div>
  
        <div class="product-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${order.getDateString(product.estimatedDeliveryTime)}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary
            js-buy-again-button"
            data-product-id = ${product.productId}>
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
  
        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });

    return productHTML;
  };


  function noOrdersHTML() {
    if(orderObj.orders.length !== 0) {
      return ;
    };

    const noOrdersHTML = `
      <div>No orders yet &#128524;</div>
      <a href="checkout.html">
        View Cart
      </a>
    `;

    return noOrdersHTML;
  };

  document.querySelector('.js-orders-grid').innerHTML = orderHTML;
  
  document.querySelectorAll('.js-buy-again-button')
    .forEach((button) => {
      let timeOut;
      button.addEventListener('click', () => {
        const {productId} = button.dataset;
        
        cart.addToCart(productId);

        button.innerHTML = 'Added';
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
          button.innerHTML = `
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          `;
        }, 1000);
        updateCartQuantity();
      });
    });
  



  function updateCartQuantity() {
    const cartQuantity = cart.calculateCartQuantity();
  
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  };
  updateCartQuantity();
};