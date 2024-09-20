import {loadProductsFetch, getProduct} from '../data/products.js';
import orderObj from '../data/ordersData.js';
import {renderHeader} from './general/header.js';


renderHeader();

async function loadPage() {
  await loadProductsFetch();

  renderTrackingHTML();
};
loadPage();


function renderTrackingHTML() {
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');


  const matchingOrder = orderObj.getOrder(orderId);
  const matchingProduct = getProduct(productId);

  let productDetails;
  matchingOrder.products.forEach((product) => {
    if(productId === product.productId) {
      productDetails = product;
    }
  });

  const trackingHTML = `
    <div class="order-tracking">
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        ${matchingOrder.getTrackingDateString(productDetails.estimatedDeliveryTime)}
      </div>

      <div class="product-info">
        ${matchingProduct.name}
      </div>

      <div class="product-info">
        Quantity: ${productDetails.quantity}
      </div>

      <img class="product-image" src="${matchingProduct.image}">

      <div class="progress-labels-container">
        <div class="progress-label">
          Preparing
        </div>
        <div class="progress-label current-status">
          Shipped
        </div>
        <div class="progress-label">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar"></div>
      </div>
    </div>
  `;


  document.querySelector('.js-tracking-main')
    .innerHTML = trackingHTML;
};
