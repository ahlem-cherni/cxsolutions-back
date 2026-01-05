import express from 'express';
import mongoose from 'mongoose';
import { Team } from '../models/Team.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { teamName } = req.query;

    const query = {};
    if (teamName) {
      if (mongoose.isValidObjectId(teamName)) {
        query._id = teamName;
      } else {
        query.teamName = teamName;
      }
    }

    const teams = await Team.find(query).sort({ createdAt: 1 }).lean();

    const formattedTeams = teams.map((team) => ({
      id: team._id.toString(),
      teamName: team.teamName || '',
      description: team.description || '',
      createdAt: team.createdAt ? team.createdAt.toISOString() : new Date().toISOString(),
      updatedAt: team.updatedAt ? team.updatedAt.toISOString() : new Date().toISOString(),
      members: Array.isArray(team.members)
        ? team.members.map((member) => ({
            id: member._id ? member._id.toString() : `${team._id}-${member.name}`,
            name: member.name || '',
            role: member.role || '',
            photo: member.photo || null,
            email: member.email || null,
            bio: member.bio || null,
          }))
        : [],
    }));

    return res.json({
      success: true,
      data: formattedTeams,
      count: formattedTeams.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des équipes',
      details: error.message,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID invalide',
      });
    }

    const team = await Team.findById(id).lean();

    if (!team) {
      return res.status(404).json({
        success: false,
        error: 'Équipe non trouvée',
      });
    }

    const formattedTeam = {
      id: team._id.toString(),
      teamName: team.teamName || '',
      description: team.description || '',
      createdAt: team.createdAt ? team.createdAt.toISOString() : new Date().toISOString(),
      updatedAt: team.updatedAt ? team.updatedAt.toISOString() : new Date().toISOString(),
      members: Array.isArray(team.members)
        ? team.members.map((member) => ({
            id: member._id ? member._id.toString() : `${team._id}-${member.name}`,
            name: member.name || '',
            role: member.role || '',
            photo: member.photo || null,
            email: member.email || null,
            bio: member.bio || null,
          }))
        : [],
    };

    return res.json({
      success: true,
      data: formattedTeam,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération de l’équipe',
      details: error.message,
    });
  }
});

export default router;

