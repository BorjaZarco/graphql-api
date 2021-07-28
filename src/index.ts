import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import 'reflect-metadata';
import { MongoRepository } from './repostory/mongo/mongo.repostory';
import { GraphqlService } from './services/graphql.service';

async function main() {
  try {
    dotenv.config();

    const app = express();

    await MongoRepository.connectToMongo();

    const graphqlSchema = await GraphqlService.generateGraphqlSchema();
    const apolloServer = new ApolloServer({
      schema: graphqlSchema,
      playground: process.env.ENV !== 'production',
      context: ({ req, res, connection }) => ({ req, res, connection }),
      formatError: (gqlError) => {
        return process.env.ENV === 'production' ? { message: gqlError.message } : gqlError;
      },
      subscriptions: {
        path: '/subscriptions',
      },
    });
    apolloServer.applyMiddleware({ app });

    const PORT = process.env.PORT || 5000;
    const httpServer = http.createServer(app);
    apolloServer.installSubscriptionHandlers(httpServer);
    httpServer.listen({ port: PORT }, () => {
      console.log(`
         \r***************************************************
         \r** Listening on http://localhost:${PORT}/graphql **
         \r***************************************************
       `);
    });
  } catch (error) {
    console.error('Error on server start: ', error);
  }
}

main();
