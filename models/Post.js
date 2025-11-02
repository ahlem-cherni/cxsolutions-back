import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User',
    set: (v) => (mongoose.isValidObjectId(v) ? v : undefined) },
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const Post = mongoose.model('Post', PostSchema);

