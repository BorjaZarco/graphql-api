import { Schema } from 'mongoose';

export const ItemSchema = new Schema({
  sku: { type: String },
  price: { type: Number },
  barcode: { type: String },
  color: { type: String },
  size: { type: String },
  quantity: { type: Number },
});
