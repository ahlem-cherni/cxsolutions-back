import mongoose from 'mongoose';

const NewsletterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

export const Newsletter = mongoose.model('Newsletter', NewsletterSchema);

