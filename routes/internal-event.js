import express from 'express';
import mongoose from 'mongoose';
import { InternalEvent } from '../models/InternalEvent.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const internalEvents = await InternalEvent.find()
      .sort({ dateTime: -1 })
      .lean();
    
    const formattedEvents = internalEvents.map((event) => ({
      id: event._id.toString(),
      name: event.name || '',
      description: event.description || null,
      dateTime: event.dateTime ? event.dateTime.toISOString() : new Date().toISOString(),
      pricingOptions: event.pricingOptions || [],
      createdAt: event.createdAt ? event.createdAt.toISOString() : new Date().toISOString(),
    }));
    
    return res.json({
      success: true,
      data: formattedEvents,
      count: formattedEvents.length
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des événements internes',
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
    
    const event = await InternalEvent.findById(id).lean();
    
    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Événement interne non trouvé'
      });
    }
    
    const formattedEvent = {
      id: event._id.toString(),
      name: event.name || '',
      description: event.description || null,
      dateTime: event.dateTime ? event.dateTime.toISOString() : new Date().toISOString(),
      pricingOptions: event.pricingOptions || [],
      createdAt: event.createdAt ? event.createdAt.toISOString() : new Date().toISOString(),
    };
    
    return res.json({
      success: true,
      data: formattedEvent
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération de l\'événement interne',
      details: error.message
    });
  }
});

export default router;

