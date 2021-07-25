import { withFilter } from 'apollo-server-express';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver, Root, Subscription } from 'type-graphql';
import { EventStore } from '../../core/event-store/event-store';
import { EventTypeEnum } from '../../core/event-store/event-type.enum';
import { IContext } from '../../types/definitions/context';
import { CartModel } from './cart.model';
import { Cart } from './dtos/cart.dto';
import { ItemInput } from './dtos/item.dto';
import { AddressUpdatedEvent } from './events/address-updated.event';
import { CartCreatedEvent } from './events/cart-created.event';
import { ItemUpdatedEvent } from './events/item-updated.event';
@Resolver()
export class CartResolver {
  @Query(() => Cart)
  @Authorized()
  async getCart(@Ctx() ctx: IContext) {
    try {
      return await CartModel.getUserCart(ctx.requestUser?._id as string);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  @Subscription({
    subscribe: withFilter(
      () => EventStore.listen<Cart>([EventTypeEnum.CartCreated, EventTypeEnum.AddressUpdated, EventTypeEnum.ItemUpdated]),
      (cart: Cart, _, context: IContext) => {
        return cart.userId === context.requestUser?._id;
      }
    ),
  })
  @Authorized()
  subscribeToCart(@Root() cart: Cart): Cart {
    return cart;
  }

  @Mutation(() => Boolean)
  @Authorized()
  async createCart(@Ctx() ctx: IContext) {
    try {
      await EventStore.execute(new CartCreatedEvent({ cartId: ctx.requestUser?._id as string, userId: ctx.requestUser?._id as string }));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  @Mutation(() => Boolean)
  @Authorized()
  async updateItemInCart(@Arg('item', () => ItemInput) item: ItemInput, @Ctx() ctx: IContext) {
    try {
      if (!ctx.requestUser?._id) {
        throw new Error('You must be a registered user to perform this action');
      }
      const cart = await CartModel.getUserCart(ctx.requestUser?._id);
      if (cart) {
        await EventStore.execute(new ItemUpdatedEvent({ cartId: cart._id, item }));
      } else {
        const newCart = (await EventStore.execute(
          new CartCreatedEvent({ cartId: ctx.requestUser?._id as string, userId: ctx.requestUser?._id as string })
        )) as Cart;
        await EventStore.execute(new ItemUpdatedEvent({ cartId: newCart._id, item }));
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  @Mutation(() => String)
  @Authorized()
  async updateAddress(@Arg('address') address: string, @Ctx() ctx: IContext) {
    try {
      if (!ctx.requestUser?._id) {
        throw new Error('You must be a registered user to perform this action');
      }
      const cart = await CartModel.getUserCart(ctx.requestUser?._id);
      if (cart) {
        await EventStore.execute(new AddressUpdatedEvent({ cartId: cart._id, address }));
      } else {
        const newCart = (await EventStore.execute(
          new CartCreatedEvent({ cartId: ctx.requestUser?._id as string, userId: ctx.requestUser?._id as string })
        )) as Cart;
        await EventStore.execute(new AddressUpdatedEvent({ cartId: newCart._id, address }));
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
