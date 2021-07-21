import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import eventStore from '../../core/event-store/event-store';
import { CartModel } from './cart.model';
import { Cart, CartCreatedInput } from './dtos/cart.dto';
import { CartCreatedEvent } from './events/cart-created.event';

@Resolver()
export class CartResolver {
  @Query(() => [Cart])
  async getCarts() {
    try {
      return CartModel.getCarts();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  @Query(() => String)
  getOrderStatus() {
    return 'not implemented yet';
  }

  @Mutation(() => Boolean)
  async createCart(@Arg('data', () => CartCreatedInput) data: CartCreatedInput) {
    try {
      eventStore.execute(new CartCreatedEvent(data.userId));
      return true;
    } catch (error) {
      console.error(error);
      return false;
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
