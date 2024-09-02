import {deliveryOptions} from './deliveryOptions.js';

function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
  
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        },{
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2'
        }
      ];
    },
  
    saveCartToLocalStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
  
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
    },
  
    removeFromCart(productId) {
      this.cartItems.forEach((cartItem, i) => {
        if(cartItem.productId === productId) {
          this.cartItems.splice(i, 1);
        }
      });
    
      this.saveCartToLocalStorage();
    },
  
    calculateCartQuantity() {
      let cartQuantity = 0;
    
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
      
      return cartQuantity;
    },
  
    updateProductQuantity(productId, newQuantity) {
      this.cartItems.forEach((cartItem) => {
        if(cartItem.productId === productId) {
          cartItem.quantity = newQuantity;
        }
      });
  
      this.saveCartToLocalStorage();
    },
    
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
  
  return cart;
};

const cart = Cart('cart-oop');

cart.loadFromStorage();
cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
console.log(cart);

const businessCart = Cart('cart-business');

businessCart.loadFromStorage();
businessCart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3');
console.log(businessCart);