import express from 'express';
import mongoose from 'mongoose';
import { HomepageHighlight } from '../models/HomepageHighlight.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const highlights = await HomepageHighlight.find()
      .sort({ createdAt: -1 })
      .lean();

    if (highlights.length === 0) {
      return res.json({
        success: true,
        data: {
          title: 'À la une',
          description: 'Nouveauté',
          highlights: [],
        },
      });
    }

    const highlightsWithImages = highlights.filter((highlight) => highlight.image);

    const formattedHighlights = highlightsWithImages.map((highlight) => {
      let description = highlight.description || '';
      if (description.includes('Lancez votre projet de construction avec des professionnels certifiés.')) {
        description = 'Nouveauté';
      }
      
      return {
        id: highlight._id.toString(),
        title: highlight.title || '',
        description: description,
        image: highlight.image || null,
        link: highlight.link || null,
        createdAt: highlight.createdAt ? highlight.createdAt.toISOString() : new Date().toISOString(),
      };
    });

    // Le premier highlight pour la description (toujours "À la une" pour le titre)
    const firstHighlight = formattedHighlights[0];

    return res.json({
      success: true,
      data: {
        title: 'À la une',
        description: firstHighlight?.description || 'Nouveauté',
        highlights: formattedHighlights,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des highlights',
      details: error.message,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID invalide',
      });
    }

    const highlight = await HomepageHighlight.findById(id).lean();

    if (!highlight) {
      return res.status(404).json({
        success: false,
        error: 'Highlight non trouvé',
      });
    }

    let description = highlight.description || 'Nouveauté';
    if (description.includes('Lancez votre projet de construction avec des professionnels certifiés.')) {
      description = 'Nouveauté';
    }
    
    const formattedHighlight = {
      id: highlight._id.toString(),
      title: highlight.title || 'À la une',
      description: description,
      image: highlight.image || null,
      link: highlight.link || null,
      createdAt: highlight.createdAt ? highlight.createdAt.toISOString() : new Date().toISOString(),
    };

    return res.json({
      success: true,
      data: formattedHighlight,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération du highlight',
      details: error.message,
    });
  }
});

export default router;

