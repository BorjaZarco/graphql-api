import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Cart, CartInput } from './cart.entity';

@Resolver()
export class CartResolver {
  @Query(() => [Cart])
  async getCarts() {
    try {
      return Cart.find();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  @Query(() => String)
  getOrderStatus() {
    return 'not implemented yet';
  }

  @Mutation(() => Cart)
  async createCart(@Arg('data', () => CartInput) data: CartInput) {
    try {
      const cart = await Cart.insert(data.items);
      console.log(cart);

      return cart;
    } catch (error) {
      console.error(error);
    }
  }

  @Mutation(() => String)
  updateItemInCart() {
    return 'not implemented yet';
  }

  @Mutation(() => String)
  updateAddress() {
    return 'not implemented yet';
  }

  @Mutation(() => String)
  confirmPayment() {
    return 'not implemented yet';
  }

  @Mutation(() => String)
  cancelOrder() {
    return 'not implemented yet';
  }
}
