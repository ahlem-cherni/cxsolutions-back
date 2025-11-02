import express from 'express';
import { User } from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }
    
    const user = new User({ name, email, password });
    await user.save();
    
    res.json({ message: 'Inscription réussie !' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'inscription' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    req.session.user = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    };
    
    res.json({ message: 'Connexion réussie !' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
    }
    res.json({ message: 'Déconnexion réussie' });
  });
});

router.post('/forgot', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email requis' });

    const user = await User.findOne({ email });

    if (!user) return res.json({ message: 'Si un compte existe, vous recevrez un email.' });

    const token = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();

    return res.json({ message: 'Email envoyé (lien de réinitialisation).' });
  } catch (e) {
    return res.status(500).json({ message: 'Erreur lors de la demande.' });
  }
});

export default router;

