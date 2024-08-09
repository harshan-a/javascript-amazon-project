import { cart, removeFromCart, calculateCartQuantity, updateProductQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


let orderSummaryHTML = '';

cart.forEach((cartItem) => {
  const { productId } = cartItem;
  let matchingProduct;

  products.forEach((product) => {
    if(product.id === productId) {
      matchingProduct = product;
    }
  });

  orderSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${productId}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
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
            <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${productId}">
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
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );

    const priceString = deliveryOption.priceCents === 0
      ? 'FREE'
      : `${formatCurrency(deliveryOption.priceCents)} -`;

    const ischecked = deliveryOption.id === cartItem.deliveryOptionId;
    
    html += `
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
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

      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();

      updateCartQuantity();
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


function saveUpdatedQuantity(productId) {
  const quantityInputElem = document.querySelector(
    `.js-quantity-input-${productId}`
  );
  const newQuantity = Number(quantityInputElem.value);
  
  if(newQuantity < 0 || newQuantity > 1000) {
    quantityInputElem.value = '1' ;
    alert('Not a valid Quantity');
    return;
  };

  const container = document.querySelector(
    `.js-cart-item-container-${productId}`
  );
  if(newQuantity === 0) {
    removeFromCart(productId);
    container.remove();
    updateCartQuantity();
    return;
  };

  container.classList.remove('is-editing-quantity');
  updateProductQuantity(productId, newQuantity);

  const quantityLabelElem = document.querySelector(
    `.js-quantity-label-${productId}`
  );
  quantityLabelElem.innerHTML = newQuantity;

  updateCartQuantity();
};



function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();

  document.querySelector('.js-return-to-home-link')
    .innerHTML = `${cartQuantity} items`;
}
updateCartQuantity();