import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { fakeCart, fakeOrders, fakeProducts } from './graphql/fake-data';
import { resolvers } from './graphql/resolvers';
import { schema } from './graphql/schema';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
const useFakeData = process.env.FAKE_DATA || false;

const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
    rootValue: useFakeData
      ? resolvers(fakeProducts, fakeCart, fakeOrders)
      : resolvers(),
  })
);
app.listen(port, () => console.log(`The server is started at 0.0.0.0:${port}`));
