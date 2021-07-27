import { IEvent } from '../../../core/event-store/event-message.interface';
import { EventTypeEnum } from '../../../core/event-store/event-type.enum';

interface AddressUpdatedData {
  cartId: string;
  address: string;
}
export class AddressUpdatedEvent implements IEvent {
  readonly type = EventTypeEnum.AddressUpdated;
  data: AddressUpdatedData;

  constructor(data: AddressUpdatedData) {
    this.data = data;
  }
}
