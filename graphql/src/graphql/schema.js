import { buildSchema } from 'graphql';

export const schema = buildSchema(`
scalar Date

interface IID {
  id: ID!
}

type IDEntity implements IID {
  id: ID!
}
interface IProduct {
  name: String!
}
type Product implements IID & IProduct {
  id: ID!
  name: String!
  price: Float!
}

input InputProduct {
  name: String!
}
type CartProduct implements IProduct {
  id: ID!
  name: String!
  createdAt: Date!
  quantity: Int!
  price: Float!
}

type Cart {
  products: [CartProduct!]
}

type OrderCheckout {
  number: String!
  date: Date!
  sum: Float!
}
type Order {
  id: ID!
  number: String!
  products: [Product!]!
  createdAt: Date!
  sum: Float!
  shipped: Boolean
  completed: Boolean
}

type Query {
  getProducts: [Product!]!
  getCart: Cart!
  getOrders: [Order]!
}

type Mutation{
  """ добавить продукт """
  addProduct(product: InputProduct!): IDEntity
  """ удалить продукт """
  removeProduct(id: ID!): Boolean!

  """ добавить товар в корзину """
  addProductToCart(id: ID!): Int!
  """ удалить товар из корзину """
  removeProductFromCart(id: ID!, removeAll: Boolean): Int!
  """ очистить корзину """
  clearCart: Boolean!
  """ оплатить заказ """
  checkout: OrderCheckout
  """ пометить заказ как доставленный """
  shipOrder(id: ID!): Boolean!
}
`);
