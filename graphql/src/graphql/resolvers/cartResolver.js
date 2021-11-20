import { v4 as uuid } from 'uuid';

export const cartResolver = (fakeCart, fakeProducts, fakeOrders) => {
  const products = fakeProducts || [];
  const orders = fakeOrders || [];
  let cart = fakeCart || {
    products: [],
  };
  return {
    getCart: () => {
      return cart;
    },

    addProductToCart: ({ id }) => {
      const productIndex = products.findIndex((product) => product.id === id);
      if (productIndex === -1) return 0;

      const cartProduct = cart.products.find((product) => product.id === id);
      if (cartProduct) {
        return ++cartProduct.quantity;
      }
      cart.products.push({ ...products[productIndex], quantity: 1 });

      return 1;
    },

    removeProductFromCart: ({ id, removeAll }) => {
      const cartProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      if (cartProductIndex === -1) return 0;

      const cartProduct = { ...cart.products[cartProductIndex] };

      if (!removeAll && cartProduct.quantity > 1) {
        cart.products[cartProductIndex].quantity = cartProduct.quantity--;
        return cartProduct.quantity;
      }

      cart.products = [
        ...cart.products.filter((product) => product.id !== cartProduct.id),
      ];

      return 0;
    },

    clearCart: () => {
      cart.products = [];

      return true;
    },

    checkout: () => {
      if (!cart.products.length) return null;

      const order = {
        id: uuid(),
        number: Date.now(),
        products: [...cart.products],
        createdAt: new Date(),
        sum: cart.products.reduce(
          (total, { price, quantity }) => (total += price * quantity),
          0
        ),
      };
      orders.push(order);
      cart.products = [];

      return { number: order.number, date: order.createdAt, sum: order.sum };
    },
  };
};
