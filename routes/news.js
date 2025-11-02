import express from 'express';
import mongoose from 'mongoose';
import { News } from '../models/News.js';
import { stripHtml } from '../utils/htmlUtils.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const published = req.query.published === 'true';
    
    const query = published ? { published: true } : {};
    
    const news = await News.find(query)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate('author', 'name email')
      .lean();
    
    const formattedNews = news.map((article) => {
      let tagsArray = [];
      if (Array.isArray(article.tags)) {
        tagsArray = article.tags;
      } else if (typeof article.tags === 'string') {
        tagsArray = article.tags.split(',').map(t => t.trim());
      }
      
      const cleanBody = stripHtml(article.body || '');
      const cleanParagraph = cleanBody.length > 150 
        ? cleanBody.substring(0, 150) + '...' 
        : cleanBody;
      
      return {
        id: article._id.toString(),
        title: article.title || '',
        paragraph: cleanParagraph,
        image: "/images/blog/blog-01.jpg",
        author: {
          name: article.authorName || (article.author?.name) || 'Auteur inconnu',
          image: "/images/blog/author-03.png",
          designation: "Content Writer"
        },
        tags: tagsArray,
        publishDate: article.date ? new Date(article.date).getFullYear().toString() : new Date().getFullYear().toString(),
        published: article.published || false,
        createdAt: article.createdAt ? article.createdAt.toISOString() : new Date().toISOString(),
        updatedAt: article.updatedAt ? article.updatedAt.toISOString() : new Date().toISOString()
      };
    });
    
    return res.json({
      success: true,
      data: formattedNews,
      count: formattedNews.length
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des news',
      details: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID invalide'
      });
    }
    
    const article = await News.findById(id)
      .populate('author', 'name email')
      .lean();
    
    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'News non trouvée'
      });
    }
    
    let tagsArray = [];
    if (Array.isArray(article.tags)) {
      tagsArray = article.tags;
    } else if (typeof article.tags === 'string') {
      tagsArray = article.tags.split(',').map(t => t.trim());
    }
    
    const cleanBody = stripHtml(article.body || '');
    
    const formattedNews = {
      id: article._id.toString(),
      title: article.title || '',
      paragraph: cleanBody,
      body: cleanBody,
      image: "/images/blog/blog-01.jpg",
      author: {
        name: article.authorName || (article.author?.name) || 'Auteur inconnu',
        image: "/images/blog/author-03.png",
        designation: "Content Writer"
      },
      tags: tagsArray,
      publishDate: article.date ? new Date(article.date).getFullYear().toString() : new Date().getFullYear().toString(),
      published: article.published || false,
      createdAt: article.createdAt ? article.createdAt.toISOString() : new Date().toISOString(),
      updatedAt: article.updatedAt ? article.updatedAt.toISOString() : new Date().toISOString()
    };
    
    return res.json({
      success: true,
      data: formattedNews
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération de la news',
      details: error.message
    });
  }
});

export default router;

