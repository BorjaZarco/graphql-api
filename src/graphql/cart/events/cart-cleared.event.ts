import { IEvent } from '../../../core/event-store/event-message.interface';
import { EventTypeEnum } from '../../../core/event-store/event-type.enum';

interface CartClearedData {
  cartId: string;
}
export class CartClearedEvent implements IEvent {
  readonly type = EventTypeEnum.CartCleared;
  data: CartClearedData;

  constructor(data: CartClearedData) {
    this.data = data;
  }
}
