import { Post } from '../models/Post.js';
import { News } from '../models/News.js';

export async function sanitizeInvalidReferences() {
  try {
    const postsWithStringAuthors = await Post.find({ author: { $type: 'string' } }).select('_id author');
    const newsWithStringAuthors = await News.find({ author: { $type: 'string' } }).select('_id author');
    
    const objectIdRegex = /^[a-fA-F0-9]{24}$/;
    
    for (const post of postsWithStringAuthors) {
      if (post.author && typeof post.author === 'string' && !objectIdRegex.test(post.author)) {
        await Post.updateOne({ _id: post._id }, { $set: { author: null } });
      }
    }
    
    for (const news of newsWithStringAuthors) {
      if (news.author && typeof news.author === 'string' && !objectIdRegex.test(news.author)) {
        await News.updateOne({ _id: news._id }, { $set: { author: null } });
      }
    }
  } catch (e) {}
}

