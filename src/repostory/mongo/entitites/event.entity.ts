import { model, Schema } from 'mongoose';
import { EventTypeEnum } from '../../../core/event-store/event-type.enum';

const EventSchema = new Schema({
  type: { type: String, enum: [...Object.values(EventTypeEnum)] },
});

// Duplicate the ID field.
EventSchema.virtual('id').get(function (this: any) {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
EventSchema.set('toObject', {
  virtuals: true,
});

export const EventEntity = model<Event>('event-store', EventSchema, 'event-store');
