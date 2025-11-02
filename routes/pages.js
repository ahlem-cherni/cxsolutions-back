import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/login');
  });
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'register.html'));
});

router.get('/forgot', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'forgot.html'));
});

router.get('/', (req, res) => {
  if (req.session && req.session.user) {
    return res.redirect('/admin');
  }
  res.redirect('/login');
});

export default router;

