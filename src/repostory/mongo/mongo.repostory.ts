import dotenv from 'dotenv';
import { connect } from 'mongoose';

dotenv.config();
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27018/graphql';

const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

export class MongoRepository {
  constructor() {}

  static async connectToMongo() {
    await connect(MONGO_URL, MONGO_OPTIONS);
    console.log('Mongo is connected correctly!!');
  }
}
