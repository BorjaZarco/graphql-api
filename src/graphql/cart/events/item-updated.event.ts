import { IEvent } from '../../../core/event-store/event-message.interface';
import { EventTypeEnum } from '../../../core/event-store/event-type.enum';
import { Item } from '../dtos/item.dto';

export class ItemUpdatedEvent implements IEvent {
  readonly type = EventTypeEnum.ItemUpdated;
  cartId: string;
  item: Item;

  constructor(cartId: string, item: Item) {
    this.cartId = cartId;
    this.item = item;
  }
}
