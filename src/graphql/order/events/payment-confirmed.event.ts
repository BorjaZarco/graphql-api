import { IEvent } from '../../../core/event-store/event-message.interface';
import { EventTypeEnum } from '../../../core/event-store/event-type.enum';

interface PaymentConfirmedData {
  orderId: string;
  paymentConfirmation: string;
}
export class PaymentConfirmedEvent implements IEvent {
  readonly type = EventTypeEnum.PaymentConfirmed;
  data: PaymentConfirmedData;

  constructor(data: PaymentConfirmedData) {
    this.data = data;
  }
}
