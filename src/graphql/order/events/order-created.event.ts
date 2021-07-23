import { IEvent } from '../../../core/event-store/event-message.interface';
import { EventTypeEnum } from '../../../core/event-store/event-type.enum';

interface OrderCreatedData {
  cartId: string;
}
export class OrderCreatedEvent implements IEvent {
  readonly type = EventTypeEnum.OrderCreated;
  data: OrderCreatedData;

  constructor(data: OrderCreatedData) {
    this.data = data;
  }
}
