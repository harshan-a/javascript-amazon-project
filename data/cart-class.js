import {deliveryOptions} from './deliveryOptions.js';

class Cart {
  cartItems;
  #localStorageKey; 

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }
  
  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  /*
  loadCart(fun) {
    const xhr = new XMLHttpRequest();
  
    xhr.addEventListener('load', () => {
      console.log(xhr.response);
  
      fun();
    });
  
    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
  };
  */

  async loadCartFetch() {
    try{
      const res = await fetch('https://supersimplebackend.dev/cart');
      if(!res.ok) {
        throw res;
      };
      const text = await res.text();
      console.log(text);
      return true;

    } catch (err) {
        console.log(err);
        console.log('Unexpected error. Try again Later.');
        return false;
    };
  }
  
  saveCartToLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId, quantity = 1) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    if(matchingItem) {
      matchingItem.quantity += quantity;
  
    } else {
      this.cartItems.push({
        // productId: productId,
        // quantity: quantity
        productId,
        quantity,
        deliveryOptionId: '1'
      })
    };
  
    this.saveCartToLocalStorage();
  }

  removeFromCart(productId) {
    this.cartItems.forEach((cartItem, i) => {
      if(cartItem.productId === productId) {
        this.cartItems.splice(i, 1);
      }
    });
  
    this.saveCartToLocalStorage();
  }

  clearCart() {
    localStorage.removeItem(this.#localStorageKey);
  }

  calculateCartQuantity() {
    let cartQuantity = 0;
  
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    
    return cartQuantity;
  }

  updateProductQuantity(productId, newQuantity) {
    this.cartItems.forEach((cartItem) => {
      if(cartItem.productId === productId) {
        cartItem.quantity = newQuantity;
      }
    });

    this.saveCartToLocalStorage();
  }
  
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    let matchingDeliveryOption;
  
    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    deliveryOptions.forEach((deliveryOption) => {
      if(deliveryOptionId === deliveryOption.id) {
        matchingDeliveryOption = deliveryOption;
      }
    });
  
    if(!(matchingItem && matchingDeliveryOption)) {
      return;
    };
    
    matchingItem.deliveryOptionId = matchingDeliveryOption.id;
    this.saveCartToLocalStorage();
  }
};

export const cart = new Cart('cart-oop');
// cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
// console.log(cart);

// const businessCart = new Cart('cart-business');
// businessCart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3');
// console.log(businessCart);