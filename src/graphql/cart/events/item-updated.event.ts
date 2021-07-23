import { IEvent } from '../../../core/event-store/event-message.interface';
import { EventTypeEnum } from '../../../core/event-store/event-type.enum';
import { Item } from '../dtos/item.dto';

interface ItemUpdatedData {
  cartId: string;
  item: Item;
}
export class ItemUpdatedEvent implements IEvent {
  readonly type = EventTypeEnum.ItemUpdated;
  data: ItemUpdatedData;

  constructor(data: ItemUpdatedData) {
    this.data = data;
  }
}
