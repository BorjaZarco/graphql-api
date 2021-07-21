import { CartCreatedEvent } from '../../graphql/cart/events/cart-created.event';
import { CartCreatedHandler } from '../../graphql/cart/handlers/cart-created.handler';
import { IEvent } from './event-message.interface';
import { EventTypeEnum } from './event-type.enum';

export class EventHandlers {
  static handle(event: IEvent) {
    switch (event.type) {
      case EventTypeEnum.CartCreated:
        return CartCreatedHandler.handle(event as CartCreatedEvent);
      case EventTypeEnum.CartUpdated:
        throw new Error('No handler implemented');
    }
  }
}
