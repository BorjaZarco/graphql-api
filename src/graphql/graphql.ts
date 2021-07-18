import { graphqlHTTP } from 'express-graphql';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { CartResolver } from './cart/cart.resolver';

export async function initGraphql() {
  const graphqlSchema = await buildSchema({
    resolvers: [CartResolver],
  });

  return graphqlHTTP({
    schema: graphqlSchema,
    graphiql: true,
  });
}
