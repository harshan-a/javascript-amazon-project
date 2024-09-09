import {Product, Clothing, Appliance} from '../../data/products.js';

describe('test suite: Product class', () => {
  let product;

  beforeEach(() => {
    product = new Product({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: [
        "socks",
        "sports",
        "apparel"
      ]
    });
  });

  it('has correct properties', () => {
    expect(product instanceof Product).toEqual(true);
    expect(product.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(product.image).toEqual('images/products/athletic-cotton-socks-6-pairs.jpg');
    expect(product.rating).toEqual({
      stars: 4.5,
      count: 87
    });
    expect(product.priceCents).toEqual(1090);
  });

  it('getting rating image method', () => {
    expect(product.getRatingImage()).toEqual('images/ratings/rating-45.png');
  });

  it('getting price method', () => {
    expect(product.getPrice()).toEqual('$10.90');
  });

  it('extra info HTML method', () => {
    expect(product.extraInfoHTML()).toEqual('');
  });
});



describe('test suite: Clothing class', () => {
  let product;

  beforeEach(() => {
    product = new Clothing({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56
      },
      priceCents: 799,
      keywords: [
        "tshirts",
        "apparel",
        "mens"
      ],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png"
    });
  });

  it('has correct properties', () => {
    expect(product instanceof Clothing).toEqual(true);
    expect(product.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
    expect(product.image).toEqual('images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg');
    expect(product.rating).toEqual({
      stars: 4.5,
      count: 56
    });
    expect(product.priceCents).toEqual(799);
    expect(product.sizeChartLink).toEqual('images/clothing-size-chart.png');
  });

  it('getting rating image method', () => {
    expect(product.getRatingImage()).toEqual('images/ratings/rating-45.png');
  });

  it('getting price method', () => {
    expect(product.getPrice()).toEqual('$7.99');
  });

  it('extra info HTML method', () => {
    expect(product.extraInfoHTML()).toContain(`href="images/clothing-size-chart.png" target="_blank"`);
    expect(product.extraInfoHTML()).toContain(`Size chart`);
  });
});



describe('test suite: Appliance class', () => {
  let product;

  beforeEach(() => {
    product = new Appliance({
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "images/products/black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197
      },
      priceCents: 1899,
      keywords: [
        "toaster",
        "kitchen",
        "appliances"
      ],
      type: "appliance",
      instructionsLink: "images/appliance-instructions.png",
      warrantyLink: "images/appliance-warranty.png"
    });
  });

  it('has correct properties', () => {
    expect(product instanceof Appliance).toEqual(true);
    expect(product.id).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
    expect(product.image).toEqual('images/products/black-2-slot-toaster.jpg');
    expect(product.rating).toEqual({
      stars: 5,
      count: 2197
    });
    expect(product.priceCents).toEqual(1899);
    expect(product.instructionsLink).toEqual('images/appliance-instructions.png');
    expect(product.warrantyLink).toEqual('images/appliance-warranty.png');
  });

  it('getting rating image method', () => {
    expect(product.getRatingImage()).toEqual('images/ratings/rating-50.png');
  });

  it('getting price method', () => {
    expect(product.getPrice()).toEqual('$18.99');
  });

  it('extra info HTML method', () => {
    expect(product.extraInfoHTML()).toContain(`href="images/appliance-instructions.png" target="_blank"`);
    expect(product.extraInfoHTML()).toContain(`Instructions`);
    expect(product.extraInfoHTML()).toContain(`href="images/appliance-warranty.png" target="_blank"`);
    expect(product.extraInfoHTML()).toContain(`Warranty`);
  });
});