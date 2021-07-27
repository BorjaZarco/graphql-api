import bycript from 'bcrypt';
import dotenv from 'dotenv';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { AuthService } from '../../services/auth.service';
import { UtilsService } from '../../services/utils.service';
import { EmailInput } from './dtos/user.dto';
import { UserModel } from './user.model';

dotenv.config();
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS as string) || 10;

@Resolver()
export class UserResolver {
  @Mutation(() => String)
  async signUp(@Arg('data', () => EmailInput) { email, password }: EmailInput) {
    if (!UtilsService.validateEmail(email)) {
      throw new Error('Email not valid');
    }
    if ((password || '').length < 6) {
      throw new Error('Password not valid, it should consist of 6 or more characters');
    }

    const user = await UserModel.getUserByEmail(email);
    if (user) {
      throw new Error('Email already in use');
    }

    const newUser = await UserModel.createUser({ email, password: bycript.hashSync(password, SALT_ROUNDS) });
    return AuthService.generateToken(newUser.id as string);
  }

  @Mutation(() => String)
  async logIn(@Arg('data', () => EmailInput) { email, password }: EmailInput) {
    if (!email) throw new Error('Email string is required');
    if (!password) throw new Error('Password string is required');

    const user = await UserModel.getUserByEmail(email);
    if (!user) {
      throw new Error('User with provided email not found');
    }

    if (!bycript.compareSync(password, user.password)) {
      throw new Error('Wrong password');
    }

    return AuthService.generateToken(user.id as string);
  }
}
