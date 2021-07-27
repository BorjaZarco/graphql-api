import { IEvent } from '../../../core/event-store/event-message.interface';
import { EventTypeEnum } from '../../../core/event-store/event-type.enum';

interface OrderCancelledData {
  orderId: string;
}
export class OrderCancelledEvent implements IEvent {
  readonly type = EventTypeEnum.OrderCancelled;
  data: OrderCancelledData;

  constructor(data: OrderCancelledData) {
    this.data = data;
  }
}
