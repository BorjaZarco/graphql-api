import { IEvent } from '../../../core/event-store/event-message.interface';
import { EventTypeEnum } from '../../../core/event-store/event-type.enum';

interface CartCreatedData {
  userId: string;
}
export class CartCreatedEvent implements IEvent {
  readonly type = EventTypeEnum.CartCreated;
  data: CartCreatedData;

  constructor(userId: string) {
    this.data = { userId };
  }
}
