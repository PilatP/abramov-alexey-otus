export const orderResolver = (fakeOrders) => {
  let orders = Array.isArray(fakeOrders) ? [...fakeOrders] : [];

  return {
    getOrders: () => {
      return orders;
    },

    shipOrder: ({ id }) => {
      const order = orders.find((order) => order.id === id && !order?.shipped);
      if (!order) return false;

      order.shipped = true;

      return true;
    },
  };
};
