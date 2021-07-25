import { AuthChecker } from 'type-graphql';
import { AuthService } from '../services/auth.service';
import { IContext } from '../types/definitions/context';

export class AuthMiddleware {
  static check: AuthChecker<IContext> = async ({ context }): Promise<boolean> => {
    const token = context?.req?.headers?.authorization || context?.connection?.context?.authorization;

    if (!token) {
      throw new Error('You must provide an auth token');
    }

    return await AuthService.verifyToken(token);
  };
}
