import { model, Schema } from 'mongoose';
import { Cart } from '../../../graphql/cart/dtos/cart.dto';
import { ItemSchema } from './item.entity';

const CartSchema = new Schema({
  userId: { type: String, required: [true, 'The user id is required'], unique: [true, 'Each user must have only one cart'] },
  address: { type: String },
  totalPrice: { type: Number },
  items: [ItemSchema],
});

export const CartEntity = model<Cart>('carts', CartSchema);
