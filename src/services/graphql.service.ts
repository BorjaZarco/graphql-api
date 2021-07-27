import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { CartResolver } from '../graphql/cart/cart.resolver';
import { OrderResolver } from '../graphql/order/order.resolver';
import { UserResolver } from '../graphql/user/user.resolver';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class GraphqlService {
  static async generateGraphqlSchema() {
    return buildSchema({
      resolvers: [CartResolver, OrderResolver, UserResolver],
      authChecker: AuthMiddleware.check,
    });
  }
}
