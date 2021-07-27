import { model, Schema } from 'mongoose';
import { User } from '../../../graphql/user/dtos/user.dto';

const UserSchema = new Schema({
  email: { type: String, unique: [true, 'The email must be unique'], required: [true, 'The email is required'] },
  password: { type: String, required: [true, 'The password is required'] },
});

export const UserEntity = model<User>('user', UserSchema);
