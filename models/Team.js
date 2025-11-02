import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
  teamName: { type: String, required: true, unique: true },
  members: [{
    name: { type: String, required: true },
    role: { type: String, required: true },
    photo: { type: String }, 
    email: { type: String },
    bio: { type: String }
  }],
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

TeamSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export const Team = mongoose.model('Team', TeamSchema);

