import jwt from 'jsonwebtoken';

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

  static authenticate() {}
}
