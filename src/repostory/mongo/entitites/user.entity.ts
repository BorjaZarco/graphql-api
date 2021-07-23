import { model, Schema } from 'mongoose';
import { User } from '../../../graphql/user/dtos/user.dto';

const UserSchema = new Schema({
  email: { type: String },
  password: { type: String },
});

export const UserEntity = model<User>('user', UserSchema);
