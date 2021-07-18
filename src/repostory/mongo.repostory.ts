import { createConnection, EntityTarget, getMongoRepository } from 'typeorm';

export async function connectToMongo() {
  await createConnection({
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: 'graphql',
    useNewUrlParser: true,
    synchronize: true,
    logging: true,
    entities: ['**/*.entity.ts'],
  });
  console.log('Mongo is connected correctly!!');
}

export function getMongoRepostory<T>(entityClass: EntityTarget<T>) {
  return getMongoRepository(entityClass);
}
