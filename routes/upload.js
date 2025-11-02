import express from 'express';
import formidable from 'express-formidable';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

router.post('/', formidable({ multiples: false }), async (req, res) => {
  try {
    const file = req.files && (req.files.file || req.files.upload || Object.values(req.files)[0]);
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const ext = path.extname(file.originalFilename || file.name || '');
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    const destPath = path.join(uploadsDir, safeName);

    const tempPath = file.filepath || file.path; 
    await fs.promises.rename(tempPath, destPath);

    const publicPath = `/uploads/${safeName}`;
    return res.json({ url: publicPath });
  } catch (e) {
    return res.status(500).json({ message: 'Upload failed' });
  }
});

export default router;

