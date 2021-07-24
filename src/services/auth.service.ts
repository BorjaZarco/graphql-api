import jwt, { JwtPayload } from 'jsonwebtoken';
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

  static async verifyToken(token: string): Promise<boolean> {
    const decodedToken = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const user = await UserModel.getUser(decodedToken.userId);
    return !!user;
  }
}
