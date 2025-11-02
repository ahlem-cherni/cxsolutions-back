import mongoose from 'mongoose';

const InternalEventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  dateTime: { type: Date, required: true },
  pricingOptions: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export const InternalEvent = mongoose.model('InternalEvent', InternalEventSchema);

