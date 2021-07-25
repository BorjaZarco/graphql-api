import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import http from 'http';
import 'reflect-metadata';
import { MongoRepository } from './repostory/mongo/mongo.repostory';
import { GraphqlService } from './services/graphql.service';

async function main() {
  try {
    const app = express();

    await MongoRepository.connectToMongo();

    const graphqlSchema = await GraphqlService.generateGraphqlSchema();
    const apolloServer = new ApolloServer({
      schema: graphqlSchema,
      context: ({ req, res, connection }) => ({ req, res, connection }),
    });
    apolloServer.applyMiddleware({ app });

    const PORT = 5000;
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
