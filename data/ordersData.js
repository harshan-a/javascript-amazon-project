import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {formatCurrency} from '../scripts/utils/money.js'


class Order {
  orders = JSON.parse(localStorage.getItem('order')) || [];

  constructor() {
    this.#convertIntoClass();
  }

  async loadOrder(cart) {
    let order;
    try {
      const res = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart
        })
      });

      if(!res.ok) {
        throw res;
      }
      order = await res.json();
  
    } catch (error) {
      if(error.status >= 400) {
        alert(`Error Status: ${error.status}. Try again Later.`);

      } else {
        alert(error);
      }
    };
  
    return order;
  };


  addOrder(order) {
    this.orders.unshift(order);
    this.#saveToLocalStorage();
    console.log(this.orders);
  };


  #saveToLocalStorage() {
    localStorage.setItem('order', JSON.stringify(this.orders));
  };

  #convertIntoClass() {
    this.orders = this.orders.map((order) => {
      return new Item(order);
    });
  };

  getOrder(orderId) {
    let matchingOrder;

    this.orders.forEach((order) => {
      if(orderId === order.id) {
        matchingOrder = order;
      }
    });
    return matchingOrder;
  };

  
};

class Item {
  id;
  orderTime;
  products;
  totalCostCents;

  constructor(itemDetails) {
    this.id = itemDetails.id;
    this.products = itemDetails.products;
    this.orderTime = itemDetails.orderTime;
    this.totalCostCents = itemDetails.totalCostCents;
  }

  getDateString(date) {
    return `${dayjs(date).format('MMMM D')}`;
  }

  getTrackingDateString(date) {
    return `Arriving on ${dayjs(date).format('dddd, MMMM D')}`;
  }

  getTotalPrice() {
    return `$${formatCurrency(this.totalCostCents)}`;
  }
};

const orderObj = new Order();

export default orderObj;




