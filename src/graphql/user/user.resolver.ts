import bycript from 'bcrypt';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { AuthService } from '../../services/auth.service';
import { EmailInput } from './dtos/user.dto';
import { UserModel } from './user.model';

const SALT_ROUNDS = 10;

@Resolver()
export class UserResolver {
  @Mutation(() => String)
  async signUp(@Arg('data', () => EmailInput) { email, password }: EmailInput) {
    const user = await UserModel.getUserByEmail(email);
    if (user) {
      throw new Error('Email already in use');
    }

    const newUser = await UserModel.createUser({ email, password: bycript.hashSync(password, SALT_ROUNDS) });
    return AuthService.generateToken(newUser.id as string);
  }

  @Mutation(() => String)
  async logIn(@Arg('data', () => EmailInput) { email, password }: EmailInput) {
    const user = await UserModel.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    if (!bycript.compareSync(password, user.password)) {
      throw new Error('Wrong password');
    }

    return AuthService.generateToken(user.id as string);
  }
}
