import express from 'express';

const router = express.Router();

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.post('/sync-to-prisma', async (req, res) => {
  try {
    const { spawn } = await import('child_process');
    const syncProcess = spawn('node', ['../sync-mongo-to-prisma.js'], {
      cwd: __dirname,
      stdio: 'inherit'
    });
    
    syncProcess.on('close', (code) => {
      if (code === 0) {
        res.json({ message: 'Synchronisation réussie !' });
      } else {
        res.status(500).json({ message: 'Erreur lors de la synchronisation' });
      }
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la synchronisation' });
  }
});

export default router;

