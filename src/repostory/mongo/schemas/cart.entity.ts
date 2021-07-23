import { model, Schema } from 'mongoose';
import { Cart } from '../../../graphql/cart/dtos/cart.dto';
import { ItemSchema } from './item.entity';

const CartSchema = new Schema({
  userId: { type: String },
  totalPrice: { type: Number },
  items: [ItemSchema],
});

// Duplicate the ID field.
CartSchema.virtual('id').get(function (this: any) {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
CartSchema.set('toObject', {
  virtuals: true,
});

export const CartEntity = model<Cart>('carts', CartSchema);
