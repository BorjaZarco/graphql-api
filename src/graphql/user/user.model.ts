import { UserEntity } from '../../repostory/mongo/entitites/user.entity';
import { User } from './dtos/user.dto';

export class UserModel {
  static getUser(userId: string) {
    return UserEntity.findById(userId).exec();
  }

  static getUserByEmail(email: string) {
    return UserEntity.findOne({ email }).exec();
  }

  static createUser(user: User) {
    return UserEntity.create(user);
  }
}
