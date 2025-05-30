const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  surname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  favorites: [
    {
      mealId: String,
      source: { type: String, enum: ['external', 'custom'], default: 'external' }
    }
  ]
});

userSchema.index({ name: 1, surname: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);

