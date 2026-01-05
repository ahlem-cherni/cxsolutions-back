import express from 'express';
import mongoose from 'mongoose';
import { ProjectAlt } from '../models/ProjectAlt.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projectAlts = await ProjectAlt.find()
      .sort({ createdAt: -1 })
      .lean();
    
    const formattedProjectAlts = projectAlts.map((projectAlt) => ({
      id: projectAlt._id.toString(),
      name: projectAlt.name || '',
      description: projectAlt.description || null,
      type: projectAlt.type || null,
      logo: projectAlt.logo || null,
      website: projectAlt.website || null,
      createdAt: projectAlt.createdAt ? projectAlt.createdAt.toISOString() : new Date().toISOString(),
    }));
    
    return res.json({
      success: true,
      data: formattedProjectAlts,
      count: formattedProjectAlts.length
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des projets alternatifs',
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
    
    const projectAlt = await ProjectAlt.findById(id).lean();
    
    if (!projectAlt) {
      return res.status(404).json({
        success: false,
        error: 'Projet alternatif non trouvé'
      });
    }
    
    const formattedProjectAlt = {
      id: projectAlt._id.toString(),
      name: projectAlt.name || '',
      description: projectAlt.description || null,
      type: projectAlt.type || null,
      logo: projectAlt.logo || null,
      website: projectAlt.website || null,
      createdAt: projectAlt.createdAt ? projectAlt.createdAt.toISOString() : new Date().toISOString(),
    };
    
    return res.json({
      success: true,
      data: formattedProjectAlt
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération du projet alternatif',
      details: error.message
    });
  }
});

export default router;

