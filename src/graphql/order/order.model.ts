import { OrderEntity } from '../../repostory/mongo/entitites/order.entity';
import { Order } from './dtos/order.dto';

const orders: Record<string, Order> = {};

export class OrderModel {
  static getOrders() {
    return OrderEntity.find().exec();
  }

  static getOrder(orderId: string) {
    return OrderEntity.findById(orderId).exec();
  }

  static createOrder(order: Order) {
    return OrderEntity.create(order);
  }

  static updateOrder(id: string, order: Partial<Order>) {
    console.log(`Updating order ${order.id} - ${JSON.stringify(order)}`);

    return OrderEntity.findByIdAndUpdate(id, order, {
      new: true,
      runValidators: true,
    }).exec();
  }
}
