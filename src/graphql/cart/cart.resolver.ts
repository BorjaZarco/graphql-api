import { withFilter } from 'apollo-server-express';
import { Arg, Authorized, Mutation, Query, Resolver, Root, Subscription } from 'type-graphql';
import { EventStore } from '../../core/event-store/event-store';
import { EventTypeEnum } from '../../core/event-store/event-type.enum';
import { CartModel } from './cart.model';
import { Cart, CartCreatedInput } from './dtos/cart.dto';
import { ItemInput } from './dtos/item.dto';
import { AddressUpdatedEvent } from './events/address-updated.event';
import { CartCreatedEvent } from './events/cart-created.event';
import { ItemUpdatedEvent } from './events/item-updated.event';
@Resolver()
export class CartResolver {
  @Query(() => [Cart])
  @Authorized()
  async getCarts() {
    try {
      return await CartModel.getCarts();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  @Query(() => Cart)
  @Authorized()
  async getCart(@Arg('cartId', () => String) cartId: string) {
    try {
      return await CartModel.getCart(cartId);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  @Subscription({
    subscribe: withFilter(
      () => EventStore.listen<Cart>([EventTypeEnum.CartCreated, EventTypeEnum.AddressUpdated, EventTypeEnum.ItemUpdated]),
      (cart: Cart, args: { cartId: string }) => {
        return cart._id === args.cartId;
      }
    ),
  })
  @Authorized()
  subscribeToCart(@Root() cart: Cart, @Arg('cartId', () => String) cartId: string): Cart {
    return cart;
  }

  @Mutation(() => Boolean)
  @Authorized()
  async createCart(@Arg('data', () => CartCreatedInput) data: CartCreatedInput) {
    try {
      await EventStore.execute(new CartCreatedEvent(data.userId));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  @Mutation(() => Boolean)
  @Authorized()
  async updateItemInCart(@Arg('cartId') cartId: string, @Arg('item', () => ItemInput) item: ItemInput) {
    try {
      await EventStore.execute(new ItemUpdatedEvent({ cartId, item }));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  @Mutation(() => String)
  @Authorized()
  async updateAddress(@Arg('cartId') cartId: string, @Arg('address') address: string) {
    try {
      await EventStore.execute(new AddressUpdatedEvent({ cartId, address }));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
