import { graphqlHTTP } from 'express-graphql';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { CartResolver } from './cart/cart.resolver';
import { OrderResolver } from './order/order.resolver';

export async function initGraphql() {
  const graphqlSchema = await buildSchema({
    resolvers: [CartResolver, OrderResolver],
  });

  return graphqlHTTP({
    schema: graphqlSchema,
    graphiql: true,
  });
}
