import { connect } from 'mongoose';
import { Connection } from 'typeorm';

// export function getMongoRepostory<T>(entityClass: EntityTarget<T>) {
//   return getMongoRepository(entityClass);
// }

const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

export class MongoRepository {
  connection?: Connection;

  constructor() {}

  static async connectToMongo() {
    await connect('mongodb://localhost:27017/graphql', MONGO_OPTIONS);
    console.log('Mongo is connected correctly!!');
  }
}
