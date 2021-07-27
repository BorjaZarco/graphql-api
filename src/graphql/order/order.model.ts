import { OrderEntity } from '../../repostory/mongo/entitites/order.entity';
import { OrderStatusEnum } from '../../types/enums/order-status.enum';
import { Order } from './dtos/order.dto';

const orders: Record<string, Order> = {};

export class OrderModel {
  static getOrders() {
    return OrderEntity.find().exec();
  }

  static getOrder(orderId: string) {
    return OrderEntity.findById(orderId).exec();
  }

  static getUserOrder(orderId: string, userId: string) {
    return OrderEntity.findOne({ _id: orderId, userId }).exec();
  }

  static getUserOrders(userId: string) {
    return OrderEntity.find({ userId }).exec();
  }

  static createOrder(order: Order) {
    return OrderEntity.create(order);
  }

  static updateOrder(id: string, order: Partial<Order>) {
    return OrderEntity.findByIdAndUpdate(id, order, {
      new: true,
      runValidators: true,
    }).exec();
  }

  static calculateStatus(order: Order) {
    if (order.isCancelled) {
      return OrderStatusEnum.Cancelled;
    }
    if (order.paymentConfirmation) {
      return OrderStatusEnum.Confirmed;
    }
    return OrderStatusEnum.Pending;
  }
}
