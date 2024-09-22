import {loadProductsFetch, getProduct} from '../data/products.js';
import orderObj from '../data/ordersData.js';
import {renderHeader} from './general/header.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';




async function loadPage() {
  await loadProductsFetch();

  renderHeader();
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

  const progressPercent = calculateProgressPercent();

  const trackingHTML = `
    <div class="order-tracking">
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        ${getTrackingDateString(productDetails.estimatedDeliveryTime)}
      </div>

      <div class="product-info">
        ${matchingProduct.name}
      </div>

      <div class="product-info">
        Quantity: ${productDetails.quantity}
      </div>

      <img class="product-image" src="${matchingProduct.image}">

      <div class="progress-labels-container">
        <div class="progress-label
          ${progressPercent < 50 ? 'current-status' : ''}">
          Preparing
        </div>
        <div class="progress-label 
          ${(progressPercent >= 50 && progressPercent < 100) ? 'current-status' : ''}">
          Shipped
        </div>
        <div class="progress-label
          ${progressPercent >= 100 ? 'current-status' : ''}">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar js-progress-bar"></div>
      </div>
    </div>
  `;


  document.querySelector('.js-tracking-main')
    .innerHTML = trackingHTML;


  document.querySelector('.js-progress-bar')
    .style.width = `${progressPercent}%`;





  function getTrackingDateString(date) {
    return `Arriving on ${dayjs(date).format('dddd, MMMM D')}`;
  };
  
  function calculateProgressPercent() {
    const orderTime = new Date(matchingOrder.orderTime);
    const currentTime = new Date();
    const deliveryTime = new Date(productDetails.estimatedDeliveryTime);
    console.log(matchingOrder)

    return (((currentTime - orderTime) / (deliveryTime - orderTime)) * 100);
  };
  
};
