import {cart} from '../../data/cart-class.js';
import {getProduct} from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';
import {loadOrder, addOrder} from '../../data/order.js';

export function renderPaymentSummary() {
  let productsCents = 0;
  let shippingCents = 0;
  let quantity = 0;

  cart.cartItems.forEach((cartItem) => {
    const { productId, deliveryOptionId } = cartItem;

    const product = getProduct(productId);
    productsCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(deliveryOptionId);
    shippingCents += deliveryOption.priceCents;

    quantity += cartItem.quantity;
  });

  const totalBeforeTaxCents = productsCents + shippingCents;
  const totalTaxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + totalTaxCents;

  const paymentSummaryHTML = 
  `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${quantity}):</div>
      <div class="payment-summary-money">
        $${formatCurrency(productsCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money js-shipping-cost">
        $${formatCurrency(shippingCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-total-cost">
        $${formatCurrency(totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary
      js-place-order">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;

  document.querySelector('.js-place-order')
    .addEventListener('click', async () => {
      try {
        const order = await loadOrder(cart.cartItems);
        if(!order) {
          throw 'fetch error';
        }
        addOrder(order);

        window.location.href = 'orders.html';

      } catch (error) {
        // console.log('Unexpected error. Try again Later.');
        alert('Unexpected error. Try again Later.');
      };
    });
};