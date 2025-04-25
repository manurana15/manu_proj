const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  skills: [String],
  bio: String
});
module.exports = mongoose.model('Profile', ProfileSchema);
