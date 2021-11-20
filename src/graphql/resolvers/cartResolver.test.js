import { cartResolver } from './cartResolver';

export const cartData = {
  products: [
    {
      id: '5e21f337-549c-411e-b290-3d1174e929fc',
      name: 'Ручка',
      price: 54.3,
      quantity: 1,
    },
    {
      id: '1b176348-3491-44fb-8964-6c0af7b4999f',
      name: 'Кетчуп',
      price: 55,
      quantity: 3,
    },
    {
      id: '1bd07394-748a-4fdc-8a36-dbcc6f984f5a',
      name: 'Кружка',
      price: 24,
      quantity: 5,
    },
  ],
};

const productList = [
  { id: '5e21f337-549c-411e-b290-3d1174e929fc', name: 'Ручка', price: 54.3 },
  { id: '756ab417-cb7e-459c-8d5a-49e7b7ad9dfe', name: 'Стол', price: 5764.23 },
  { id: '1b176348-3491-44fb-8964-6c0af7b4999f', name: 'Кетчуп', price: 55 },
  { id: '1d0cbe2d-e7cd-4421-8279-6ea7b32a1abd', name: 'Сахар', price: 63 },
  { id: 'd39a8f7a-30b0-45bd-8ebd-a09ad449e296', name: 'Хлеб', price: 523 },
  { id: 'bc3c3ab1-65a8-47ef-8caa-f33c11acf095', name: 'Стул', price: 43 },
  { id: '1bd07394-748a-4fdc-8a36-dbcc6f984f5a', name: 'Кружка', price: 24 },
  { id: '73f05673-aac2-47f6-9a09-45a86c430213', name: 'Краб', price: 2323 },
];

const orderList = [
  {
    id: '13f05673-aac2-47f6-9a09-45a86c430213',
    number: '87687766',
    products: [
      {
        id: '5e21f337-549c-411e-b290-3d1174e929fc',
        name: 'Ручка',
        price: 54.3,
        quantity: 1,
      },
      {
        id: '1b176348-3491-44fb-8964-6c0af7b4999f',
        name: 'Кетчуп',
        price: 55,
        quantity: 3,
      },
      {
        id: '1bd07394-748a-4fdc-8a36-dbcc6f984f5a',
        name: 'Кружка',
        price: 24,
        quantity: 5,
      },
    ],
    sum: 339.3,
    date: '2021-11-20T08:52:11.852Z',
  },
];
describe('getCart', () => {
  it('should return empty cart', () => {
    const cart = cartResolver().getCart();

    expect(cart.products).toHaveLength(0);
  });
  it('should return cart with added products', () => {
    const cart = cartResolver({ ...cartData }).getCart();

    expect(cart.products).toHaveLength(3);
  });
});

describe('addProductToCart', () => {
  it('should add a new product to the cart', () => {
    const resolver = cartResolver(null, productList);
    expect(resolver.getCart().products).toHaveLength(0);

    const quantity = resolver.addProductToCart({
      id: '73f05673-aac2-47f6-9a09-45a86c430213',
    });
    const updatedCardData = resolver.getCart();

    expect(quantity).toBe(1);
    expect(updatedCardData.products).toHaveLength(1);
  });

  it('should increase an existing product quantity', () => {
    const resolver = cartResolver(null, productList);

    resolver.addProductToCart({
      id: '73f05673-aac2-47f6-9a09-45a86c430213',
    });
    const quantity = resolver.addProductToCart({
      id: '73f05673-aac2-47f6-9a09-45a86c430213',
    });
    const updatedCardData = resolver.getCart();

    expect(quantity).toBe(2);
    expect(updatedCardData.products).toHaveLength(1);
  });
});

describe('removeProductFromCart', () => {
  it('should remove a product from the cart', () => {
    const resolver = cartResolver(null, productList);
    expect(resolver.getCart().products).toHaveLength(0);

    const quantity = resolver.removeProductFromCart({
      id: '5e21f337-549c-411e-b290-3d1174e929fc',
    });
    const updatedCardData = resolver.getCart();

    expect(quantity).toBe(0);
    expect(updatedCardData.products).toHaveLength(0);
  });

  it('should descrease an existing product quantity', () => {
    const resolver = cartResolver({ ...cartData }, productList);

    const quantity = resolver.removeProductFromCart({
      id: '1b176348-3491-44fb-8964-6c0af7b4999f',
    });
    const updatedCardData = resolver.getCart();
    expect(quantity).toBe(2);
    expect(updatedCardData.products).toHaveLength(3);
  });
});

describe('clearCart', () => {
  it('should clear cart', () => {
    const resolver = cartResolver({ ...cartData });
    expect(resolver.getCart().products).toHaveLength(3);

    const clearResult = resolver.clearCart();
    const updatedCardData = resolver.getCart();

    expect(clearResult).toBeTruthy();
    expect(updatedCardData.products).toHaveLength(0);
  });
});

describe('checkout', () => {
  it('should checkout order', () => {
    const resolver = cartResolver({ ...cartData });
    expect(resolver.getCart().products).toHaveLength(3);

    const checkout = resolver.checkout();
    const updatedCardData = resolver.getCart();

    expect(checkout.sum).toBe(339.3);
    expect(updatedCardData.products).toHaveLength(0);
  });
});
