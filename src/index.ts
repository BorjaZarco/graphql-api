import express from 'express';
import 'reflect-metadata';
import { initGraphql } from './graphql/graphql';

async function main() {
  try {
    const app = express();

    const graphqlServer = await initGraphql();
    app.use('/graphql', graphqlServer);

    app.listen(5000, () => {
      console.log(`
        \r****************************
        \r** Listening on port 5000 **
        \r****************************
      `);
    });
  } catch (error) {
    console.error('Error on server start: ', error);
  }
}

main();
