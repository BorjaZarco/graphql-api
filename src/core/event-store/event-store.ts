import { PubSub } from 'apollo-server-express';
import { EventEntity } from '../../repostory/mongo/entitites/event.entity';
import { IEvent } from './event-message.interface';
import { EventTypeEnum } from './event-type.enum';
import { EventHandlers } from './event.handlers';

const Stream = new PubSub();

export class EventStore {
  static async execute(event: IEvent) {
    // store the event
    await EventEntity.create(event);
    // call event handler, do not wait for it
    const newVersion = await EventHandlers.handle(event);
    if (newVersion) {
      EventStore.notify(event.type, JSON.parse(JSON.stringify(newVersion)));
      return newVersion;
    }
  }

  static notify<T>(eventName: EventTypeEnum, payload: T) {
    Stream.publish(eventName, payload);
  }

  static listen<T>(eventName: EventTypeEnum[]) {
    return Stream.asyncIterator<T>(eventName);
  }
}
