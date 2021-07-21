import { CartCreatedEvent } from '../../graphql/cart/events/cart-created.event';
import { ItemUpdatedEvent } from '../../graphql/cart/events/item-updated.event';
import { CartCreatedHandler } from '../../graphql/cart/handlers/cart-created.handler';
import { ItemUpdatedHandler } from '../../graphql/cart/handlers/item-updated.handler';
import { IEvent } from './event-message.interface';
import { EventTypeEnum } from './event-type.enum';

export class EventHandlers {
  static handle(event: IEvent) {
    switch (event.type) {
      case EventTypeEnum.CartCreated:
        return CartCreatedHandler.handle(event as CartCreatedEvent);
      case EventTypeEnum.ItemUpdated:
        return ItemUpdatedHandler.handle(event as ItemUpdatedEvent);
    }
  }
}
