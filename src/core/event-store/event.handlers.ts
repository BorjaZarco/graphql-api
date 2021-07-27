import { AddressUpdatedEvent } from '../../graphql/cart/events/address-updated.event';
import { CartClearedEvent } from '../../graphql/cart/events/cart-cleared.event';
import { CartCreatedEvent } from '../../graphql/cart/events/cart-created.event';
import { ItemUpdatedEvent } from '../../graphql/cart/events/item-updated.event';
import { AddressUpdatedHandler } from '../../graphql/cart/handlers/address-updated.handler';
import { CartClearedHandler } from '../../graphql/cart/handlers/cart-cleared.handler';
import { CartCreatedHandler } from '../../graphql/cart/handlers/cart-created.handler';
import { ItemUpdatedHandler } from '../../graphql/cart/handlers/item-updated.handler';
import { OrderCancelledEvent } from '../../graphql/order/events/order-cancelled.event';
import { OrderCreatedEvent } from '../../graphql/order/events/order-created.event';
import { PaymentConfirmedEvent } from '../../graphql/order/events/payment-confirmed.event';
import { OrderCancelledHandler } from '../../graphql/order/handlers/order-cancelled.handler';
import { OrderCreatedHandler } from '../../graphql/order/handlers/order-created.handler';
import { PaymentConfirmedHandler } from '../../graphql/order/handlers/payment-confirmed.handler';
import { IEvent } from './event-message.interface';
import { EventTypeEnum } from './event-type.enum';

export class EventHandlers {
  static handle(event: IEvent) {
    switch (event.type) {
      case EventTypeEnum.CartCreated:
        return CartCreatedHandler.handle(event as CartCreatedEvent);
      case EventTypeEnum.ItemUpdated:
        return ItemUpdatedHandler.handle(event as ItemUpdatedEvent);
      case EventTypeEnum.AddressUpdated:
        return AddressUpdatedHandler.handle(event as AddressUpdatedEvent);
      case EventTypeEnum.CartCleared:
        return CartClearedHandler.handle(event as CartClearedEvent);
      case EventTypeEnum.OrderCreated:
        return OrderCreatedHandler.handle(event as OrderCreatedEvent);
      case EventTypeEnum.PaymentConfirmed:
        return PaymentConfirmedHandler.handle(event as PaymentConfirmedEvent);
      case EventTypeEnum.OrderCancelled:
        return OrderCancelledHandler.handle(event as OrderCancelledEvent);
    }
  }
}
