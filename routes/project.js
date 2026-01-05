import express from 'express';
import mongoose from 'mongoose';
import { Project } from '../models/Project.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    
    const projects = await Project.find({})
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();
    
    const formattedProjects = projects.map((project) => {
      return {
        id: project._id.toString(),
        title: project.title || '',
        description: project.description || null,
        timeline: project.timeline || null,
        image: project.image || null,
        link: project.link || null,
        createdAt: project.createdAt ? project.createdAt.toISOString() : new Date().toISOString(),
        updatedAt: project.updatedAt ? project.updatedAt.toISOString() : new Date().toISOString()
      };
    });
    
    return res.json({
      success: true,
      data: formattedProjects,
      count: formattedProjects.length
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des projets',
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
    
    const project = await Project.findById(id).lean();
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Projet non trouvé'
      });
    }
    
    const formattedProject = {
      id: project._id.toString(),
      title: project.title || '',
      description: project.description || null,
      timeline: project.timeline || null,
      image: project.image || null,
      link: project.link || null,
      createdAt: project.createdAt ? project.createdAt.toISOString() : new Date().toISOString(),
      updatedAt: project.updatedAt ? project.updatedAt.toISOString() : new Date().toISOString()
    };
    
    return res.json({
      success: true,
      data: formattedProject
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération du projet',
      details: error.message
    });
  }
});

export default router;

