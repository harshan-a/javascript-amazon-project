import orderObj from '../data/ordersData.js';
import {loadProductsFetch, getProduct} from '../data/products.js';


async function loadPage() {
  try{
    await loadProductsFetch();

    renderHTML();

  } catch (err) {
    console.log(err)
    console.log('Unexpected error. Try again Later.');
  }
  
}
loadPage();

function renderHTML() {
  let orderHTML = '';

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
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
  
        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });

    return productHTML;
  };

  document.querySelector('.js-orders-grid').innerHTML = orderHTML;
};