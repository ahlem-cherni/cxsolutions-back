import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User',
    set: (v) => (mongoose.isValidObjectId(v) ? v : undefined) },
  authorName: { type: String, required: true },
  body: { type: String, required: true },
  tags: [{ type: String }],
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

NewsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export const News = mongoose.model('News', NewsSchema);

