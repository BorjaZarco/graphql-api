import { EventTypeEnum } from './event-type.enum';

export interface IEvent {
  id?: string;
  type: EventTypeEnum;
  data: unknown;
}
