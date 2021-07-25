import { CartEntity } from '../../repostory/mongo/entitites/cart.entity';
import { Cart } from './dtos/cart.dto';

export class CartModel {
  static getCarts() {
    return CartEntity.find().exec();
  }

  static getCart(cartId: string) {
    return CartEntity.findById(cartId).exec();
  }

  static getUserCart(userId: string) {
    return CartEntity.findById(userId).exec();
  }

  static createCart(cart: Cart) {
    return CartEntity.create(cart);
  }

  static updateCart(id: string, cart: Partial<Cart>) {
    return CartEntity.findByIdAndUpdate(id, cart, {
      new: true,
      runValidators: true,
    }).exec();
  }
}
