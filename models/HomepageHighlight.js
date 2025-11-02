import mongoose from 'mongoose';

const HomepageHighlightSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  link: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const HomepageHighlight = mongoose.model('HomepageHighlight', HomepageHighlightSchema);

