import { model, Schema } from 'mongoose';
import { Cart } from '../../../graphql/cart/dtos/cart.dto';
import { ItemSchema } from './item.entity';

const CartSchema = new Schema({
  userId: { type: String },
  address: { type: String },
  totalPrice: { type: Number },
  items: [ItemSchema],
});

export const CartEntity = model<Cart>('carts', CartSchema);
