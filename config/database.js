import mongoose from 'mongoose';
import { sanitizeInvalidReferences } from '../utils/sanitize.js';
import { Post } from '../models/Post.js';
import { News } from '../models/News.js';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/cxsolutions-admin';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(mongoUrl);
    await sanitizeInvalidReferences();
  } catch (err) {
    throw err;
  }
};

