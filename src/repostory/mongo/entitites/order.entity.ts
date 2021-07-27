import { model, Schema } from 'mongoose';
import { Cart } from '../../../graphql/cart/dtos/cart.dto';
import { Order } from '../../../graphql/order/dtos/order.dto';
import { OrderStatusEnum } from '../../../types/enums/order-status.enum';
import { ItemSchema } from './item.entity';

interface IOrderSchema {
  _id: Schema.Types.ObjectId;
  userId: string;
  cart: string | Cart;
  paymentConfirmation: string;
  isCancelled: boolean;
}

const OrderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
  paymentConfirmation: { type: String },
  isCancelled: { type: Boolean },
  items: [ItemSchema],
});

// Get the satus of the order.
OrderSchema.virtual('status').get(function (this: IOrderSchema) {
  if (this.isCancelled) {
    return OrderStatusEnum.Cancelled;
  }
  if (this.paymentConfirmation) {
    return OrderStatusEnum.Confirmed;
  }
  return OrderStatusEnum.Pending;
});

// Ensure virtual fields are serialised.
OrderSchema.set('toObject', {
  virtuals: true,
});

export const OrderEntity = model<Order>('orders', OrderSchema);
