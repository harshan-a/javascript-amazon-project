// import {
//   addToCart,
//   loadFromStorage,
//   cart,
//   removeFromCart,
//   updateDeliveryOption
// } from '../../data/cart.js';
import {cart} from '../../data/cart-class.js';

describe('test suite: addToCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });

  it('add the existing product to the cart', () => {
    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }];
    
    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(3);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart-oop', JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 3,
        deliveryOptionId: '1'
      }])
    );
  });

  it('add the new product to the cart', () => {
    cart.cartItems = [];
    
    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 2);
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(2);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart-oop', JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }])
    );
  });
});

describe('test suite: removeFromCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }];
  });

  it('remove a product', () => {
    cart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart-oop', JSON.stringify([])
    );
  });

  it('not remove a product', () => {
    cart.removeFromCart('no-id');
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart-oop', JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }])
    );
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(2);
  });
});

describe('test suite: updateDeliveryOption', () => {
  const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    cart.cartItems = [{
      productId ,
      quantity: 2,
      deliveryOptionId: '1'
    }];
  });

  it('updating the delivery option', () => {
    cart.updateDeliveryOption(productId, '3');

    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart-oop', JSON.stringify([{
        productId,
        quantity: 2,
        deliveryOptionId: '3'
      }])
    );
  });

  it('not updating the delivery option(invalid productId)', () => {
    cart.updateDeliveryOption('no-id', '3');

    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    expect(cart.cartItems[0]).toEqual({
      productId,
      quantity: 2,
      deliveryOptionId: '1'
    });
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it('not updating the delivery option(invalid option)', () => {
    cart.updateDeliveryOption(productId, 'no-id');

    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    expect(cart.cartItems[0]).toEqual({
      productId,
      quantity: 2,
      deliveryOptionId: '1'
    });
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});