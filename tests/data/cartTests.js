import {
  addToCart,
  loadFromStorage,
  cart,
  removeFromCart,
  updateDeliveryOption
} from '../../data/cart.js';

describe('test suite: addToCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });

  it('add the existing product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();
    
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(3);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart', JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 3,
        deliveryOptionId: '1'
      }])
    );
  });

  it('add the new product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();
    
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 2);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart', JSON.stringify([{
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
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();
  });

  it('remove a product', () => {
    removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart', JSON.stringify([])
    );
  });

  it('not remove a product', () => {
    removeFromCart('no-id');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart', JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }])
    );
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });
});

describe('test suite: updateDeliveryOption', () => {
  const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId ,
        quantity: 2,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();
  });

  it('updating the delivery option', () => {
    updateDeliveryOption(productId, '3');

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].deliveryOptionId).toEqual('3');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart', JSON.stringify([{
        productId,
        quantity: 2,
        deliveryOptionId: '3'
      }])
    );
  });

  it('not updating the delivery option(invalid productId)', () => {
    updateDeliveryOption('no-id', '3');

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(cart[0]).toEqual({
      productId,
      quantity: 2,
      deliveryOptionId: '1'
    });
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it('not updating the delivery option(invalid option)', () => {
    updateDeliveryOption(productId, 'no-id');

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(cart[0]).toEqual({
      productId,
      quantity: 2,
      deliveryOptionId: '1'
    });
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});