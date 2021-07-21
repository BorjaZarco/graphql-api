import { model, Schema } from 'mongoose';
import { Cart } from '../../../graphql/cart/dtos/cart.dto';

const ItemSchema = new Schema({
  sku: { type: String },
  price: { type: Number },
  barcode: { type: String },
  color: { type: String },
  size: { type: String },
  quantity: { type: Number },
});

const CartSchema = new Schema({
  userId: { type: String },
  status: { type: String },
  totalPrice: { type: Number },
  items: [ItemSchema],
});

export const CartEntity = model<Cart>('carts', CartSchema);
