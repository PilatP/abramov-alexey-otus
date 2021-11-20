import { cartResolver } from './cartResolver';
import { orderResolver } from './orderResolver';
import { productResolver } from './productResolver';

export const resolvers = (products, cart, orders) => ({
  ...productResolver(products),
  ...cartResolver(cart, products, orders),
  ...orderResolver(orders),
});
