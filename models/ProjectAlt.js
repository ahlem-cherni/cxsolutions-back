import mongoose from 'mongoose';

const ProjectAltSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  type: { type: String },
  logo: { type: String },
  website: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const ProjectAlt = mongoose.model('ProjectAlt', ProjectAltSchema);

