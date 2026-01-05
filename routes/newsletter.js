import express from 'express';
import { Newsletter } from '../models/Newsletter.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Le nom et l\'email sont requis'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Format d\'email invalide'
      });
    }

    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      return res.status(409).json({
        success: false,
        error: 'Cet email est déjà inscrit à la newsletter'
      });
    }

    const subscriber = new Newsletter({
      name,
      email
    });

    await subscriber.save();

    return res.status(201).json({
      success: true,
      message: 'Abonnement à la newsletter réussi !',
      data: {
        id: subscriber._id,
        name: subscriber.name,
        email: subscriber.email,
        createdAt: subscriber.createdAt
      }
    });

  } catch (error) {
    console.error('Erreur lors de l\'inscription à la newsletter:', error);
    return res.status(500).json({
      success: false,
      error: 'Erreur interne du serveur',
      details: error.message
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const subscribers = await Newsletter.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.json({
      success: true,
      data: subscribers,
      count: subscribers.length
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des inscriptions',
      details: error.message
    });
  }
});

export default router;

