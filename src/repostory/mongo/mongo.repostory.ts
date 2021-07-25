import { connect } from 'mongoose';
import { Connection } from 'typeorm';

const MONGO_URL = 'mongodb://localhost:27017/graphql';

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
    await connect(MONGO_URL, MONGO_OPTIONS);
    console.log('Mongo is connected correctly!!');
  }
}
