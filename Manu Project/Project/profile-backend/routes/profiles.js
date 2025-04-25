const express = require('express');
const Profile = require('../models/Profile');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { name, bio, skills } = req.body;
  const profile = await Profile.findOneAndUpdate(
    { user: req.user.id },
    { name, bio, skills },
    { new: true, upsert: true }
  );
  res.json(profile);
});

router.get('/', async (req, res) => {
  const { skill } = req.query;
  const query = skill ? { skills: { $regex: skill, $options: 'i' } } : {};
  const profiles = await Profile.find(query);
  res.json(profiles);
});

router.get('/:id', async (req, res) => {
  const profile = await Profile.findById(req.params.id);
  res.json(profile);
});

module.exports = router;
