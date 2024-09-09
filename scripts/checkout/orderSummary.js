import {cart} from '../../data/cart-class.js';
import { getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { 
  deliveryOptions,
  getDeliveryOption,
  calculateDeliveryDate
} from '../../data/deliveryOptions.js';

import {renderPaymentSummary} from './paymentSummary.js';
import {renderCheckoutHeader} from './checkoutHeader.js';

export function renderOrderSummary() {
  let orderSummaryHTML = '';

  cart.cartItems.forEach((cartItem) => {
    const { productId, deliveryOptionId } = cartItem;
    
    let matchingProduct = getProduct(productId);

    let deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

    orderSummaryHTML += `
      <div class="cart-item-container 
        js-cart-item-container
        js-cart-item-container-${productId}"
      >
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name js-product-name-${productId}">
              ${matchingProduct.name}
            </div>
            <div class="product-price js-product-price-${productId}">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity
             js-product-quantity-${productId}">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${productId}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${productId}">
                Update
              </span>
              <input type="number" class="quantity-input js-quantity-input-${productId}" value="${cartItem.quantity}">
              <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${productId}">
                Save
              </span>
              <span class="delete-quantity-link link-primary
               js-delete-quantity-link
               js-delete-quantity-link-${productId}"
               data-product-id="${productId}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(productId, cartItem)}
          </div>
        </div>
      </div>
    `
  });

  function deliveryOptionsHTML(productId, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);

      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `${formatCurrency(deliveryOption.priceCents)} -`;

      const ischecked = deliveryOption.id === cartItem.deliveryOptionId;
      
      html += `
        <div class="
          delivery-option js-delivery-option
          js-delivery-option-${productId}-${deliveryOption.id}"
          data-product-id="${productId}"
          data-delivery-option-id="${deliveryOption.id}"
        >
          <input type="radio"
            class="
            delivery-option-input
            js-delivery-option-input-${productId}-${deliveryOption.id}"
            name="delivery-option-${productId}"
            ${ischecked ? 'checked' : ''}
            >
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              $${priceString} Shipping
            </div>
          </div>
        </div>
      `;
    });

    return html;
  };


  document.querySelector('.js-order-summary')
    .innerHTML = orderSummaryHTML;


  document.querySelectorAll('.js-delete-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const { productId } = link.dataset;

        cart.removeFromCart(productId);

        // const container = document.querySelector(
        //   `.js-cart-item-container-${productId}`
        // );
        // container.remove();

        renderOrderSummary();
        renderPaymentSummary();
        renderCheckoutHeader();
      });
    });


  document.querySelectorAll('.js-update-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const { productId } = link.dataset;

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.classList.add('is-editing-quantity');

        const quantityInputElem = document.querySelector(
          `.js-quantity-input-${productId}`
        );
        quantityInputElem.addEventListener('keydown', (event) => {
          if(event.key === 'Enter') {
            saveUpdatedQuantity(productId);
          }
        });
      });
    });


  document.querySelectorAll('.js-save-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const { productId } = link.dataset;

        saveUpdatedQuantity(productId);
      });
    });


  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId }= element.dataset;

        cart.updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });


  function saveUpdatedQuantity(productId) {
    const quantityInputElem = document.querySelector(
      `.js-quantity-input-${productId}`
    );
    const newQuantity = Number(quantityInputElem.value);
    
    if(newQuantity < 0 || newQuantity > 1000) {
      quantityInputElem.value = '1' ;
      alert('Not a valid Quantity');
      return;
      
    } else if(newQuantity === 0) {
      cart.removeFromCart(productId);
    };

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.remove('is-editing-quantity');
    cart.updateProductQuantity(productId, newQuantity);

    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
  };



  // function updateCartQuantity() {
  //   const cartQuantity = calculateCartQuantity();

  //   document.querySelector('.js-return-to-home-link')
  //     .innerHTML = `${cartQuantity} items`;
  // }
  // updateCartQuantity();
  // instead of above function create checkoutHeader.js file.
};