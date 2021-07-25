import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../graphql/user/dtos/user.dto';
import { UserModel } from '../graphql/user/user.model';

const JWT_SECRET = 'SECRET';
const JWT_EXPIRATION = 3600;

export class AuthService {
  static generateToken(userId: string) {
    return jwt.sign(
      {
        userId,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );
  }

  static async verifyToken(token: string): Promise<User | null> {
    const decodedToken = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return UserModel.getUser(decodedToken.userId);
  }
}
