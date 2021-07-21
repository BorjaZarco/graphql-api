import { Cart } from './dtos/cart.dto';

const carts: Record<string, Cart> = {};

export class CartModel {
  static getCarts() {
    return Object.values(carts);
  }

  static getCart(cartId: string) {
    return carts[cartId];
  }

  static createCart(cart: Cart) {
    carts[cart.id] = cart;
    return cart;
  }

  static updateCart(cart: Cart) {
    carts[cart.id] = cart;
    return cart;
  }

  static deleteCart(cartId: string) {
    const cart = carts[cartId];
    delete carts[cartId];
    return cart;
  }
}
