import mongoose from 'mongoose';

export function scrubInvalidObjectIds(obj) {
  if (!obj || typeof obj !== 'object') return;
  Object.keys(obj).forEach((k) => {
    const v = obj[k];
    if (v && typeof v === 'object') {
      scrubInvalidObjectIds(v);
    } else if (typeof v === 'string') {
      const keyLower = k.toLowerCase();
      const looksLikeId = keyLower === 'id' || keyLower.endsWith('id') || keyLower.endsWith('_id');
      if (looksLikeId && !mongoose.isValidObjectId(v)) {
        delete obj[k];
      }
    }
  });
}

export const scrubMiddleware = (req, res, next) => {
  if (req.query) scrubInvalidObjectIds(req.query);
  if (req.body) scrubInvalidObjectIds(req.body);
  next();
};

