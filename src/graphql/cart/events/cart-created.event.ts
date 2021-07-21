import { IEvent } from '../../../core/event-store/event-message.interface';
import { EventTypeEnum } from '../../../core/event-store/event-type.enum';

export class CartCreatedEvent implements IEvent {
  readonly type = EventTypeEnum.CartCreated;
  userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }
}
