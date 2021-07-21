import { CartEntity } from '../../repostory/mongo/schemas/cart.entity';
import { Cart } from './dtos/cart.dto';

const carts: Record<string, Cart> = {};

export class CartModel {
  static getCarts() {
    return CartEntity.find().lean().exec();
  }

  static getCart(cartId: string) {
    return CartEntity.findById(cartId).lean().exec();
  }

  static createCart(cart: Cart) {
    return CartEntity.create(cart);
  }

  static updateCart(cart: Cart) {
    return CartEntity.findByIdAndUpdate(cart.id, cart).exec();
  }
}
