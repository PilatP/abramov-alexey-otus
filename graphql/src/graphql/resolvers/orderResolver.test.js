import { orderResolver } from './orderResolver';

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
describe('orderResolver', () => {
  describe('getOrders', () => {
    it('should return empty list', () => {
      const orders = orderResolver().getOrders();

      expect(orders).toHaveLength(0);
    });
    it('should return orders list', () => {
      const orders = orderResolver(orderList).getOrders();

      expect(orders).toHaveLength(1);
    });
  });

  describe('shipOrder', () => {
    it('should change shipped status to true', () => {
      const resolver = orderResolver(orderList);
      const shipped = resolver.shipOrder({
        id: '13f05673-aac2-47f6-9a09-45a86c430213',
      });

      expect(shipped).toBeTruthy();
    });

    it('should not change already shipped order', () => {
      const resolver = orderResolver(orderList);
      resolver.shipOrder({
        id: '13f05673-aac2-47f6-9a09-45a86c430213',
      });
      const shipped = resolver.shipOrder({
        id: '13f05673-aac2-47f6-9a09-45a86c430213',
      });

      expect(shipped).toBeFalsy();
    });
  });
});
